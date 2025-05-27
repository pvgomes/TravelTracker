import { InsertUser } from "@shared/schema";
import { storage } from "../storage";
import { randomBytes } from "crypto";

export async function createUser(userData: InsertUser) {
  // Check if username already exists
  const existingUser = await storage.getUserByUsername(userData.username);
  if (existingUser) {
    throw new Error("Username already exists");
  }

  // Create the user
  const user = await storage.createUser(userData);
  return user;
}

export async function getUserById(id: number) {
  const user = await storage.getUser(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

export async function getUserByUsername(username: string) {
  const user = await storage.getUserByUsername(username);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

export async function getUserByShareId(shareId: string) {
  const user = await storage.getUserByShareId(shareId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

export async function generateShareId(userId: number) {
  // Generate a unique share ID
  let shareId: string;
  let attempts = 0;
  const maxAttempts = 5;

  do {
    shareId = randomBytes(8).toString('hex');
    attempts++;
    
    // Check if this share ID already exists
    try {
      await storage.getUserByShareId(shareId);
      // If we get here, the share ID exists, try again
    } catch {
      // Share ID doesn't exist, we can use it
      break;
    }
  } while (attempts < maxAttempts);

  if (attempts >= maxAttempts) {
    throw new Error("Failed to generate unique share ID");
  }

  // Update the user with the new share ID
  const success = await storage.updateShareId(userId, shareId);
  if (!success) {
    throw new Error("Failed to update share ID");
  }

  return shareId;
}