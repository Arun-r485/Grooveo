import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const ShopContext = createContext();


export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);

    
    if (user?.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    }

    
    const API = "http://localhost:5000/api";

    
    const login = async (email, password) => {
        const { data } = await axios.post(`${API}/auth/login`, { email, password });
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        setCart([]);
    };

    
    const fetchCart = async () => {
        if (!user) return;
        const { data } = await axios.get(`${API}/cart`);
        setCart(data.items);
    };

    const addToCart = async (productId, qty = 1) => {
        if (!user) return alert("Please login first!");
        const { data } = await axios.post(`${API}/cart`, { productId, qty });
        setCart(data.items);
    };

    const updateQty = async (productId, qty) => {
        const { data } = await axios.put(`${API}/cart/${productId}`, { qty });
        setCart(data.items);
    };

    useEffect(() => {
        if (user) fetchCart();
    }, [user]);

    return (
        <ShopContext.Provider value={{ user, cart, login, logout, addToCart, updateQty, loading }}>
            {children}
        </ShopContext.Provider>
    );
};