import { eq, desc, and, inArray } from "drizzle-orm"
import { db } from "@/lib/db"
import { decks } from "@/lib/db/schemas/decks"
import type { NewDeck, Deck } from "@/lib/db/schemas/decks"

export class DecksDAO {
    static async findById(id: string): Promise<Deck | null> {
        const result = await db.select().from(decks).where(eq(decks.id, id)).limit(1)
        return result[0] || null
    }

    static async findAll(): Promise<Deck[]> {
        return await db.select().from(decks).orderBy(desc(decks.createdAt))
    }

    static async findPublic(): Promise<Deck[]> {
        return await db.select().from(decks).where(eq(decks.isPublic, true)).orderBy(desc(decks.createdAt))
    }

    static async findByCreator(createdBy: string): Promise<Deck[]> {
        return await db.select().from(decks).where(eq(decks.createdBy, createdBy)).orderBy(desc(decks.createdAt))
    }

    static async create(deckData: NewDeck): Promise<Deck> {
        const result = await db.insert(decks).values(deckData).returning()
        return result[0]
    }

    static async update(id: string, deckData: Partial<NewDeck>): Promise<Deck | null> {
        const result = await db
            .update(decks)
            .set({ ...deckData, updatedAt: new Date() })
            .where(eq(decks.id, id))
            .returning()
        return result[0] || null
    }

    static async delete(id: string): Promise<boolean> {
        const result = await db.delete(decks).where(eq(decks.id, id)).returning()
        return result.length > 0
    }

    static async findByTitles(titles: string[]): Promise<Deck[]> {
        if (titles.length === 0) return []
        return await db.select().from(decks).where(
            and(
                eq(decks.isPublic, true),
                // Use inArray for better performance
                inArray(decks.title, titles)
            )
        )
    }
} 