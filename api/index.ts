import { createServer } from 'http';
import express from 'express';
import { registerRoutes } from '../server/routes';

const app = express();
const httpServer = createServer(app);

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize routes
// We wrap it in a promise because registerRoutes is async
// Vercel serverless functions handle async initialization implicitly if we do it right?
// Actually simpler: just await it at top level if supported, or use a handler wrapper.
// But mostly registerRoutes just attaches handlers.

// Top-level await to ensure routes are registered BEFORE Vercel serves the app
try {
    await registerRoutes(httpServer, app);
} catch (err) {
    console.error("Failed to register routes", err);
}

export default app;
