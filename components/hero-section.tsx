"use client"

import { memo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n"

export const HeroSection = memo(function HeroSection() {
  const { t } = useTranslation()

  const handleJoinFree = useCallback(() => {
    // Handle join for free action
    console.log("[v0] Join for free clicked")
  }, [])

  return (
    <div className="bg-gradient-to-br from-orange-50 to-orange-100 relative overflow-hidden">
      <div className="container mx-auto px-4 py-6 sm:py-8 lg:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight">
                <div className="text-gray-900">{t("hero.title")}</div>
                <div className="text-orange-600">{t("hero.titleHighlight")}</div>
              </h1>
              <p className="text-base sm:text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-3xl font-normal">
                {t("hero.subtitle")}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex">
              <Button
                onClick={handleJoinFree}
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 sm:px-8 sm:py-3 text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
              >
                {t("hero.joinFree")}
              </Button>
            </div>

            {/* Social Proof */}
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs sm:text-sm text-gray-600 font-medium">{t("hero.rating")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})
