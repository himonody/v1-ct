"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { ApiCache, createCacheKey } from "@/lib/cache"

interface UseApiCacheOptions<T> {
  key: string
  fetcher: () => Promise<T>
  ttl?: number
  enabled?: boolean
  refetchOnMount?: boolean
  refetchOnWindowFocus?: boolean
}

interface UseApiCacheReturn<T> {
  data: T | null
  loading: boolean
  error: Error | null
  refetch: () => Promise<void>
  mutate: (data: T) => void
}

export function useApiCache<T>({
  key,
  fetcher,
  ttl = 5 * 60 * 1000, // 5 minutes default
  enabled = true,
  refetchOnMount = true,
  refetchOnWindowFocus = false,
}: UseApiCacheOptions<T>): UseApiCacheReturn<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const apiCache = ApiCache.getInstance()
  const fetcherRef = useRef(fetcher)

  // Update fetcher ref
  fetcherRef.current = fetcher

  const fetchData = useCallback(async () => {
    if (!enabled) return

    setLoading(true)
    setError(null)

    try {
      // Check cache first
      const cached = apiCache.get<T>(key)
      if (cached !== null) {
        console.log("[v0] Using cached data for:", key)
        setData(cached)
        setLoading(false)
        return
      }

      // Fetch fresh data
      console.log("[v0] Fetching fresh data for:", key)
      const result = await fetcherRef.current()

      // Cache the result
      apiCache.set(key, result, ttl)
      setData(result)
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error")
      setError(error)
      console.error("[v0] API cache error:", error)
    } finally {
      setLoading(false)
    }
  }, [key, enabled, ttl, apiCache])

  const refetch = useCallback(async () => {
    // Clear cache and refetch
    apiCache.remove(key)
    await fetchData()
  }, [key, fetchData, apiCache])

  const mutate = useCallback(
    (newData: T) => {
      // Update both cache and state
      apiCache.set(key, newData, ttl)
      setData(newData)
    },
    [key, ttl, apiCache],
  )

  // Initial fetch
  useEffect(() => {
    if (enabled && refetchOnMount) {
      fetchData()
    }
  }, [fetchData, enabled, refetchOnMount])

  // Refetch on window focus
  useEffect(() => {
    if (!refetchOnWindowFocus) return

    const handleFocus = () => {
      if (enabled) {
        fetchData()
      }
    }

    window.addEventListener("focus", handleFocus)
    return () => window.removeEventListener("focus", handleFocus)
  }, [fetchData, enabled, refetchOnWindowFocus])

  return {
    data,
    loading,
    error,
    refetch,
    mutate,
  }
}

export function useProducts() {
  return useApiCache({
    key: createCacheKey("products", "list"),
    fetcher: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return [
        {
          id: 1,
          name: "iPhone 15 Pro",
          price: 7999,
          originalPrice: 8999,
          image: "/iphone--.png",
          rating: 4.8,
          sales: 1234,
        },
        {
          id: 2,
          name: "春季连衣裙",
          price: 299,
          originalPrice: 399,
          image: "/-----.png",
          rating: 4.6,
          sales: 856,
        },
        // ... more products
      ]
    },
    ttl: 10 * 60 * 1000, // 10 minutes for products
  })
}

export function useProduct(productId: string) {
  return useApiCache({
    key: createCacheKey("product", productId),
    fetcher: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800))
      return {
        id: Number.parseInt(productId),
        name: "iPhone 15 Pro Max 256GB",
        price: 9999,
        originalPrice: 10999,
        images: ["/iphone-detail-1.png", "/iphone-detail-2.png"],
        rating: 4.8,
        sales: 1234,
        reviews: 856,
        // ... more product details
      }
    },
    ttl: 15 * 60 * 1000, // 15 minutes for product details
  })
}

export function useOrders() {
  return useApiCache({
    key: createCacheKey("orders", "user"),
    fetcher: async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1200))
      return [
        {
          id: "ORD001",
          status: "delivered",
          total: 299,
          items: [{ name: "春季连衣裙", quantity: 1, price: 299 }],
          createdAt: "2024-01-15",
        },
        // ... more orders
      ]
    },
    ttl: 2 * 60 * 1000, // 2 minutes for orders (more dynamic data)
  })
}
