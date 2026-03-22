export const calculateTotals = (cartItems) => {
    const subtotal = cartItems.reduce((acc, item) => {
        
        const price = item.product?.price || item.price || 0;
        return acc + price * item.qty;
    }, 0);

    const tax = subtotal * 0.18; 
    const shipping = subtotal > 2000 ? 0 : 150; 
    const total = subtotal + tax + shipping;

    return { subtotal, tax, shipping, total };
};