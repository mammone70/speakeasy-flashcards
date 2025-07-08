"use client"

import { useState } from "react"
import { SortableCardItem } from "@/components/admin/sortable-card-item"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable"
import { AnimatePresence } from "framer-motion"
import { deleteCard } from "@/lib/actions"
import type { Card } from "@/lib/db/schemas"

interface CardListProps {
  cards: Card[]
  isLoading: boolean
  onSelect: (card: Card) => void
  onDelete: () => void
}

export function CardList({ cards, isLoading, onSelect, onDelete }: CardListProps) {
  const [items, setItems] = useState<Card[]>(cards)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Update items when cards prop changes
  if (JSON.stringify(cards) !== JSON.stringify(items)) {
    setItems(cards)
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id)
      await deleteCard(id)
      onDelete()
    } catch (error) {
      console.error("Error deleting card:", error)
    } finally {
      setDeletingId(null)
    }
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        return arrayMove(items, oldIndex, newIndex)
      })

      // Here you could also update the order in the database
      // For example, by adding an "order" field to your cards table
    }
  }

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-amber-200/70">Loading cards...</p>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-amber-200/70">No cards found. Create your first card above.</p>
      </div>
    )
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((item) => item.id)}>
        <AnimatePresence>
          {items.map((card) => (
            <SortableCardItem
              key={card.id}
              card={card}
              onSelect={onSelect}
              onDelete={handleDelete}
              isDeleting={deletingId === card.id}
            />
          ))}
        </AnimatePresence>
      </SortableContext>
    </DndContext>
  )
}
