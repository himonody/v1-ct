"use client"

import { useState, useEffect, memo, useCallback, useMemo } from "react"
import { Home, Search, Flame, User } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useTranslation } from "@/lib/i18n"

const navItems = [
  { id: "home", labelKey: "nav.home", icon: Home, href: "/" },
  { id: "search", labelKey: "nav.products", icon: Search, href: "/products" },
  { id: "cart", labelKey: "nav.flash_sale", icon: Flame, href: "/cart" },
  { id: "profile", labelKey: "nav.profile", icon: User, href: "/profile" },
]

export const BottomNav = memo(function BottomNav() {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState("home")
  const { t } = useTranslation()

  const updateActiveTab = useCallback((currentPath: string) => {
    if (currentPath === "/") {
      setActiveTab("home")
    } else if (currentPath.startsWith("/products")) {
      setActiveTab("search")
    } else if (currentPath.startsWith("/cart")) {
      setActiveTab("cart")
    } else if (currentPath.startsWith("/profile") || currentPath.startsWith("/orders")) {
      setActiveTab("profile")
    }
  }, [])

  useEffect(() => {
    updateActiveTab(pathname)
  }, [pathname, updateActiveTab])

  const navigationItems = useMemo(
    () =>
      navItems.map((item) => {
        const IconComponent = item.icon
        const isActive = activeTab === item.id
        const displayLabel = t(item.labelKey)

        return (
          <Link key={item.id} href={item.href}>
            <button
              className={`relative flex flex-col items-center gap-0.5 sm:gap-1 py-2 px-2 sm:px-3 rounded-xl transition-all duration-300 hover:scale-105 min-w-[60px] sm:min-w-[70px] min-h-[48px] sm:min-h-[56px] ${
                isActive
                  ? "text-primary bg-primary/10 shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-primary/5 rounded-xl blur-sm"></div>
              )}

              <div className="relative z-10 flex flex-col items-center gap-0.5 sm:gap-1">
                <IconComponent
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${isActive ? "scale-110" : ""}`}
                />
                <span
                  className={`text-xs font-medium transition-all duration-300 leading-tight text-center ${isActive ? "font-semibold" : ""}`}
                >
                  {displayLabel}
                </span>
              </div>

              {isActive && (
                <div className="absolute -top-0.5 sm:-top-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full shadow-lg shadow-primary/50 animate-pulse"></div>
              )}
            </button>
          </Link>
        )
      }),
    [activeTab, t],
  )

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/98 to-background/95 backdrop-blur-xl border-t border-border/50 shadow-2xl">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>

      <div className="flex items-center justify-around py-1 sm:py-2 px-1 sm:px-2">{navigationItems}</div>

      <div className="h-safe-area-inset-bottom bg-background/80 min-h-[env(safe-area-inset-bottom)]"></div>
    </nav>
  )
})
