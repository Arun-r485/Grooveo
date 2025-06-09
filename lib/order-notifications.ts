import type { Order, OrderStatus } from "@/lib/orders"
import type { Notification } from "@/context/notification-context"

// Helper function to generate notification message based on order status
export function generateOrderStatusNotification(
  order: Order,
  newStatus: OrderStatus,
): Omit<Notification, "id" | "timestamp" | "read"> {
  const baseNotification = {
    type: "order_status" as const,
    actionUrl: `/account/orders/${order.id}`,
    orderId: order.id,
    orderStatus: newStatus,
  }

  switch (newStatus) {
    case "processing":
      return {
        ...baseNotification,
        title: "Order Processing",
        message: `Your order #${order.id} is now being processed. We'll update you when it ships!`,
      }
    case "shipped":
      return {
        ...baseNotification,
        title: "Order Shipped",
        message: `Great news! Your order #${order.id} has been shipped and is on its way to you.`,
      }
    case "out_for_delivery":
      return {
        ...baseNotification,
        title: "Out for Delivery",
        message: `Your order #${order.id} is out for delivery and will arrive soon!`,
      }
    case "delivered":
      return {
        ...baseNotification,
        title: "Order Delivered",
        message: `Your order #${order.id} has been delivered. Enjoy your eco-friendly products!`,
      }
    case "cancelled":
      return {
        ...baseNotification,
        title: "Order Cancelled",
        message: `Your order #${order.id} has been cancelled. Please contact us if you have any questions.`,
      }
    case "returned":
      return {
        ...baseNotification,
        title: "Return Processed",
        message: `Your return for order #${order.id} has been processed. Your refund will be issued shortly.`,
      }
    default:
      return {
        ...baseNotification,
        title: "Order Update",
        message: `There's an update to your order #${order.id}. Check your order details for more information.`,
      }
  }
}

// Helper function to generate email subject based on order status
export function generateEmailSubject(status: OrderStatus): string {
  switch (status) {
    case "processing":
      return "Your Order is Being Processed"
    case "shipped":
      return "Your Order Has Shipped!"
    case "out_for_delivery":
      return "Your Order is Out for Delivery"
    case "delivered":
      return "Your Order Has Been Delivered"
    case "cancelled":
      return "Your Order Has Been Cancelled"
    case "returned":
      return "Your Return Has Been Processed"
    default:
      return "Order Status Update"
  }
}
