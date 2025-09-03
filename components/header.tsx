"use client"

import { Globe, Menu, MessageCircle, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useState, memo, useCallback, useMemo } from "react"
import { useTranslation } from "@/lib/i18n"

export const Header = memo(function Header() {
  const [hasUnreadMessages, setHasUnreadMessages] = useState(true)
  const { t, locale, changeLanguage, languages } = useTranslation()

  const handleMessageClick = useCallback(() => {
    setHasUnreadMessages(false)
    console.log("[v0] Messages clicked")
  }, [])

  const handleCustomerServiceClick = useCallback(() => {
    console.log("[v0] Customer service clicked")
  }, [])

  const handleLanguageChange = useCallback(
    (langCode: string) => {
      changeLanguage(langCode)
      console.log("[v0] Language changed to:", langCode)
    },
    [changeLanguage],
  )

  const handleMenuClick = useCallback(() => {
    console.log("[v0] Menu clicked")
  }, [])

  const languageItems = useMemo(
    () =>
      languages.map((lang) => (
        <DropdownMenuItem
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`flex items-center gap-2 text-sm ${locale === lang.code ? "bg-accent" : ""}`}
        >
          <span className="text-base sm:text-lg">{lang.flag}</span>
          <span className="text-sm">{lang.name}</span>
          {locale === lang.code && <span className="ml-auto text-primary">✓</span>}
        </DropdownMenuItem>
      )),
    [languages, locale, handleLanguageChange],
  )

  return (
    <header className="sticky top-0 z-50 glass-morphism border-b border-border/50 shadow-elegant">
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 min-h-[56px]">
        <Link href="/" className="flex-shrink-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-purple-600 via-purple-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 ring-2 ring-purple-500/20 hover:ring-purple-500/40">
            <span className="text-white font-bold text-sm sm:text-base drop-shadow-sm">R</span>
          </div>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative group transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 dark:hover:from-blue-950/20 dark:hover:to-indigo-950/20 w-10 h-10 sm:w-11 sm:h-11 rounded-xl hover:shadow-lg hover:scale-105"
            onClick={handleCustomerServiceClick}
            title={t("header.customerService")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Headphones className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-blue-600 dark:text-blue-400 relative z-10 transition-transform duration-300 group-hover:scale-110" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative group transition-all duration-300 hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 dark:hover:from-green-950/20 dark:hover:to-emerald-950/20 w-10 h-10 sm:w-11 sm:h-11 rounded-xl hover:shadow-lg hover:scale-105"
            onClick={handleMessageClick}
            title={t("header.messages")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <MessageCircle className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-green-600 dark:text-green-400 relative z-10 transition-transform duration-300 group-hover:scale-110" />
            {hasUnreadMessages && (
              <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-gradient-to-br from-red-500 to-pink-500 rounded-full shadow-lg animate-pulse ring-2 ring-white dark:ring-gray-900" />
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative group transition-all duration-300 hover:bg-gradient-to-br hover:from-purple-50 hover:to-violet-50 dark:hover:from-purple-950/20 dark:hover:to-violet-950/20 w-10 h-10 sm:w-11 sm:h-11 rounded-xl hover:shadow-lg hover:scale-105"
                title={t("header.language")}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-violet-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Globe className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-purple-600 dark:text-purple-400 relative z-10 transition-transform duration-300 group-hover:scale-110" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 sm:w-48">
              {languageItems}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="relative group transition-all duration-300 hover:bg-gradient-to-br hover:from-orange-50 hover:to-red-50 dark:hover:from-orange-950/20 dark:hover:to-red-950/20 w-10 h-10 sm:w-11 sm:h-11 rounded-xl hover:shadow-lg hover:scale-105"
            onClick={handleMenuClick}
            title={t("header.menu")}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Menu className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-orange-600 dark:text-orange-400 relative z-10 transition-transform duration-300 group-hover:scale-110" />
          </Button>
        </div>
      </div>
    </header>
  )
})

export default Header
