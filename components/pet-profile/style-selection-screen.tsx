"use client"

import { Button } from "@/components/ui/button"
import { X, ChevronLeft, Clock } from "lucide-react"
import { useState, useEffect } from "react"
import type { StyleItem } from "./types"
import { useLanguage } from "@/utils/i18n/language-context"

interface StyleSelectionScreenProps {
  onClose: () => void
  onBack: () => void
  onComplete: (styleId: number) => void
  initialSelectedStyle?: number | null
}

export function StyleSelectionScreen({
  onClose,
  onBack,
  onComplete,
  initialSelectedStyle = null,
}: StyleSelectionScreenProps) {
  const { t } = useLanguage()
  const [selectedStyle, setSelectedStyle] = useState<number | null>(initialSelectedStyle)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  // Check device type
  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth
      setIsMobile(width < 640)
      setIsTablet(width >= 640 && width < 1024)
    }

    checkDeviceType()
    window.addEventListener("resize", checkDeviceType)

    return () => {
      window.removeEventListener("resize", checkDeviceType)
    }
  }, [])

  // Mock style data with images and availability status
  const styles: (StyleItem & { imageSrc: string; available: boolean })[] = [
    { id: 1, name: t("flowerProfile"), imageSrc: "/flower-profile-dog.png", available: true },
    { id: 2, name: t("animationStyle"), imageSrc: "/ghibli-style-dog.png", available: false },
    { id: 4, name: t("baseball"), imageSrc: "/baseball-dog-new.png", available: false },
  ]

  const handleStyleSelect = (styleId: number) => {
    // Only allow selection of available styles
    const style = styles.find((s) => s.id === styleId)
    if (style && style.available) {
      setSelectedStyle(styleId)
    }
  }

  const handleComplete = () => {
    if (selectedStyle !== null) {
      console.log("Selected style ID:", selectedStyle)
      onComplete(selectedStyle)
    }
  }

  return (
    <div className="bg-gradient-to-b from-purple-50 via-sky-50 to-white h-full flex flex-col">
      {/* Header - 반응형 패딩 및 폰트 크기 */}
      <div className="flex justify-between items-center p-2 sm:p-2.5 md:p-3 border-b border-purple-200">
        <Button
          variant="outline"
          size="icon"
          onClick={onBack}
          className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 rounded-md border-purple-300 text-purple-700"
        >
          <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
        </Button>
        <h3 className="font-medium text-sm sm:text-base md:text-lg lg:text-xl bg-gradient-to-r from-purple-800 to-sky-700 bg-clip-text text-transparent">
          {t("selectStyle")}
        </h3>
        <Button
          variant="outline"
          size="icon"
          onClick={onClose}
          className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 rounded-md border-sky-300 text-sky-700"
        >
          <X className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
        </Button>
      </div>

      {/* Style Selection Area - Scrollable, 반응형 그리드 및 간격 */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-2.5 md:p-3 bg-gradient-to-b from-purple-50 to-sky-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-2.5 md:gap-3 mb-2 sm:mb-3">
          {styles.map((style) => (
            <div
              key={style.id}
              className={`flex flex-col items-center ${
                selectedStyle === style.id && style.available
                  ? "ring-2 ring-gradient-to-r from-purple-500 to-sky-500 rounded-lg transform scale-[1.02] transition-all duration-200"
                  : ""
              } ${!style.available ? "opacity-80" : ""}`}
              onClick={() => handleStyleSelect(style.id)}
            >
              <div className="relative w-full max-w-[160px] sm:max-w-[180px] md:max-w-[200px] lg:max-w-full mx-auto">
                {/* Decorative frame */}
                <div className="absolute -inset-1 md:-inset-2 bg-gradient-to-br from-purple-300 via-pink-200 to-purple-300 rounded-lg opacity-70 blur-sm"></div>

                {/* Image container */}
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg border-2 border-purple-200 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="w-full h-full overflow-hidden relative">
                    {/* Style image */}
                    <img
                      src={style.imageSrc || "/placeholder.svg"}
                      alt={`${style.name} 스타일`}
                      className={`w-full h-full object-cover transition-transform duration-700 hover:scale-110 ${!style.available ? "filter grayscale" : ""}`}
                      style={{ imageRendering: "high-quality" }}
                      loading="lazy"
                    />

                    {/* Overlay for unavailable styles */}
                    {!style.available && (
                      <div className="absolute inset-0 bg-gray-800/50 flex flex-col items-center justify-center">
                        <Clock className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 lg:h-10 lg:w-10 text-white mb-1 sm:mb-2" />
                        <span className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-medium bg-purple-800/70 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                          {t("preparing")}
                        </span>
                      </div>
                    )}

                    {/* Overlay on hover for available styles */}
                    {style.available && (
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    )}

                    {/* Selection indicator */}
                    {selectedStyle === style.id && style.available && (
                      <div className="absolute inset-0 border-2 border-purple-500 rounded-lg"></div>
                    )}
                  </div>
                </div>
              </div>

              {/* Label - 반응형 폰트 크기 */}
              <div className="mt-3 sm:mt-4 md:mt-5 text-center">
                <p
                  className={`font-bold text-sm sm:text-base md:text-lg lg:text-xl ${
                    style.available
                      ? "bg-gradient-to-r from-purple-700 to-sky-700 bg-clip-text text-transparent"
                      : "text-gray-500"
                  }`}
                >
                  {style.name}
                </p>
                <p className="text-[10px] sm:text-xs md:text-sm lg:text-base text-purple-500 mt-0.5 sm:mt-1">
                  {!style.available ? t("comingSoon") : style.id === 1 ? "화려한 색감과 꽃 장식" : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Complete Button - Fixed at bottom, 반응형 패딩 및 폰트 크기 */}
      <div className="p-2 sm:p-2.5 md:p-3 border-t border-purple-200 bg-white">
        <Button
          onClick={handleComplete}
          disabled={selectedStyle === null}
          className="w-full bg-gradient-to-r from-purple-400 to-sky-400 hover:from-purple-500 hover:to-sky-500 text-white font-bold py-2 sm:py-2.5 md:py-3 lg:py-4 rounded-md text-sm sm:text-base md:text-lg lg:text-xl shadow-md disabled:opacity-50 transition-all duration-200"
        >
          {t("confirm")}
        </Button>
      </div>
    </div>
  )
}
