"use client"

import { useLocalStorage } from "./use-local-storage"
import { useCallback } from "react"

interface FavoriteItem {
  id: number
  name: string
  price: number
  image: string
  addedAt: string
}

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<FavoriteItem[]>("user-favorites", [])

  const addToFavorites = useCallback(
    (item: Omit<FavoriteItem, "addedAt">) => {
      setFavorites((prev) => {
        const exists = prev.find((fav) => fav.id === item.id)
        if (exists) return prev

        return [...prev, { ...item, addedAt: new Date().toISOString() }]
      })
    },
    [setFavorites],
  )

  const removeFromFavorites = useCallback(
    (id: number) => {
      setFavorites((prev) => prev.filter((fav) => fav.id !== id))
    },
    [setFavorites],
  )

  const isFavorite = useCallback(
    (id: number) => {
      return favorites.some((fav) => fav.id === id)
    },
    [favorites],
  )

  const toggleFavorite = useCallback(
    (item: Omit<FavoriteItem, "addedAt">) => {
      if (isFavorite(item.id)) {
        removeFromFavorites(item.id)
      } else {
        addToFavorites(item)
      }
    },
    [isFavorite, addToFavorites, removeFromFavorites],
  )

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    favoritesCount: favorites.length,
  }
}
