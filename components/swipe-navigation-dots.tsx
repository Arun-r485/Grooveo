"use client"

interface SwipeNavigationDotsProps {
  currentPath: string
  isSwipeActive: boolean
  swipeDirection: "left" | "right" | null
  swipeDistance: number
}

const accountRoutes = [
  { path: "/account", label: "Profile" },
  { path: "/account/orders", label: "Orders" },
  { path: "/account/wishlist", label: "Wishlist" },
  { path: "/account/notifications", label: "Notifications" },
  { path: "/account/settings", label: "Settings" },
]

export function SwipeNavigationDots({
  currentPath,
  isSwipeActive,
  swipeDirection,
  swipeDistance,
}: SwipeNavigationDotsProps) {
  const currentIndex = accountRoutes.findIndex((route) => route.path === currentPath)

  return (
    <div className="md:hidden fixed bottom-16 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
      <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-2 shadow-sm border border-gray-200">
        {accountRoutes.map((route, index) => {
          const isActive = index === currentIndex
          const isNext =
            isSwipeActive &&
            ((swipeDirection === "left" && index === currentIndex + 1) ||
              (swipeDirection === "right" && index === currentIndex - 1))

          let scale = 1
          let opacity = isActive ? 1 : 0.3

          if (isNext && swipeDistance > 30) {
            scale = 1 + swipeDistance / 200
            opacity = 0.3 + swipeDistance / 200
          }

          return (
            <div
              key={route.path}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                isActive ? "bg-green-600" : "bg-gray-300"
              }`}
              style={{
                transform: `scale(${scale})`,
                opacity,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
