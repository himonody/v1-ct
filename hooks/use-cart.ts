"use client"

import { useLocalStorage } from "./use-local-storage"
import { useCallback } from "react"

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
  selectedColor?: string
  selectedStorage?: string
  addedAt: string
}

export function useCart() {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("user-cart", [])

  const addToCart = useCallback(
    (item: Omit<CartItem, "addedAt" | "quantity"> & { quantity?: number }) => {
      setCartItems((prev) => {
        const existingItem = prev.find(
          (cartItem) =>
            cartItem.id === item.id &&
            cartItem.selectedColor === item.selectedColor &&
            cartItem.selectedStorage === item.selectedStorage,
        )

        if (existingItem) {
          return prev.map((cartItem) =>
            cartItem.id === item.id &&
            cartItem.selectedColor === item.selectedColor &&
            cartItem.selectedStorage === item.selectedStorage
              ? { ...cartItem, quantity: cartItem.quantity + (item.quantity || 1) }
              : cartItem,
          )
        }

        return [
          ...prev,
          {
            ...item,
            quantity: item.quantity || 1,
            addedAt: new Date().toISOString(),
          },
        ]
      })
    },
    [setCartItems],
  )

  const removeFromCart = useCallback(
    (id: number, selectedColor?: string, selectedStorage?: string) => {
      setCartItems((prev) =>
        prev.filter(
          (item) =>
            !(item.id === id && item.selectedColor === selectedColor && item.selectedStorage === selectedStorage),
        ),
      )
    },
    [setCartItems],
  )

  const updateQuantity = useCallback(
    (id: number, quantity: number, selectedColor?: string, selectedStorage?: string) => {
      if (quantity <= 0) {
        removeFromCart(id, selectedColor, selectedStorage)
        return
      }

      setCartItems((prev) =>
        prev.map((item) =>
          item.id === id && item.selectedColor === selectedColor && item.selectedStorage === selectedStorage
            ? { ...item, quantity }
            : item,
        ),
      )
    },
    [setCartItems, removeFromCart],
  )

  const clearCart = useCallback(() => {
    setCartItems([])
  }, [setCartItems])

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  }
}
