interface PromoCode {
  code: string
  discount: number
  type: "percentage" | "fixed" | "shipping"
  description: string
  minOrderValue?: number
  maxDiscount?: number
  expiryDate?: Date
  isActive: boolean
}

const promoCodes: PromoCode[] = [
  {
    code: "SAVE10",
    discount: 10,
    type: "percentage",
    description: "10% off on all orders",
    maxDiscount: 500,
    isActive: true,
  },
  {
    code: "FLAT50",
    discount: 50,
    type: "fixed",
    description: "₹50 off on orders above ₹500",
    minOrderValue: 500,
    isActive: true,
  },
  {
    code: "FREESHIP",
    discount: 0,
    type: "shipping",
    description: "Free shipping on all orders",
    isActive: true,
  },
  {
    code: "NEWUSER",
    discount: 15,
    type: "percentage",
    description: "15% off for new users",
    maxDiscount: 750,
    isActive: true,
  },
  {
    code: "BULK20",
    discount: 20,
    type: "percentage",
    description: "20% off on orders above ₹1000",
    minOrderValue: 1000,
    maxDiscount: 1000,
    isActive: true,
  },
]

export function validatePromoCode(code: string): PromoCode | null {
  const promo = promoCodes.find((p) => p.code === code.toUpperCase() && p.isActive)

  if (!promo) {
    return null
  }

  // Check if promo code has expired
  if (promo.expiryDate && promo.expiryDate < new Date()) {
    return null
  }

  return promo
}

export function getAvailablePromoCodes(): PromoCode[] {
  return promoCodes.filter((promo) => promo.isActive)
}
