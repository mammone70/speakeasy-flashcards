import { eq } from "drizzle-orm"
import { db } from "@/lib/db"
import { users } from "@/lib/db/schemas/users"
import type { NewUser, User } from "@/lib/db/schemas/users"

export class UsersDAO {
    static async findById(id: string): Promise<User | null> {
        const result = await db.select().from(users).where(eq(users.id, id)).limit(1)
        return result[0] || null
    }

    static async findByEmail(email: string): Promise<User | null> {
        const result = await db.select().from(users).where(eq(users.email, email)).limit(1)
        return result[0] || null
    }

    static async create(userData: NewUser): Promise<User> {
        const result = await db.insert(users).values(userData).returning()
        return result[0]
    }

    static async update(id: string, userData: Partial<NewUser>): Promise<User | null> {
        const result = await db
            .update(users)
            .set({ ...userData, updatedAt: new Date() })
            .where(eq(users.id, id))
            .returning()
        return result[0] || null
    }

    static async delete(id: string): Promise<boolean> {
        const result = await db.delete(users).where(eq(users.id, id)).returning()
        return result.length > 0
    }

    static async findAll(): Promise<User[]> {
        return await db.select().from(users).orderBy(users.createdAt)
    }
} 