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
      {/* Header - 모바일에서 더 크게 */}
      <div className="flex justify-between items-center p-2 sm:p-2.5 md:p-3 border-b border-purple-200">
        <Button
          variant="outline"
          size="icon"
          onClick={onBack}
          className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 rounded-md border-purple-300 text-purple-700"
        >
          <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-4.5 md:w-4.5" />
        </Button>
        <h3 className="font-medium text-sm sm:text-base md:text-lg bg-gradient-to-r from-purple-800 to-sky-700 bg-clip-text text-transparent">
          {t("selectStyle")}
        </h3>
        <Button
          variant="outline"
          size="icon"
          onClick={onClose}
          className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 rounded-md border-sky-300 text-sky-700"
        >
          <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-4.5 md:w-4.5" />
        </Button>
      </div>

      {/* Style Selection Area - Scrollable, 모바일에서 더 큰 그리드 */}
      <div className="flex-1 overflow-y-auto p-2 sm:p-3 md:p-4 bg-gradient-to-b from-purple-50 to-sky-50">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 mb-3 sm:mb-4 md:mb-5">
          {styles.map((style) => (
            <div
              key={style.id}
              className={`flex flex-col items-center ${
                selectedStyle === style.id && style.available
                  ? "ring-2 ring-gradient-to-r from-purple-500 to-sky-500 rounded-lg"
                  : ""
              } ${!style.available ? "opacity-80" : ""}`}
              onClick={() => handleStyleSelect(style.id)}
            >
              <div className="aspect-[3/4] w-full max-h-36 sm:max-h-40 md:max-h-48 rounded-lg overflow-hidden mb-1 sm:mb-2 cursor-pointer shadow-sm relative">
                <div className="w-full h-full relative">
                  {/* Style image */}
                  <img
                    src={style.imageSrc || "/placeholder.svg"}
                    alt={`${style.name} 스타일`}
                    className={`w-full h-full object-cover ${!style.available ? "filter grayscale" : ""}`}
                    style={{ imageRendering: "high-quality" }}
                    loading="lazy"
                  />

                  {/* Overlay for unavailable styles */}
                  {!style.available && (
                    <div className="absolute inset-0 bg-gray-800/50 flex flex-col items-center justify-center">
                      <Clock className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white mb-1 sm:mb-1.5" />
                      <span className="text-white text-xs sm:text-sm md:text-base font-medium bg-purple-800/70 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
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
              <p
                className={`text-center text-xs sm:text-sm md:text-base font-medium ${
                  style.available
                    ? "bg-gradient-to-r from-purple-700 to-sky-700 bg-clip-text text-transparent"
                    : "text-gray-500"
                }`}
              >
                {style.name}
              </p>
              {!style.available && (
                <p className="text-[8px] sm:text-[10px] md:text-xs text-gray-500">{t("comingSoon")}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Complete Button - Fixed at bottom, 모바일에서 더 크게 */}
      <div className="p-2 sm:p-3 md:p-4 border-t border-purple-200 bg-white">
        <Button
          onClick={handleComplete}
          disabled={selectedStyle === null}
          className="w-full bg-gradient-to-r from-purple-400 to-sky-400 hover:from-purple-500 hover:to-sky-500 text-white font-bold py-2 sm:py-2.5 md:py-3 rounded-md text-sm sm:text-base md:text-lg shadow-md disabled:opacity-50"
        >
          {t("confirm")}
        </Button>
      </div>
    </div>
  )
}
