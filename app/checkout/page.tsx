"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from "@/context/cart-context"
import { useRouter } from "next/navigation"
import { CarbonImpactVisualization } from "@/components/carbon-impact-visualization"
import { calculateCarbonImpact } from "@/lib/carbon-impact"
import { allProducts } from "@/lib/products"
import { PaymentMethods } from "@/components/payment-methods"

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const [step, setStep] = useState<"information" | "shipping" | "payment" | "confirmation">("information")
  const router = useRouter()
  const [orderImpact, setOrderImpact] = useState(null)
  const [appliedPromos, setAppliedPromos] = useState<
    Array<{ code: string; discount: number; type: "percentage" | "fixed" | "shipping" }>
  >([])
  const [loyaltyDiscount, setLoyaltyDiscount] = useState(0)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("")
  const [paymentData, setPaymentData] = useState<any>({})

  // Shipping cost calculation (converted to INR)
  const baseShippingCost = subtotal > 4150 ? 0 : 497
  const hasShippingPromo = appliedPromos.some((promo) => promo.type === "shipping")
  const shippingCost = hasShippingPromo ? 0 : baseShippingCost

  // Calculate promo discounts
  const promoDiscount = appliedPromos.reduce((total, promo) => {
    if (promo.type === "percentage") {
      return total + (subtotal * promo.discount) / 100
    } else if (promo.type === "fixed") {
      return total + promo.discount
    }
    return total
  }, 0)

  const totalDiscount = promoDiscount + loyaltyDiscount
  const discountedSubtotal = Math.max(0, subtotal - totalDiscount)
  const tax = discountedSubtotal * 0.18 // 18% GST rate for India
  const total = discountedSubtotal + shippingCost + tax

  useEffect(() => {
    if (step === "confirmation") {
      // Calculate carbon impact when order is confirmed
      const impact = calculateCarbonImpact(
        items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image || "/placeholder.svg?height=80&width=80",
        })),
        allProducts,
      )
      setOrderImpact(impact)

      // Award loyalty points for the purchase (if we had a loyalty system)
      const pointsEarned = Math.floor(total / 10) // 1 point per ₹10 spent
      // This would call earnPoints if we had the loyalty context
      // earnPoints(pointsEarned, `Order #ECO-${Math.floor(Math.random() * 10000)}`)
    }
  }, [step, items, total])

  const handleSubmitInformation = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("shipping")
  }

  const handleSubmitShipping = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("payment")
  }

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate payment method selection
    if (!selectedPaymentMethod) {
      alert("Please select a payment method")
      return
    }

    // Additional validation based on payment method
    if (selectedPaymentMethod === "card") {
      if (!paymentData.cardNumber || !paymentData.expiryDate || !paymentData.cvv || !paymentData.cardholderName) {
        alert("Please fill in all card details")
        return
      }
    } else if (selectedPaymentMethod === "upi" && paymentData.upiMethod === "id") {
      if (!paymentData.upiId) {
        alert("Please enter your UPI ID")
        return
      }
    }

    setStep("confirmation")
    // In a real app, you would process the payment here
  }

  const handleCompleteOrder = () => {
    clearCart()
    router.push("/")
  }

  if (items.length === 0) {
    return (
      <div className="container max-w-6xl py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Add some items to your cart before checking out.</p>
        <Link href="/products">
          <Button className="bg-green-600 hover:bg-green-700">Browse Products</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="container max-w-6xl py-8">
        {step === "confirmation" ? (
          <div className="bg-white p-8 rounded-lg shadow-sm max-w-2xl mx-auto">
            <div className="flex flex-col items-center text-center space-y-4 mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold">Order Confirmed!</h1>
              <p className="text-muted-foreground">
                Thank you for your order. We've received your payment and will process your order shortly.
              </p>
              <p className="font-medium">Order #ECO-{Math.floor(Math.random() * 10000)}</p>

              {/* Payment method confirmation */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 w-full">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-800">
                      Payment via{" "}
                      {selectedPaymentMethod === "card"
                        ? "Card"
                        : selectedPaymentMethod === "upi"
                          ? "UPI"
                          : selectedPaymentMethod === "wallet"
                            ? "Wallet"
                            : "Cash on Delivery"}{" "}
                      confirmed
                    </p>
                    <p className="text-sm text-blue-600">Amount: ₹{total.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Points earned notification */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 w-full">
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                    <span className="text-amber-600 font-bold text-sm">★</span>
                  </div>
                  <div>
                    <p className="font-medium text-amber-800">You earned {Math.floor(total / 10)} loyalty points!</p>
                    <p className="text-sm text-amber-600">Use them on your next purchase for discounts</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border rounded-lg p-4">
                <h2 className="font-medium mb-3">Order Summary</h2>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-3">
                        <div className="relative h-12 w-12 overflow-hidden rounded border bg-muted">
                          <Image
                            src={item.image || "/placeholder.svg?height=48&width=48"}
                            alt={`${item.name} - ${item.material || item.category} eco-friendly packaging`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span>
                          {item.name} × {item.quantity}
                        </span>
                      </div>
                      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    {totalDiscount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Total Savings</span>
                        <span>-₹{totalDiscount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span>Shipping</span>
                      <span>{shippingCost === 0 ? "Free" : `₹${shippingCost.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>GST (18%)</span>
                      <span>₹{tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>₹{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {orderImpact && (
                <div className="mt-8">
                  <h2 className="font-medium mb-3">Your Environmental Impact</h2>
                  <CarbonImpactVisualization impact={orderImpact} />

                  <div className="mt-4 text-center">
                    <Link href="/impact">
                      <Button variant="outline" size="sm">
                        View Your Total Environmental Impact
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

              <div className="flex justify-center mt-6">
                <Button onClick={handleCompleteOrder} className="bg-green-600 hover:bg-green-700">
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div className="flex items-center space-x-2">
                <Link
                  href="/products"
                  className="text-sm text-muted-foreground hover:text-foreground flex items-center"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Back to shopping
                </Link>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold">Checkout</h1>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        step === "information" || step === "shipping" || step === "payment"
                          ? "bg-green-600 text-white"
                          : "bg-gray-200"
                      }`}
                    >
                      1
                    </span>
                    <span className="text-xs text-muted-foreground">Information</span>
                    <span className="w-4 h-0.5 bg-gray-200"></span>
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        step === "shipping" || step === "payment" ? "bg-green-600 text-white" : "bg-gray-200"
                      }`}
                    >
                      2
                    </span>
                    <span className="text-xs text-muted-foreground">Shipping</span>
                    <span className="w-4 h-0.5 bg-gray-200"></span>
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        step === "payment" ? "bg-green-600 text-white" : "bg-gray-200"
                      }`}
                    >
                      3
                    </span>
                    <span className="text-xs text-muted-foreground">Payment</span>
                  </div>
                </div>

                {step === "information" && (
                  <form onSubmit={handleSubmitInformation} className="space-y-6">
                    <div className="space-y-4">
                      <h2 className="text-lg font-medium">Contact Information</h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="first-name">First Name</Label>
                          <Input id="first-name" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name">Last Name</Label>
                          <Input id="last-name" required />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" type="tel" placeholder="+91 98765 43210" required />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h2 className="text-lg font-medium">Shipping Address</h2>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                        <Input id="apartment" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input id="state" required />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="postal-code">PIN Code</Label>
                          <Input id="postal-code" placeholder="110001" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Input id="country" defaultValue="India" required />
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                      Continue to Shipping
                    </Button>
                  </form>
                )}

                {step === "shipping" && (
                  <form onSubmit={handleSubmitShipping} className="space-y-6">
                    <div className="space-y-4">
                      <h2 className="text-lg font-medium">Shipping Method</h2>
                      <RadioGroup defaultValue="standard" className="space-y-3">
                        <div className="flex items-center justify-between space-x-2 border p-4 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="standard" id="standard" />
                            <Label htmlFor="standard" className="font-normal cursor-pointer">
                              Standard Shipping (3-5 business days)
                            </Label>
                          </div>
                          <div className="font-medium">
                            {baseShippingCost === 0 ? "Free" : `₹${baseShippingCost.toFixed(2)}`}
                          </div>
                        </div>
                        <div className="flex items-center justify-between space-x-2 border p-4 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="express" id="express" />
                            <Label htmlFor="express" className="font-normal cursor-pointer">
                              Express Shipping (1-2 business days)
                            </Label>
                          </div>
                          <div className="font-medium">₹1,078</div>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setStep("information")}>
                        Back to Information
                      </Button>
                      <Button type="submit" className="bg-green-600 hover:bg-green-700">
                        Continue to Payment
                      </Button>
                    </div>
                  </form>
                )}

                {step === "payment" && (
                  <form onSubmit={handleSubmitPayment} className="space-y-6">
                    <PaymentMethods
                      selectedMethod={selectedPaymentMethod}
                      onMethodChange={setSelectedPaymentMethod}
                      paymentData={paymentData}
                      onDataChange={setPaymentData}
                      orderTotal={total}
                    />

                    <div className="space-y-4">
                      <h2 className="text-lg font-medium">Billing Address</h2>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="same-as-shipping"
                          className="rounded border-gray-300"
                          defaultChecked
                        />
                        <Label htmlFor="same-as-shipping" className="font-normal cursor-pointer">
                          Same as shipping address
                        </Label>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button type="button" variant="outline" onClick={() => setStep("shipping")}>
                        Back to Shipping
                      </Button>
                      <Button type="submit" className="bg-green-600 hover:bg-green-700">
                        Complete Order
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                <div className="space-y-4">
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

                  <div className="border-t pt-3 mt-3">
                    <div className="space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-sm">Subtotal</span>
                        <span className="text-sm font-medium">₹{subtotal.toFixed(2)}</span>
                      </div>
                      {totalDiscount > 0 && (
                        <div className="flex justify-between text-sm text-green-600">
                          <span>Discount</span>
                          <span>-₹{totalDiscount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-sm">Shipping</span>
                        <span className="text-sm font-medium">
                          {shippingCost === 0 ? "Free" : `₹${shippingCost.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">GST (18%)</span>
                        <span className="text-sm font-medium">₹{tax.toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between font-medium">
                          <span>Total</span>
                          <span>₹{total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <h3 className="text-sm font-medium text-green-800 mb-2">Eco-Friendly Packaging</h3>
                <p className="text-xs text-green-700">
                  All orders are packed with our eco-conscious materials. By choosing our products, you're helping
                  reduce plastic waste and carbon emissions.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
