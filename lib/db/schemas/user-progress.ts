import { pgTable, uuid, timestamp, integer } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"
import { users } from "./users"
import { cards } from "./cards"

export const userProgress = pgTable("user_progress", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    cardId: uuid("card_id")
        .notNull()
        .references(() => cards.id, { onDelete: "cascade" }),
    familiarityLevel: integer("familiarity_level").default(0),
    lastReviewed: timestamp("last_reviewed").notNull().defaultNow(),
    nextReview: timestamp("next_review").notNull().defaultNow(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
})

export const insertUserProgressSchema = createInsertSchema(userProgress)
export const selectUserProgressSchema = createSelectSchema(userProgress)

export type UserProgress = z.infer<typeof selectUserProgressSchema>
export type NewUserProgress = z.infer<typeof insertUserProgressSchema> 