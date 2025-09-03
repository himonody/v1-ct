"use client"

import { useTranslation } from "@/lib/i18n"

export function HowItWorks() {
  const { t } = useTranslation()

  return (
    <section className="w-full bg-gray-50 py-4 px-3 sm:py-6 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-6 text-center text-gray-900">
          {t("howRakutenWorks")}
        </h2>
        <div className="flex flex-col gap-4 sm:gap-6">
          <div className="flex flex-col items-center bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
            <img
              src="https://static.rakuten.com/img/media/37274/webanonlp_howitworks1743702732092.png"
              alt="1. Join for free"
              className="mb-3 w-20 h-20 sm:w-24 sm:h-24 object-contain"
            />
            <p className="font-bold text-sm sm:text-base mb-2 text-gray-900 text-center">{t("step1Title")}</p>
            <span className="text-gray-600 text-xs sm:text-sm text-center leading-relaxed">{t("step1Desc")}</span>
          </div>
          <div className="flex flex-col items-center bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
            <img
              src="https://static.rakuten.com/img/media/dls/override/1738605300529/hiw-2.png"
              alt="2. Shop and earn Cash Back"
              className="mb-3 w-20 h-20 sm:w-24 sm:h-24 object-contain"
            />
            <p className="font-bold text-sm sm:text-base mb-2 text-gray-900 text-center">{t("step2Title")}</p>
            <span className="text-gray-600 text-xs sm:text-sm text-center leading-relaxed">{t("step2Desc")}</span>
          </div>
          <div className="flex flex-col items-center bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
            <img
              src="https://static.rakuten.com/img/media/dls/override/1738605300707/hiw-3.png"
              alt="3. Get paid!"
              className="mb-3 w-20 h-20 sm:w-24 sm:h-24 object-contain"
            />
            <p className="font-bold text-sm sm:text-base mb-2 text-gray-900 text-center">{t("step3Title")}</p>
            <span className="text-gray-600 text-xs sm:text-sm text-center leading-relaxed">{t("step3Desc")}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
