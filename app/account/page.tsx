"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { User, Settings, ShoppingBag, Heart, LogOut } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/auth-context"
import { usePullToRefresh } from "@/hooks/use-pull-to-refresh"
import { useSwipeNavigation } from "@/hooks/use-swipe-navigation"
import { PullToRefreshIndicator } from "@/components/pull-to-refresh-indicator"
import { SwipeNavigationIndicator } from "@/components/swipe-navigation-indicator"
import { SwipeNavigationDots } from "@/components/swipe-navigation-dots"
import {
  ProfileSkeleton,
  AddressSkeleton,
  PreferencesSkeleton,
  SecuritySkeleton,
} from "@/components/skeletons/profile-skeleton"
import { MobileHeaderSkeleton } from "@/components/skeletons/mobile-header-skeleton"

export default function AccountPage() {
  const { user, isLoading, logout, updateProfile, refreshUser } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [country, setCountry] = useState("")
  const [marketingEmails, setMarketingEmails] = useState(false)
  const [orderUpdates, setOrderUpdates] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")

  // Pull to refresh functionality
  const handleRefresh = async () => {
    try {
      await refreshUser?.()
      toast({
        title: "Profile refreshed",
        description: "Your profile information has been updated.",
      })
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: "Unable to refresh profile data. Please try again.",
        variant: "destructive",
      })
    }
  }

  const {
    isRefreshing,
    pullDistance,
    isPulling,
    containerRef: pullContainerRef,
    isTriggered,
  } = usePullToRefresh({
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
    if (pullContainerRef) pullContainerRef.current = node
    if (swipeContainerRef) swipeContainerRef.current = node
  }

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setName(user.name || "")
      setEmail(user.email || "")
      setStreet(user.address?.street || "")
      setCity(user.address?.city || "")
      setState(user.address?.state || "")
      setPostalCode(user.address?.postalCode || "")
      setCountry(user.address?.country || "")
      setMarketingEmails(user.preferences?.marketingEmails || false)
      setOrderUpdates(user.preferences?.orderUpdates || true)
    }
  }, [user])

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      await updateProfile({
        name,
        email,
        address: {
          street,
          city,
          state,
          postalCode,
          country,
        },
      })
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleSavePreferences = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      await updateProfile({
        preferences: {
          marketingEmails,
          orderUpdates,
        },
      })
      toast({
        title: "Preferences updated",
        description: "Your communication preferences have been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Update failed",
        description: "There was an error updating your preferences. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
  }

  const renderTabContent = () => {
    if (isRefreshing) {
      switch (activeTab) {
        case "profile":
          return <ProfileSkeleton />
        case "address":
          return <AddressSkeleton />
        case "preferences":
          return <PreferencesSkeleton />
        case "security":
          return <SecuritySkeleton />
        default:
          return <ProfileSkeleton />
      }
    }

    return (
      <>
        <TabsContent value="profile" className="space-y-4 md:space-y-6">
          <div className="bg-white p-4 md:p-6 rounded-lg border">
            <h2 className="text-lg font-medium mb-4">Personal Information</h2>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full md:w-auto bg-green-600 hover:bg-green-700 h-12"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </div>
        </TabsContent>

        <TabsContent value="address" className="space-y-4 md:space-y-6">
          <div className="bg-white p-4 md:p-6 rounded-lg border">
            <h2 className="text-lg font-medium mb-4">Shipping Address</h2>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="street">Street Address</Label>
                <Input id="street" value={street} onChange={(e) => setStreet(e.target.value)} className="h-12" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State / Province</Label>
                  <Input id="state" value={state} onChange={(e) => setState(e.target.value)} className="h-12" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="postal-code">Postal Code</Label>
                  <Input
                    id="postal-code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" value={country} onChange={(e) => setCountry(e.target.value)} className="h-12" />
                </div>
              </div>
              <Button
                type="submit"
                className="w-full md:w-auto bg-green-600 hover:bg-green-700 h-12"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Address"}
              </Button>
            </form>
          </div>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4 md:space-y-6">
          <div className="bg-white p-4 md:p-6 rounded-lg border">
            <h2 className="text-lg font-medium mb-4">Communication Preferences</h2>
            <form onSubmit={handleSavePreferences} className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start space-x-3 p-3 rounded-lg border">
                  <Checkbox
                    id="marketing-emails"
                    checked={marketingEmails}
                    onCheckedChange={(checked) => setMarketingEmails(checked as boolean)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor="marketing-emails" className="font-normal text-sm leading-5">
                      Receive marketing emails about product updates and promotions
                    </Label>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 rounded-lg border">
                  <Checkbox
                    id="order-updates"
                    checked={orderUpdates}
                    onCheckedChange={(checked) => setOrderUpdates(checked as boolean)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor="order-updates" className="font-normal text-sm leading-5">
                      Receive order status updates and shipping notifications
                    </Label>
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full md:w-auto bg-green-600 hover:bg-green-700 h-12"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Preferences"}
              </Button>
            </form>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4 md:space-y-6">
          <div className="bg-white p-4 md:p-6 rounded-lg border">
            <h2 className="text-lg font-medium mb-4">Change Password</h2>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" className="h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" className="h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" className="h-12" />
              </div>
              <Button type="submit" className="w-full md:w-auto bg-green-600 hover:bg-green-700 h-12">
                Update Password
              </Button>
            </form>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-lg border">
            <h2 className="text-lg font-medium mb-4">Two-Factor Authentication</h2>
            <p className="text-gray-500 mb-4 text-sm">
              Add an extra layer of security to your account by enabling two-factor authentication.
            </p>
            <Button variant="outline" className="w-full md:w-auto h-12">
              Enable 2FA
            </Button>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-lg border">
            <h2 className="text-lg font-medium text-red-600 mb-4">Delete Account</h2>
            <p className="text-gray-500 mb-4 text-sm">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button variant="destructive" className="w-full md:w-auto h-12">
              Delete Account
            </Button>
          </div>
        </TabsContent>
      </>
    )
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
                  className="flex items-center space-x-2 px-3 py-2 rounded-full bg-green-100 text-green-600 text-sm font-medium whitespace-nowrap"
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
                  <Settings className="h-4 w-4" />
                  <span>Notifications</span>
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
                  className="flex items-center space-x-2 px-3 py-2 rounded-md bg-green-50 text-green-600"
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
                  <Settings className="h-4 w-4" />
                  <span>Notifications</span>
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

          <div className="flex-1 min-w-0">
            <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">My Account</h1>

            <Tabs defaultValue="profile" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start border-b rounded-none mb-4 md:mb-6 overflow-x-auto">
                <TabsTrigger value="profile" className="text-sm">
                  Profile
                </TabsTrigger>
                <TabsTrigger value="address" className="text-sm">
                  Address
                </TabsTrigger>
                <TabsTrigger value="preferences" className="text-sm">
                  Preferences
                </TabsTrigger>
                <TabsTrigger value="security" className="text-sm">
                  Security
                </TabsTrigger>
              </TabsList>

              {renderTabContent()}
            </Tabs>
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
