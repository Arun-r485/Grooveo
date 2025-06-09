export function ProfileSkeleton() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-white p-4 md:p-6 rounded-lg border">
        <div className="h-5 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="h-12 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export function AddressSkeleton() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-white p-4 md:p-6 rounded-lg border">
        <div className="h-5 bg-gray-200 rounded w-40 mb-4 animate-pulse"></div>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
              <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="h-12 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export function PreferencesSkeleton() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-white p-4 md:p-6 rounded-lg border">
        <div className="h-5 bg-gray-200 rounded w-52 mb-4 animate-pulse"></div>
        <div className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 rounded-lg border">
              <div className="w-4 h-4 bg-gray-200 rounded animate-pulse mt-1"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4 mt-1 animate-pulse"></div>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 rounded-lg border">
              <div className="w-4 h-4 bg-gray-200 rounded animate-pulse mt-1"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3 mt-1 animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="h-12 bg-gray-200 rounded w-36 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}

export function SecuritySkeleton() {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-white p-4 md:p-6 rounded-lg border">
        <div className="h-5 bg-gray-200 rounded w-36 mb-4 animate-pulse"></div>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-12 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-lg border">
        <div className="h-5 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
        <div className="h-3 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
        <div className="h-3 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
        <div className="h-12 bg-gray-200 rounded w-24 animate-pulse"></div>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-lg border">
        <div className="h-5 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
        <div className="h-3 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3 mb-4 animate-pulse"></div>
        <div className="h-12 bg-gray-200 rounded w-32 animate-pulse"></div>
      </div>
    </div>
  )
}
