import { eq, desc } from "drizzle-orm"
import { db } from "@/lib/db"
import { cards } from "@/lib/db/schemas/cards"
import type { NewCard, Card } from "@/lib/db/schemas/cards"

export class CardsDAO {
    static async findById(id: string): Promise<Card | null> {
        const result = await db.select().from(cards).where(eq(cards.id, id)).limit(1)
        return result[0] || null
    }

    static async findByDeckId(deckId: string): Promise<Card[]> {
        return await db.select().from(cards).where(eq(cards.deckId, deckId)).orderBy(desc(cards.createdAt))
    }

    static async findAll(): Promise<Card[]> {
        return await db.select().from(cards).orderBy(desc(cards.createdAt))
    }

    static async create(cardData: NewCard): Promise<Card> {
        const result = await db.insert(cards).values(cardData).returning()
        return result[0]
    }

    static async update(id: string, cardData: Partial<NewCard>): Promise<Card | null> {
        const result = await db
            .update(cards)
            .set({ ...cardData, updatedAt: new Date() })
            .where(eq(cards.id, id))
            .returning()
        return result[0] || null
    }

    static async delete(id: string): Promise<boolean> {
        const result = await db.delete(cards).where(eq(cards.id, id)).returning()
        return result.length > 0
    }

    static async deleteByDeckId(deckId: string): Promise<number> {
        const result = await db.delete(cards).where(eq(cards.deckId, deckId)).returning()
        return result.length
    }
} 