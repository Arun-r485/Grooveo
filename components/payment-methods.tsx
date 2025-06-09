"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { CreditCard, CheckCircle2, AlertCircle, Info, Smartphone, Wallet, Truck, Lock, ShieldCheck } from "lucide-react"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface PaymentMethodsProps {
  selectedMethod: string
  onMethodChange: (method: string) => void
  paymentData: any
  onDataChange: (data: any) => void
  orderTotal: number
}

export function PaymentMethods({
  selectedMethod,
  onMethodChange,
  paymentData,
  onDataChange,
  orderTotal,
}: PaymentMethodsProps) {
  const [cardErrors, setCardErrors] = useState<{
    cardNumber?: string
    expiryDate?: string
    cvv?: string
    cardholderName?: string
  }>({})

  const [upiErrors, setUpiErrors] = useState<{
    upiId?: string
  }>({})

  // Handle card input changes
  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Clear error when user types
    if (cardErrors[name as keyof typeof cardErrors]) {
      setCardErrors({
        ...cardErrors,
        [name]: undefined,
      })
    }

    // Format card number with spaces
    if (name === "cardNumber") {
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
      onDataChange({ ...paymentData, [name]: formatted })
      return
    }

    // Format expiry date with slash
    if (name === "expiryDate") {
      let formatted = value.replace(/\D/g, "")
      if (formatted.length > 2) {
        formatted = `${formatted.slice(0, 2)}/${formatted.slice(2, 4)}`
      }
      onDataChange({ ...paymentData, [name]: formatted })
      return
    }

    onDataChange({ ...paymentData, [name]: value })
  }

  // Validate card details
  const validateCard = () => {
    const errors: {
      cardNumber?: string
      expiryDate?: string
      cvv?: string
      cardholderName?: string
    } = {}

    // Card number validation
    if (!paymentData.cardNumber) {
      errors.cardNumber = "Card number is required"
    } else if (paymentData.cardNumber.replace(/\s/g, "").length !== 16) {
      errors.cardNumber = "Card number must be 16 digits"
    }

    // Expiry date validation
    if (!paymentData.expiryDate) {
      errors.expiryDate = "Expiry date is required"
    } else {
      const [month, year] = paymentData.expiryDate.split("/")
      const currentYear = new Date().getFullYear() % 100
      const currentMonth = new Date().getMonth() + 1

      if (
        Number.parseInt(year) < currentYear ||
        (Number.parseInt(year) === currentYear && Number.parseInt(month) < currentMonth)
      ) {
        errors.expiryDate = "Card has expired"
      }
    }

    // CVV validation
    if (!paymentData.cvv) {
      errors.cvv = "CVV is required"
    } else if (paymentData.cvv.length < 3) {
      errors.cvv = "CVV must be 3-4 digits"
    }

    // Cardholder name validation
    if (!paymentData.cardholderName) {
      errors.cardholderName = "Cardholder name is required"
    }

    setCardErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle UPI input changes
  const handleUpiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Clear error when user types
    if (upiErrors.upiId) {
      setUpiErrors({ upiId: undefined })
    }

    onDataChange({ ...paymentData, [name]: value })
  }

  // Validate UPI ID
  const validateUpiId = () => {
    const errors: { upiId?: string } = {}

    if (!paymentData.upiId) {
      errors.upiId = "UPI ID is required"
    } else if (!paymentData.upiId.includes("@")) {
      errors.upiId = "Invalid UPI ID format"
    }

    setUpiErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle UPI app selection
  const handleUpiAppSelect = (app: string) => {
    onDataChange({
      ...paymentData,
      upiMethod: "app",
      upiApp: app,
    })
  }

  // Handle wallet selection
  const handleWalletSelect = (wallet: string) => {
    onDataChange({
      ...paymentData,
      wallet,
    })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium">Payment Method</h2>

      <Tabs defaultValue="card" value={selectedMethod || "card"} onValueChange={onMethodChange} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="card" className="flex flex-col items-center py-2 sm:flex-row sm:py-1">
            <CreditCard className="h-4 w-4 mr-0 mb-1 sm:mr-2 sm:mb-0" />
            <span className="text-xs sm:text-sm">Card</span>
          </TabsTrigger>
          <TabsTrigger value="upi" className="flex flex-col items-center py-2 sm:flex-row sm:py-1">
            <Smartphone className="h-4 w-4 mr-0 mb-1 sm:mr-2 sm:mb-0" />
            <span className="text-xs sm:text-sm">UPI</span>
          </TabsTrigger>
          <TabsTrigger value="wallet" className="flex flex-col items-center py-2 sm:flex-row sm:py-1">
            <Wallet className="h-4 w-4 mr-0 mb-1 sm:mr-2 sm:mb-0" />
            <span className="text-xs sm:text-sm">Wallet</span>
          </TabsTrigger>
          <TabsTrigger value="cod" className="flex flex-col items-center py-2 sm:flex-row sm:py-1">
            <Truck className="h-4 w-4 mr-0 mb-1 sm:mr-2 sm:mb-0" />
            <span className="text-xs sm:text-sm">COD</span>
          </TabsTrigger>
        </TabsList>

        {/* Credit/Debit Card */}
        <TabsContent value="card" className="space-y-4 pt-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="cardNumber">Card Number</Label>
              <div className="flex space-x-1">
                <Image
                  src="/placeholder.svg?height=24&width=36"
                  alt="Visa"
                  width={36}
                  height={24}
                  className="h-6 w-auto"
                />
                <Image
                  src="/placeholder.svg?height=24&width=36"
                  alt="Mastercard"
                  width={36}
                  height={24}
                  className="h-6 w-auto"
                />
                <Image
                  src="/placeholder.svg?height=24&width=36"
                  alt="RuPay"
                  width={36}
                  height={24}
                  className="h-6 w-auto"
                />
              </div>
            </div>
            <div className="relative">
              <Input
                id="cardNumber"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={paymentData.cardNumber || ""}
                onChange={handleCardChange}
                maxLength={19}
                className={cardErrors.cardNumber ? "border-red-500" : ""}
                aria-invalid={!!cardErrors.cardNumber}
                aria-describedby={cardErrors.cardNumber ? "cardNumber-error" : undefined}
              />
              <CreditCard className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground" />
            </div>
            {cardErrors.cardNumber && (
              <p id="cardNumber-error" className="text-xs text-red-500 flex items-center mt-1">
                <AlertCircle className="h-3 w-3 mr-1" />
                {cardErrors.cardNumber}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                value={paymentData.expiryDate || ""}
                onChange={handleCardChange}
                maxLength={5}
                className={cardErrors.expiryDate ? "border-red-500" : ""}
                aria-invalid={!!cardErrors.expiryDate}
                aria-describedby={cardErrors.expiryDate ? "expiryDate-error" : undefined}
              />
              {cardErrors.expiryDate && (
                <p id="expiryDate-error" className="text-xs text-red-500 flex items-center mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {cardErrors.expiryDate}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="cvv">CVV</Label>
                <div className="group relative">
                  <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  <div className="absolute bottom-full right-0 mb-2 w-48 rounded bg-black p-2 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                    The 3 or 4 digit security code on the back of your card
                  </div>
                </div>
              </div>
              <Input
                id="cvv"
                name="cvv"
                type="password"
                placeholder="123"
                value={paymentData.cvv || ""}
                onChange={handleCardChange}
                maxLength={4}
                className={cardErrors.cvv ? "border-red-500" : ""}
                aria-invalid={!!cardErrors.cvv}
                aria-describedby={cardErrors.cvv ? "cvv-error" : undefined}
              />
              {cardErrors.cvv && (
                <p id="cvv-error" className="text-xs text-red-500 flex items-center mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {cardErrors.cvv}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cardholderName">Name on Card</Label>
            <Input
              id="cardholderName"
              name="cardholderName"
              placeholder="John Doe"
              value={paymentData.cardholderName || ""}
              onChange={handleCardChange}
              className={cardErrors.cardholderName ? "border-red-500" : ""}
              aria-invalid={!!cardErrors.cardholderName}
              aria-describedby={cardErrors.cardholderName ? "cardholderName-error" : undefined}
            />
            {cardErrors.cardholderName && (
              <p id="cardholderName-error" className="text-xs text-red-500 flex items-center mt-1">
                <AlertCircle className="h-3 w-3 mr-1" />
                {cardErrors.cardholderName}
              </p>
            )}
          </div>

          <div className="flex items-center justify-center space-x-2 pt-2">
            <Lock className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Your payment information is secure</span>
          </div>
        </TabsContent>

        {/* UPI */}
        <TabsContent value="upi" className="space-y-4 pt-4">
          <RadioGroup
            defaultValue="id"
            value={paymentData.upiMethod || "id"}
            onValueChange={(value) => onDataChange({ ...paymentData, upiMethod: value })}
            className="space-y-3"
          >
            <div className="flex items-start space-x-2 border p-4 rounded-lg">
              <RadioGroupItem value="id" id="upi-id" className="mt-1" />
              <div className="space-y-2 flex-1">
                <Label htmlFor="upi-id" className="font-medium cursor-pointer">
                  Enter UPI ID
                </Label>
                <Input
                  id="upiId"
                  name="upiId"
                  placeholder="yourname@upi"
                  value={paymentData.upiId || ""}
                  onChange={handleUpiChange}
                  disabled={paymentData.upiMethod !== "id"}
                  className={upiErrors.upiId ? "border-red-500" : ""}
                  aria-invalid={!!upiErrors.upiId}
                  aria-describedby={upiErrors.upiId ? "upiId-error" : undefined}
                />
                {upiErrors.upiId && (
                  <p id="upiId-error" className="text-xs text-red-500 flex items-center mt-1">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {upiErrors.upiId}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Enter your UPI ID to pay securely through your preferred UPI app.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-2 border p-4 rounded-lg">
              <RadioGroupItem value="app" id="upi-app" className="mt-1" />
              <div className="space-y-3 flex-1">
                <Label htmlFor="upi-app" className="font-medium cursor-pointer">
                  Choose UPI App
                </Label>
                <div className="grid grid-cols-4 gap-3">
                  {["Google Pay", "PhonePe", "Paytm", "BHIM"].map((app) => (
                    <button
                      key={app}
                      type="button"
                      onClick={() => handleUpiAppSelect(app)}
                      disabled={paymentData.upiMethod !== "app"}
                      className={`flex flex-col items-center justify-center p-3 border rounded-lg transition-all ${
                        paymentData.upiMethod === "app" && paymentData.upiApp === app
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 hover:border-gray-300"
                      } ${paymentData.upiMethod !== "app" ? "opacity-50" : ""}`}
                    >
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt={app}
                          width={40}
                          height={40}
                          className="h-8 w-8 rounded-full"
                        />
                      </div>
                      <span className="text-xs">{app}</span>
                      {paymentData.upiMethod === "app" && paymentData.upiApp === app && (
                        <CheckCircle2 className="h-4 w-4 text-green-500 absolute top-1 right-1" />
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">
                  You'll receive a payment request in your selected UPI app.
                </p>
              </div>
            </div>
          </RadioGroup>
        </TabsContent>

        {/* Wallets */}
        <TabsContent value="wallet" className="space-y-4 pt-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { name: "Amazon Pay", balance: "₹2,500" },
              { name: "Paytm", balance: "₹1,200" },
              { name: "PhonePe", balance: "₹800" },
              { name: "Google Pay", balance: "₹1,500" },
            ].map((wallet) => (
              <button
                key={wallet.name}
                type="button"
                onClick={() => handleWalletSelect(wallet.name)}
                className={`relative flex flex-col items-center justify-center p-4 border rounded-lg transition-all ${
                  paymentData.wallet === wallet.name
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                  <Image
                    src="/placeholder.svg?height=48&width=48"
                    alt={wallet.name}
                    width={48}
                    height={48}
                    className="h-10 w-10 rounded-full"
                  />
                </div>
                <span className="text-sm font-medium">{wallet.name}</span>
                <span className="text-xs text-muted-foreground">{wallet.balance}</span>
                {paymentData.wallet === wallet.name && (
                  <CheckCircle2 className="h-5 w-5 text-green-500 absolute top-2 right-2" />
                )}
              </button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Link your wallet for faster checkout in future orders.</p>
        </TabsContent>

        {/* Cash on Delivery */}
        <TabsContent value="cod" className="space-y-4 pt-4">
          <div className="border rounded-lg p-4 space-y-3">
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                <Truck className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <h3 className="font-medium">Cash on Delivery</h3>
                <p className="text-sm text-muted-foreground">Pay with cash when your order is delivered.</p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded p-3">
              <p className="text-sm text-amber-800 flex items-start">
                <Info className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                <span>
                  A convenience fee of <strong>₹50</strong> will be added to your order total for Cash on Delivery.
                </span>
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="delivery-instructions">Delivery Instructions (Optional)</Label>
              <textarea
                id="delivery-instructions"
                name="deliveryInstructions"
                placeholder="Any special instructions for delivery"
                value={paymentData.deliveryInstructions || ""}
                onChange={(e) => onDataChange({ ...paymentData, deliveryInstructions: e.target.value })}
                className="w-full min-h-[80px] p-2 border rounded-md"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Security badges */}
      <div className="border-t pt-4 mt-6">
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="flex items-center">
            <Lock className="h-4 w-4 mr-1 text-gray-500" />
            <span className="text-xs text-gray-500">256-bit SSL Secure</span>
          </div>
          <div className="flex items-center">
            <ShieldCheck className="h-4 w-4 mr-1 text-gray-500" />
            <span className="text-xs text-gray-500">PCI DSS Compliant</span>
          </div>
          <div className="flex items-center">
            <CheckCircle2 className="h-4 w-4 mr-1 text-gray-500" />
            <span className="text-xs text-gray-500">Secure Payment</span>
          </div>
        </div>
      </div>
    </div>
  )
}
