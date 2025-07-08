"use client"

import { useState } from "react"
import { SortableDeckItem } from "@/components/admin/sortable-deck-item"
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core"
import { SortableContext, sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable"
import { AnimatePresence } from "framer-motion"
import { deleteDeck } from "@/lib/actions"
import type { Deck } from "@/lib/db/schemas"

interface DeckListProps {
  decks: Deck[]
  isLoading: boolean
  onSelect: (deck: Deck) => void
  onDelete: () => void
  onManageCards: (deck: Deck) => void
}

export function DeckList({ decks, isLoading, onSelect, onDelete, onManageCards }: DeckListProps) {
  const [items, setItems] = useState<Deck[]>(decks)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Update items when decks prop changes
  if (JSON.stringify(decks) !== JSON.stringify(items)) {
    setItems(decks)
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
      await deleteDeck(id)
      onDelete()
    } catch (error) {
      console.error("Error deleting deck:", error)
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
      // For example, by adding an "order" field to your decks table
    }
  }

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-amber-200/70">Loading decks...</p>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-amber-200/70">No decks found. Create your first deck above.</p>
      </div>
    )
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items.map((item) => item.id)}>
        <AnimatePresence>
          {items.map((deck) => (
            <SortableDeckItem
              key={deck.id}
              deck={deck}
              onSelect={onSelect}
              onDelete={handleDelete}
              onManageCards={onManageCards}
              isDeleting={deletingId === deck.id}
            />
          ))}
        </AnimatePresence>
      </SortableContext>
    </DndContext>
  )
}
