"use client"

import type React from "react"

import { motion } from "framer-motion"
import type { HTMLMotionProps } from "framer-motion"

interface MotionWrapperProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode
}

export function MotionWrapper({ children, ...props }: MotionWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
