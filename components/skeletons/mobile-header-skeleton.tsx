export function MobileHeaderSkeleton() {
  return (
    <div className="md:hidden mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
        <div>
          <div className="h-5 bg-gray-200 rounded w-32 mb-1 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
        </div>
      </div>

      <div className="flex overflow-x-auto pb-2 mb-4 -mx-4 px-4">
        <div className="flex space-x-2 min-w-max">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 bg-gray-200 rounded-full w-20 animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  )
}
