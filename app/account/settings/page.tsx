"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { User, Settings, ShoppingBag, Heart, LogOut, ArrowLeft, Bell, Shield, Palette, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/context/auth-context"
import { useSwipeNavigation } from "@/hooks/use-swipe-navigation"
import { SwipeNavigationIndicator } from "@/components/swipe-navigation-indicator"
import { SwipeNavigationDots } from "@/components/swipe-navigation-dots"

export default function SettingsPage() {
  const { user, isLoading, logout } = useAuth()
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
                href="/account/wishlist"
                className="flex items-center space-x-2 px-3 py-2 rounded-full bg-gray-100 text-gray-600 text-sm font-medium whitespace-nowrap"
              >
                <Heart className="h-4 w-4" />
                <span>Wishlist</span>
              </Link>
              <Link
                href="/account/notifications"
                className="flex items-center space-x-2 px-3 py-2 rounded-full bg-gray-100 text-gray-600 text-sm font-medium whitespace-nowrap"
              >
                <Bell className="h-4 w-4" />
                <span>Notifications</span>
              </Link>
              <Link
                href="/account/settings"
                className="flex items-center space-x-2 px-3 py-2 rounded-full bg-green-100 text-green-600 text-sm font-medium whitespace-nowrap"
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
                  href="/account/wishlist"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100"
                >
                  <Heart className="h-4 w-4" />
                  <span>Wishlist</span>
                </Link>
                <Link
                  href="/account/notifications"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100"
                >
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                </Link>
                <Link
                  href="/account/settings"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md bg-green-50 text-green-600"
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
              <h1 className="text-xl md:text-2xl font-bold">Settings</h1>

              {/* App Preferences */}
              <div className="bg-white p-4 md:p-6 rounded-lg border">
                <div className="flex items-center gap-2 mb-4">
                  <Palette className="h-5 w-5 text-green-600" />
                  <h2 className="text-lg font-medium">App Preferences</h2>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="space-y-0.5 flex-1">
                      <Label htmlFor="dark-mode" className="text-base font-medium">
                        Dark Mode
                      </Label>
                      <p className="text-sm text-gray-500">Switch between light and dark themes</p>
                    </div>
                    <Switch id="dark-mode" className="ml-4" />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="space-y-0.5 flex-1">
                      <Label htmlFor="compact-view" className="text-base font-medium">
                        Compact View
                      </Label>
                      <p className="text-sm text-gray-500">Show more content in less space</p>
                    </div>
                    <Switch id="compact-view" className="ml-4" />
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="space-y-2 mb-3">
                      <Label className="text-base font-medium">Language</Label>
                      <p className="text-sm text-gray-500">Choose your preferred language</p>
                    </div>
                    <Select defaultValue="en">
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                        <SelectItem value="de">Deutsch</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Privacy & Security */}
              <div className="bg-white p-4 md:p-6 rounded-lg border">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="h-5 w-5 text-green-600" />
                  <h2 className="text-lg font-medium">Privacy & Security</h2>
                </div>

                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="space-y-0.5 flex-1">
                      <Label htmlFor="analytics" className="text-base font-medium">
                        Analytics
                      </Label>
                      <p className="text-sm text-gray-500">Help improve the app by sharing usage data</p>
                    </div>
                    <Switch id="analytics" defaultChecked className="ml-4" />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="space-y-0.5 flex-1">
                      <Label htmlFor="crash-reports" className="text-base font-medium">
                        Crash Reports
                      </Label>
                      <p className="text-sm text-gray-500">Automatically send crash reports to help fix bugs</p>
                    </div>
                    <Switch id="crash-reports" defaultChecked className="ml-4" />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="space-y-0.5 flex-1">
                      <Label htmlFor="location" className="text-base font-medium">
                        Location Services
                      </Label>
                      <p className="text-sm text-gray-500">Allow location access for shipping estimates</p>
                    </div>
                    <Switch id="location" className="ml-4" />
                  </div>
                </div>
              </div>

              {/* Data & Storage */}
              <div className="bg-white p-4 md:p-6 rounded-lg border">
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="h-5 w-5 text-green-600" />
                  <h2 className="text-lg font-medium">Data & Storage</h2>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Cache Size</span>
                      <span className="text-sm text-gray-500">24.5 MB</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">
                      Cached data helps the app load faster but takes up storage space
                    </p>
                    <Button variant="outline" size="sm" className="w-full md:w-auto">
                      Clear Cache
                    </Button>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Download Quality</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">Choose image quality for faster loading</p>
                    <Select defaultValue="high">
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (Faster)</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High (Better Quality)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* About */}
              <div className="bg-white p-4 md:p-6 rounded-lg border">
                <h2 className="text-lg font-medium mb-4">About</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Version</span>
                    <span>1.2.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Build</span>
                    <span>2024.01.15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Last Updated</span>
                    <span>January 15, 2024</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t space-y-2">
                  <Button variant="ghost" className="w-full justify-start p-0 h-auto text-sm">
                    Terms of Service
                  </Button>
                  <Button variant="ghost" className="w-full justify-start p-0 h-auto text-sm">
                    Privacy Policy
                  </Button>
                  <Button variant="ghost" className="w-full justify-start p-0 h-auto text-sm">
                    Contact Support
                  </Button>
                </div>
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
