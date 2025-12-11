import "dotenv/config";
import { storage } from "../server/storage";
import bcrypt from "bcryptjs";

async function seed() {
    console.log("Seeding database...");

    const username = "admin";
    const password = "vahis123";

    // Check if admin exists
    const existingUser = await storage.getUserByUsername(username);
    if (existingUser) {
        console.log("Admin user already exists.");
        process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await storage.createUser({
        username,
        password: hashedPassword,
    });

    console.log("Admin user created successfully!");
    console.log("Username: admin");
    console.log("Password: vahis123");
    process.exit(0);
}

seed().catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
});
