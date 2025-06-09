"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { User, Settings, ShoppingBag, Heart, LogOut, ExternalLink, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/context/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { orders, getStatusColor, getStatusLabel } from "@/lib/orders"
import { usePullToRefresh } from "@/hooks/use-pull-to-refresh"
import { PullToRefreshIndicator } from "@/components/pull-to-refresh-indicator"
import { OrderListSkeleton } from "@/components/skeletons/order-skeleton"
import { MobileHeaderSkeleton } from "@/components/skeletons/mobile-header-skeleton"
import { useSwipeNavigation } from "@/hooks/use-swipe-navigation"
import { SwipeNavigationIndicator } from "@/components/swipe-navigation-indicator"
import { SwipeNavigationDots } from "@/components/swipe-navigation-dots"

export default function OrdersPage() {
  const { user, isLoading, logout } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const pathname = usePathname()
  const [refreshKey, setRefreshKey] = useState(0)

  // Pull to refresh functionality
  const handleRefresh = async () => {
    try {
      // Simulate API call to refresh orders
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setRefreshKey((prev) => prev + 1)
      toast({
        title: "Orders refreshed",
        description: "Your order list has been updated.",
      })
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: "Unable to refresh orders. Please try again.",
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

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    )
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
                  className="flex items-center space-x-2 px-3 py-2 rounded-full bg-green-100 text-green-600 text-sm font-medium whitespace-nowrap"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Orders</span>
                </Link>
                <Link
                  href="/account/wishlist"
                  className="flex items-center space-x-2 px-3 py-2 rounded-full bg-gray-100 text-gray-600 text-sm font-medium whitespace-nowrap"
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
                  className="flex items-center space-x-2 px-3 py-2 rounded-md bg-green-50 text-green-600"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Orders</span>
                </Link>
                <Link
                  href="/account/wishlist"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100"
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
            <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">My Orders</h1>

            {isRefreshing ? (
              <OrderListSkeleton />
            ) : orders.length > 0 ? (
              <div className="space-y-4 md:space-y-6" key={refreshKey}>
                {orders.map((order) => (
                  <div key={order.id} className="bg-white p-4 md:p-6 rounded-lg border">
                    <div className="flex flex-col space-y-3 mb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="font-medium text-sm md:text-base">Order #{order.id}</h2>
                          <p className="text-xs md:text-sm text-gray-500">Placed on {order.date}</p>
                        </div>
                        <Badge className={`${getStatusColor(order.status)} text-xs`}>
                          {getStatusLabel(order.status)}
                        </Badge>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-3 md:space-y-4">
                      {order.items.slice(0, 2).map((item) => (
                        <div key={item.id} className="flex items-start space-x-3">
                          <div className="relative h-12 w-12 md:h-16 md:w-16 overflow-hidden rounded border bg-muted flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-sm md:text-base truncate">{item.name}</h3>
                            <p className="text-xs md:text-sm text-gray-500">
                              Qty: {item.quantity} × ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="font-medium text-sm md:text-base">
                              ${(item.quantity * item.price).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}

                      {order.items.length > 2 && (
                        <p className="text-xs md:text-sm text-gray-500">+ {order.items.length - 2} more item(s)</p>
                      )}
                    </div>

                    <Separator className="my-4" />

                    <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0">
                      <div>
                        <span className="font-medium text-sm md:text-base">Total:</span>
                        <span className="ml-2 text-sm md:text-base">${order.total.toFixed(2)}</span>
                      </div>
                      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                        {order.trackingNumber && (
                          <Button variant="outline" size="sm" className="w-full md:w-auto h-10">
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Track Order
                          </Button>
                        )}
                        <Link href={`/account/orders/${order.id}`} className="w-full md:w-auto">
                          <Button variant="default" size="sm" className="w-full bg-green-600 hover:bg-green-700 h-10">
                            View Details
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-6 md:p-8 rounded-lg border text-center">
                <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h2 className="text-lg md:text-xl font-medium mb-2">No orders yet</h2>
                <p className="text-gray-500 mb-6 text-sm md:text-base">When you place an order, it will appear here.</p>
                <Link href="/products">
                  <Button className="bg-green-600 hover:bg-green-700 w-full md:w-auto h-12">Start Shopping</Button>
                </Link>
              </div>
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
