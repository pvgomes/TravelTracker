import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { z } from "zod";
import { insertVisitSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);

  // Middleware to check for authentication
  const isAuthenticated = (req: any, res: any, next: any) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: "Unauthorized" });
  };

  // Get all visits for the authenticated user
  app.get("/api/visits", isAuthenticated, async (req, res) => {
    const userId = req.user!.id;
    const visits = await storage.getVisitsByUserId(userId);
    res.json(visits);
  });

  // Add a new visit
  app.post("/api/visits", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user!.id;
      const visitData = insertVisitSchema.parse(req.body);
      
      const visit = await storage.createVisit({
        ...visitData,
        userId,
      });
      
      res.status(201).json(visit);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid visit data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create visit" });
      }
    }
  });

  // Get a specific visit by ID
  app.get("/api/visits/:id", isAuthenticated, async (req, res) => {
    const userId = req.user!.id;
    const visitId = parseInt(req.params.id, 10);
    
    if (isNaN(visitId)) {
      return res.status(400).json({ message: "Invalid visit ID" });
    }
    
    const visit = await storage.getVisitById(visitId);
    
    if (!visit) {
      return res.status(404).json({ message: "Visit not found" });
    }
    
    // Check if the visit belongs to the authenticated user
    if (visit.userId !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    
    res.json(visit);
  });

  // Delete a visit
  app.delete("/api/visits/:id", isAuthenticated, async (req, res) => {
    const userId = req.user!.id;
    const visitId = parseInt(req.params.id, 10);
    
    if (isNaN(visitId)) {
      return res.status(400).json({ message: "Invalid visit ID" });
    }
    
    const visit = await storage.getVisitById(visitId);
    
    if (!visit) {
      return res.status(404).json({ message: "Visit not found" });
    }
    
    // Check if the visit belongs to the authenticated user
    if (visit.userId !== userId) {
      return res.status(403).json({ message: "Forbidden" });
    }
    
    await storage.deleteVisit(visitId);
    res.status(204).send();
  });

  const httpServer = createServer(app);

  return httpServer;
}
