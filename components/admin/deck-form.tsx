"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { deckSchema } from "@/lib/validations/schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { createDeck, updateDeck } from "@/lib/actions"
import type { Deck } from "@/lib/db/schemas"

interface DeckFormProps {
  deck: Deck | null
  onSave: () => void
  onCancel: () => void
}

export function DeckForm({ deck, onSave, onCancel }: DeckFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(deckSchema),
    defaultValues: {
      title: deck?.title || "",
      description: deck?.description || "",
      isPublic: deck?.isPublic || false,
    },
  })

  const isPublic = watch("isPublic")

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true)

      if (deck) {
        // Update existing deck
        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("description", data.description)
        formData.append("isPublic", data.isPublic.toString())
        
        await updateDeck(deck.id, formData)
      } else {
        // Create new deck
        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("description", data.description)
        formData.append("isPublic", data.isPublic.toString())
        
        await createDeck(formData)
      }

      reset()
      onSave()
    } catch (error) {
      console.error("Error saving deck:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <label htmlFor="title" className="text-sm font-medium text-amber-200">
            Title
          </label>
          <Input
            id="title"
            placeholder="Deck title"
            {...register("title")}
            className="bg-amber-950/50 border-amber-800/50 focus:border-amber-600"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message as string}</p>}
        </div>

        <div className="grid gap-2">
          <label htmlFor="description" className="text-sm font-medium text-amber-200">
            Description
          </label>
          <Textarea
            id="description"
            placeholder="Deck description"
            {...register("description")}
            className="bg-amber-950/50 border-amber-800/50 focus:border-amber-600"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="isPublic"
            checked={isPublic}
            onCheckedChange={(checked) => setValue("isPublic", checked as boolean)}
          />
          <label htmlFor="isPublic" className="text-sm font-medium text-amber-200 cursor-pointer">
            Make this deck public
          </label>
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
            {isSubmitting ? "Saving..." : deck ? "Update Deck" : "Create Deck"}
          </Button>
        </div>
      </div>
    </form>
  )
}
