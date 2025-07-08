"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GripVertical, Pencil, Trash2, LayoutGrid } from "lucide-react"
import { motion } from "framer-motion"
import type { Database } from "@/lib/database.types"

type Deck = Database["public"]["Tables"]["decks"]["Row"]

interface SortableDeckItemProps {
  deck: Deck
  onSelect: (deck: Deck) => void
  onDelete: (id: string) => void
  onManageCards: (deck: Deck) => void
  isDeleting: boolean
}

export function SortableDeckItem({ deck, onSelect, onDelete, onManageCards, isDeleting }: SortableDeckItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: deck.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  }

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="mb-4"
    >
      <Card
        className={`p-4 border ${isDragging ? "border-amber-500" : "border-amber-800/30"} rounded-lg bg-amber-950/30`}
      >
        <div className="flex items-start gap-3">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1 text-amber-500 self-center"
          >
            <GripVertical size={20} />
          </div>

          <div className="flex-1">
            <h3 className="text-lg font-serif font-bold text-amber-400">{deck.title}</h3>
            <p className="text-amber-200/70 text-sm mt-1">{deck.description}</p>
            <div className="mt-2">
              <span
                className={`inline-block px-2 py-1 text-xs rounded-full ${
                  deck.is_public
                    ? "bg-green-900/50 text-green-300 border border-green-700/50"
                    : "bg-amber-900/50 text-amber-300 border border-amber-700/50"
                }`}
              >
                {deck.is_public ? "Public" : "Private"}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onManageCards(deck)}
              className="border-amber-600 text-amber-100 hover:bg-amber-800 hover:text-amber-100"
            >
              <LayoutGrid size={16} className="mr-1" /> Manage Cards
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSelect(deck)}
              className="border-amber-600 text-amber-100 hover:bg-amber-800 hover:text-amber-100"
            >
              <Pencil size={16} className="mr-1" /> Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(deck.id)}
              disabled={isDeleting}
              className="bg-red-900 hover:bg-red-800 text-red-100 border border-red-700"
            >
              <Trash2 size={16} className="mr-1" /> {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
