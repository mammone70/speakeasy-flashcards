"use server"

import { revalidatePath } from "next/cache"
import { UsersDAO } from "@/lib/dao"
import { createClient } from "@/lib/supabase/server"
import { insertUserSchema } from "@/lib/db/schemas/users"

export async function getCurrentUser() {
    const supabase = await createClient()

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
        return null
    }

    try {
        return await UsersDAO.findById(session.user.id)
    } catch (error) {
        console.error("Error fetching current user:", error)
        return null
    }
}

export async function createUserIfNotExists(userId: string, email: string, displayName?: string, avatarUrl?: string) {
    try {
        // Check if user already exists
        const existingUser = await UsersDAO.findById(userId)
        if (existingUser) {
            return existingUser
        }

        // Create new user
        const userData = {
            id: userId,
            email,
            displayName,
            avatarUrl,
            role: "user", // Default role
        }

        const validatedData = insertUserSchema.parse(userData)
        const user = await UsersDAO.create(validatedData)

        revalidatePath("/")
        return user
    } catch (error) {
        console.error("Error creating user:", error)
        throw new Error("Failed to create user")
    }
}

export async function updateUserProfile(userId: string, updates: { displayName?: string; avatarUrl?: string }) {
    try {
        const user = await UsersDAO.update(userId, updates)

        if (!user) {
            throw new Error("User not found")
        }

        revalidatePath("/")
        return user
    } catch (error) {
        console.error("Error updating user profile:", error)
        throw new Error("Failed to update user profile")
    }
} 