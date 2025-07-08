"use client"

import { motion } from "framer-motion"

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="border-t border-amber-800/30 py-6 mt-auto"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center">
          <div className="art-deco-divider w-full max-w-md"></div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-center text-amber-200/60 text-sm mt-4"
          >
            &copy; {new Date().getFullYear()} Speakeasy Flashcards. All rights reserved.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="text-center text-amber-200/40 text-xs mt-2"
          >
            The password is "swordfish"
          </motion.p>
        </div>
      </div>
    </motion.footer>
  )
}
