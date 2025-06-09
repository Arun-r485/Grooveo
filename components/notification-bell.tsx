"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, X } from "lucide-react"
import { format, formatDistanceToNow } from "date-fns"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useNotifications, getNotificationIcon } from "@/context/notification-context"

export function NotificationBell() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, clearAllNotifications } =
    useNotifications()
  const [open, setOpen] = useState(false)

  // Handle opening the dropdown
  const handleOpen = (isOpen: boolean) => {
    setOpen(isOpen)
    // Mark all as read when opening the dropdown
    if (isOpen && unreadCount > 0) {
      markAllAsRead()
    }
  }

  // Format the timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const isToday = date.toDateString() === now.toDateString()

    if (isToday) {
      return formatDistanceToNow(date, { addSuffix: true })
    } else {
      return format(date, "MMM d, yyyy 'at' h:mm a")
    }
  }

  return (
    <DropdownMenu open={open} onOpenChange={handleOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-[10px] font-medium text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {notifications.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto px-2 py-1 text-xs"
              onClick={() => clearAllNotifications()}
            >
              Clear All
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length > 0 ? (
          <>
            <ScrollArea className="h-[300px]">
              <DropdownMenuGroup>
                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className="flex items-start p-3 cursor-default focus:bg-primary-50"
                  >
                    <div className="flex-shrink-0 mr-3 mt-0.5">
                      {getNotificationIcon(notification.type, notification.orderStatus)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <Link
                          href={notification.actionUrl || "#"}
                          className="font-medium text-sm hover:underline"
                          onClick={() => markAsRead(notification.id)}
                        >
                          {notification.title}
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 -mr-1 -mt-1 text-gray-400 hover:text-gray-500"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeNotification(notification.id)
                          }}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Dismiss</span>
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{formatTimestamp(notification.timestamp)}</p>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </ScrollArea>
            <DropdownMenuSeparator />
            <div className="p-2">
              <Link href="/account/notifications" className="w-full">
                <Button variant="outline" size="sm" className="w-full">
                  View All Notifications
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="py-6 px-4 text-center">
            <div className="flex justify-center mb-3">
              <Bell className="h-8 w-8 text-neutral-300" />
            </div>
            <p className="text-sm font-medium">No notifications</p>
            <p className="text-xs text-neutral-500 mt-1">You're all caught up!</p>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
