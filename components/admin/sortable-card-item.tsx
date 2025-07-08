"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GripVertical, Pencil, Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import type { Database } from "@/lib/database.types"

type CardType = Database["public"]["Tables"]["cards"]["Row"]

interface SortableCardItemProps {
  card: CardType
  onSelect: (card: CardType) => void
  onDelete: (id: string) => void
  isDeleting: boolean
}

export function SortableCardItem({ card, onSelect, onDelete, isDeleting }: SortableCardItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
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
        <div className="flex items-start gap-2">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing p-1 text-amber-500 self-center"
          >
            <GripVertical size={20} />
          </div>

          <div className="grid md:grid-cols-2 gap-4 flex-1">
            <div className="p-3 border border-amber-800/20 rounded bg-amber-950/20">
              <h4 className="text-sm font-medium text-amber-300 mb-2">Question:</h4>
              <p className="text-amber-100">{card.front_content}</p>
            </div>
            <div className="p-3 border border-amber-800/20 rounded bg-amber-950/20">
              <h4 className="text-sm font-medium text-amber-300 mb-2">Answer:</h4>
              <p className="text-amber-100">{card.back_content}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onSelect(card)}
              className="border-amber-600 text-amber-100 hover:bg-amber-800 hover:text-amber-100"
            >
              <Pencil size={16} />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => onDelete(card.id)}
              disabled={isDeleting}
              className="bg-red-900 hover:bg-red-800 text-red-100 border border-red-700"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
