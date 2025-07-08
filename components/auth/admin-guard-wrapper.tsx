"use client"

import type React from "react"

import { AdminGuard } from "@/components/auth/admin-guard"

export function AdminGuardWrapper({ children }: { children: React.ReactNode }) {
  return <AdminGuard>{children}</AdminGuard>
}
