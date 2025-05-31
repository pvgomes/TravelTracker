import { users, type User, type InsertUser } from "../shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { randomBytes } from "crypto";

export async function createUser(userData: InsertUser): Promise<User> {
  const [user] = await db
    .insert(users)
    .values(userData)
    .returning();
  return user;
}

export async function getUserById(id: number): Promise<User | undefined> {
  const [user] = await db.select().from(users).where(eq(users.id, id));
  return user;
}

export async function getUserByUsername(username: string): Promise<User | undefined> {
  const [user] = await db.select().from(users).where(eq(users.username, username));
  return user;
}

export async function getUserByShareId(shareId: string): Promise<User | undefined> {
  const [user] = await db.select().from(users).where(eq(users.shareId, shareId));
  return user;
}

export async function generateShareId(userId: number): Promise<string> {
  const shareId = randomBytes(16).toString('hex');
  await db
    .update(users)
    .set({ shareId })
    .where(eq(users.id, userId));
  return shareId;
}