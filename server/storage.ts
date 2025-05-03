import { users, type User, type InsertUser, visits, type Visit } from "@shared/schema";
import createMemoryStore from "memorystore";
import session from "express-session";

// modify the interface with any CRUD methods
// you might need

const MemoryStore = createMemoryStore(session);

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
  
  // Session storage
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private visits: Map<number, Visit>;
  private userIdCounter: number;
  private visitIdCounter: number;
  public sessionStore: session.SessionStore;

  constructor() {
    this.users = new Map();
    this.visits = new Map();
    this.userIdCounter = 1;
    this.visitIdCounter = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Visit methods
  async getVisitById(id: number): Promise<Visit | undefined> {
    return this.visits.get(id);
  }

  async getVisitsByUserId(userId: number): Promise<Visit[]> {
    return Array.from(this.visits.values()).filter(
      (visit) => visit.userId === userId,
    );
  }

  async createVisit(visit: Omit<Visit, 'id'>): Promise<Visit> {
    const id = this.visitIdCounter++;
    const newVisit: Visit = { ...visit, id };
    this.visits.set(id, newVisit);
    return newVisit;
  }

  async updateVisit(id: number, visitUpdate: Partial<Omit<Visit, 'id' | 'userId'>>): Promise<Visit | undefined> {
    const visit = this.visits.get(id);
    if (!visit) return undefined;

    const updatedVisit: Visit = { ...visit, ...visitUpdate };
    this.visits.set(id, updatedVisit);
    return updatedVisit;
  }

  async deleteVisit(id: number): Promise<boolean> {
    return this.visits.delete(id);
  }
}

export const storage = new MemStorage();
