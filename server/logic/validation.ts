import { insertVisitSchema, insertUserSchema } from "@shared/schema";
import { Request, Response, NextFunction } from "express";

export function validateVisitData(req: Request, res: Response, next: NextFunction) {
  try {
    const validatedData = insertVisitSchema.omit({ userId: true }).parse(req.body);
    req.body = validatedData;
    next();
  } catch (error: any) {
    res.status(400).json({ error: "Invalid visit data", details: error.errors });
  }
}

export function validateUserData(req: Request, res: Response, next: NextFunction) {
  try {
    const validatedData = insertUserSchema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (error: any) {
    res.status(400).json({ error: "Invalid user data", details: error.errors });
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: "Authentication required" });
  }
  next();
}

export function validateVisitId(req: Request, res: Response, next: NextFunction) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid visit ID" });
  }
  req.params.id = id.toString();
  next();
}