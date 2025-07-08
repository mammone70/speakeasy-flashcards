"use server"

import { revalidatePath } from "next/cache"
import { UserProgressDAO } from "@/lib/dao"
import { insertUserProgressSchema } from "@/lib/db/schemas/user-progress"
import { createClient } from "@/lib/supabase/server"

export async function getUserProgress(userId: string) {
    try {
        return await UserProgressDAO.findByUserId(userId)
    } catch (error) {
        console.error("Error fetching user progress:", error)
        throw new Error("Failed to fetch user progress")
    }
}

export async function getCardProgress(userId: string, cardId: string) {
    try {
        return await UserProgressDAO.findByUserAndCard(userId, cardId)
    } catch (error) {
        console.error("Error fetching card progress:", error)
        throw new Error("Failed to fetch card progress")
    }
}

export async function updateCardProgress(cardId: string, familiarityLevel: number) {
    const supabase = await createClient()

    // Check if user is authenticated
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
        throw new Error("Unauthorized")
    }

    try {
        // Calculate next review date based on familiarity level (spaced repetition)
        const daysToAdd = Math.pow(2, familiarityLevel)
        const nextReview = new Date()
        nextReview.setDate(nextReview.getDate() + daysToAdd)

        const progressData = {
            familiarityLevel,
            lastReviewed: new Date(),
            nextReview,
        }

        const progress = await UserProgressDAO.upsertByUserAndCard(
            session.user.id,
            cardId,
            progressData
        )

        revalidatePath(`/decks/${cardId}`)
        return progress
    } catch (error) {
        console.error("Error updating card progress:", error)
        throw new Error("Failed to update card progress")
    }
}

export async function deleteUserProgress(userId: string) {
    const supabase = await createClient()

    // Check if user is authenticated and is admin or the same user
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
        throw new Error("Unauthorized")
    }

    // Get user data to check role
    const { data: userData } = await supabase.from("users").select("role").eq("id", session.user.id).single()

    if (userData?.role !== "admin" && session.user.id !== userId) {
        throw new Error("Unauthorized")
    }

    try {
        const deletedCount = await UserProgressDAO.deleteByUserId(userId)
        return { success: true, deletedCount }
    } catch (error) {
        console.error("Error deleting user progress:", error)
        throw new Error("Failed to delete user progress")
    }
} 