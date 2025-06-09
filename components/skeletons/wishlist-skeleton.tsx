export function WishlistItemSkeleton() {
  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      <div className="relative">
        <div className="aspect-square bg-gray-200 animate-pulse"></div>
        <div className="absolute top-2 right-2 h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
      </div>
      <div className="p-3 md:p-4">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-3 animate-pulse"></div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-1">
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-12 animate-pulse"></div>
          </div>
          <div className="h-9 bg-gray-200 rounded w-16 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export function WishlistSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <WishlistItemSkeleton key={i} />
      ))}
    </div>
  )
}
