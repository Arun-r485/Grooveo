"use client"

import { useState } from "react"
import { Tag, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { validatePromoCode } from "@/lib/promo-codes"

interface PromoCode {
  code: string
  discount: number
  type: "percentage" | "fixed" | "shipping"
}

interface PromoCodeSectionProps {
  appliedPromos: PromoCode[]
  onApplyPromo: (promo: PromoCode) => void
  onRemovePromo: (code: string) => void
}

export function PromoCodeSection({ appliedPromos, onApplyPromo, onRemovePromo }: PromoCodeSectionProps) {
  const [promoCode, setPromoCode] = useState("")
  const [isApplying, setIsApplying] = useState(false)
  const { toast } = useToast()

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return

    // Check if promo is already applied
    if (appliedPromos.some((p) => p.code === promoCode.toUpperCase())) {
      toast({
        title: "Promo code already applied",
        description: "This promo code is already active on your order.",
        variant: "destructive",
      })
      return
    }

    setIsApplying(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const validatedPromo = validatePromoCode(promoCode)

      if (validatedPromo) {
        onApplyPromo(validatedPromo)
        setPromoCode("")
        toast({
          title: "Promo code applied!",
          description: `You saved ${
            validatedPromo.type === "percentage"
              ? `${validatedPromo.discount}%`
              : validatedPromo.type === "shipping"
                ? "on shipping"
                : `₹${validatedPromo.discount}`
          } with code ${validatedPromo.code}`,
        })
      } else {
        toast({
          title: "Invalid promo code",
          description: "The promo code you entered is not valid or has expired.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error applying promo code",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsApplying(false)
    }
  }

  const handleRemovePromo = (code: string) => {
    onRemovePromo(code)
    toast({
      title: "Promo code removed",
      description: `${code} has been removed from your order.`,
    })
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Tag className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">Promo Code</span>
      </div>

      {/* Applied promo codes */}
      {appliedPromos.length > 0 && (
        <div className="space-y-2">
          {appliedPromos.map((promo) => (
            <div key={promo.code} className="flex items-center justify-between bg-green-50 p-2 rounded-md">
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {promo.code}
                </Badge>
                <span className="text-xs text-green-700">
                  {promo.type === "percentage"
                    ? `${promo.discount}% off`
                    : promo.type === "shipping"
                      ? "Free shipping"
                      : `₹${promo.discount} off`}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRemovePromo(promo.code)}
                className="h-6 w-6 p-0 text-green-600 hover:text-green-800"
                aria-label={`Remove promo code ${promo.code}`}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Add new promo code */}
      <div className="flex space-x-2">
        <Input
          placeholder="Enter promo code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
          onKeyPress={(e) => e.key === "Enter" && handleApplyPromo()}
          className="flex-1"
          disabled={isApplying}
        />
        <Button
          onClick={handleApplyPromo}
          disabled={!promoCode.trim() || isApplying}
          size="sm"
          className="bg-green-600 hover:bg-green-700"
        >
          {isApplying ? <Loader2 className="h-4 w-4 animate-spin" /> : "Apply"}
        </Button>
      </div>

      {/* Sample promo codes hint */}
      <div className="text-xs text-muted-foreground">Try: SAVE10, FLAT50, FREESHIP, NEWUSER, BULK20</div>
    </div>
  )
}
