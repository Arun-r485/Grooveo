import React, { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";


import HomePage from "./pages/HomePage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import CarbonPage from "./pages/CarbonPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";


import YourOrdersPage from "./pages/account/YourOrdersPage.jsx";



import { useAuth } from "./context/AuthContext.jsx";
import { useCart } from "./hooks/useCart.js";


function Shell({ children, cartCount, user, logout }) {
  const location = useLocation();
  const hideShell = location.pathname === "/auth";

  return (
    <div className="min-h-screen bg-[#f4f7f2]">
      {!hideShell && (
        <Header
          currentPage={location.pathname.replace("/", "") || "home"}
          cartCount={cartCount}
          user={user}
          logout={logout}
        />
      )}
      <main>{children}</main>
      {!hideShell && <Footer />}
    </div>
  );
}

export default function App() {
  const { user, logout } = useAuth();

  
  const { cart, cartCount, add, update, remove } = useCart();

  const [toast, setToast] = useState(null);

  const flash = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  
  
  const handleAddToCart = (product) => {
    add.mutate({ productId: product._id || product.id, qty: 1 }, {
      onSuccess: () => flash("🛒 Added: " + product.name)
    });
  };

  const handleIncrement = (id) => {
    const item = cart.find(i => (i.product?._id || i.product) === id);
    if (item) update.mutate({ productId: id, qty: item.qty + 1 });
  };

  const handleDecrement = (id) => {
    const item = cart.find(i => (i.product?._id || i.product) === id);
    if (!item) return;
    if (item.qty <= 1) {
      remove.mutate(id, { onSuccess: () => flash("Removed from cart") });
    } else {
      update.mutate({ productId: id, qty: item.qty - 1 });
    }
  };

  
  const cartProps = {
    cart,
    onAddToCart: handleAddToCart,
    onIncrement: handleIncrement,
    onDecrement: handleDecrement
  };

  return (
    <BrowserRouter>
      <Shell cartCount={cartCount} user={user} logout={logout}>
        <Routes>
          <Route path="/" element={<HomePage {...cartProps} />} />
          <Route path="/products" element={<ProductsPage {...cartProps} />} />
          <Route path="/carbon" element={<CarbonPage cart={cart} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/auth" element={<AuthPage />} />

          <Route path="/cart" element={
            <CartPage
              {...cartProps}
              onRemove={(id) => remove.mutate(id)}
            />
          } />

          <Route path="/account" element={
            <AccountPage user={user} onSignOut={logout} />
          } />

          <Route path="/account/orders" element={<YourOrdersPage />} />
          {}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Shell>

      {}
      {toast && (
        <div className="toast toast-top toast-end z-[999]">
          <div className="alert bg-[#1a2e1a] text-white shadow-xl border border-[#5a9a3a] text-sm font-bold px-4 py-3">
            <span>{toast}</span>
          </div>
        </div>
      )}
    </BrowserRouter>
  );
}