"use client"

import type React from "react"

import { useState } from "react"
import { Heart } from "lucide-react"
import { useWishlist } from "@/context/wishlist-context"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import type { ProductType } from "@/lib/products"

interface WishlistButtonProps {
  product: ProductType
  variant?: "icon" | "button"
  size?: "sm" | "md" | "lg"
  showText?: boolean
  className?: string
}

export function WishlistButton({
  product,
  variant = "icon",
  size = "md",
  showText = false,
  className,
}: WishlistButtonProps) {
  const { addItem, removeItem, isInWishlist } = useWishlist()
  const { toast } = useToast()
  const [isAnimating, setIsAnimating] = useState(false)

  const isSaved = isInWishlist(product.id)

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 500)

    if (isSaved) {
      removeItem(product.id)
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      })
    } else {
      addItem(product)
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      })
    }
  }

  const sizeClasses = {
    sm: "h-8 w-8 p-1.5",
    md: "h-10 w-10 p-2",
    lg: "h-12 w-12 p-2.5",
  }

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handleToggleWishlist}
        className={cn(
          "rounded-full bg-white/90 shadow-sm transition-all duration-200",
          "hover:bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2",
          isSaved ? "text-red-500" : "text-gray-500 hover:text-gray-700",
          isAnimating && "scale-125",
          sizeClasses[size],
          className,
        )}
        aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart className={cn(iconSizes[size], "transition-colors duration-200", isSaved && "fill-current")} />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleToggleWishlist}
      className={cn(
        "flex items-center justify-center gap-2 rounded-md border px-4 py-2 transition-all duration-200",
        isSaved
          ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
          : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50",
        isAnimating && "scale-105",
        className,
      )}
    >
      <Heart className={cn("h-4 w-4 transition-colors duration-200", isSaved && "fill-current")} />
      {showText && (isSaved ? "Saved" : "Save for later")}
    </button>
  )
}
