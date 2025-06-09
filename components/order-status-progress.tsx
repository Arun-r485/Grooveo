import type { OrderStatus } from "@/lib/orders"
import { Clock, Package, Truck, CheckCheck, XCircle, RotateCcw } from "lucide-react"

interface OrderStatusProgressProps {
  currentStatus: OrderStatus
}

export function OrderStatusProgress({ currentStatus }: OrderStatusProgressProps) {
  // Define the order of statuses for the progress bar
  const statusOrder: OrderStatus[] = ["pending", "processing", "shipped", "out_for_delivery", "delivered"]

  // Special cases
  if (currentStatus === "cancelled" || currentStatus === "returned") {
    return (
      <div className="flex items-center justify-center py-4">
        <div
          className={`flex items-center space-x-2 rounded-full px-4 py-2 ${
            currentStatus === "cancelled" ? "bg-red-100 text-red-800" : "bg-secondary-100 text-secondary-800"
          }`}
        >
          {currentStatus === "cancelled" ? <XCircle className="h-5 w-5" /> : <RotateCcw className="h-5 w-5" />}
          <span className="font-medium">{currentStatus === "cancelled" ? "Order Cancelled" : "Order Returned"}</span>
        </div>
      </div>
    )
  }

  // Find the current status index
  const currentIndex = statusOrder.indexOf(currentStatus)

  return (
    <div className="py-4">
      <div className="relative">
        {/* Progress bar background */}
        <div className="absolute inset-0 flex items-center">
          <div className="h-1 w-full bg-neutral-200 rounded"></div>
        </div>

        {/* Progress bar filled */}
        <div className="absolute inset-0 flex items-center">
          <div
            className="h-1 bg-primary-500 rounded"
            style={{
              width: `${Math.max(0, (currentIndex / (statusOrder.length - 1)) * 100)}%`,
            }}
          ></div>
        </div>

        {/* Status points */}
        <div className="relative flex justify-between">
          {statusOrder.map((status, index) => {
            const isActive = index <= currentIndex
            const isCurrentStatus = status === currentStatus

            return (
              <div key={status} className="flex flex-col items-center">
                <div
                  className={`flex h-7 w-7 items-center justify-center rounded-full ${
                    isActive ? "bg-primary-500" : "bg-neutral-200"
                  } ${isCurrentStatus ? "ring-2 ring-primary-300 ring-offset-2" : ""}`}
                >
                  {status === "pending" && <Clock className="h-3 w-3 text-white" />}
                  {status === "processing" && <Clock className="h-3 w-3 text-white" />}
                  {status === "shipped" && <Package className="h-3 w-3 text-white" />}
                  {status === "out_for_delivery" && <Truck className="h-3 w-3 text-white" />}
                  {status === "delivered" && <CheckCheck className="h-3 w-3 text-white" />}
                </div>
                <span className={`mt-2 text-xs ${isActive ? "font-medium" : "text-neutral-500"}`}>
                  {status === "pending" && "Pending"}
                  {status === "processing" && "Processing"}
                  {status === "shipped" && "Shipped"}
                  {status === "out_for_delivery" && "Out for Delivery"}
                  {status === "delivered" && "Delivered"}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
