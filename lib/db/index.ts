import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

// Use environment variables for connection
const connectionString = process.env.DATABASE_URL!

// Create a new connection pool
const client = postgres(connectionString)

// Create a Drizzle ORM instance
export const db = drizzle(client, { schema })
