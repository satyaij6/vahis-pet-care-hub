import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SharedUser } from "../shared/schema";
import bcrypt from "bcryptjs";

declare global {
    namespace Express {
        interface User extends SharedUser { }
    }
}

export function setupAuth(app: Express) {
    const sessionSettings: session.SessionOptions = {
        secret: process.env.SESSION_SECRET || "pawprint_secret_key",
        resave: false,
        saveUninitialized: false,
        store: storage.sessionStore,
    };

    if (app.get("env") === "production") {
        app.set("trust proxy", 1);
    }

    app.use(session(sessionSettings));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
        new LocalStrategy(async (username, password, done) => {
            try {
                const user = await storage.getUserByUsername(username);
                if (!user || !(await bcrypt.compare(password, user.password))) {
                    return done(null, false);
                } else {
                    return done(null, user);
                }
            } catch (err) {
                return done(err);
            }
        }),
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id: string, done) => {
        // id is string in shared schema but might be number if serial.
        // standard shared schema has 'id' as serial (number) for pets but varchar for users.
        // User id is varchar/uuid so string is correct.
        const user = await storage.getUser(id);
        done(null, user);
    });

    app.post("/api/register", async (req, res, next) => {
        try {
            const existingUser = await storage.getUserByUsername(req.body.username);
            if (existingUser) {
                return res.status(400).send("Username already exists");
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const user = await storage.createUser({
                ...req.body,
                password: hashedPassword,
            });

            req.login(user, (err) => {
                if (err) return next(err);
                res.status(201).json(user);
            });
        } catch (err) {
            next(err);
        }
    });

    app.post("/api/login", passport.authenticate("local"), (req, res) => {
        res.status(200).json(req.user);
    });

    app.post("/api/logout", (req, res, next) => {
        req.logout((err) => {
            if (err) return next(err);
            res.sendStatus(200);
        });
    });

    app.get("/api/user", (req, res) => {
        if (!req.isAuthenticated()) return res.sendStatus(401);
        res.json(req.user);
    });

    // Auto-create default admin user if not exists
    (async () => {
        try {
            const adminUser = await storage.getUserByUsername("admin");
            if (!adminUser) {
                console.log("Admin user not found, creating default admin...");
                const hashedPassword = await bcrypt.hash("vahis123", 10);
                await storage.createUser({
                    username: "admin",
                    password: hashedPassword,
                    // Add other required fields if any, schema usually allows default or null for others if not specified
                    // based on shared/schema.ts inspection earlier, user only has username/password/id mostly.
                });
                console.log("Default admin user created successfully.");
            }
        } catch (err) {
            console.error("Failed to ensure default admin user:", err);
        }
    })();
}
