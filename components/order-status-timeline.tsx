import { CheckCircle2, Clock, Package, Truck, MapPin } from "lucide-react"
import type { OrderStatus, OrderStatusUpdate } from "@/lib/orders"

interface OrderStatusTimelineProps {
  statusUpdates: OrderStatusUpdate[]
  currentStatus: OrderStatus
}

export function OrderStatusTimeline({ statusUpdates, currentStatus }: OrderStatusTimelineProps) {
  // Sort status updates by timestamp (newest first for display)
  const sortedUpdates = [...statusUpdates].sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  })

  // Get icon based on status
  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-secondary-500" />
      case "processing":
        return <Clock className="h-5 w-5 text-accent-500" />
      case "shipped":
        return <Package className="h-5 w-5 text-accent-600" />
      case "out_for_delivery":
        return <Truck className="h-5 w-5 text-primary-400" />
      case "delivered":
        return <CheckCircle2 className="h-5 w-5 text-primary-500" />
      default:
        return <Clock className="h-5 w-5 text-neutral-500" />
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Order Timeline</h3>
      <div className="space-y-4">
        {sortedUpdates.map((update, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">{getStatusIcon(update.status)}</div>
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <p className="font-medium">{update.message}</p>
                <p className="text-sm text-neutral-500">{update.timestamp}</p>
              </div>
              {update.location && (
                <div className="flex items-center mt-1 text-sm text-neutral-500">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{update.location}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
