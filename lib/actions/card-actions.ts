"use server"

import { revalidatePath } from "next/cache"
import { CardsDAO } from "@/lib/dao"
import { insertCardSchema } from "@/lib/db/schemas/cards"
import { createClient } from "@/lib/supabase/server"

export async function getCards(deckId?: string) {
    try {
        if (deckId) {
            return await CardsDAO.findByDeckId(deckId)
        }
        return await CardsDAO.findAll()
    } catch (error) {
        console.error("Error fetching cards:", error)
        throw new Error("Failed to fetch cards")
    }
}

export async function getCardById(id: string) {
    try {
        return await CardsDAO.findById(id)
    } catch (error) {
        console.error("Error fetching card:", error)
        throw new Error("Failed to fetch card")
    }
}

export async function createCard(formData: FormData) {
    const supabase = await createClient()

    // Check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
        throw new Error("Unauthorized")
    }

    try {
        const rawData = {
            deckId: formData.get("deckId") as string,
            frontContent: formData.get("frontContent") as string,
            backContent: formData.get("backContent") as string,
        }

        const validatedData = insertCardSchema.parse(rawData)
        const card = await CardsDAO.create(validatedData)

        revalidatePath("/admin")
        revalidatePath(`/decks/${validatedData.deckId}`)
        return card
    } catch (error) {
        console.error("Error creating card:", error)
        throw new Error("Failed to create card")
    }
}

export async function updateCard(id: string, formData: FormData) {
    const supabase = await createClient()

    // Check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
        throw new Error("Unauthorized")
    }

    try {
        const rawData = {
            deckId: formData.get("deckId") as string,
            frontContent: formData.get("frontContent") as string,
            backContent: formData.get("backContent") as string,
        }

        const validatedData = insertCardSchema.partial().parse(rawData)
        const card = await CardsDAO.update(id, validatedData)

        if (!card) {
            throw new Error("Card not found")
        }

        revalidatePath("/admin")
        revalidatePath(`/decks/${card.deckId}`)
        return card
    } catch (error) {
        console.error("Error updating card:", error)
        throw new Error("Failed to update card")
    }
}

export async function deleteCard(id: string) {
    const supabase = await createClient()

    // Check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
        throw new Error("Unauthorized")
    }

    try {
        // Get the card first to know which deck it belongs to for revalidation
        const card = await CardsDAO.findById(id)
        if (!card) {
            throw new Error("Card not found")
        }

        const success = await CardsDAO.delete(id)

        if (!success) {
            throw new Error("Failed to delete card")
        }

        revalidatePath("/admin")
        revalidatePath(`/decks/${card.deckId}`)
        return { success: true }
    } catch (error) {
        console.error("Error deleting card:", error)
        throw new Error("Failed to delete card")
    }
} 