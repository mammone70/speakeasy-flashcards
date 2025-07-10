"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { SignInButton } from "@/components/auth/sign-in-button"
import { useAuthStore } from "@/lib/store/use-auth-store"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function LoginPage() {
  const { user, isLoading } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    if (user && !isLoading) {
      router.push("/decks")
    }
  }, [user, isLoading, router])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow flex items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          className="w-full max-w-md px-8"
        >
          <Card className="border-amber-700/50 bg-gradient-to-b from-amber-950/50 to-amber-900/30">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-serif text-amber-500">Enter the Speakeasy</CardTitle>
            </CardHeader>

            <div className="px-6">
              <div className="art-deco-divider w-full"></div>
            </div>

            <CardContent className="pt-6">
              <CardDescription className="text-center text-amber-200/80 mb-6">
                Sign in with Slack to access your flashcards and track your progress.
              </CardDescription>

              <SignInButton />

              {/* <div className="mt-6 text-center">
                <p className="text-amber-200/60 text-xs">
                  Note: Users with email 'mammone@gmail.com' will be granted admin privileges.
                </p>
              </div> */}
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
