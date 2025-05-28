import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { setupSwagger } from "./swagger";
import { storage } from "./storage";
import { z } from "zod";
import { insertVisitSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);

  // Setup Swagger API documentation
  setupSwagger(app);

  // Middleware to check for authentication
  const isAuthenticated = (req: any, res: any, next: any) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).json({ message: "Unauthorized" });
  };

  /**
   * @swagger
   * /visits:
   *   get:
   *     summary: Get all visits for the authenticated user
   *     description: Retrieve a list of all countries, cities, and places the authenticated user has visited
   *     tags: [Visits]
   *     security:
   *       - sessionAuth: []
   *     responses:
   *       200:
   *         description: List of visits retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Visit'
   *       401:
   *         description: User not authenticated
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  app.get("/api/visits", isAuthenticated, async (req, res) => {
    const userId = req.user!.id;
    const visits = await storage.getVisitsByUserId(userId);
    res.json(visits);
  });

  /**
   * @swagger
   * /visits:
   *   post:
   *     summary: Add a new visit
   *     description: Record a new visit to a country, city, or place
   *     tags: [Visits]
   *     security:
   *       - sessionAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required: [countryCode, countryName, visitMonth, visitYear]
   *             properties:
   *               countryCode:
   *                 type: string
   *                 description: ISO 2-letter country code
   *                 example: "CZ"
   *               countryName:
   *                 type: string
   *                 description: Full country name
   *                 example: "Czech Republic"
   *               state:
   *                 type: string
   *                 description: State or province visited
   *                 example: "Prague"
   *                 nullable: true
   *               city:
   *                 type: string
   *                 description: City visited
   *                 example: "Prague"
   *                 nullable: true
   *               visitMonth:
   *                 type: integer
   *                 description: Month of visit (1-12)
   *                 example: 6
   *               visitYear:
   *                 type: integer
   *                 description: Year of visit
   *                 example: 2024
   *               notes:
   *                 type: string
   *                 description: Personal notes about the visit
   *                 example: "Beautiful architecture and great food!"
   *                 nullable: true
   *     responses:
   *       201:
   *         description: Visit created successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Visit'
   *       400:
   *         description: Invalid request data
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       401:
   *         description: User not authenticated
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       500:
   *         description: Internal server error
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
  app.post("/api/visits", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user!.id;
      const visitData = insertVisitSchema.parse(req.body);
      
      // Generate a visitDate from the month/year for backward compatibility
      const visitDate = new Date();
      visitDate.setMonth(visitData.visitMonth - 1);
      visitDate.setFullYear(visitData.visitYear);
      visitDate.setDate(1); // First day of the month
      
      const visit = await storage.createVisit({
        ...visitData,
        userId,
        city: visitData.city,
        notes: visitData.notes ?? null, // Ensure notes is never undefined
        visitDate: visitDate.toISOString().split('T')[0], // YYYY-MM-DD format
        state: null, // Set state to null since we no longer use it
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

  /**
   * @swagger
   * /visits/{id}:
   *   get:
   *     summary: Get a specific visit by ID
   *     description: Retrieve details of a specific visit by its unique identifier
   *     tags: [Visits]
   *     security:
   *       - sessionAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: Unique identifier of the visit
   *         schema:
   *           type: integer
   *           example: 1
   *     responses:
   *       200:
   *         description: Visit retrieved successfully
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Visit'
   *       400:
   *         description: Invalid visit ID
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       401:
   *         description: User not authenticated
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       403:
   *         description: Access denied - visit belongs to another user
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   *       404:
   *         description: Visit not found
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Error'
   */
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
