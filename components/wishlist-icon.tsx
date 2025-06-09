"use client"

import { Heart } from "lucide-react"
import { useWishlist } from "@/context/wishlist-context"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"

interface WishlistIconProps {
  className?: string
}

export function WishlistIcon({ className }: WishlistIconProps) {
  const { count } = useWishlist()
  const [isAnimating, setIsAnimating] = useState(false)
  const [prevCount, setPrevCount] = useState(count)

  // Animate when count changes
  useEffect(() => {
    if (count !== prevCount && count > prevCount) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 1000)
      return () => clearTimeout(timer)
    }
    setPrevCount(count)
  }, [count, prevCount])

  return (
    <Link
      href="/account/wishlist"
      className={cn(
        "relative flex items-center justify-center rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900",
        className,
      )}
    >
      <Heart className={cn("h-5 w-5 transition-transform duration-300", isAnimating && "animate-heartbeat")} />
      {count > 0 && (
        <Badge
          className={cn(
            "absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-green-600 p-0 text-[10px] text-white",
            isAnimating && "animate-pulse",
          )}
        >
          {count}
        </Badge>
      )}
      <span className="sr-only">Wishlist</span>
    </Link>
  )
}
