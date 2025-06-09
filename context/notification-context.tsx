"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { Bell, CheckCheck, Package, Truck, Clock, AlertTriangle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { OrderStatus } from "@/lib/orders"

export interface Notification {
  id: string
  type: "order_status" | "promotion" | "account" | "system"
  title: string
  message: string
  timestamp: string
  read: boolean
  actionUrl?: string
  orderId?: string
  orderStatus?: OrderStatus
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAllNotifications: () => void
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void
  emailNotificationsEnabled: boolean
  toggleEmailNotifications: () => void
  orderStatusNotificationsEnabled: boolean
  toggleOrderStatusNotifications: () => void
  promotionalNotificationsEnabled: boolean
  togglePromotionalNotifications: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

// Sample notifications
const initialNotifications: Notification[] = [
  {
    id: "notif-1",
    type: "order_status",
    title: "Order Shipped",
    message: "Your order #ORD-12345 has been shipped and is on its way!",
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    read: false,
    actionUrl: "/account/orders/ORD-12345",
    orderId: "ORD-12345",
    orderStatus: "shipped",
  },
  {
    id: "notif-2",
    type: "promotion",
    title: "Weekend Sale",
    message: "Enjoy 15% off all eco-friendly packaging this weekend!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    read: true,
    actionUrl: "/products",
  },
  {
    id: "notif-3",
    type: "account",
    title: "Welcome to Grooveo",
    message: "Thank you for creating an account. Start shopping for sustainable packaging!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    read: true,
    actionUrl: "/products",
  },
]

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [emailNotificationsEnabled, setEmailNotificationsEnabled] = useState(true)
  const [orderStatusNotificationsEnabled, setOrderStatusNotificationsEnabled] = useState(true)
  const [promotionalNotificationsEnabled, setPromotionalNotificationsEnabled] = useState(true)
  const { toast } = useToast()
  const [mounted, setMounted] = useState(false)

  // Calculate unread count
  const unreadCount = notifications.filter((notification) => !notification.read).length

  // Load notifications from localStorage on mount
  useEffect(() => {
    setMounted(true)
    const storedNotifications = localStorage.getItem("notifications")
    if (storedNotifications) {
      try {
        setNotifications(JSON.parse(storedNotifications))
      } catch (error) {
        console.error("Failed to parse notifications from localStorage:", error)
        localStorage.removeItem("notifications")
        setNotifications(initialNotifications)
      }
    } else {
      setNotifications(initialNotifications)
    }

    // Load notification preferences
    const emailEnabled = localStorage.getItem("emailNotificationsEnabled")
    if (emailEnabled !== null) {
      setEmailNotificationsEnabled(emailEnabled === "true")
    }

    const orderStatusEnabled = localStorage.getItem("orderStatusNotificationsEnabled")
    if (orderStatusEnabled !== null) {
      setOrderStatusNotificationsEnabled(orderStatusEnabled === "true")
    }

    const promotionalEnabled = localStorage.getItem("promotionalNotificationsEnabled")
    if (promotionalEnabled !== null) {
      setPromotionalNotificationsEnabled(promotionalEnabled === "true")
    }
  }, [])

  // Save notifications to localStorage when they change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("notifications", JSON.stringify(notifications))
    }
  }, [notifications, mounted])

  // Save notification preferences to localStorage when they change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("emailNotificationsEnabled", emailNotificationsEnabled.toString())
      localStorage.setItem("orderStatusNotificationsEnabled", orderStatusNotificationsEnabled.toString())
      localStorage.setItem("promotionalNotificationsEnabled", promotionalNotificationsEnabled.toString())
    }
  }, [emailNotificationsEnabled, orderStatusNotificationsEnabled, promotionalNotificationsEnabled, mounted])

  // Mark a notification as read
  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  // Remove a notification
  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([])
  }

  // Add a new notification
  const addNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false,
    }

    setNotifications((prev) => [newNotification, ...prev])

    // Show toast for new notification
    if (orderStatusNotificationsEnabled && notification.type === "order_status") {
      toast({
        title: notification.title,
        description: notification.message,
        action: notification.actionUrl ? (
          <a href={notification.actionUrl} className="text-green-600 hover:underline">
            View
          </a>
        ) : undefined,
      })
    }

    // Simulate sending an email notification
    if (emailNotificationsEnabled) {
      console.log(`Email notification sent: ${notification.title} - ${notification.message}`)
      simulateEmailNotification(notification)
    }
  }

  // Toggle email notifications
  const toggleEmailNotifications = () => {
    setEmailNotificationsEnabled((prev) => !prev)
  }

  // Toggle order status notifications
  const toggleOrderStatusNotifications = () => {
    setOrderStatusNotificationsEnabled((prev) => !prev)
  }

  // Toggle promotional notifications
  const togglePromotionalNotifications = () => {
    setPromotionalNotificationsEnabled((prev) => !prev)
  }

  // Simulate sending an email notification (for demo purposes)
  const simulateEmailNotification = (notification: Omit<Notification, "id" | "timestamp" | "read">) => {
    // In a real app, this would call an API to send an email
    // For demo purposes, we'll just log to console
    console.log("Sending email notification:", {
      to: "user@example.com",
      subject: notification.title,
      body: notification.message,
      actionUrl: notification.actionUrl,
    })
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAllNotifications,
        addNotification,
        emailNotificationsEnabled,
        toggleEmailNotifications,
        orderStatusNotificationsEnabled,
        toggleOrderStatusNotifications,
        promotionalNotificationsEnabled,
        togglePromotionalNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

// Helper function to get notification icon based on type and status
export function getNotificationIcon(type: string, status?: OrderStatus) {
  if (type === "order_status") {
    switch (status) {
      case "processing":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "shipped":
        return <Package className="h-5 w-5 text-purple-500" />
      case "out_for_delivery":
        return <Truck className="h-5 w-5 text-indigo-500" />
      case "delivered":
        return <CheckCheck className="h-5 w-5 text-green-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  } else if (type === "promotion") {
    return <Bell className="h-5 w-5 text-yellow-500" />
  } else if (type === "account") {
    return <Bell className="h-5 w-5 text-blue-500" />
  } else {
    return <AlertTriangle className="h-5 w-5 text-red-500" />
  }
}
