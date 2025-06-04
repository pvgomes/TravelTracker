import { users, type User, type InsertUser, visits, type Visit } from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";
import connectPg from "connect-pg-simple";
import session from "express-session";
import { Pool } from "pg";
import { randomBytes } from "crypto";

// Define the interface for storage operations
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByShareId(shareId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  generateShareId(userId: number): Promise<string>;
  updateShareId(userId: number, shareId: string): Promise<boolean>;
  
  // Visit methods
  getVisitById(id: number): Promise<Visit | undefined>;
  getVisitsByUserId(userId: number): Promise<Visit[]>;
  createVisit(
    visit: Omit<Visit, 'id' | 'visitDate'> & { visitDate?: string | null }
  ): Promise<Visit>;
  updateVisit(id: number, visit: Partial<Omit<Visit, 'id' | 'userId'>>): Promise<Visit | undefined>;
  deleteVisit(id: number): Promise<boolean>;
  
  // Session store
  sessionStore: session.Store;
}

// PostgreSQL-based implementation of IStorage
export class DatabaseStorage implements IStorage {
  public sessionStore: session.Store;

  constructor() {
    const PostgresSessionStore = connectPg(session);
    // Create a new pg.Pool instance for session store
    const sessionPool = new Pool({
      connectionString: process.env.DATABASE_URL, // or your connection config
    });
    this.sessionStore = new PostgresSessionStore({ 
      pool: sessionPool,
      createTableIfMissing: true
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }
  
  async getUserByShareId(shareId: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.shareId, shareId));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  async generateShareId(userId: number): Promise<string> {
    // Check if user exists
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error("User not found");
    }
    
    // Generate a random shareId if it doesn't exist
    if (!user.shareId) {
      // Create a URL-friendly shareId: 16 random bytes as hex = 32 characters
      const shareId = randomBytes(16).toString('hex');
      
      // Update the user with the new shareId
      const [updatedUser] = await db
        .update(users)
        .set({ shareId })
        .where(eq(users.id, userId))
        .returning();
      
      return updatedUser.shareId as string;
    }
    
    return user.shareId;
  }
  
  async updateShareId(userId: number, shareId: string): Promise<boolean> {
    // Check if user exists
    const user = await this.getUser(userId);
    if (!user) {
      throw new Error("User not found");
    }
    
    try {
      // Update the user with the new shareId
      const [updatedUser] = await db
        .update(users)
        .set({ shareId })
        .where(eq(users.id, userId))
        .returning();
      
      return !!updatedUser;
    } catch (error) {
      console.error("Failed to update shareId:", error);
      return false;
    }
  }

  // Visit methods
  async getVisitById(id: number): Promise<Visit | undefined> {
    const [visit] = await db.select().from(visits).where(eq(visits.id, id));
    return visit;
  }

  async getVisitsByUserId(userId: number): Promise<Visit[]> {
    const userVisits = await db.select().from(visits).where(eq(visits.userId, userId));
    return userVisits;
  }

  async createVisit(
    visit: Omit<Visit, 'id' | 'visitDate'> & { visitDate?: string | null }
  ): Promise<Visit> {
    const [newVisit] = await db
      .insert(visits)
      .values({
        ...visit,
        notes: visit.notes ?? null // Ensure notes is never undefined
      })
      .returning();
    return newVisit;
  }

  async updateVisit(id: number, visitUpdate: Partial<Omit<Visit, 'id' | 'userId'>>): Promise<Visit | undefined> {
    const [visit] = await db.select().from(visits).where(eq(visits.id, id));
    if (!visit) return undefined;

    const [updatedVisit] = await db
      .update(visits)
      .set({
        ...visitUpdate,
        notes: visitUpdate.notes ?? visit.notes // Preserve existing notes if not provided
      })
      .where(eq(visits.id, id))
      .returning();
    
    return updatedVisit;
  }

  async deleteVisit(id: number): Promise<boolean> {
    const [deletedVisit] = await db
      .delete(visits)
      .where(eq(visits.id, id))
      .returning();
    return !!deletedVisit;
  }
}

// Export an instance of the database storage
export const storage = new DatabaseStorage();
