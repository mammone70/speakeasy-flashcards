"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface FlashcardProps {
  frontContent: string
  backContent: string
  isFlipped: boolean
  onFlip: () => void
}

export function Flashcard({ frontContent, backContent, isFlipped, onFlip }: FlashcardProps) {
  return (
    <div className="perspective-1000 h-full w-full cursor-pointer" onClick={onFlip}>
      <motion.div
        className="relative h-full w-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 70 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div className="absolute h-full w-full backface-hidden" style={{ backfaceVisibility: "hidden" }}>
          <Card className="h-full flex items-center justify-center border-amber-800/30 bg-transparent">
            <CardContent className="p-6 text-center">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-xl font-serif text-amber-400">Question</CardTitle>
              </CardHeader>
              <CardDescription className="text-amber-100 text-lg">{frontContent}</CardDescription>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="absolute h-full w-full backface-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <Card className="h-full flex items-center justify-center border-amber-800/30 bg-transparent">
            <CardContent className="p-6 text-center">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-xl font-serif text-amber-400">Answer</CardTitle>
              </CardHeader>
              <CardDescription className="text-amber-100 text-lg">{backContent}</CardDescription>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
