import { visits, type Visit } from "../shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface CreateVisitRequest {
  countryCode: string;
  countryName: string;
  state?: string;
  city?: string;
  visitMonth: number;
  visitYear: number;
  notes?: string;
}

export async function createVisit(userId: number, visitData: CreateVisitRequest): Promise<Visit> {
  const [visit] = await db
    .insert(visits)
    .values({
      ...visitData,
      userId,
    })
    .returning();
  return visit;
}

export async function getUserVisits(userId: number): Promise<Visit[]> {
  return await db
    .select()
    .from(visits)
    .where(eq(visits.userId, userId));
}

export async function getVisitById(visitId: number, userId: number): Promise<Visit | undefined> {
  const [visit] = await db
    .select()
    .from(visits)
    .where(and(eq(visits.id, visitId), eq(visits.userId, userId)));
  return visit;
}

export async function updateVisit(
  visitId: number, 
  userId: number, 
  updateData: Partial<CreateVisitRequest>
): Promise<Visit | undefined> {
  const [visit] = await db
    .update(visits)
    .set(updateData)
    .where(and(eq(visits.id, visitId), eq(visits.userId, userId)))
    .returning();
  return visit;
}

export async function deleteVisit(visitId: number, userId: number): Promise<boolean> {
  const result = await db
    .delete(visits)
    .where(and(eq(visits.id, visitId), eq(visits.userId, userId)));
  return (result.rowCount ?? 0) > 0;
}