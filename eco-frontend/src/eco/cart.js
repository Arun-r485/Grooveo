import api from "./client.js";
export const getCart = () => api.get("/cart");
export const addToCart = (productId, qty = 1) => api.post("/cart", { productId, qty });
export const updateCartItem = (productId, qty) => api.put(`/cart/${productId}`, { qty });
export const removeFromCart = (productId) => api.delete(`/cart/${productId}`);
export const clearCart = () => api.delete("/cart");
export const applyPromo = (code) => api.put("/cart/promo", { code });