"use client"

import { useTranslation } from "@/lib/i18n"
import Image from "next/image"

export function CompanyStats() {
  const { t } = useTranslation()

  const companyStatsLocalized = [
    {
      label: t("companyStat1Label"),
      value: "21M",
      icon: "https://static.rakuten.com/img/media/dls/override/1678320090223/fact_1.png",
    },
    {
      label: t("companyStat2Label"),
      value: "$3.6B",
      icon: "https://static.rakuten.com/img/media/dls/override/1678320090555/fact_2.png",
    },
    {
      label: t("companyStat3Label"),
      value: "32,000+",
      icon: "https://static.rakuten.com/img/media/dls/override/1678320090474/fact_3.png",
    },
    {
      label: t("companyStat4Label"),
      value: "$1019.46",
      icon: "https://static.rakuten.com/img/media/dls/override/1678320090641/fact_4.png",
    },
  ]

  return (
    <section className="w-full bg-white py-4 px-3 sm:py-6 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 text-center text-gray-900">
          {t("companyStrength")}
        </h2>
        <div className="text-center text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">{t("companyStrengthDesc")}</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {companyStatsLocalized.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-100"
            >
              <Image
                src={stat.icon || "/placeholder.svg"}
                alt={stat.label}
                width={60}
                height={60}
                className="mb-2 sm:mb-3"
              />
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-orange-600 mb-1">{stat.value}</p>
              <p className="text-xs sm:text-sm text-gray-600 text-center leading-tight">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
