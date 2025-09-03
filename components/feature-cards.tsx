"use client"

import { useTranslation } from "@/lib/i18n"

export function FeatureCards() {
  const { t } = useTranslation()

  return (
    <section className="w-full bg-white py-4 px-3 sm:py-6 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-4 sm:gap-6">
          {/* 第一组 */}
          <div className="flex flex-col items-center bg-gray-50 p-4 sm:p-6 gap-4 rounded-lg border border-gray-100">
            <img
              src="https://static.rakuten.com/img/dls/text/asset2-1600x800.png"
              alt="Save with Rakuten coupons and Cash Back"
              className="w-full max-w-xs h-auto rounded-lg"
            />
            <div className="flex flex-col items-center text-center">
              <h2 className="text-sm sm:text-base md:text-lg font-bold mb-2 text-gray-900">{t("imgCard1Title")}</h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{t("imgCard1Desc")}</p>
            </div>
          </div>
          {/* 第二组 */}
          <div className="flex flex-col items-center bg-gray-50 p-4 sm:p-6 gap-4 rounded-lg border border-gray-100">
            <img
              src="https://static.rakuten.com/img/dls/text/anonymous-home-page-mweb--_secondary-image---shoe@2x-2.png"
              alt="More for you, all with Cash Back"
              className="w-full max-w-xs h-auto rounded-lg"
            />
            <div className="flex flex-col items-center text-center">
              <h2 className="text-sm sm:text-base md:text-lg font-bold mb-2 text-gray-900">{t("imgCard2Title")}</h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{t("imgCard2Desc")}</p>
            </div>
          </div>
          {/* 第三组 */}
          <div className="flex flex-col items-center bg-gray-50 p-4 sm:p-6 gap-4 rounded-lg border border-gray-100">
            <img
              src="https://static.rakuten.com/img/dls/text/asset4-1600x800.png"
              alt="Shop whenever you want, however you want"
              className="w-full max-w-xs h-auto rounded-lg"
            />
            <div className="flex flex-col items-center text-center">
              <h2 className="text-sm sm:text-base md:text-lg font-bold mb-2 text-gray-900">{t("imgCard3Title")}</h2>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{t("imgCard3Desc")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
