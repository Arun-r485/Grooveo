"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Info } from "lucide-react"
import { CarbonImpactVisualization } from "@/components/carbon-impact-visualization"
import { calculateCarbonImpact } from "@/lib/carbon-impact"
import { orders } from "@/lib/orders"
import { allProducts } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ImpactPage() {
  const [totalImpact, setTotalImpact] = useState(calculateCarbonImpact([], []))
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Calculate total impact from all orders
    const allOrderItems = orders.flatMap((order) => order.items)
    const impact = calculateCarbonImpact(allOrderItems, allProducts)
    setTotalImpact(impact)
    setIsLoaded(true)
  }, [])

  // Calculate impact for each order
  const orderImpacts = orders.map((order) => ({
    order,
    impact: calculateCarbonImpact(order.items, allProducts),
  }))

  return (
    <div className="container max-w-4xl py-8">
      <div className="flex items-center mb-6">
        <Link href="/" className="text-sm text-muted-foreground hover:text-foreground flex items-center mr-4">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to home
        </Link>
        <h1 className="text-2xl font-bold">Your Environmental Impact</h1>
      </div>

      {isLoaded ? (
        <>
          <CarbonImpactVisualization impact={totalImpact} className="mb-8" />

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Info className="h-5 w-5 mr-2 text-teal-600" />
                How We Calculate Your Impact
              </CardTitle>
              <CardDescription>
                Understanding the environmental benefits of your eco-friendly packaging choices
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <p>
                At Grooveo, we're committed to transparency in how we calculate the environmental impact of your
                purchases. Our calculations are based on scientific research comparing traditional packaging materials
                with our eco-friendly alternatives.
              </p>
              <div className="space-y-2">
                <h4 className="font-medium">Our calculation factors include:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Material composition and sourcing</li>
                  <li>Manufacturing process emissions</li>
                  <li>End-of-life decomposition or recycling potential</li>
                  <li>Water usage in production</li>
                  <li>Plastic reduction compared to conventional alternatives</li>
                </ul>
              </div>
              <p>
                We regularly update our impact calculations based on the latest research and life cycle assessments.
                While these figures are estimates, they provide a meaningful representation of the positive difference
                your choices make.
              </p>
            </CardContent>
          </Card>

          <Tabs defaultValue="all-time">
            <TabsList className="mb-4">
              <TabsTrigger value="all-time">All-Time Impact</TabsTrigger>
              <TabsTrigger value="by-order">Impact By Order</TabsTrigger>
            </TabsList>

            <TabsContent value="all-time">
              <Card>
                <CardHeader>
                  <CardTitle>Your Cumulative Environmental Impact</CardTitle>
                  <CardDescription>
                    The total positive impact from all your eco-friendly packaging purchases
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-teal-50 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-teal-700">{totalImpact.carbonSaved.toFixed(2)}</div>
                      <div className="text-sm text-teal-600">kg CO₂ saved</div>
                    </div>

                    <div className="bg-teal-50 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-teal-700">{totalImpact.plasticReduced}</div>
                      <div className="text-sm text-teal-600">g plastic reduced</div>
                    </div>

                    <div className="bg-teal-50 rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-teal-700">{totalImpact.waterSaved}</div>
                      <div className="text-sm text-teal-600">liters of water saved</div>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground mb-4">
                      Your eco-friendly choices have made a significant positive impact on our planet. Keep up the great
                      work!
                    </p>
                    <Link href="/products">
                      <Button className="bg-teal-600 hover:bg-teal-700">Shop More Eco-Friendly Products</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="by-order">
              <div className="space-y-4">
                {orderImpacts.map(({ order, impact }) => (
                  <Card key={order.id}>
                    <CardHeader>
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <CardDescription>{order.date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                        <div className="bg-teal-50 rounded p-2">
                          <div className="text-lg font-bold text-teal-700">{impact.carbonSaved.toFixed(2)}</div>
                          <div className="text-xs text-teal-600">kg CO₂ saved</div>
                        </div>
                        <div className="bg-teal-50 rounded p-2">
                          <div className="text-lg font-bold text-teal-700">{impact.treesEquivalent}</div>
                          <div className="text-xs text-teal-600">trees equivalent</div>
                        </div>
                        <div className="bg-teal-50 rounded p-2">
                          <div className="text-lg font-bold text-teal-700">{impact.plasticReduced}</div>
                          <div className="text-xs text-teal-600">g plastic reduced</div>
                        </div>
                        <div className="bg-teal-50 rounded p-2">
                          <div className="text-lg font-bold text-teal-700">{impact.waterSaved}</div>
                          <div className="text-xs text-teal-600">liters water saved</div>
                        </div>
                      </div>
                      <div className="mt-4 text-right">
                        <Link href={`/account/orders/${order.id}`}>
                          <Button variant="outline" size="sm">
                            View Order Details
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
        </div>
      )}
    </div>
  )
}
