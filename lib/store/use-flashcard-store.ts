import { create } from "zustand"
import type { Card, Deck, UserProgress } from "@/lib/validations/schema"

interface FlashcardState {
  decks: Deck[]
  currentDeck: Deck | null
  cards: Card[]
  currentCardIndex: number
  isFlipped: boolean
  userProgress: Record<string, UserProgress>

  // Actions
  setDecks: (decks: Deck[]) => void
  setCurrentDeck: (deck: Deck | null) => void
  setCards: (cards: Card[]) => void
  nextCard: () => void
  previousCard: () => void
  flipCard: () => void
  resetFlip: () => void
  updateProgress: (cardId: string, familiarityLevel: number) => void
}

export const useFlashcardStore = create<FlashcardState>((set) => ({
  decks: [],
  currentDeck: null,
  cards: [],
  currentCardIndex: 0,
  isFlipped: false,
  userProgress: {},

  setDecks: (decks) => set({ decks }),
  setCurrentDeck: (deck) => set({ currentDeck: deck, currentCardIndex: 0, isFlipped: false }),
  setCards: (cards) => set({ cards, currentCardIndex: 0, isFlipped: false }),

  nextCard: () =>
    set((state) => ({
      currentCardIndex: (state.currentCardIndex + 1) % state.cards.length,
      isFlipped: false,
    })),

  previousCard: () =>
    set((state) => ({
      currentCardIndex: (state.currentCardIndex - 1 + state.cards.length) % state.cards.length,
      isFlipped: false,
    })),

  flipCard: () => set((state) => ({ isFlipped: !state.isFlipped })),
  resetFlip: () => set({ isFlipped: false }),

  updateProgress: (cardId, familiarityLevel) =>
    set((state) => {
      const now = new Date().toISOString()
      // Calculate next review date based on familiarity level (spaced repetition)
      const daysToAdd = Math.pow(2, familiarityLevel)
      const nextReview = new Date()
      nextReview.setDate(nextReview.getDate() + daysToAdd)

      return {
        userProgress: {
          ...state.userProgress,
          [cardId]: {
            ...(state.userProgress[cardId] || {}),
            cardId,
            familiarityLevel,
            lastReviewed: now,
            nextReview: nextReview.toISOString(),
          } as UserProgress,
        },
      }
    }),
}))
