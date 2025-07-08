"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface NotFoundProps {
  title?: string
  message?: string
  backLink?: string
  backText?: string
}

export function NotFound({
  title = "Deck Not Found",
  message = "Sorry, we couldn't find the deck you're looking for.",
  backLink = "/decks",
  backText = "Browse All Decks",
}: NotFoundProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-16"
    >
      <h2 className="text-3xl font-serif font-bold text-amber-500 mb-4">{title}</h2>
      <p className="text-amber-200/70 mb-8 max-w-md mx-auto">{message}</p>

      <div className="art-deco-divider w-full max-w-xs mx-auto mb-8"></div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button asChild className="bg-amber-700 hover:bg-amber-800 text-amber-100 border border-amber-600">
          <Link href={backLink}>{backText}</Link>
        </Button>
      </motion.div>
    </motion.div>
  )
}
