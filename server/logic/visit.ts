import { InsertVisit, insertVisitSchema } from "@shared/schema";
import { storage } from "../storage";

export interface CreateVisitRequest {
  countryCode: string;
  countryName: string;
  state?: string;
  city?: string;
  visitMonth: number;
  visitYear: number;
  notes?: string;
}

export async function createVisit(userId: number, visitData: CreateVisitRequest) {
  // Validate the visit data
  const validatedData = insertVisitSchema.parse({
    ...visitData,
    userId
  });

  // Create the visit in storage
  const newVisit = await storage.createVisit({
    userId,
    countryCode: validatedData.countryCode,
    countryName: validatedData.countryName,
    state: visitData.state || null,
    city: visitData.city || null,
    visitMonth: validatedData.visitMonth,
    visitYear: validatedData.visitYear,
    notes: visitData.notes || null,
  });

  return newVisit;
}

export async function getUserVisits(userId: number) {
  return await storage.getVisitsByUserId(userId);
}

export async function getVisitById(visitId: number, userId: number) {
  const visit = await storage.getVisitById(visitId);
  
  if (!visit) {
    throw new Error("Visit not found");
  }
  
  if (visit.userId !== userId) {
    throw new Error("Access denied - visit belongs to another user");
  }
  
  return visit;
}

export async function updateVisit(visitId: number, userId: number, updateData: Partial<CreateVisitRequest>) {
  // First verify the visit belongs to the user
  await getVisitById(visitId, userId);
  
  // Update the visit
  const updatedVisit = await storage.updateVisit(visitId, updateData);
  
  if (!updatedVisit) {
    throw new Error("Failed to update visit");
  }
  
  return updatedVisit;
}

export async function deleteVisit(visitId: number, userId: number) {
  // First verify the visit belongs to the user
  await getVisitById(visitId, userId);
  
  // Delete the visit
  const success = await storage.deleteVisit(visitId);
  
  if (!success) {
    throw new Error("Failed to delete visit");
  }
  
  return true;
}