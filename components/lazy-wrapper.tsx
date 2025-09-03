"use client"

import { Suspense, memo, type ReactNode } from "react"

interface LazyWrapperProps {
  children: ReactNode
  fallback?: ReactNode
  className?: string
}

export const LazyWrapper = memo(function LazyWrapper({
  children,
  fallback = <div className="animate-pulse bg-muted rounded h-32" />,
  className,
}: LazyWrapperProps) {
  return (
    <div className={className}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </div>
  )
})
