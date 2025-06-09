import { RefreshCw } from "lucide-react"

interface PullToRefreshIndicatorProps {
  pullDistance: number
  isRefreshing: boolean
  isTriggered: boolean
  threshold?: number
}

export function PullToRefreshIndicator({
  pullDistance,
  isRefreshing,
  isTriggered,
  threshold = 80,
}: PullToRefreshIndicatorProps) {
  const progress = Math.min(pullDistance / threshold, 1)
  const opacity = Math.min(pullDistance / (threshold * 0.5), 1)

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm border-b transition-all duration-200 md:hidden"
      style={{
        height: `${Math.min(pullDistance, threshold * 1.2)}px`,
        transform: `translateY(${pullDistance > 0 ? 0 : -100}%)`,
        opacity: opacity,
      }}
    >
      <div className="flex flex-col items-center space-y-2 py-2">
        <div
          className={`transition-transform duration-200 ${isRefreshing ? "animate-spin" : ""}`}
          style={{
            transform: `rotate(${isRefreshing ? 0 : progress * 360}deg)`,
            color: isTriggered ? "#16a34a" : "#6b7280",
          }}
        >
          <RefreshCw className="h-5 w-5" />
        </div>
        <div className="text-xs font-medium text-center">
          {isRefreshing ? (
            <span className="text-green-600">Refreshing...</span>
          ) : isTriggered ? (
            <span className="text-green-600">Release to refresh</span>
          ) : (
            <span className="text-gray-500">Pull to refresh</span>
          )}
        </div>
      </div>
    </div>
  )
}
