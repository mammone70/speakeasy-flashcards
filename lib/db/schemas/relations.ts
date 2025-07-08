import { relations } from "drizzle-orm"
import { users } from "./users"
import { decks } from "./decks"
import { cards } from "./cards"
import { userProgress } from "./user-progress"

export const usersRelations = relations(users, ({ many }) => ({
    decks: many(decks),
    progress: many(userProgress),
}))

export const decksRelations = relations(decks, ({ one, many }) => ({
    creator: one(users, {
        fields: [decks.createdBy],
        references: [users.id],
    }),
    cards: many(cards),
}))

export const cardsRelations = relations(cards, ({ one, many }) => ({
    deck: one(decks, {
        fields: [cards.deckId],
        references: [decks.id],
    }),
    progress: many(userProgress),
}))

export const userProgressRelations = relations(userProgress, ({ one }) => ({
    user: one(users, {
        fields: [userProgress.userId],
        references: [users.id],
    }),
    card: one(cards, {
        fields: [userProgress.cardId],
        references: [cards.id],
    }),
})) 