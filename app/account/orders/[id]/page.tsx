"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { User, Settings, ShoppingBag, Heart, LogOut, ArrowLeft, ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/context/auth-context"
import { getOrderById, getStatusColor, getStatusLabel, type OrderStatus } from "@/lib/orders"
import { OrderStatusTimeline } from "@/components/order-status-timeline"
import { OrderStatusProgress } from "@/components/order-status-progress"
import { useNotifications } from "@/context/notification-context"
import { generateOrderStatusNotification } from "@/lib/order-notifications"
import { NotificationBell } from "@/components/notification-bell"

// Demo component to simulate order status updates
function OrderStatusUpdater({ order, onUpdate }: { order: any; onUpdate: (status: OrderStatus) => void }) {
  const nextStatuses: Record<OrderStatus, OrderStatus[]> = {
    pending: ["processing", "cancelled"],
    processing: ["shipped", "cancelled"],
    shipped: ["out_for_delivery", "cancelled"],
    out_for_delivery: ["delivered", "cancelled"],
    delivered: ["returned"],
    cancelled: ["processing"], // Allow reactivation
    returned: [],
  }

  const availableStatuses = nextStatuses[order.status] || []

  if (availableStatuses.length === 0) {
    return null
  }

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
      <p className="text-sm text-gray-500 mb-2">
        <strong>Demo:</strong> Update order status to simulate notifications
      </p>
      <div className="flex flex-wrap gap-2">
        {availableStatuses.map((status) => (
          <Button
            key={status}
            variant="outline"
            size="sm"
            className={getStatusColor(status).replace("hover:bg-", "hover:bg-gray-100 ")}
            onClick={() => onUpdate(status)}
          >
            {getStatusLabel(status)}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const { user, isLoading, logout } = useAuth()
  const router = useRouter()
  const { addNotification } = useNotifications()
  const [orderData, setOrderData] = useState<any>(null)

  // Get order details
  useEffect(() => {
    const order = getOrderById(params.id)
    setOrderData(order)
  }, [params.id])

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  // Redirect if order not found
  useEffect(() => {
    if (!isLoading && !orderData) {
      router.push("/account/orders")
    }
  }, [orderData, isLoading, router])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  // Handle order status update (demo function)
  const handleStatusUpdate = (newStatus: OrderStatus) => {
    if (!orderData) return

    // Create a copy of the order with the new status
    const updatedOrder = {
      ...orderData,
      status: newStatus,
      statusUpdates: [
        ...orderData.statusUpdates,
        {
          status: newStatus,
          timestamp: new Date().toISOString(),
          message: `Order ${getStatusLabel(newStatus).toLowerCase()}`,
          location: newStatus === "out_for_delivery" ? "Local Delivery Facility, Green City" : undefined,
        },
      ],
    }

    // Update the order data
    setOrderData(updatedOrder)

    // Generate and send notification
    const notification = generateOrderStatusNotification(updatedOrder, newStatus)
    addNotification(notification)
  }

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Order not found</h1>
          <p className="text-gray-500 mb-4">
            The order you're looking for doesn't exist or you don't have access to it.
          </p>
          <Link href="/account/orders">
            <Button className="bg-green-600 hover:bg-green-700">Back to Orders</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container px-4 py-4 md:px-6 md:py-8">
        {/* Mobile Header */}
        <div className="md:hidden mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <Link href="/account/orders" className="flex items-center text-sm text-gray-500 hover:text-gray-900">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Orders
            </Link>
          </div>

          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <User className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h2 className="font-medium text-lg">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Desktop Sidebar - Hidden on Mobile */}
          <aside className="hidden md:block w-full md:w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <User className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h2 className="font-medium">{user.name}</h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
              <nav className="space-y-1">
                <Link
                  href="/account"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100"
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
                <Link
                  href="/account/orders"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md bg-green-50 text-green-600"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Orders</span>
                </Link>
                <Link
                  href="/account/notifications"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100"
                >
                  <NotificationBell />
                  <span>Notifications</span>
                </Link>
                <Link
                  href="/account/wishlist"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100"
                >
                  <Heart className="h-4 w-4" />
                  <span>Wishlist</span>
                </Link>
                <Link
                  href="/account/settings"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100"
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-3 py-2 text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Log out</span>
                </Button>
              </nav>
            </div>
          </aside>

          <div className="flex-1 min-w-0 pb-20 md:pb-0">
            <div className="hidden md:flex items-center gap-2 mb-6">
              <Link href="/account/orders" className="flex items-center text-sm text-gray-500 hover:text-gray-900">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Orders
              </Link>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-lg border mb-4 md:mb-6">
              <div className="flex flex-col space-y-3 mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-lg md:text-2xl font-bold">Order #{orderData.id}</h1>
                    <p className="text-xs md:text-sm text-gray-500">Placed on {orderData.date}</p>
                  </div>
                  <Badge className={`${getStatusColor(orderData.status)} text-xs`}>
                    {getStatusLabel(orderData.status)}
                  </Badge>
                </div>
              </div>

              <OrderStatusProgress currentStatus={orderData.status} />

              <OrderStatusUpdater order={orderData} onUpdate={handleStatusUpdate} />

              <div className="grid grid-cols-1 gap-4 md:gap-6 mt-6">
                <div>
                  <h3 className="text-base md:text-lg font-medium mb-3">Shipping Information</h3>
                  <Card>
                    <CardContent className="p-4">
                      <p className="font-medium text-sm md:text-base">{orderData.shippingAddress.name}</p>
                      <p className="text-sm md:text-base">{orderData.shippingAddress.street}</p>
                      <p className="text-sm md:text-base">
                        {orderData.shippingAddress.city}, {orderData.shippingAddress.state}{" "}
                        {orderData.shippingAddress.postalCode}
                      </p>
                      <p className="text-sm md:text-base">{orderData.shippingAddress.country}</p>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h3 className="text-base md:text-lg font-medium mb-3">Delivery Details</h3>
                  <Card>
                    <CardContent className="p-4 space-y-3">
                      {orderData.estimatedDelivery && (
                        <div>
                          <p className="text-xs md:text-sm text-gray-500">Estimated Delivery</p>
                          <p className="font-medium text-sm md:text-base">{orderData.estimatedDelivery}</p>
                        </div>
                      )}

                      {orderData.trackingNumber && (
                        <div>
                          <p className="text-xs md:text-sm text-gray-500">Tracking Number</p>
                          <div className="flex items-center justify-between">
                            <p className="font-medium text-sm md:text-base">{orderData.trackingNumber}</p>
                            {orderData.carrier && (
                              <Button variant="ghost" size="sm" className="h-8 px-2 text-green-600">
                                <ExternalLink className="h-3 w-3 mr-1" />
                                Track
                              </Button>
                            )}
                          </div>
                        </div>
                      )}

                      {orderData.carrier && (
                        <div>
                          <p className="text-xs md:text-sm text-gray-500">Carrier</p>
                          <p className="font-medium text-sm md:text-base">{orderData.carrier}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-lg border mb-4 md:mb-6">
              <h2 className="text-base md:text-lg font-medium mb-4">Order Items</h2>
              <div className="space-y-3 md:space-y-4">
                {orderData.items.map((item: any) => (
                  <div key={item.id} className="flex items-start space-x-3">
                    <div className="relative h-12 w-12 md:h-16 md:w-16 overflow-hidden rounded border bg-muted flex-shrink-0">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm md:text-base">{item.name}</h3>
                      <p className="text-xs md:text-sm text-gray-500">
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-medium text-sm md:text-base">${(item.quantity * item.price).toFixed(2)}</p>
                      <Button variant="link" size="sm" className="h-auto p-0 text-green-600 text-xs md:text-sm">
                        Buy Again
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-gray-500">Subtotal</span>
                  <span>${orderData.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-gray-500">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-sm md:text-base">
                  <span className="text-gray-500">Tax</span>
                  <span>${(orderData.total * 0.08).toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium text-sm md:text-base">
                  <span>Total</span>
                  <span>${(orderData.total + orderData.total * 0.08).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-lg border">
              <OrderStatusTimeline statusUpdates={orderData.statusUpdates} currentStatus={orderData.status} />
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-area-pb">
          <div className="flex justify-center">
            <Button
              variant="ghost"
              className="text-red-600 hover:bg-red-50 hover:text-red-700 h-12 px-6"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span>Log out</span>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
