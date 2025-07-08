import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { decks } from "./decks"

export const cards = pgTable("cards", {
    id: uuid("id").primaryKey().defaultRandom(),
    deckId: uuid("deck_id")
        .notNull()
        .references(() => decks.id, { onDelete: "cascade" }),
    frontContent: text("front_content").notNull(),
    backContent: text("back_content").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const insertCardSchema = createInsertSchema(cards)
export const selectCardSchema = createSelectSchema(cards)

export type Card = z.infer<typeof selectCardSchema>
export type NewCard = z.infer<typeof insertCardSchema> 