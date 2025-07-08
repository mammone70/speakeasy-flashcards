import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { createUserIfNotExists } from "@/lib/actions"

import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
            } catch {
              // The `setAll` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      }
    )

    const { data: { session } } = await supabase.auth.exchangeCodeForSession(code)

    // Create user in our database if they don't exist
    if (session?.user) {
      try {
        await createUserIfNotExists(
          session.user.id,
          session.user.email!,
          session.user.user_metadata?.full_name,
          session.user.user_metadata?.avatar_url
        )
      } catch (error) {
        console.error("Error creating user:", error)
      }
    }
  }

  // URL to redirect to after sign in process completes
  console.log(requestUrl.origin)
  return NextResponse.redirect(requestUrl.origin)
}
