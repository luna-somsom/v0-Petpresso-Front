"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, Sparkles } from "lucide-react"
import { useLanguage } from "@/utils/i18n/language-context"

interface CompletionScreenProps {
  onClose: () => void
}

export function CompletionScreen({ onClose }: CompletionScreenProps) {
  const { t } = useLanguage()
  const [countdown, setCountdown] = useState(5)

  // 5초 카운트다운 후 자동으로 닫기
  useEffect(() => {
    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    if (countdown <= 0) {
      onClose()
    }

    return () => clearTimeout(timer)
  }, [countdown, onClose])

  return (
    <div className="bg-gradient-to-b from-purple-50 via-sky-50 to-white h-full flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-3 sm:p-4 md:p-6">
        {/* 성공 아이콘 - 모바일에서 더 작게 */}
        <div className="relative mb-4 sm:mb-5 md:mb-6">
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-r from-green-100 to-sky-100 rounded-full flex items-center justify-center shadow-md">
            <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-green-500" />
          </div>
          <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 animate-pulse">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-yellow-400" />
          </div>
          <div className="absolute -bottom-1 -left-1 animate-pulse delay-300">
            <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-purple-400" />
          </div>
        </div>

        {/* 완료 메시지 - 모바일에서 더 작게 */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r from-purple-700 to-sky-700 bg-clip-text text-transparent">
          {t("applicationComplete")}
        </h2>

        <div className="text-center mb-4 sm:mb-6 md:mb-8 max-w-xs px-3 sm:px-0">
          <p className="text-xs sm:text-sm md:text-base text-purple-600 mb-1.5 sm:mb-2 md:mb-3">
            {t("successMessage")}
          </p>
          <p className="text-xs sm:text-sm md:text-base text-sky-600">{t("sequentialDelivery")}</p>
        </div>

        {/* 카운트다운 - 모바일에서 더 작게 */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-purple-200 to-sky-200 flex items-center justify-center shadow-md">
            <span className="text-base sm:text-lg md:text-xl font-bold text-purple-700">{countdown}</span>
          </div>
          <p className="text-[10px] sm:text-xs md:text-sm text-center mt-1.5 sm:mt-2 text-purple-500">
            {countdown}
            {t("autoCloseMessage")}
          </p>
        </div>

        {/* 닫기 버튼 - 모바일에서 더 작게 */}
        <Button
          onClick={onClose}
          className="bg-gradient-to-r from-purple-500 to-sky-500 hover:from-purple-600 hover:to-sky-600 text-white font-medium py-1.5 sm:py-2 md:py-2.5 px-4 sm:px-6 md:px-8 rounded-full text-xs sm:text-sm md:text-base shadow-md"
        >
          {t("close")}
        </Button>
      </div>
    </div>
  )
}
