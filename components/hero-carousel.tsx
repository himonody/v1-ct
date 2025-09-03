"use client"

import { useState, useEffect, memo, useCallback } from "react"
import { ChevronLeft, ChevronRight, Gift, Percent } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/lib/i18n"
import Image from "next/image"

const banners = [
  {
    id: 1,
    image: "/------.png",
    titleKey: "hero.new_arrivals",
    subtitleKey: "hero.limited_offer",
    cashback: "15%",
    maxCashback: "¥50",
    hasSpecialOffer: true,
  },
  {
    id: 2,
    image: "/------.png",
    titleKey: "hero.fashion_style",
    subtitleKey: "hero.spring_collection",
    cashback: "20%",
    maxCashback: "¥100",
    hasSpecialOffer: true,
  },
  {
    id: 3,
    image: "/------.png",
    titleKey: "hero.digital_products",
    subtitleKey: "hero.quality_guarantee",
    cashback: "10%",
    maxCashback: "¥30",
    hasSpecialOffer: false,
  },
]

export const HeroCarousel = memo(function HeroCarousel() {
  const { t } = useTranslation()
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)
  }, [])

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % banners.length)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  return (
    <div className="relative mx-4 rounded-xl overflow-hidden shadow-elegant-lg">
      <div className="relative h-48 overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              index === currentIndex
                ? "translate-x-0 opacity-100"
                : index < currentIndex
                  ? "-translate-x-full opacity-0"
                  : "translate-x-full opacity-0"
            }`}
          >
            <Image
              src={banner.image || "/placeholder.svg?height=192&width=400"}
              alt={t(banner.titleKey)}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent">
              <div className="absolute top-3 right-3 flex flex-col gap-1">
                <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg animate-pulse">
                  <Percent className="w-3 h-3" />
                  {banner.cashback} {t("cashback.rate")}
                </div>
                {banner.hasSpecialOffer && (
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                    <Gift className="w-3 h-3" />
                    {t("cashback.special")}
                  </div>
                )}
              </div>

              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-semibold text-gradient bg-gradient-to-r from-white to-white/90 bg-clip-text">
                  {t(banner.titleKey)}
                </h3>
                <p className="text-sm opacity-90">{t(banner.subtitleKey)}</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1">
                    <Gift className="w-3 h-3" />
                    {t("cashback.earn")} {banner.cashback}
                  </div>
                  <div className="text-xs text-white/80">
                    {t("cashback.max")} {banner.maxCashback}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 transform -translate-y-1/2 glass-morphism hover:bg-white/40 text-white transition-smooth hover-lift"
        onClick={goToPrevious}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 glass-morphism hover:bg-white/40 text-white transition-smooth hover-lift"
        onClick={goToNext}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>

      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/70"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  )
})
