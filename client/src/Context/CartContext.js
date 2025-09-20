import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setCartItems(data);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };
    fetchCart();
  }, []);

  const addToCart = async (product, quantity = 1) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/cart/add",
        { productId: product._id, quantity },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setCartItems(data);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/cart/remove/${productId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setCartItems(data);
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/cart/update/${productId}`,
        { quantity: newQuantity },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setCartItems(data);
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item?.product?.price || 0) * (item?.quantity || 0),
    0
  );

  const totalItems = cartItems.reduce(
    (acc, item) => acc + (item?.quantity || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
