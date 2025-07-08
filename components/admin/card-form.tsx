"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { cardSchema } from "@/lib/validations/schema"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createCard, updateCard } from "@/lib/actions"
import type { Card, Deck } from "@/lib/db/schemas"

interface CardFormProps {
  card: Card | null
  decks: Deck[]
  selectedDeckId?: string
  onSave: () => void
  onCancel: () => void
}

export function CardForm({ card, decks, selectedDeckId, onSave, onCancel }: CardFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      deckId: card?.deckId || selectedDeckId || "",
      frontContent: card?.frontContent || "",
      backContent: card?.backContent || "",
    },
  })

  const deckId = watch("deckId")

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true)

      if (card) {
        // Update existing card
        const formData = new FormData()
        formData.append("deckId", data.deckId)
        formData.append("frontContent", data.frontContent)
        formData.append("backContent", data.backContent)
        
        await updateCard(card.id, formData)
      } else {
        // Create new card
        const formData = new FormData()
        formData.append("deckId", data.deckId)
        formData.append("frontContent", data.frontContent)
        formData.append("backContent", data.backContent)
        
        await createCard(formData)
      }

      reset()
      onSave()
    } catch (error) {
      console.error("Error saving card:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <label htmlFor="deckId" className="text-sm font-medium text-amber-200">
            Deck
          </label>
          <Select value={deckId} onValueChange={(value) => setValue("deckId", value)} disabled={!!selectedDeckId}>
            <SelectTrigger className="bg-amber-950/50 border-amber-800/50 focus:border-amber-600">
              <SelectValue placeholder="Select a deck" />
            </SelectTrigger>
            <SelectContent>
              {decks.map((deck) => (
                <SelectItem key={deck.id} value={deck.id}>
                  {deck.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.deckId && <p className="text-red-500 text-sm">{errors.deckId.message as string}</p>}
        </div>

        <div className="grid gap-2">
          <label htmlFor="frontContent" className="text-sm font-medium text-amber-200">
            Front Content (Question)
          </label>
          <Textarea
            id="frontContent"
            placeholder="Question or front side content"
            {...register("frontContent")}
            className="bg-amber-950/50 border-amber-800/50 focus:border-amber-600"
            rows={3}
          />
          {errors.frontContent && <p className="text-red-500 text-sm">{errors.frontContent.message as string}</p>}
        </div>

        <div className="grid gap-2">
          <label htmlFor="backContent" className="text-sm font-medium text-amber-200">
            Back Content (Answer)
          </label>
          <Textarea
            id="backContent"
            placeholder="Answer or back side content"
            {...register("backContent")}
            className="bg-amber-950/50 border-amber-800/50 focus:border-amber-600"
            rows={3}
          />
          {errors.backContent && <p className="text-red-500 text-sm">{errors.backContent.message as string}</p>}
        </div>

        <div className="flex justify-end space-x-4 mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className="border-amber-600 text-amber-100 hover:bg-amber-800 hover:text-amber-100"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-amber-700 hover:bg-amber-800 text-amber-100 border border-amber-600"
          >
            {isSubmitting ? "Saving..." : card ? "Update Card" : "Create Card"}
          </Button>
        </div>
      </div>
    </form>
  )
}
