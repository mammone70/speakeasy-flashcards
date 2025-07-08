"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SignOutButton } from "@/components/auth/auth-buttons"
import { useAuthStore } from "@/lib/store/use-auth-store"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Shield } from "lucide-react"

export function Header() {
  const { user, isAdmin } = useAuthStore()
  const pathname = usePathname()

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="border-b border-amber-800/30 bg-gradient-to-b from-amber-950 to-transparent"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <Link href="/" className="flex items-center">
              <span className="text-3xl font-serif font-bold text-amber-500">Speakeasy</span>
              <span className="ml-2 text-xl font-serif text-amber-300">Flashcards</span>
            </Link>
          </motion.div>

          <motion.nav
            variants={navVariants}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center space-x-6"
          >
            <motion.div variants={itemVariants}>
              <Link
                href="/"
                className={`text-sm font-medium transition-colors hover:text-amber-400 ${
                  pathname === "/" ? "text-amber-500" : "text-amber-200/80"
                }`}
              >
                Home
              </Link>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Link
                href="/decks"
                className={`text-sm font-medium transition-colors hover:text-amber-400 ${
                  pathname === "/decks" || pathname.startsWith("/decks/") ? "text-amber-500" : "text-amber-200/80"
                }`}
              >
                Decks
              </Link>
            </motion.div>
            {isAdmin && (
              <motion.div variants={itemVariants}>
                <Link
                  href="/admin"
                  className={`text-sm font-medium transition-colors hover:text-amber-400 ${
                    pathname === "/admin" || pathname.startsWith("/admin/") ? "text-amber-500" : "text-amber-200/80"
                  }`}
                >
                  Admin
                </Link>
              </motion.div>
            )}
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-4"
          >
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-amber-200/80">
                  {isAdmin && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="mr-2 text-amber-500"
                      title="Admin User"
                    >
                      <Shield size={16} />
                    </motion.div>
                  )}
                  {user.displayName || user.email}
                </div>
                <SignOutButton />
              </div>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild className="bg-amber-700 hover:bg-amber-800 text-amber-100 border border-amber-600">
                  <Link href="/login">Sign In</Link>
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.header>
  )
}
