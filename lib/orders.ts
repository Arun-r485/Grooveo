export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled"
  | "returned"

export interface OrderStatusUpdate {
  status: OrderStatus
  timestamp: string
  message: string
  location?: string
}

export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface Order {
  id: string
  date: string
  status: OrderStatus
  total: number
  items: OrderItem[]
  trackingNumber?: string
  carrier?: string
  estimatedDelivery?: string
  shippingAddress: {
    name: string
    street: string
    city: string
    state: string
    postalCode: string
    country: string
  }
  statusUpdates: OrderStatusUpdate[]
}

// Mock order data
export const orders: Order[] = [
  {
    id: "ORD-12345",
    date: "May 5, 2025",
    status: "delivered",
    total: 78.97,
    trackingNumber: "1Z999AA10123456784",
    carrier: "UPS",
    estimatedDelivery: "May 10, 2025",
    shippingAddress: {
      name: "John Doe",
      street: "123 Eco Street",
      city: "Green City",
      state: "Nature State",
      postalCode: "12345",
      country: "USA",
    },
    items: [
      {
        id: "eco-mailer-1",
        name: "Biodegradable Kraft Mailers",
        price: 12.99,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "eco-box-1",
        name: "Corrugated Shipping Boxes",
        price: 24.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "eco-tape-1",
        name: "Paper Packaging Tape",
        price: 8.99,
        quantity: 3,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    statusUpdates: [
      {
        status: "pending",
        timestamp: "May 5, 2025 09:15 AM",
        message: "Order placed",
      },
      {
        status: "processing",
        timestamp: "May 5, 2025 02:30 PM",
        message: "Payment confirmed, order processing",
      },
      {
        status: "shipped",
        timestamp: "May 6, 2025 10:45 AM",
        message: "Order shipped",
        location: "Distribution Center, Portland, OR",
      },
      {
        status: "out_for_delivery",
        timestamp: "May 9, 2025 08:20 AM",
        message: "Out for delivery",
        location: "Local Delivery Facility, Green City",
      },
      {
        status: "delivered",
        timestamp: "May 9, 2025 02:15 PM",
        message: "Delivered",
        location: "Front Door, Green City",
      },
    ],
  },
  {
    id: "ORD-12346",
    date: "April 22, 2025",
    status: "shipped",
    total: 45.98,
    trackingNumber: "1Z999AA10123456785",
    carrier: "FedEx",
    estimatedDelivery: "May 12, 2025",
    shippingAddress: {
      name: "John Doe",
      street: "123 Eco Street",
      city: "Green City",
      state: "Nature State",
      postalCode: "12345",
      country: "USA",
    },
    items: [
      {
        id: "eco-filler-1",
        name: "Compostable Packing Peanuts",
        price: 14.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "eco-wrap-1",
        name: "Honeycomb Paper Wrap",
        price: 18.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    statusUpdates: [
      {
        status: "pending",
        timestamp: "April 22, 2025 11:30 AM",
        message: "Order placed",
      },
      {
        status: "processing",
        timestamp: "April 22, 2025 03:45 PM",
        message: "Payment confirmed, order processing",
      },
      {
        status: "shipped",
        timestamp: "April 23, 2025 09:20 AM",
        message: "Order shipped",
        location: "Distribution Center, Seattle, WA",
      },
    ],
  },
  {
    id: "ORD-12347",
    date: "May 8, 2025",
    status: "processing",
    total: 32.97,
    estimatedDelivery: "May 15, 2025",
    shippingAddress: {
      name: "John Doe",
      street: "123 Eco Street",
      city: "Green City",
      state: "Nature State",
      postalCode: "12345",
      country: "USA",
    },
    items: [
      {
        id: "eco-tissue-1",
        name: "Recycled Tissue Paper",
        price: 6.99,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "eco-label-1",
        name: "Compostable Shipping Labels",
        price: 9.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "eco-bag-1",
        name: "Compostable Poly Mailers",
        price: 15.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    statusUpdates: [
      {
        status: "pending",
        timestamp: "May 8, 2025 10:15 AM",
        message: "Order placed",
      },
      {
        status: "processing",
        timestamp: "May 8, 2025 01:30 PM",
        message: "Payment confirmed, order processing",
      },
    ],
  },
]

// Helper function to get an order by ID
export function getOrderById(id: string): Order | undefined {
  return orders.find((order) => order.id === id)
}

// Helper function to get status color
export function getStatusColor(status: OrderStatus): string {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
    case "processing":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100"
    case "shipped":
      return "bg-purple-100 text-purple-800 hover:bg-purple-100"
    case "out_for_delivery":
      return "bg-indigo-100 text-indigo-800 hover:bg-indigo-100"
    case "delivered":
      return "bg-green-100 text-green-800 hover:bg-green-100"
    case "cancelled":
      return "bg-red-100 text-red-800 hover:bg-red-100"
    case "returned":
      return "bg-orange-100 text-orange-800 hover:bg-orange-100"
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100"
  }
}

// Helper function to get status label
export function getStatusLabel(status: OrderStatus): string {
  switch (status) {
    case "pending":
      return "Pending"
    case "processing":
      return "Processing"
    case "shipped":
      return "Shipped"
    case "out_for_delivery":
      return "Out for Delivery"
    case "delivered":
      return "Delivered"
    case "cancelled":
      return "Cancelled"
    case "returned":
      return "Returned"
    default:
      return status
  }
}
