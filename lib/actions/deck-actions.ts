"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { DecksDAO } from "@/lib/dao"
import { insertDeckSchema } from "@/lib/db/schemas/decks"
import { createClient } from "@/lib/supabase/server"

export async function getDecks() {
    try {
        return await DecksDAO.findAll()
    } catch (error) {
        console.error("Error fetching decks:", error)
        throw new Error("Failed to fetch decks")
    }
}

export async function getPublicDecks() {
    try {
        return await DecksDAO.findPublic()
    } catch (error) {
        console.error("Error fetching public decks:", error)
        throw new Error("Failed to fetch public decks")
    }
}

export async function getDeckById(id: string) {
    try {
        return await DecksDAO.findById(id)
    } catch (error) {
        console.error("Error fetching deck:", error)
        throw new Error("Failed to fetch deck")
    }
}

export async function createDeck(formData: FormData) {
    const supabase = await createClient()

    // Check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
        throw new Error("Unauthorized")
    }

    try {
        const rawData = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            isPublic: formData.get("isPublic") === "true",
            createdBy: session.user.id,
        }

        const validatedData = insertDeckSchema.parse(rawData)
        const deck = await DecksDAO.create(validatedData)

        revalidatePath("/admin")
        revalidatePath("/decks")
        return deck
    } catch (error) {
        console.error("Error creating deck:", error)
        throw new Error("Failed to create deck")
    }
}

export async function updateDeck(id: string, formData: FormData) {
    const supabase = await createClient()

    // Check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
        throw new Error("Unauthorized")
    }

    try {
        const rawData = {
            title: formData.get("title") as string,
            description: formData.get("description") as string,
            isPublic: formData.get("isPublic") === "true",
        }

        const validatedData = insertDeckSchema.partial().parse(rawData)
        const deck = await DecksDAO.update(id, validatedData)

        if (!deck) {
            throw new Error("Deck not found")
        }

        revalidatePath("/admin")
        revalidatePath("/decks")
        revalidatePath(`/decks/${id}`)
        return deck
    } catch (error) {
        console.error("Error updating deck:", error)
        throw new Error("Failed to update deck")
    }
}

export async function deleteDeck(id: string) {
    const supabase = await createClient()

    // Check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
        throw new Error("Unauthorized")
    }

    try {
        const success = await DecksDAO.delete(id)

        if (!success) {
            throw new Error("Deck not found")
        }

        revalidatePath("/admin")
        revalidatePath("/decks")
        return { success: true }
    } catch (error) {
        console.error("Error deleting deck:", error)
        throw new Error("Failed to delete deck")
    }
} 