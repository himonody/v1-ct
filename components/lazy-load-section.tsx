"use client"

import { memo, type ReactNode } from "react"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

interface LazyLoadSectionProps {
  children: ReactNode
  fallback?: ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
}

export const LazyLoadSection = memo(function LazyLoadSection({
  children,
  fallback = <div className="animate-pulse bg-muted rounded h-32" />,
  className,
  threshold = 0.1,
  rootMargin = "100px",
}: LazyLoadSectionProps) {
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: true,
  })

  return (
    <div ref={targetRef} className={className}>
      {isIntersecting ? children : fallback}
    </div>
  )
})
