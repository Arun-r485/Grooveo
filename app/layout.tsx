import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/context/cart-context"
import { AuthProvider } from "@/context/auth-context"
import { WishlistProvider } from "@/context/wishlist-context"
import { LoyaltyProvider } from "@/context/loyalty-context"
import { NotificationProvider } from "@/context/notification-context"
import { Cart } from "@/components/cart"
import { Toaster } from "@/components/ui/toaster"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Grooveo - Eco-Friendly Packaging Solutions",
  description: "Sustainable packaging solutions for a greener future",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`flex min-h-screen flex-col ${inter.className}`}>
        <AuthProvider>
          <NotificationProvider>
            <CartProvider>
              <WishlistProvider>
                <LoyaltyProvider>
                  <Navigation />
                  <main className="flex-1">{children}</main>
                  <Footer />
                  <Cart />
                  <Toaster />
                </LoyaltyProvider>
              </WishlistProvider>
            </CartProvider>
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
