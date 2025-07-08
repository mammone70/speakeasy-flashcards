import { pgTable, uuid, text, timestamp, boolean } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { users } from "./users"

export const decks = pgTable("decks", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    description: text("description"),
    createdBy: uuid("created_by").references(() => users.id, { onDelete: "set null" }),
    isPublic: boolean("is_public").default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const insertDeckSchema = createInsertSchema(decks)
export const selectDeckSchema = createSelectSchema(decks)

export type Deck = z.infer<typeof selectDeckSchema>
export type NewDeck = z.infer<typeof insertDeckSchema> 