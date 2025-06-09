import { type NextRequest, NextResponse } from "next/server"
import { handleGoogleCallback } from "@/app/actions/google-auth"

export async function GET(request: NextRequest) {
  try {
    // Get code and state from query parameters
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get("code")
    const state = searchParams.get("state")

    if (!code || !state) {
      return NextResponse.redirect(new URL("/login?error=missing_params", request.url))
    }

    // Exchange code for tokens and get user info
    const user = await handleGoogleCallback(code, state)

    // In a real implementation, you would set a session cookie here

    // Redirect to account page
    return NextResponse.redirect(new URL("/account", request.url))
  } catch (error) {
    console.error("Google callback error:", error)
    return NextResponse.redirect(new URL("/login?error=auth_failed", request.url))
  }
}
