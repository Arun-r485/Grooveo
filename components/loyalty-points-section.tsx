"use client"

import { useState } from "react"
import { Star, Gift, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useToast } from "@/hooks/use-toast"
import { useLoyalty } from "@/context/loyalty-context"

interface LoyaltyPointsSectionProps {
  loyaltyDiscount: number
  onApplyLoyalty: (discount: number) => void
  orderTotal: number
}

export function LoyaltyPointsSection({ loyaltyDiscount, onApplyLoyalty, orderTotal }: LoyaltyPointsSectionProps) {
  const { points, redeemPoints, getPointsValue } = useLoyalty()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedPoints, setSelectedPoints] = useState(0)
  const { toast } = useToast()

  const minRedemption = 100 // Minimum 100 points
  const maxRedemption = Math.min(points, Math.floor(orderTotal * 5)) // Max 50% of order value in points
  const maxDiscountValue = orderTotal * 0.5 // 50% of order total

  const handleApplyPoints = () => {
    if (selectedPoints < minRedemption) {
      toast({
        title: "Minimum redemption not met",
        description: `You need at least ${minRedemption} points to redeem.`,
        variant: "destructive",
      })
      return
    }

    const discountValue = getPointsValue(selectedPoints)
    const finalDiscount = Math.min(discountValue, maxDiscountValue)

    if (redeemPoints(selectedPoints, `Redeemed for order discount`)) {
      onApplyLoyalty(finalDiscount)
      setSelectedPoints(0)
      toast({
        title: "Points redeemed successfully!",
        description: `You saved ₹${finalDiscount.toFixed(2)} using ${selectedPoints} loyalty points.`,
      })
    } else {
      toast({
        title: "Redemption failed",
        description: "Unable to redeem points. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleRemovePoints = () => {
    // Add points back (reverse the redemption)
    const pointsToReturn = Math.ceil(loyaltyDiscount / 0.1) // Convert discount back to points
    onApplyLoyalty(0)
    toast({
      title: "Loyalty discount removed",
      description: "Your loyalty points discount has been removed.",
    })
  }

  if (points === 0) {
    return (
      <div className="bg-amber-50 p-3 rounded-md border border-amber-200">
        <div className="flex items-center space-x-2">
          <Star className="h-4 w-4 text-amber-600" />
          <span className="text-sm font-medium text-amber-800">Loyalty Points</span>
        </div>
        <p className="text-xs text-amber-700 mt-1">
          You don't have any loyalty points yet. Earn points with every purchase!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-between p-0 h-auto">
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-medium">Loyalty Points</span>
              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                {points} points
              </Badge>
            </div>
            <div className="flex items-center space-x-1">
              {loyaltyDiscount > 0 && (
                <Badge className="bg-green-100 text-green-800">₹{loyaltyDiscount.toFixed(2)} saved</Badge>
              )}
              <span className="text-xs text-muted-foreground">≈ ₹{getPointsValue(points).toFixed(2)}</span>
            </div>
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="space-y-3 pt-3">
          {loyaltyDiscount > 0 ? (
            // Show applied loyalty discount
            <div className="bg-green-50 p-3 rounded-md border border-green-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Gift className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">
                    ₹{loyaltyDiscount.toFixed(2)} discount applied
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemovePoints}
                  className="text-green-600 hover:text-green-800 h-6 px-2"
                >
                  Remove
                </Button>
              </div>
              <p className="text-xs text-green-700 mt-1">
                You used {Math.ceil(loyaltyDiscount / 0.1)} loyalty points for this discount.
              </p>
            </div>
          ) : (
            // Show redemption interface
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>100 points = ₹10</span>
                <span>Available: {points} points</span>
              </div>

              {points >= minRedemption ? (
                <>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Points to redeem:</span>
                      <span className="text-sm font-medium">
                        {selectedPoints} points = ₹{getPointsValue(selectedPoints).toFixed(2)}
                      </span>
                    </div>
                    <Slider
                      value={[selectedPoints]}
                      onValueChange={(value) => setSelectedPoints(value[0])}
                      max={maxRedemption}
                      min={0}
                      step={10}
                      className="w-full"
                    />
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedPoints(minRedemption)}
                      className="flex-1"
                    >
                      Min (₹{getPointsValue(minRedemption).toFixed(2)})
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedPoints(Math.floor(maxRedemption / 2))}
                      className="flex-1"
                    >
                      Half
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedPoints(maxRedemption)}
                      className="flex-1"
                    >
                      Max
                    </Button>
                  </div>

                  <Button
                    onClick={handleApplyPoints}
                    disabled={selectedPoints < minRedemption}
                    size="sm"
                    className="w-full bg-amber-600 hover:bg-amber-700"
                  >
                    Redeem {selectedPoints} Points
                  </Button>

                  <div className="flex items-start space-x-2 text-xs text-muted-foreground">
                    <Info className="h-3 w-3 mt-0.5 flex-shrink-0" />
                    <span>
                      Minimum {minRedemption} points required. Maximum 50% of order value can be paid with points.
                    </span>
                  </div>
                </>
              ) : (
                <div className="text-center py-2">
                  <p className="text-sm text-muted-foreground">You need at least {minRedemption} points to redeem.</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Earn {minRedemption - points} more points to start redeeming!
                  </p>
                </div>
              )}
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
