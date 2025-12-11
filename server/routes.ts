import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";

import { GoogleGenerativeAI } from "@google/generative-ai";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  setupAuth(app);

  app.get("/api/pets", async (_req, res) => {
    const pets = await storage.getPets();
    res.json(pets);
  });

  app.post("/api/pets", async (req, res) => {
    // Only allow logged in users (admin) to create
    if (!req.isAuthenticated()) return res.sendStatus(401);

    // In a real app we'd validate against schema here
    const pet = await storage.createPet(req.body);
    res.status(201).json(pet);
  });

  app.patch("/api/pets/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const id = parseInt(req.params.id);
    const pet = await storage.updatePet(id, req.body);
    res.json(pet);
  });

  app.delete("/api/pets/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const id = parseInt(req.params.id);
    await storage.deletePet(id);
    res.sendStatus(204);
  });

  // Products API
  app.get("/api/products", async (_req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.post("/api/products", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const product = await storage.createProduct(req.body);
    res.status(201).json(product);
  });

  app.patch("/api/products/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const id = parseInt(req.params.id);
    const product = await storage.updateProduct(id, req.body);
    res.json(product);
  });

  app.delete("/api/products/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const id = parseInt(req.params.id);
    await storage.deleteProduct(id);
    res.sendStatus(204);
  });

  // Bookings API
  app.get("/api/bookings", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const bookings = await storage.getBookings();
    res.json(bookings);
  });

  app.post("/api/bookings", async (req, res) => {
    // Bookings (Enquiries/Visits) can be created by public
    const booking = await storage.createBooking(req.body);
    res.status(201).json(booking);
  });

  app.patch("/api/bookings/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const id = parseInt(req.params.id);
    const booking = await storage.updateBooking(id, req.body);
    res.json(booking);
  });

  app.delete("/api/bookings/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    const id = parseInt(req.params.id);
    await storage.deleteBooking(id);
    res.sendStatus(204);
  });

  app.post("/api/match-pet", async (req, res) => {
    try {
      const { preferences } = req.body;
      console.log("Processing match request for preferences:", JSON.stringify(preferences));

      if (!preferences) {
        return res.status(400).json({ error: "Missing user preferences" });
      }

      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(500).json({ error: "Gemini API key not configured" });
      }

      const pets = await storage.getPets();

      if (!pets || pets.length === 0) {
        return res.status(400).json({ error: "No pets available in the system." });
      }

      // Filter available pets first
      let availablePets = pets.filter((p: any) => p.status === 'Available');

      // Strict Pet Type Filtering
      // The AI can sometimes be "too smart" and recommend a cat for a dog person if the stats match better.
      // We prevent this by filtering the list purely in code first.
      if (preferences.petType && (preferences.petType === 'Dog' || preferences.petType === 'Cat')) {
        availablePets = availablePets.filter((p: any) => p.type.toLowerCase() === preferences.petType.toLowerCase());
      }

      if (availablePets.length === 0) {
        return res.json({ error: `No available ${preferences.petType || 'pets'} found matching your criteria.` });
      }

      console.log("AI Candidates:", availablePets.map((p: any) => `${p.name} (${p.type})`).join(", "));

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: "gemini-flash-latest",
        generationConfig: { responseMimeType: "application/json" }
      });

      const prompt = `
        You are a Senior Pet Matchmaker at 'PawPrint Boutique'.
        
        YOUR GOAL: Analyze the "Available Pets" and find the ONE absolute best match for the "Customer Profile".
        
        CRITICAL RULES:
        1. **Temperament Match**: If user wants "Calm", DO NOT recommend high-energy/playful pets.
        2. **Activity Level**: Compare user's exercise time with the pet's needs.
        3. **Living Situation**: Ensure the pet is suitable for the housing (e.g. huge dogs in small apartments is a bad match).
        4. **Kid Friendly**: If user has kids, the pet MUST be good with children.

        Customer Profile:
        - Budget: ${preferences.budget}
        - Pet Preference: ${preferences.petType}
        - Housing: ${preferences.housing}
        - Exercise time: ${preferences.exercise}
        - Temperament: ${preferences.temperament}
        - Kids at home: ${preferences.kids}
        - Experience: ${preferences.experience}

        Available Pets (JSON):
        ${JSON.stringify(availablePets)}

        TASK:
        1. Filter out pets that are a "bad match" (e.g. wrong temperament or budget).
        2. Compare the remaining candidates.
        3. Select the WINNER.

        Output Format: JSON ONLY.
        {
          "petId": <id of selected pet>,
          "matchReason": "<Explain WHY this pet beat the others. Be specific about the match criteria.>",
          "careTips": ["<tip 1>", "<tip 2>", "<tip 3>"]
        }
      `;

      const result = await model.generateContent(prompt);
      const text = result.response.text();

      try {
        const recommendation = JSON.parse(text);
        // Enrich with full pet details
        const petDetails = availablePets.find((p: any) => p.id === recommendation.petId);
        res.json({
          ...recommendation,
          pet: petDetails,
          candidatesFound: availablePets.length // Debug info: how many pets were considered?
        });
      } catch (e) {
        console.error("Failed to parse Gemini response:", text);
        res.status(500).json({ error: "AI response parsing failed" });
      }

    } catch (error: any) {
      console.error("Match error:", error);
      const errorMessage = error.message || "Unknown error";

      if (errorMessage.includes("429") || errorMessage.includes("Quota")) {
        return res.status(429).json({ error: "Daily AI Limit Reached. Please try again tomorrow! 🛑" });
      }

      res.status(500).json({ error: `Matching failed: ${errorMessage}` });
    }
  });

  return httpServer;
}
