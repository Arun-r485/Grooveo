import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from "../eco/cart.js";
import { useAuth } from "../context/AuthContext.jsx";

export function useCart() {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    
    const [guestCart, setGuestCart] = useState([]);

    const { data: cartData, isLoading } = useQuery({
        queryKey: ["cart"],
        queryFn: () => getCart().then(r => r.data),
        enabled: !!user,
    });

    const invalidate = () => queryClient.invalidateQueries({ queryKey: ["cart"] });

    const add = useMutation({
        mutationFn: ({ productId, qty }) => {
            if (user) {
                return addToCart(productId, qty);
            } else {
                setGuestCart(prev => {
                    const existing = prev.find(i => (i.product?._id || i.product?.id || i.product) === productId);
                    if (existing) {
                        return prev.map(i => (i.product?._id || i.product?.id || i.product) === productId
                            ? { ...i, qty: i.qty + qty }
                            : i);
                    }
                    return [...prev, { product: { _id: productId }, qty }];
                });
                return Promise.resolve();
            }
        },
        onSuccess: user ? invalidate : undefined
    });

    const update = useMutation({
        mutationFn: ({ productId, qty }) => {
            if (user) {
                return updateCartItem(productId, qty);
            } else {
                setGuestCart(prev => prev.map(i =>
                    (i.product?._id || i.product?.id || i.product) === productId ? { ...i, qty } : i
                ));
                return Promise.resolve();
            }
        },
        onSuccess: user ? invalidate : undefined
    });

    const remove = useMutation({
        mutationFn: (productId) => {
            if (user) {
                return removeFromCart(productId);
            } else {
                setGuestCart(prev => prev.filter(i =>
                    (i.product?._id || i.product?.id || i.product) !== productId
                ));
                return Promise.resolve();
            }
        },
        onSuccess: user ? invalidate : undefined
    });

    const clear = useMutation({
        mutationFn: () => {
            if (user) {
                return clearCart();
            } else {
                setGuestCart([]);
                return Promise.resolve();
            }
        },
        onSuccess: user ? invalidate : undefined
    });

    const cart = user ? (cartData?.items || []) : guestCart;
    const cartCount = cart.reduce((s, i) => s + i.qty, 0);

    return { cart, cartCount, add, update, remove, clear, isLoading };
}
