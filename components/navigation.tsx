"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, Search, X, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { UserNav } from "@/components/user-nav"
import { CartButton } from "@/components/cart-button"
import { WishlistIcon } from "@/components/wishlist-icon"
import { cn } from "@/lib/utils"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled ? "bg-white shadow-sm" : "bg-white/80 backdrop-blur-md",
      )}
    >
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <div className="mb-6 flex items-center gap-3 border-b border-gray-200 pb-4">
              <Package className="h-8 w-8 text-primary-500" />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900">Grooveo</span>
              </div>
            </div>
            <nav className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-lg font-medium transition-colors hover:text-green-600"
                onClick={() => document.body.classList.remove("overflow-hidden")}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-lg font-medium transition-colors hover:text-green-600"
                onClick={() => document.body.classList.remove("overflow-hidden")}
              >
                Products
              </Link>
              <Link
                href="/sustainability"
                className="text-lg font-medium transition-colors hover:text-green-600"
                onClick={() => document.body.classList.remove("overflow-hidden")}
              >
                Sustainability
              </Link>
              <Link
                href="/impact"
                className="text-lg font-medium transition-colors hover:text-green-600"
                onClick={() => document.body.classList.remove("overflow-hidden")}
              >
                Impact
              </Link>
              <Link
                href="/about"
                className="text-lg font-medium transition-colors hover:text-green-600"
                onClick={() => document.body.classList.remove("overflow-hidden")}
              >
                About
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Package className="h-8 w-8 text-primary-500" />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-900">Grooveo</span>
          </div>
        </Link>

        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-center md:space-x-8">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-green-600">
            Home
          </Link>
          <Link href="/products" className="text-sm font-medium transition-colors hover:text-green-600">
            Products
          </Link>
          <Link href="/sustainability" className="text-sm font-medium transition-colors hover:text-green-600">
            Sustainability
          </Link>
          <Link href="/impact" className="text-sm font-medium transition-colors hover:text-green-600">
            Impact
          </Link>
          <Link href="/about" className="text-sm font-medium transition-colors hover:text-green-600">
            About
          </Link>
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2 md:flex-none md:justify-end">
          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
          >
            {isMobileSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            <span className="sr-only">Search</span>
          </Button>

          {/* Desktop Search */}
          <div className="hidden md:flex md:w-60 lg:w-80">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full bg-gray-100 pl-8 focus-visible:ring-green-600"
              />
            </div>
          </div>

          {/* Wishlist Icon */}
          <WishlistIcon className="hidden md:flex" />

          {/* Cart Button */}
          <CartButton />

          {/* User Navigation */}
          <UserNav />
        </div>
      </div>

      {/* Mobile Search Bar - Expandable */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 md:hidden",
          isMobileSearchOpen ? "max-h-16 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="container px-4 py-2 sm:px-6">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full bg-gray-100 pl-8 focus-visible:ring-green-600"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
