export function OrderSkeleton() {
  return (
    <div className="bg-white p-4 md:p-6 rounded-lg border">
      <div className="flex flex-col space-y-3 mb-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
          <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
        </div>
      </div>

      <div className="h-px bg-gray-200 my-4"></div>

      <div className="space-y-3 md:space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-start space-x-3">
            <div className="h-12 w-12 md:h-16 md:w-16 bg-gray-200 rounded animate-pulse flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-px bg-gray-200 my-4"></div>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-3 md:space-y-0">
        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
          <div className="h-10 bg-gray-200 rounded w-full md:w-28 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-full md:w-32 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export function OrderListSkeleton() {
  return (
    <div className="space-y-4 md:space-y-6">
      {[1, 2, 3].map((i) => (
        <OrderSkeleton key={i} />
      ))}
    </div>
  )
}
