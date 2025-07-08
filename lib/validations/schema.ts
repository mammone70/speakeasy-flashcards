import { z } from "zod"

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  displayName: z.string().nullable(),
  avatarUrl: z.string().url().nullable(),
  role: z.enum(["user", "admin"]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export const deckSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1, "Title is required"),
  description: z.string().nullable(),
  createdBy: z.string().uuid().nullable(),
  isPublic: z.boolean().default(false),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
})

export const cardSchema = z.object({
  id: z.string().uuid().optional(),
  deckId: z.string().uuid(),
  frontContent: z.string().min(1, "Front content is required"),
  backContent: z.string().min(1, "Back content is required"),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
})

export const userProgressSchema = z.object({
  id: z.string().uuid().optional(),
  userId: z.string().uuid(),
  cardId: z.string().uuid(),
  familiarityLevel: z.number().int().min(0).max(5),
  lastReviewed: z.string().datetime(),
  nextReview: z.string().datetime(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
})

export type User = z.infer<typeof userSchema>
export type Deck = z.infer<typeof deckSchema>
export type Card = z.infer<typeof cardSchema>
export type UserProgress = z.infer<typeof userProgressSchema>
