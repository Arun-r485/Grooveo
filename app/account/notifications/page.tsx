"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { User, Settings, ShoppingBag, Heart, LogOut, Bell, ArrowLeft, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/auth-context"
import { useNotifications, getNotificationIcon } from "@/context/notification-context"
import { format, formatDistanceToNow } from "date-fns"

import { useSwipeNavigation } from "@/hooks/use-swipe-navigation"
import { SwipeNavigationIndicator } from "@/components/swipe-navigation-indicator"
import { SwipeNavigationDots } from "@/components/swipe-navigation-dots"

export default function NotificationsPage() {
  const { user, isLoading, logout } = useAuth()
  const {
    notifications,
    removeNotification,
    clearAllNotifications,
    emailNotificationsEnabled,
    toggleEmailNotifications,
    orderStatusNotificationsEnabled,
    toggleOrderStatusNotifications,
    promotionalNotificationsEnabled,
    togglePromotionalNotifications,
  } = useNotifications()
  const router = useRouter()
  const pathname = usePathname()

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

  // Format the timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const isToday = date.toDateString() === now.toDateString()

    if (isToday) {
      return formatDistanceToNow(date, { addSuffix: true })
    } else {
      return format(date, "MMM d, yyyy 'at' h:mm a")
    }
  }

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col" ref={swipeContainerRef}>
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
      <main className="flex-1 container px-4 py-4 md:px-6 md:py-8">
        {/* Mobile Header */}
        <div className="md:hidden mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Link href="/account" className="flex items-center text-sm text-gray-500 hover:text-gray-900">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back
            </Link>
          </div>

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
                href="/account/notifications"
                className="flex items-center space-x-2 px-3 py-2 rounded-full bg-green-100 text-green-600 text-sm font-medium whitespace-nowrap"
              >
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
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
                  href="/account/notifications"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md bg-green-50 text-green-600"
                >
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
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
            <div className="hidden md:flex items-center gap-2 mb-6">
              <Link href="/account" className="flex items-center text-sm text-gray-500 hover:text-gray-900">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Account
              </Link>
            </div>

            <div className="space-y-4 md:space-y-6">
              <div className="bg-white p-4 md:p-6 rounded-lg border">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-xl md:text-2xl font-bold">Notification Settings</h1>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="space-y-0.5 flex-1">
                      <Label htmlFor="email-notifications" className="text-base font-medium">
                        Email Notifications
                      </Label>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={emailNotificationsEnabled}
                      onCheckedChange={toggleEmailNotifications}
                      className="ml-4"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="space-y-0.5 flex-1">
                      <Label htmlFor="order-notifications" className="text-base font-medium">
                        Order Status Updates
                      </Label>
                      <p className="text-sm text-gray-500">Get notified when your order status changes</p>
                    </div>
                    <Switch
                      id="order-notifications"
                      checked={orderStatusNotificationsEnabled}
                      onCheckedChange={toggleOrderStatusNotifications}
                      className="ml-4"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="space-y-0.5 flex-1">
                      <Label htmlFor="promo-notifications" className="text-base font-medium">
                        Promotional Notifications
                      </Label>
                      <p className="text-sm text-gray-500">Receive updates about sales and special offers</p>
                    </div>
                    <Switch
                      id="promo-notifications"
                      checked={promotionalNotificationsEnabled}
                      onCheckedChange={togglePromotionalNotifications}
                      className="ml-4"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 md:p-6 rounded-lg border">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 space-y-2 md:space-y-0">
                  <h2 className="text-lg md:text-xl font-bold">Recent Notifications</h2>
                  {notifications.length > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearAllNotifications}
                      className="text-gray-500 w-full md:w-auto"
                    >
                      Clear All
                    </Button>
                  )}
                </div>

                {notifications.length > 0 ? (
                  <div className="space-y-3 md:space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="flex items-start p-3 md:p-4 border rounded-lg relative group"
                      >
                        <div className="flex-shrink-0 mr-3 mt-0.5">
                          {getNotificationIcon(notification.type, notification.orderStatus)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <Link
                              href={notification.actionUrl || "#"}
                              className="font-medium hover:underline text-sm md:text-base pr-2"
                            >
                              {notification.title}
                            </Link>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-gray-400 hover:text-gray-500 flex-shrink-0"
                              onClick={() => removeNotification(notification.id)}
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </div>
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{formatTimestamp(notification.timestamp)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <Bell className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                    <h3 className="text-lg font-medium">No notifications</h3>
                    <p className="text-gray-500 mt-1 text-sm">You're all caught up!</p>
                  </div>
                )}
              </div>
            </div>
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
