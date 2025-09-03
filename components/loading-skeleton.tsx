"use client"

import { memo } from "react"

export const ProductCardSkeleton = memo(function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden transition-smooth border-0 bg-card/50 rounded-lg">
      <div className="p-0">
        <div className="relative overflow-hidden h-32 sm:h-40 bg-muted animate-pulse rounded-t-lg" />
        <div className="p-2 sm:p-3 space-y-2">
          <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
          <div className="h-3 bg-muted animate-pulse rounded w-1/2" />
          <div className="flex items-center gap-2">
            <div className="h-5 bg-muted animate-pulse rounded w-16" />
            <div className="h-4 bg-muted animate-pulse rounded w-12" />
          </div>
        </div>
      </div>
    </div>
  )
})

export const CategoryCardSkeleton = memo(function CategoryCardSkeleton() {
  return (
    <div className="flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-3 rounded-xl min-h-[80px] sm:min-h-[100px]">
      <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-xl bg-muted animate-pulse" />
      <div className="h-3 bg-muted animate-pulse rounded w-12" />
    </div>
  )
})

export const HeroCarouselSkeleton = memo(function HeroCarouselSkeleton() {
  return (
    <div className="relative mx-4 rounded-xl overflow-hidden shadow-elegant-lg">
      <div className="relative h-48 bg-muted animate-pulse" />
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="w-2 h-2 rounded-full bg-white/50" />
        ))}
      </div>
    </div>
  )
})

export const ProductDetailSkeleton = memo(function ProductDetailSkeleton() {
  return (
    <div className="bg-background">
      <div className="relative h-80 bg-muted animate-pulse" />
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="h-8 bg-muted animate-pulse rounded w-32" />
          <div className="h-6 bg-muted animate-pulse rounded w-16" />
        </div>
        <div className="h-6 bg-muted animate-pulse rounded w-3/4" />
        <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
        <div className="flex gap-2">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-6 bg-muted animate-pulse rounded w-16" />
          ))}
        </div>
      </div>
    </div>
  )
})

export const OrderListSkeleton = memo(function OrderListSkeleton() {
  return (
    <div className="p-4 space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="bg-card/50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <div className="h-4 bg-muted animate-pulse rounded w-24" />
            <div className="h-6 bg-muted animate-pulse rounded w-16" />
          </div>
          <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
          <div className="h-4 bg-muted animate-pulse rounded w-1/3" />
        </div>
      ))}
    </div>
  )
})
