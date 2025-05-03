import { users, type User, type InsertUser, visits, type Visit } from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";
import connectPg from "connect-pg-simple";
import session from "express-session";
import { pool } from "./db";

// Define the interface for storage operations
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Visit methods
  getVisitById(id: number): Promise<Visit | undefined>;
  getVisitsByUserId(userId: number): Promise<Visit[]>;
  createVisit(visit: Omit<Visit, 'id'>): Promise<Visit>;
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
    this.sessionStore = new PostgresSessionStore({ 
      pool,
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

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
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

  async createVisit(visit: Omit<Visit, 'id'>): Promise<Visit> {
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
