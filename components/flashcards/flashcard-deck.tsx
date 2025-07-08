"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useFlashcardStore } from "@/lib/store/use-flashcard-store"
import { Flashcard } from "@/components/flashcards/flashcard"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, FlipVerticalIcon as Flip } from "lucide-react"
import type { Deck, Card as FlashcardType } from "@/lib/db/schemas"

interface FlashcardDeckProps {
  deck: Deck
  cards: FlashcardType[]
}

export function FlashcardDeck({ deck, cards }: FlashcardDeckProps) {
  const {
    setCurrentDeck,
    setCards,
    cards: storeCards,
    currentCardIndex,
    nextCard,
    previousCard,
    isFlipped,
    flipCard,
  } = useFlashcardStore()

  useEffect(() => {
    // Transform deck data to match store expectations
    const transformedDeck = {
      id: deck.id,
      title: deck.title,
      description: deck.description,
      createdBy: deck.createdBy,
      isPublic: deck.isPublic,
      createdAt: deck.createdAt,
      updatedAt: deck.updatedAt,
    }
    
    // Transform cards data to match store expectations
    const transformedCards = cards.map(card => ({
      id: card.id,
      deckId: card.deckId,
      frontContent: card.frontContent,
      backContent: card.backContent,
      createdAt: card.createdAt,
      updatedAt: card.updatedAt,
    }))
    
    setCurrentDeck(transformedDeck)
    setCards(transformedCards)
  }, [deck, cards, setCurrentDeck, setCards])

  if (cards.length === 0) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="border-amber-800/30 bg-amber-950/30">
          <CardContent className="text-center py-12">
            <CardDescription className="text-amber-200/70 mb-4">This deck has no cards yet.</CardDescription>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  const currentCard = storeCards[currentCardIndex]
  const progress = ((currentCardIndex + 1) / cards.length) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="border-amber-800/30 bg-amber-950/20">
        <CardHeader className="border-b border-amber-800/20 bg-amber-950/30">
          <div className="flex justify-between items-center">
            <CardTitle className="text-amber-400 font-serif">{deck.title}</CardTitle>
            <CardDescription className="text-amber-200/70">
              Card {currentCardIndex + 1} of {cards.length}
            </CardDescription>
          </div>
          <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }}>
            <Progress value={progress} className="h-2 bg-amber-950/50" indicatorClassName="bg-amber-600" />
          </motion.div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="h-80 mb-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCardIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                {currentCard && (
                  <Flashcard
                    frontContent={currentCard.frontContent}
                    backContent={currentCard.backContent}
                    isFlipped={isFlipped}
                    onFlip={flipCard}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </CardContent>

        <CardFooter className="border-t border-amber-800/20 bg-amber-950/30 flex justify-between">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={previousCard}
              variant="outline"
              className="border-amber-600 text-amber-100 hover:bg-amber-800 hover:text-amber-100"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={flipCard}
              variant="secondary"
              className="bg-amber-800/70 text-amber-100 hover:bg-amber-700"
            >
              <Flip className="mr-2 h-4 w-4" /> {isFlipped ? "Show Question" : "Show Answer"}
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={nextCard}
              variant="outline"
              className="border-amber-600 text-amber-100 hover:bg-amber-800 hover:text-amber-100"
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
