
import { config } from "dotenv";
import { resolve } from "path";
import { Pool } from "pg";

// Robustly load .env
const envPath = resolve(process.cwd(), ".env");
console.log(`Loading .env from: ${envPath}`);
config({ path: envPath });

async function reset() {
    if (!process.env.DATABASE_URL) {
        console.error("❌ Error: DATABASE_URL is not set.");
        console.error("Please check your .env file.");
        process.exit(1);
    }

    console.log("✅ DATABASE_URL found.");
    console.log("⚠️  WARNING: This will drop all tables in connection:", process.env.DATABASE_URL.split("@")[1]); // Log host only for safety
    console.log("Starting reset in 3 seconds...");
    await new Promise(r => setTimeout(r, 3000));

    const isRender = process.env.DATABASE_URL.includes("render.com");
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: isRender ? { rejectUnauthorized: false } : undefined
    });

    try {
        const client = await pool.connect();
        try {
            // Drop tables in order
            const tables = ["session", "bookings", "products", "pets", "users"];
            for (const table of tables) {
                console.log(`Dropping ${table}...`);
                await client.query(`DROP TABLE IF EXISTS "${table}" CASCADE`);
            }

            console.log("✅ Database reset complete. You can now run 'npm run db:push'");
        } finally {
            client.release();
        }
        await pool.end();
        process.exit(0);
    } catch (err) {
        console.error("Reset failed:", err);
        process.exit(1);
    }
}

reset();
