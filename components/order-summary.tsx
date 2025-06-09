"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronDown, ChevronUp, Tag, Gift, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"
import { PromoCodeSection } from "@/components/promo-code-section"
import { LoyaltyPointsSection } from "@/components/loyalty-points-section"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  material?: string
  category?: string
}

interface PromoCode {
  code: string
  discount: number
  type: "percentage" | "fixed" | "shipping"
}

interface OrderSummaryProps {
  items: CartItem[]
  subtotal: number
  shippingCost: number
  tax: number
  total: number
  appliedPromos: PromoCode[]
  onApplyPromo: (promo: PromoCode) => void
  onRemovePromo: (code: string) => void
  loyaltyDiscount: number
  onApplyLoyalty: (discount: number) => void
}

export function OrderSummary({
  items,
  subtotal,
  shippingCost,
  tax,
  total,
  appliedPromos,
  onApplyPromo,
  onRemovePromo,
  loyaltyDiscount,
  onApplyLoyalty,
}: OrderSummaryProps) {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMobile()
  const { toast } = useToast()

  const totalDiscount =
    appliedPromos.reduce((sum, promo) => {
      if (promo.type === "percentage") {
        return sum + (subtotal * promo.discount) / 100
      } else if (promo.type === "fixed") {
        return sum + promo.discount
      }
      return sum
    }, 0) + loyaltyDiscount

  const totalSavings = totalDiscount + (shippingCost === 0 && subtotal > 4150 ? 497 : 0)

  if (isMobile) {
    return (
      <div className="bg-white border-t border-gray-200 sticky bottom-0 z-10">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full flex items-center justify-between p-4 h-auto"
              aria-expanded={isOpen}
              aria-controls="mobile-order-summary"
            >
              <div className="flex items-center space-x-2">
                <span className="font-medium">Order Summary</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg">₹{total.toFixed(2)}</span>
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent id="mobile-order-summary" className="px-4 pb-4">
            <OrderSummaryContent
              items={items}
              subtotal={subtotal}
              shippingCost={shippingCost}
              tax={tax}
              total={total}
              appliedPromos={appliedPromos}
              onApplyPromo={onApplyPromo}
              onRemovePromo={onRemovePromo}
              loyaltyDiscount={loyaltyDiscount}
              onApplyLoyalty={onApplyLoyalty}
              totalSavings={totalSavings}
            />
          </CollapsibleContent>
        </Collapsible>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-medium mb-4">Order Summary</h2>
        <OrderSummaryContent
          items={items}
          subtotal={subtotal}
          shippingCost={shippingCost}
          tax={tax}
          total={total}
          appliedPromos={appliedPromos}
          onApplyPromo={onApplyPromo}
          onRemovePromo={onRemovePromo}
          loyaltyDiscount={loyaltyDiscount}
          onApplyLoyalty={onApplyLoyalty}
          totalSavings={totalSavings}
        />
      </div>

      {/* Eco-friendly message */}
      <div className="bg-green-50 p-4 rounded-lg border border-green-100">
        <h3 className="text-sm font-medium text-green-800 mb-2">Eco-Friendly Packaging</h3>
        <p className="text-xs text-green-700">
          All orders are packed with our eco-conscious materials. By choosing our products, you're helping reduce
          plastic waste and carbon emissions.
        </p>
      </div>
    </div>
  )
}

interface OrderSummaryContentProps {
  items: CartItem[]
  subtotal: number
  shippingCost: number
  tax: number
  total: number
  appliedPromos: PromoCode[]
  onApplyPromo: (promo: PromoCode) => void
  onRemovePromo: (code: string) => void
  loyaltyDiscount: number
  onApplyLoyalty: (discount: number) => void
  totalSavings: number
}

function OrderSummaryContent({
  items,
  subtotal,
  shippingCost,
  tax,
  total,
  appliedPromos,
  onApplyPromo,
  onRemovePromo,
  loyaltyDiscount,
  onApplyLoyalty,
  totalSavings,
}: OrderSummaryContentProps) {
  return (
    <div className="space-y-4">
      {/* Items list */}
      <div className="max-h-80 overflow-auto pr-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-start space-x-4 py-3">
            <div className="relative h-16 w-16 overflow-hidden rounded border bg-muted">
              <Image
                src={item.image || "/placeholder.svg?height=64&width=64"}
                alt={`${item.name} - ${item.material || item.category} eco-friendly packaging product`}
                fill
                className="object-cover"
              />
              <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-[10px] font-medium text-white">
                {item.quantity}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium">{item.name}</h3>
              <p className="text-xs text-muted-foreground">{item.material || item.category}</p>
            </div>
            <div className="text-sm font-medium">₹{(item.price * item.quantity).toFixed(2)}</div>
          </div>
        ))}
      </div>

      <Separator />

      {/* Promo code section */}
      <PromoCodeSection appliedPromos={appliedPromos} onApplyPromo={onApplyPromo} onRemovePromo={onRemovePromo} />

      {/* Loyalty points section */}
      <LoyaltyPointsSection loyaltyDiscount={loyaltyDiscount} onApplyLoyalty={onApplyLoyalty} orderTotal={total} />

      <Separator />

      {/* Price breakdown */}
      <div className="space-y-1.5">
        <div className="flex justify-between">
          <span className="text-sm">Subtotal</span>
          <span className="text-sm font-medium">₹{subtotal.toFixed(2)}</span>
        </div>

        {/* Applied discounts */}
        {appliedPromos.map((promo) => (
          <div key={promo.code} className="flex justify-between text-sm text-green-600">
            <span className="flex items-center">
              <Tag className="h-3 w-3 mr-1" />
              {promo.code}
            </span>
            <span>
              -₹
              {promo.type === "percentage" ? ((subtotal * promo.discount) / 100).toFixed(2) : promo.discount.toFixed(2)}
            </span>
          </div>
        ))}

        {/* Loyalty discount */}
        {loyaltyDiscount > 0 && (
          <div className="flex justify-between text-sm text-amber-600">
            <span className="flex items-center">
              <Gift className="h-3 w-3 mr-1" />
              Loyalty Points
            </span>
            <span>-₹{loyaltyDiscount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-sm flex items-center">
            <Truck className="h-3 w-3 mr-1" />
            Shipping
          </span>
          <span className="text-sm font-medium">
            {shippingCost === 0 ? (
              <span className="text-green-600 flex items-center">
                Free
                {subtotal > 4150 && <Badge className="ml-1 bg-green-100 text-green-800 text-xs">Saved ₹497</Badge>}
              </span>
            ) : (
              `₹${shippingCost.toFixed(2)}`
            )}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-sm">GST (18%)</span>
          <span className="text-sm font-medium">₹{tax.toFixed(2)}</span>
        </div>

        {/* Total savings */}
        {totalSavings > 0 && (
          <div className="flex justify-between text-green-600 font-medium">
            <span>Total Savings</span>
            <span>₹{totalSavings.toFixed(2)}</span>
          </div>
        )}

        <Separator className="my-2" />

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span className="text-green-600">₹{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}
