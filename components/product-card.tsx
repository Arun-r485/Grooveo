"use client"

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { ShoppingCart, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import { useRouter } from "next/navigation"
import { WishlistButton } from "@/components/wishlist-button"
import { StockIndicator } from "@/components/stock-indicator"
import type { ProductType } from "@/lib/products"

interface ProductCardProps {
  product: ProductType
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isBuying, setIsBuying] = useState(false)
  const { addItem } = useCart()
  const router = useRouter()

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsAddingToCart(true)

    try {
      addItem(product)
      // Brief delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 300))
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleQuickBuy = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsBuying(true)

    try {
      addItem(product)
      // Brief delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 300))
      router.push("/checkout")
    } finally {
      setIsBuying(false)
    }
  }

  const formatPrice = (price: number) => {
    return `₹${(price / 100).toFixed(2)}`
  }

  const isOutOfStock = product.stockCount <= 0

  return (
    <div className="group relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <Link href={`/products/${product.id}`}>
        <div className="overflow-hidden rounded-lg border bg-white relative">
          <Image
            src={product.image || "/placeholder.svg?height=300&width=300"}
            alt={`${product.name} - ${product.material} eco-friendly packaging solution for ${product.category.toLowerCase()}`}
            width={300}
            height={300}
            className="aspect-square object-cover transition-transform group-hover:scale-105"
          />

          {/* Wishlist Button */}
          <div className="absolute top-3 right-3">
            <WishlistButton product={product} size="sm" />
          </div>

          {/* Out of Stock Overlay */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-white/75 backdrop-blur-[1px] flex items-center justify-center">
              <div className="bg-red-100 text-red-800 px-3 py-1 rounded-md font-medium text-sm transform -rotate-6">
                Out of Stock
              </div>
            </div>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <div className="mt-3 space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Link href={`/products/${product.id}`}>
              <h3 className="font-medium group-hover:underline line-clamp-2">{product.name}</h3>
            </Link>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">{product.category}</p>
              {/* Subtle Stock Indicator */}
              <StockIndicator stockCount={product.stockCount} variant="subtle" />
            </div>
          </div>
          <div className="text-right ml-2">
            <p className="font-semibold text-green-600">{formatPrice(product.price)}</p>
            {product.compareAtPrice && (
              <p className="text-sm text-gray-500 line-through">{formatPrice(product.compareAtPrice)}</p>
            )}
          </div>
        </div>

        {/* Action Buttons - Always visible under product name */}
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 h-8 text-xs"
            onClick={handleAddToCart}
            disabled={isAddingToCart || isOutOfStock}
          >
            <ShoppingCart className="h-3 w-3 mr-1" />
            {isAddingToCart ? "Adding..." : isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </Button>
          <Button
            size="sm"
            className="flex-1 h-8 text-xs bg-green-600 hover:bg-green-700"
            onClick={handleQuickBuy}
            disabled={isBuying || isOutOfStock}
          >
            <Zap className="h-3 w-3 mr-1" />
            {isBuying ? "Buying..." : "Quick Buy"}
          </Button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {product.tags?.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {product.tags && product.tags.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{product.tags.length - 2}
            </Badge>
          )}
        </div>
      </div>
    </div>
  )
}
