import React, { useContext, useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";
import { useSelector, useDispatch } from "react-redux";
import storeItems from "../items.json"

const CartContext = React.createContext()

export function useCart() {
  return useContext(CartContext)
}

export function CartProvider({ children }) {
  const { cartItems } = useSelector((state) => state.cart);
  const [cart, setCart] = useLocalStorage("cart", [])
  const formattedCart = cart.map(entry => {
    return { ...entry, item: cartItems.find(item => item.id === entry.itemId) }
  })

  function addToCart(itemId, quantity = 1) {
    setCart(prevCart => {
      if (prevCart.some(entry => entry.itemId === itemId)) {
        return prevCart.map(entry => {
          if (entry.itemId === itemId)
            return { ...entry, quantity: entry.quantity + quantity }
          return entry
        })
      } else {
        return [...prevCart, { itemId, quantity }]
      }
    })
  }

  function removeFromCart(itemId) {
    setCart(prevCart => {
      return prevCart.filter(entry => entry.itemId !== itemId)
    })
  }

  function checkout() {
    setCart([])
    alert("Thank you for your purchase")
  }

  const value = {
    cart: formattedCart,
    addToCart,
    removeFromCart,
    checkout
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
