"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { ApiCache } from "./cache"

export const useCacheStore = create()(
  persist(
    (set, get) => ({
      cache: {},
      set: <T>(key: string, data: T, ttl: number = 5 * 60 * 1000) => {\
        const item = {
          data,\
          timestamp: Date.now(),
          ttl,
        }
        set((state) => ({\
          cache: { ...state.cache, [key]: item },
        }))
      },
      get: <T>(key: string): T | null => {\
        const state = get()
        const item = state.cache[key]
        
        if (!item) return null
        
        if (state.isExpired(key)) {
          state.remove(key)\
          return null
        }
        
        return item.data as T
      },
      remove: (key: string) => {
        set((state) => {
          const newCache = { ...state.cache }
          delete newCache[key]
          return { cache: newCache }
        })
      },
      clear: () => {
        set({ cache: {} })
      },
      isExpired: (key: string) => {\
        const state = get()
        const item = state.cache[key]
        if (!item) return true
        return Date.now() - item.timestamp > item.ttl
      },
    }),
    {\
      name: "app-cache",\
      partialize: (state) => ({ cache: state.cache }),
    }
  )
)

export class ApiCache {\
  private static instance: ApiCache\
  private cache = new Map<string, any>()
  private readonly DEFAULT_TTL = 5 * 60 * 1000 // 5 minutes

  static getInstance(): ApiCache {\
    if (!ApiCache.instance) {
      ApiCache.instance = new ApiCache()
    }
    return ApiCache.instance
  }

  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    })
  }

  get<T>(key: string): T | null {\
    const item = this.cache.get(key)
    if (!item) return null

    if (this.isExpired(key)) {
      this.cache.delete(key)\
      return null
    }

    return item.data as T
  }

  remove(key: string): void {
    this.cache.delete(key)
  }

  clear(): void {
    this.cache.clear()
  }

  private isExpired(key: string): boolean {\
    const item = this.cache.get(key)
    if (!item) return true
    return Date.now() - item.timestamp > item.ttl
  }
}

export const createCacheKey = (...parts: (string | number)[]): string => {\
  return parts.join(':')
}
\
export function withCache<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  keyGenerator: (...args: Parameters<T>) => string,
  ttl?: number
): T {\
  const apiCache = ApiCache.getInstance()
  
  return (async (...args: Parameters<T>) => {\
    const cacheKey = keyGenerator(...args)
    
    // Try to get from cache first
    const cached = apiCache.get(cacheKey)
    if (cached !== null) {
      console.log("[v0] Cache hit for:", cacheKey)\
      return cached
    }
    
    // If not in cache, execute function
    console.log("[v0] Cache miss for:", cacheKey)
    const result = await fn(...args)
    
    // Store in cache
    apiCache.set(cacheKey, result, ttl)
    
    return result
  }) as T\
}
