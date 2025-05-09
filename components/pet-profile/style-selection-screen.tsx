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
      onComplete(selectedStyle)
    }
  }

  return (
    <div className="bg-gradient-to-b from-purple-50 via-sky-50 to-white h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-1.5 sm:p-2 md:p-3 border-b border-purple-200">
        <Button
          variant="outline"
          size="icon"
          onClick={onBack}
          className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 rounded-md border-purple-300 text-purple-700"
        >
          <ChevronLeft className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
        </Button>
        <h3 className="font-medium text-xs sm:text-sm md:text-base bg-gradient-to-r from-purple-800 to-sky-700 bg-clip-text text-transparent">
          {t("selectStyle")}
        </h3>
        <Button
          variant="outline"
          size="icon"
          onClick={onClose}
          className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 rounded-md border-sky-300 text-sky-700"
        >
          <X className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
        </Button>
      </div>

      {/* Style Selection Area - Scrollable */}
      <div className="flex-1 overflow-y-auto p-1.5 sm:p-2 md:p-3 bg-gradient-to-b from-purple-50 to-sky-50">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3 md:mb-4">
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
              <div className="aspect-[3/4] w-full max-h-24 sm:max-h-28 md:max-h-36 rounded-lg overflow-hidden mb-0.5 sm:mb-1 cursor-pointer shadow-sm relative">
                <div className="w-full h-full relative">
                  {/* Style image */}
                  <img
                    src={style.imageSrc || "/placeholder.svg"}
                    alt={`${style.name} 스타일`}
                    className={`w-full h-full object-cover ${!style.available ? "filter grayscale" : ""}`}
                    style={{ imageRendering: "high-quality" }}
                  />

                  {/* Overlay for unavailable styles */}
                  {!style.available && (
                    <div className="absolute inset-0 bg-gray-800/50 flex flex-col items-center justify-center">
                      <Clock className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white mb-0.5 sm:mb-1" />
                      <span className="text-white text-[8px] sm:text-[10px] md:text-xs font-medium bg-purple-800/70 px-1.5 sm:px-2 py-0.5 rounded-full">
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
                className={`text-center text-[8px] sm:text-[10px] md:text-xs font-medium ${
                  style.available
                    ? "bg-gradient-to-r from-purple-700 to-sky-700 bg-clip-text text-transparent"
                    : "text-gray-500"
                }`}
              >
                {style.name}
              </p>
              {!style.available && (
                <p className="text-[6px] sm:text-[8px] md:text-[10px] text-gray-500">{t("comingSoon")}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Complete Button - Fixed at bottom */}
      <div className="p-1.5 sm:p-2 md:p-3 border-t border-purple-200 bg-white">
        <Button
          onClick={handleComplete}
          disabled={selectedStyle === null}
          className="w-full bg-gradient-to-r from-purple-400 to-sky-400 hover:from-purple-500 hover:to-sky-500 text-white font-bold py-1 sm:py-1.5 md:py-2 rounded-md text-[10px] sm:text-xs md:text-base shadow-md disabled:opacity-50"
        >
          {t("confirm")}
        </Button>
      </div>
    </div>
  )
}
