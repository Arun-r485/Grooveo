"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"

export function CartButton() {
  const { itemCount, setIsOpen } = useCart()

  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full relative"
      onClick={() => setIsOpen(true)}
      aria-label="Open cart"
    >
      <ShoppingCart className="h-4 w-4" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-[10px] font-medium text-white">
          {itemCount}
        </span>
      )}
    </Button>
  )
}
