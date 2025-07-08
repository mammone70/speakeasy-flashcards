import { eq, and } from "drizzle-orm"
import { db } from "@/lib/db"
import { userProgress } from "@/lib/db/schemas/user-progress"
import type { NewUserProgress, UserProgress } from "@/lib/db/schemas/user-progress"

export class UserProgressDAO {
    static async findById(id: string): Promise<UserProgress | null> {
        const result = await db.select().from(userProgress).where(eq(userProgress.id, id)).limit(1)
        return result[0] || null
    }

    static async findByUserAndCard(userId: string, cardId: string): Promise<UserProgress | null> {
        const result = await db
            .select()
            .from(userProgress)
            .where(and(eq(userProgress.userId, userId), eq(userProgress.cardId, cardId)))
            .limit(1)
        return result[0] || null
    }

    static async findByUserId(userId: string): Promise<UserProgress[]> {
        return await db.select().from(userProgress).where(eq(userProgress.userId, userId))
    }

    static async findByCardId(cardId: string): Promise<UserProgress[]> {
        return await db.select().from(userProgress).where(eq(userProgress.cardId, cardId))
    }

    static async create(progressData: NewUserProgress): Promise<UserProgress> {
        const result = await db.insert(userProgress).values(progressData).returning()
        return result[0]
    }

    static async update(id: string, progressData: Partial<NewUserProgress>): Promise<UserProgress | null> {
        const result = await db
            .update(userProgress)
            .set({ ...progressData, updatedAt: new Date() })
            .where(eq(userProgress.id, id))
            .returning()
        return result[0] || null
    }

    static async upsertByUserAndCard(userId: string, cardId: string, progressData: Partial<NewUserProgress>): Promise<UserProgress> {
        const existing = await this.findByUserAndCard(userId, cardId)

        if (existing) {
            const updated = await this.update(existing.id, progressData)
            return updated!
        } else {
            return await this.create({
                userId,
                cardId,
                ...progressData,
            })
        }
    }

    static async delete(id: string): Promise<boolean> {
        const result = await db.delete(userProgress).where(eq(userProgress.id, id)).returning()
        return result.length > 0
    }

    static async deleteByUserId(userId: string): Promise<number> {
        const result = await db.delete(userProgress).where(eq(userProgress.userId, userId)).returning()
        return result.length
    }

    static async deleteByCardId(cardId: string): Promise<number> {
        const result = await db.delete(userProgress).where(eq(userProgress.cardId, cardId)).returning()
        return result.length
    }
} 