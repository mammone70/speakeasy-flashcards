import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { UsersDAO } from "@/lib/dao"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AdminGuardWrapper } from "@/components/auth/admin-guard-wrapper"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default async function AdminPage() {
  const supabase = await createClient()

  // Check if user is authenticated and is an admin
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/login")
  }

  // Get user data including role using DAO
  const userData = await UsersDAO.findById(session.user.id)

  if (!userData || userData.role !== "admin") {
    redirect("/")
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <AdminGuardWrapper>
            <AdminDashboard />
          </AdminGuardWrapper>
        </div>
      </main>

      <Footer />
    </div>
  )
}
