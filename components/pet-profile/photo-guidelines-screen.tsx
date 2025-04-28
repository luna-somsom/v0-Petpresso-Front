"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useLanguage } from "@/utils/i18n/language-context"

interface PhotoGuidelinesScreenProps {
  onClose: () => void
  onContinue: () => void
}

export function PhotoGuidelinesScreen({ onClose, onContinue }: PhotoGuidelinesScreenProps) {
  const { t } = useLanguage()
  const [isMobile, setIsMobile] = useState(false)

  // Check if the device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-purple-100 to-sky-100">
      {/* Header */}
      <div className="p-1.5 sm:p-2 md:p-3 text-center border-b border-purple-200">
        <div className="text-base sm:text-lg md:text-xl font-bold text-purple-800">{t("photoUploadGuide")}</div>
      </div>

      {/* Content Area - No Scroll */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Info Box - More compact */}
          <div className="mx-1.5 sm:mx-2 md:mx-3 mt-1.5 sm:mt-2 bg-white/80 backdrop-blur-sm rounded-md p-1 sm:p-1.5 md:p-2 shadow-sm border border-purple-200">
            <p className="text-center text-[10px] sm:text-xs md:text-sm text-purple-700 mb-0.5 sm:mb-1">
              {t("forBestResults")}
            </p>
            <p className="text-center text-[8px] sm:text-[10px] md:text-xs text-sky-600">{t("clearSoloPhoto")}</p>
          </div>

          {/* Guidelines Grid - More compact */}
          <div className="px-1.5 sm:px-2 md:px-3 mt-1.5 sm:mt-2">
            <div className="grid grid-cols-3 gap-1 sm:gap-1.5 md:gap-2">
              {/* Row 1 - All with X marks */}
              <div className="bg-gradient-to-br from-purple-200 to-sky-200 rounded-md p-1 sm:p-1.5 md:p-2 flex flex-col items-center justify-center aspect-square shadow-sm">
                <span className="text-center text-[8px] sm:text-[10px] md:text-xs text-purple-700">
                  {t("obscuredPhoto")}
                </span>
                <span className="text-sm sm:text-base md:text-lg font-bold text-purple-500">X</span>
              </div>
              <div className="bg-gradient-to-br from-sky-200 to-purple-200 rounded-md p-1 sm:p-1.5 md:p-2 flex flex-col items-center justify-center aspect-square shadow-sm">
                <span className="text-center text-[8px] sm:text-[10px] md:text-xs text-sky-700">
                  {t("withOthersPhoto")}
                </span>
                <span className="text-sm sm:text-base md:text-lg font-bold text-sky-500">X</span>
              </div>
              <div className="bg-gradient-to-br from-purple-200 to-sky-200 rounded-md p-1 sm:p-1.5 md:p-2 flex flex-col items-center justify-center aspect-square shadow-sm">
                <span className="text-center text-[8px] sm:text-[10px] md:text-xs text-purple-700">
                  {t("blurryPhoto")}
                </span>
                <span className="text-sm sm:text-base md:text-lg font-bold text-purple-500">X</span>
              </div>

              {/* Row 2 */}
              <div className="bg-gradient-to-br from-sky-200 to-purple-200 rounded-md p-1 sm:p-1.5 md:p-2 flex flex-col items-center justify-center aspect-square shadow-sm">
                <span className="text-center text-[8px] sm:text-[10px] md:text-xs text-sky-700">{t("soloPhoto")}</span>
                <span className="text-sm sm:text-base md:text-lg font-bold text-green-500">O</span>
              </div>
              <div className="bg-gradient-to-br from-purple-200 to-sky-200 rounded-md p-1 sm:p-1.5 md:p-2 flex flex-col items-center justify-center aspect-square shadow-sm">
                <span className="text-center text-[8px] sm:text-[10px] md:text-xs text-purple-700">
                  {t("fullBodyPhoto")}
                </span>
                <span className="text-sm sm:text-base md:text-lg font-bold text-green-500">O</span>
              </div>
              <div className="bg-gradient-to-br from-sky-200 to-purple-200 rounded-md p-1 sm:p-1.5 md:p-2 flex flex-col items-center justify-center aspect-square shadow-sm">
                <span className="text-center text-[8px] sm:text-[10px] md:text-xs text-sky-700">{t("clearPhoto")}</span>
                <span className="text-sm sm:text-base md:text-lg font-bold text-green-500">O</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Button */}
        <div className="p-1.5 sm:p-2 md:p-3 pb-2 sm:pb-3 md:pb-4 flex justify-center border-t border-purple-200 bg-white mt-1.5 sm:mt-2">
          <Button
            onClick={onContinue}
            className="bg-gradient-to-r from-purple-400 to-sky-400 hover:from-purple-500 hover:to-sky-500 text-white font-bold py-1 sm:py-1.5 md:py-2 px-4 sm:px-6 md:px-8 rounded-full text-xs sm:text-sm md:text-base shadow-md"
          >
            {t("select1to3Photos")}
          </Button>
        </div>
      </div>
    </div>
  )
}
