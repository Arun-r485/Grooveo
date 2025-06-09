"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

interface UseSwipeNavigationOptions {
  currentPath: string
  enabled?: boolean
  threshold?: number
  velocity?: number
}

const accountRoutes = [
  { path: "/account", label: "Profile" },
  { path: "/account/orders", label: "Orders" },
  { path: "/account/wishlist", label: "Wishlist" },
  { path: "/account/notifications", label: "Notifications" },
  { path: "/account/settings", label: "Settings" },
]

export function useSwipeNavigation({
  currentPath,
  enabled = true,
  threshold = 50,
  velocity = 0.3,
}: UseSwipeNavigationOptions) {
  const router = useRouter()
  const [isSwipeActive, setIsSwipeActive] = useState(false)
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null)
  const [swipeDistance, setSwipeDistance] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const startX = useRef(0)
  const startY = useRef(0)
  const currentX = useRef(0)
  const startTime = useRef(0)
  const isVerticalScroll = useRef(false)

  const currentIndex = accountRoutes.findIndex((route) => route.path === currentPath)
  const canSwipeLeft = currentIndex > 0
  const canSwipeRight = currentIndex < accountRoutes.length - 1

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!enabled) return

      const touch = e.touches[0]
      startX.current = touch.clientX
      startY.current = touch.clientY
      startTime.current = Date.now()
      isVerticalScroll.current = false
      setIsSwipeActive(false)
      setSwipeDirection(null)
      setSwipeDistance(0)
    },
    [enabled],
  )

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!enabled) return

      const touch = e.touches[0]
      currentX.current = touch.clientX
      const currentY = touch.clientY

      const deltaX = currentX.current - startX.current
      const deltaY = currentY.current - startY.current

      // Determine if this is a vertical scroll gesture
      if (!isVerticalScroll.current && Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 10) {
        isVerticalScroll.current = true
        return
      }

      // If it's vertical scroll, don't handle swipe
      if (isVerticalScroll.current) return

      // Only start swipe if horizontal movement is significant
      if (Math.abs(deltaX) > 10) {
        setIsSwipeActive(true)
        const direction = deltaX > 0 ? "right" : "left"
        setSwipeDirection(direction)

        // Calculate resistance based on whether swipe is possible
        let resistance = 1
        if ((direction === "left" && !canSwipeRight) || (direction === "right" && !canSwipeLeft)) {
          resistance = 0.3 // High resistance when can't swipe
        }

        setSwipeDistance(Math.abs(deltaX) * resistance)

        // Prevent default scrolling for horizontal swipes
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
          e.preventDefault()
        }
      }
    },
    [enabled, canSwipeLeft, canSwipeRight],
  )

  const handleTouchEnd = useCallback(() => {
    if (!enabled || !isSwipeActive || isVerticalScroll.current) {
      setIsSwipeActive(false)
      setSwipeDirection(null)
      setSwipeDistance(0)
      return
    }

    const deltaX = currentX.current - startX.current
    const deltaTime = Date.now() - startTime.current
    const swipeVelocity = Math.abs(deltaX) / deltaTime

    // Check if swipe meets threshold or velocity requirements
    const shouldNavigate = Math.abs(deltaX) > threshold || swipeVelocity > velocity

    if (shouldNavigate) {
      if (deltaX > 0 && canSwipeLeft) {
        // Swipe right - go to previous page
        const prevRoute = accountRoutes[currentIndex - 1]
        router.push(prevRoute.path)
      } else if (deltaX < 0 && canSwipeRight) {
        // Swipe left - go to next page
        const nextRoute = accountRoutes[currentIndex + 1]
        router.push(nextRoute.path)
      }
    }

    // Reset states
    setIsSwipeActive(false)
    setSwipeDirection(null)
    setSwipeDistance(0)
  }, [enabled, isSwipeActive, threshold, velocity, canSwipeLeft, canSwipeRight, currentIndex, router])

  useEffect(() => {
    const container = containerRef.current
    if (!container || !enabled) return

    container.addEventListener("touchstart", handleTouchStart, { passive: false })
    container.addEventListener("touchmove", handleTouchMove, { passive: false })
    container.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
      container.removeEventListener("touchend", handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, enabled])

  const getNextPageInfo = () => {
    if (swipeDirection === "left" && canSwipeRight) {
      return accountRoutes[currentIndex + 1]
    }
    if (swipeDirection === "right" && canSwipeLeft) {
      return accountRoutes[currentIndex - 1]
    }
    return null
  }

  return {
    containerRef,
    isSwipeActive,
    swipeDirection,
    swipeDistance,
    canSwipeLeft,
    canSwipeRight,
    nextPageInfo: getNextPageInfo(),
    currentPageInfo: accountRoutes[currentIndex],
  }
}
