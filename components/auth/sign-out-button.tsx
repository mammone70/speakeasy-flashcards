"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useAuthStore } from "@/lib/store/use-auth-store"
import { motion } from "framer-motion"

export function SignOutButton() {
    const [isLoading, setIsLoading] = useState(false)
    const supabase = createClient()
    const { user } = useAuthStore()

    const handleSignOut = async () => {
      try {
        setIsLoading(true)
        await supabase.auth.signOut()
      } catch (error) {
        console.error("Error signing out:", error)
      } finally {
        setIsLoading(false)
      }
    }
  
    if (!user) return null
  
    return (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={handleSignOut}
          disabled={isLoading}
          variant="outline"
          className="border-amber-600 text-amber-100 hover:bg-amber-800 hover:text-amber-100"
        >
          Sign Out
        </Button>
      </motion.div>
    )
}