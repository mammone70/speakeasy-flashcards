"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useAuthStore } from "@/lib/store/use-auth-store"
import { motion } from "framer-motion"
import { LogIn } from "lucide-react"

export function SignInButton() {
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClient()

  const handleSignInWithSlack = async () => {
    try {
      setIsLoading(true)
      await supabase.auth.signInWithOAuth({
        provider: "slack_oidc",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          // Specify OIDC for Slack
          scopes: "openid email profile",
        },
      })
    } catch (error) {
      console.error("Error signing in with Slack:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignInWithGoogle = async () => {
    try {
      setIsLoading(true)
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
    } catch (error) {
      console.error("Error signing in with Google:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Button
          onClick={handleSignInWithSlack}
          disabled={isLoading}
          size="lg"
          className="bg-amber-700 hover:bg-amber-800 text-amber-100 border border-amber-600 w-full"
        >
          <LogIn className="mr-2 h-5 w-5" /> Sign in with Slack
        </Button>
      </motion.div>

      <div className="relative flex items-center py-2">
        <div className="flex-grow border-t border-amber-800/30"></div>
        <span className="flex-shrink mx-4 text-amber-200/60 text-sm">or</span>
        <div className="flex-grow border-t border-amber-800/30"></div>
      </div>

      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
        <Button
          onClick={handleSignInWithGoogle}
          disabled={isLoading}
          size="lg"
          variant="outline"
          className="border-amber-600 text-amber-100 hover:bg-amber-800 hover:text-amber-100 w-full"
        >
          Sign in with Google
        </Button>
      </motion.div>
    </div>
  )
}

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
