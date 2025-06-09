"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface SwipeNavigationIndicatorProps {
  isActive: boolean
  direction: "left" | "right" | null
  distance: number
  nextPageInfo: { path: string; label: string } | null
  canSwipe: boolean
}

export function SwipeNavigationIndicator({
  isActive,
  direction,
  distance,
  nextPageInfo,
  canSwipe,
}: SwipeNavigationIndicatorProps) {
  if (!isActive || !direction || !nextPageInfo || !canSwipe) return null

  const opacity = Math.min(distance / 100, 0.8)
  const scale = Math.min(distance / 80, 1)

  return (
    <div
      className={`fixed top-1/2 -translate-y-1/2 z-50 pointer-events-none transition-all duration-200 ${
        direction === "left" ? "right-4" : "left-4"
      }`}
      style={{
        opacity,
        transform: `translateY(-50%) scale(${scale})`,
      }}
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-gray-200">
        <div className="flex items-center space-x-2">
          {direction === "right" && <ChevronLeft className="h-5 w-5 text-green-600" />}
          <div className="text-center">
            <div className="text-xs font-medium text-gray-900">{nextPageInfo.label}</div>
            <div className="text-xs text-gray-500">{direction === "left" ? "Swipe left" : "Swipe right"}</div>
          </div>
          {direction === "left" && <ChevronRight className="h-5 w-5 text-green-600" />}
        </div>
      </div>
    </div>
  )
}
