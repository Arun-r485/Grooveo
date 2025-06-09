"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { User, Settings, ShoppingBag, Heart, LogOut, X, ShoppingCart, PackageOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/auth-context"
import { useCart } from "@/context/cart-context"
import { useWishlist } from "@/context/wishlist-context"
import { useToast } from "@/components/ui/use-toast"
import { usePullToRefresh } from "@/hooks/use-pull-to-refresh"
import { PullToRefreshIndicator } from "@/components/pull-to-refresh-indicator"
import { WishlistSkeleton } from "@/components/skeletons/wishlist-skeleton"
import { MobileHeaderSkeleton } from "@/components/skeletons/mobile-header-skeleton"
import { useSwipeNavigation } from "@/hooks/use-swipe-navigation"
import { SwipeNavigationIndicator } from "@/components/swipe-navigation-indicator"
import { SwipeNavigationDots } from "@/components/swipe-navigation-dots"
import { motion } from "framer-motion"

export default function WishlistPage() {
  const { user, isLoading, logout } = useAuth()
  const { addItem } = useCart()
  const { items: wishlistItems, removeItem } = useWishlist()
  const { toast } = useToast()
  const router = useRouter()
  const pathname = usePathname()
  const [refreshKey, setRefreshKey] = useState(0)
  const [removingItems, setRemovingItems] = useState<Record<string, boolean>>({})

  // Pull to refresh functionality
  const handleRefresh = async () => {
    try {
      // Simulate API call to refresh wishlist
      await new Promise((resolve) => setTimeout(resolve, 1200))
      setRefreshKey((prev) => prev + 1)
      toast({
        title: "Wishlist refreshed",
        description: "Your wishlist has been updated.",
      })
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: "Unable to refresh wishlist. Please try again.",
        variant: "destructive",
      })
    }
  }

  const { isRefreshing, pullDistance, isPulling, containerRef, isTriggered } = usePullToRefresh({
    onRefresh: handleRefresh,
    enabled: true,
  })

  // Swipe navigation functionality
  const {
    containerRef: swipeContainerRef,
    isSwipeActive,
    swipeDirection,
    swipeDistance,
    canSwipeLeft,
    canSwipeRight,
    nextPageInfo,
  } = useSwipeNavigation({
    currentPath: pathname,
    enabled: true,
  })

  // Combine refs for both pull-to-refresh and swipe navigation
  const combinedRef = (node: HTMLDivElement | null) => {
    if (containerRef) containerRef.current = node
    if (swipeContainerRef) swipeContainerRef.current = node
  }

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleRemoveFromWishlist = async (productId: string) => {
    setRemovingItems((prev) => ({ ...prev, [productId]: true }))

    try {
      // Add a small delay to show the animation
      await new Promise((resolve) => setTimeout(resolve, 300))
      removeItem(productId)
      toast({
        title: "Item removed",
        description: "The item has been removed from your wishlist.",
      })
    } finally {
      setRemovingItems((prev) => ({ ...prev, [productId]: false }))
    }
  }

  const handleAddToCart = async (product: any) => {
    addItem(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    )
  }

  const formatPrice = (price: number) => {
    return `₹${(price / 100).toFixed(2)}`
  }

  return (
    <div className="min-h-screen flex flex-col" ref={combinedRef}>
      <PullToRefreshIndicator pullDistance={pullDistance} isRefreshing={isRefreshing} isTriggered={isTriggered} />

      <SwipeNavigationIndicator
        isActive={isSwipeActive}
        direction={swipeDirection}
        distance={swipeDistance}
        nextPageInfo={nextPageInfo}
        canSwipe={swipeDirection === "left" ? canSwipeRight : canSwipeLeft}
      />

      <SwipeNavigationDots
        currentPath={pathname}
        isSwipeActive={isSwipeActive}
        swipeDirection={swipeDirection}
        swipeDistance={swipeDistance}
      />

      <main
        className="flex-1 container px-4 py-4 md:px-6 md:py-8"
        style={{
          transform: `translateY(${Math.min(pullDistance * 0.5, 40)}px)`,
          transition: isPulling ? "none" : "transform 0.3s ease-out",
        }}
      >
        {/* Mobile Header */}
        {isRefreshing ? (
          <MobileHeaderSkeleton />
        ) : (
          <div className="md:hidden mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <User className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h2 className="font-medium text-lg">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            {/* Mobile Navigation Tabs */}
            <div className="flex overflow-x-auto pb-2 mb-4 -mx-4 px-4">
              <div className="flex space-x-2 min-w-max">
                <Link
                  href="/account"
                  className="flex items-center space-x-2 px-3 py-2 rounded-full bg-gray-100 text-gray-600 text-sm font-medium whitespace-nowrap"
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
                <Link
                  href="/account/orders"
                  className="flex items-center space-x-2 px-3 py-2 rounded-full bg-gray-100 text-gray-600 text-sm font-medium whitespace-nowrap"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Orders</span>
                </Link>
                <Link
                  href="/account/wishlist"
                  className="flex items-center space-x-2 px-3 py-2 rounded-full bg-green-100 text-green-600 text-sm font-medium whitespace-nowrap"
                >
                  <Heart className="h-4 w-4" />
                  <span>Wishlist</span>
                </Link>
                <Link
                  href="/account/settings"
                  className="flex items-center space-x-2 px-3 py-2 rounded-full bg-gray-100 text-gray-600 text-sm font-medium whitespace-nowrap"
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Desktop Sidebar - Hidden on Mobile */}
          <aside className="hidden md:block w-full md:w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h2 className="font-medium">{user.name}</h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <nav className="space-y-1">
                <Link
                  href="/account"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100"
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
                <Link
                  href="/account/orders"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Orders</span>
                </Link>
                <Link
                  href="/account/wishlist"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md bg-green-50 text-green-600"
                >
                  <Heart className="h-4 w-4" />
                  <span>Wishlist</span>
                </Link>
                <Link
                  href="/account/settings"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100"
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-3 py-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Log out</span>
                </Button>
              </nav>
            </div>
          </aside>

          <div className="flex-1 min-w-0 pb-20 md:pb-0">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h1 className="text-xl md:text-2xl font-bold">My Wishlist</h1>
              {wishlistItems.length > 0 && (
                <span className="text-sm text-gray-500">
                  {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"}
                </span>
              )}
            </div>

            {isRefreshing ? (
              <WishlistSkeleton />
            ) : wishlistItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" key={refreshKey}>
                {wishlistItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white rounded-lg border overflow-hidden group"
                  >
                    <div className="relative">
                      <Link href={`/products/${item.id}`}>
                        <div className="aspect-square overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.svg?height=200&width=200"}
                            alt={item.name}
                            width={200}
                            height={200}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                      </Link>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/90 text-gray-600 hover:bg-white hover:text-red-600 shadow-sm"
                        onClick={() => handleRemoveFromWishlist(item.id)}
                        disabled={removingItems[item.id]}
                      >
                        {removingItems[item.id] ? (
                          <span className="h-4 w-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                        <span className="sr-only">Remove from wishlist</span>
                      </Button>
                    </div>
                    <div className="p-3 md:p-4">
                      <Link href={`/products/${item.id}`}>
                        <h3 className="font-medium text-sm md:text-base group-hover:underline line-clamp-2">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-xs md:text-sm text-gray-500 mb-3 mt-1">{item.material}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="font-medium text-sm md:text-base">{formatPrice(item.price)}</span>
                          {item.compareAtPrice && (
                            <span className="text-xs md:text-sm text-gray-500 line-through">
                              {formatPrice(item.compareAtPrice)}
                            </span>
                          )}
                        </div>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 h-9 px-3"
                          onClick={() => handleAddToCart(item)}
                        >
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          <span className="hidden sm:inline">Add</span>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 md:p-8 rounded-lg border text-center"
              >
                <Heart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h2 className="text-lg md:text-xl font-medium mb-2">Your wishlist is empty</h2>
                <p className="text-gray-500 mb-6 text-sm md:text-base">
                  Save items you love to your wishlist and they'll appear here.
                </p>
                <Link href="/products">
                  <Button className="bg-green-600 hover:bg-green-700 w-full md:w-auto h-12">
                    <PackageOpen className="mr-2 h-5 w-5" />
                    Explore Products
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-area-pb">
          <div className="flex justify-center">
            <Button
              variant="ghost"
              className="text-red-600 hover:bg-red-50 hover:text-red-700 h-12 px-6"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span>Log out</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
