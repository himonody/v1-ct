"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { memo, useCallback, type ReactNode } from "react"

interface PreloadLinkProps {
  href: string
  children: ReactNode
  className?: string
  prefetch?: boolean
  onMouseEnter?: () => void
}

export const PreloadLink = memo(function PreloadLink({
  href,
  children,
  className,
  prefetch = true,
  onMouseEnter,
}: PreloadLinkProps) {
  const router = useRouter()

  const handleMouseEnter = useCallback(() => {
    if (prefetch) {
      // 预加载路由
      router.prefetch(href)
    }
    onMouseEnter?.()
  }, [router, href, prefetch, onMouseEnter])

  return (
    <Link href={href} className={className} onMouseEnter={handleMouseEnter}>
      {children}
    </Link>
  )
})
