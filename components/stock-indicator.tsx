import { CheckCircle, AlertCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface StockIndicatorProps {
  stockCount: number
  lowStockThreshold?: number
  variant?: "subtle" | "prominent"
  className?: string
}

export function StockIndicator({
  stockCount,
  lowStockThreshold = 5,
  variant = "subtle",
  className,
}: StockIndicatorProps) {
  // Determine stock status
  const isOutOfStock = stockCount <= 0
  const isLowStock = !isOutOfStock && stockCount <= lowStockThreshold

  // Set appropriate text and styles based on stock status
  const getStockText = () => {
    if (isOutOfStock) return "Out of Stock"
    if (isLowStock) return `Only ${stockCount} left in stock!`
    return "In Stock"
  }

  const getStockColor = () => {
    if (isOutOfStock) return "text-red-600"
    if (isLowStock) return "text-amber-600"
    return "text-green-600"
  }

  const getStockIcon = () => {
    if (isOutOfStock) return <XCircle className="h-4 w-4" />
    if (isLowStock) return <AlertCircle className="h-4 w-4" />
    return <CheckCircle className="h-4 w-4" />
  }

  // Determine size and prominence based on variant
  const isProminent = variant === "prominent"

  return (
    <div
      className={cn(
        "flex items-center gap-1.5",
        isProminent ? "text-sm font-medium" : "text-xs",
        getStockColor(),
        className,
      )}
      aria-live="polite"
    >
      {getStockIcon()}
      <span>{getStockText()}</span>
    </div>
  )
}
