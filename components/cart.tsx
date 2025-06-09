"use client"
import Link from "next/link"
import Image from "next/image"
import { X, Minus, Plus, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useCart } from "@/context/cart-context"

export function Cart() {
  const { items, itemCount, subtotal, removeItem, updateQuantity, isOpen, setIsOpen, clearCart } = useCart()

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle className="flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Cart {itemCount > 0 && `(${itemCount})`}
          </SheetTitle>
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <ScrollArea className="flex-1 pr-6">
              <div className="space-y-6 py-6">
                {items.map((item) => (
                  <div key={item.id} className="space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded border bg-muted">
                          <Image
                            src={item.image || "/placeholder.svg?height=64&width=64"}
                            alt={`${item.name} - ${item.material || item.category} eco-friendly packaging product`}
                            fill
                            className="absolute object-cover"
                          />
                        </div>
                        <div className="flex flex-col self-start">
                          <span className="line-clamp-1 text-sm font-medium">{item.name}</span>
                          <span className="line-clamp-1 text-xs text-muted-foreground">
                            {item.material || item.category}
                          </span>
                          <div className="mt-2 flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                              <span className="sr-only">Remove one {item.name}</span>
                            </Button>
                            <span className="text-xs">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                              <span className="sr-only">Add one {item.name}</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-1 font-medium">
                        <span className="ml-auto line-clamp-1 text-sm">₹{(item.price * item.quantity).toFixed(2)}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-auto h-7 w-7"
                          onClick={() => removeItem(item.id)}
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove {item.name} from cart</span>
                        </Button>
                      </div>
                    </div>
                    <Separator />
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-sm">Subtotal</span>
                  <span className="text-sm font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Shipping</span>
                  <span className="text-sm font-medium">Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Tax</span>
                  <span className="text-sm font-medium">Calculated at checkout</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
              </div>
              <SheetFooter className="flex flex-col gap-2 sm:flex-col">
                <Link href="/cart" onClick={() => setIsOpen(false)} className="w-full">
                  <Button variant="outline" className="w-full">
                    View Full Cart
                  </Button>
                </Link>
                <Link href="/checkout" onClick={() => setIsOpen(false)} className="w-full">
                  <Button className="w-full bg-green-600 hover:bg-green-700">Checkout</Button>
                </Link>
                <Button variant="outline" onClick={() => clearCart()}>
                  Clear Cart
                </Button>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-2">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
            <div className="text-xl font-medium">Your cart is empty</div>
            <div className="text-center text-sm text-muted-foreground">Add items to your cart to see them here.</div>
            <Button onClick={() => setIsOpen(false)} className="mt-4 bg-green-600 hover:bg-green-700" size="sm">
              Continue Shopping
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
