"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface LoyaltyTransaction {
  id: string
  type: "earned" | "redeemed"
  points: number
  description: string
  date: Date
}

interface LoyaltyContextType {
  points: number
  transactions: LoyaltyTransaction[]
  earnPoints: (points: number, description: string) => void
  redeemPoints: (points: number, description: string) => boolean
  getPointsValue: (points: number) => number
}

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined)

export function LoyaltyProvider({ children }: { children: ReactNode }) {
  const [points, setPoints] = useState(0)
  const [transactions, setTransactions] = useState<LoyaltyTransaction[]>([])

  // Load loyalty data from localStorage on mount
  useEffect(() => {
    const savedPoints = localStorage.getItem("loyalty-points")
    const savedTransactions = localStorage.getItem("loyalty-transactions")

    if (savedPoints) {
      setPoints(Number.parseInt(savedPoints, 10))
    }

    if (savedTransactions) {
      try {
        const parsedTransactions = JSON.parse(savedTransactions).map((t: any) => ({
          ...t,
          date: new Date(t.date),
        }))
        setTransactions(parsedTransactions)
      } catch (error) {
        console.error("Error parsing loyalty transactions:", error)
      }
    }
  }, [])

  // Save to localStorage whenever points or transactions change
  useEffect(() => {
    localStorage.setItem("loyalty-points", points.toString())
  }, [points])

  useEffect(() => {
    localStorage.setItem("loyalty-transactions", JSON.stringify(transactions))
  }, [transactions])

  const earnPoints = (pointsToEarn: number, description: string) => {
    const transaction: LoyaltyTransaction = {
      id: `earn-${Date.now()}`,
      type: "earned",
      points: pointsToEarn,
      description,
      date: new Date(),
    }

    setPoints((prev) => prev + pointsToEarn)
    setTransactions((prev) => [transaction, ...prev])
  }

  const redeemPoints = (pointsToRedeem: number, description: string): boolean => {
    if (points < pointsToRedeem) {
      return false // Not enough points
    }

    const transaction: LoyaltyTransaction = {
      id: `redeem-${Date.now()}`,
      type: "redeemed",
      points: pointsToRedeem,
      description,
      date: new Date(),
    }

    setPoints((prev) => prev - pointsToRedeem)
    setTransactions((prev) => [transaction, ...prev])
    return true
  }

  const getPointsValue = (pointsAmount: number): number => {
    // 100 points = ₹10, so 1 point = ₹0.10
    return pointsAmount * 0.1
  }

  return (
    <LoyaltyContext.Provider
      value={{
        points,
        transactions,
        earnPoints,
        redeemPoints,
        getPointsValue,
      }}
    >
      {children}
    </LoyaltyContext.Provider>
  )
}

export function useLoyalty() {
  const context = useContext(LoyaltyContext)
  if (context === undefined) {
    throw new Error("useLoyalty must be used within a LoyaltyProvider")
  }
  return context
}
