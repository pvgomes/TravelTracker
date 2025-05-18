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
        city: visitData.city,
        notes: visitData.notes ?? null, // Ensure notes is never undefined
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

  // Create or get user's shareId (friendly URL slug)
  app.post("/api/share", isAuthenticated, async (req, res) => {
    try {
      // Generate a friendly slug based on the user's username or full name
      const user = req.user!;
      
      // Create the friendly URL slug
      let friendlySlug;
      if (user.fullName) {
        // Generate from full name (convert "John Doe" to "john-doe")
        friendlySlug = user.fullName.toLowerCase().replace(/\s+/g, '-');
      } else {
        // Generate from username (remove email domain if it's an email)
        friendlySlug = user.username.split('@')[0].toLowerCase();
      }
      
      // Add user's ID as a suffix to ensure uniqueness while keeping URL readable
      const userIdSuffix = user.id.toString().padStart(4, '0');
      const slugWithId = `${friendlySlug}-${userIdSuffix}`;
      
      // Save this as the user's shareId
      await storage.updateShareId(user.id, slugWithId);
      
      res.json({ shareId: slugWithId });
    } catch (error) {
      console.error("Failed to generate share ID:", error);
      res.status(500).json({ message: "Failed to generate share ID" });
    }
  });
  
  // Get public shared user data by friendly slug
  app.get("/api/public/:shareId", async (req, res) => {
    try {
      const shareId = req.params.shareId;
      if (!shareId || shareId.length < 3) {
        return res.status(400).json({ message: "Invalid share ID" });
      }
      
      const user = await storage.getUserByShareId(shareId);
      if (!user) {
        return res.status(404).json({ message: "Shared profile not found" });
      }
      
      // Get the visits for this user
      const visits = await storage.getVisitsByUserId(user.id);
      
      // Return only public data, excluding sensitive information
      const publicUserData = {
        fullName: user.fullName || "Travel Enthusiast",
        homeCountryCode: user.homeCountryCode,
        homeCountryName: user.homeCountryName,
        visits
      };
      
      res.json(publicUserData);
    } catch (error) {
      console.error("Failed to fetch public profile:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
