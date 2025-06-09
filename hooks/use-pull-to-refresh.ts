"use client"

import { useCallback, useEffect, useRef, useState } from "react"

interface UsePullToRefreshOptions {
  onRefresh: () => Promise<void>
  threshold?: number
  enabled?: boolean
}

export function usePullToRefresh({ onRefresh, threshold = 80, enabled = true }: UsePullToRefreshOptions) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [isPulling, setIsPulling] = useState(false)
  const [isTriggered, setIsTriggered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const startY = useRef(0)
  const currentY = useRef(0)

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      if (!enabled || isRefreshing) return

      // Only start if we're at the top of the page
      if (window.scrollY > 0) return

      startY.current = e.touches[0].clientY
      setIsPulling(true)
    },
    [enabled, isRefreshing],
  )

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!enabled || isRefreshing || !isPulling) return

      // Only continue if we're at the top of the page
      if (window.scrollY > 0) {
        setIsPulling(false)
        setPullDistance(0)
        setIsTriggered(false)
        return
      }

      currentY.current = e.touches[0].clientY
      const distance = Math.max(0, currentY.current - startY.current)

      // Apply resistance - the further you pull, the more resistance
      const resistance = 0.5
      const adjustedDistance = distance * resistance

      setPullDistance(adjustedDistance)
      setIsTriggered(adjustedDistance >= threshold)

      // Prevent default scrolling when pulling down
      if (distance > 0) {
        e.preventDefault()
      }
    },
    [enabled, isRefreshing, isPulling, threshold],
  )

  const handleTouchEnd = useCallback(async () => {
    if (!enabled || isRefreshing || !isPulling) return

    setIsPulling(false)

    if (isTriggered) {
      setIsRefreshing(true)
      try {
        await onRefresh()
      } catch (error) {
        console.error("Refresh failed:", error)
      } finally {
        setIsRefreshing(false)
      }
    }

    // Reset states
    setPullDistance(0)
    setIsTriggered(false)
  }, [enabled, isRefreshing, isPulling, isTriggered, onRefresh])

  useEffect(() => {
    const container = containerRef.current
    if (!container || !enabled) return

    // Use passive: false to allow preventDefault
    container.addEventListener("touchstart", handleTouchStart, { passive: false })
    container.addEventListener("touchmove", handleTouchMove, { passive: false })
    container.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
      container.removeEventListener("touchend", handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, enabled])

  return {
    isRefreshing,
    pullDistance,
    isPulling,
    isTriggered,
    containerRef,
  }
}
