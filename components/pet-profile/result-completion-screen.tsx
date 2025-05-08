"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, Download, CheckCircle } from "lucide-react"
import { useLanguage } from "@/utils/i18n/language-context"
import confetti from "canvas-confetti"

interface ResultCompletionScreenProps {
  onClose: () => void
  petName?: string
}

export function ResultCompletionScreen({ onClose, petName = "룽지" }: ResultCompletionScreenProps) {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  // 로딩 애니메이션 및 진행 상태 업데이트
  useEffect(() => {
    const totalTime = 10000 // 10초
    const interval = 100 // 100ms마다 업데이트
    const steps = totalTime / interval
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep += 1
      const newProgress = Math.min(Math.floor((currentStep / steps) * 100), 100)
      setProgress(newProgress)

      if (newProgress >= 100) {
        clearInterval(timer)
        setLoading(false)

        // 완료 시 축하 효과 (confetti)
        const duration = 3000
        const end = Date.now() + duration

        const frame = () => {
          confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ["#9333ea", "#0ea5e9"],
          })

          confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ["#9333ea", "#0ea5e9"],
          })

          if (Date.now() < end) {
            requestAnimationFrame(frame)
          }
        }

        frame()
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-gradient-to-b from-purple-50 via-sky-50 to-white h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
        {loading ? (
          // 로딩 화면
          <div className="flex flex-col items-center justify-center h-full">
            <h3 className="font-medium text-sm sm:text-base md:text-lg mb-3 sm:mb-4 md:mb-5 bg-gradient-to-r from-purple-800 to-sky-700 bg-clip-text text-transparent">
              {t("creatingProfile")}
            </h3>

            {/* 로딩 애니메이션 - 모바일에서 더 작게 */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-48 md:h-48 relative mb-4 sm:mb-5 md:mb-6">
              {/* 배경 원 */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-200 to-sky-200 animate-pulse"></div>

              {/* 회전하는 테두리 */}
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 border-r-sky-500 animate-spin"></div>

              {/* 중앙 아이콘 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 md:h-16 md:w-16 text-white drop-shadow-lg animate-pulse" />
              </div>
            </div>

            <div className="w-full max-w-xs mb-3 sm:mb-4 px-4 sm:px-0">
              <div className="h-1.5 sm:h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-sky-500 rounded-full transition-all duration-100 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-right text-[10px] sm:text-xs text-purple-600 mt-0.5 sm:mt-1">{progress}%</p>
            </div>

            <p className="text-xs sm:text-sm text-center text-purple-700 max-w-xs px-4 sm:px-0">
              {t("aiProcessing")} <br />
              {t("pleaseWaitMoment")}
            </p>
          </div>
        ) : (
          // 결과 화면
          <div className="flex flex-col items-center">
            {/* 성공 메시지 */}
            <div className="flex items-center mb-3 sm:mb-4 md:mb-6">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-green-500 mr-1.5 sm:mr-2" />
              <h3 className="font-bold text-base sm:text-lg md:text-2xl bg-gradient-to-r from-purple-700 to-sky-600 bg-clip-text text-transparent">
                {t("profileComplete")}
              </h3>
            </div>

            {/* 결과 이미지 - 모바일에서 더 작게 */}
            <div className="relative mb-4 sm:mb-6 md:mb-8 w-full max-w-[250px] sm:max-w-xs md:max-w-sm">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-sky-400 rounded-lg blur opacity-30"></div>
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img src="/result-profile.png" alt={`${petName}의 프로필 사진`} className="w-full h-auto" />
              </div>
            </div>

            {/* 펫 이름 */}
            <h4 className="text-sm sm:text-base md:text-lg font-medium text-purple-800 mb-1.5 sm:mb-2">{petName}</h4>

            {/* 설명 */}
            <p className="text-xs sm:text-sm text-center text-sky-600 mb-4 sm:mb-6 max-w-xs px-4 sm:px-0">
              멋진 스튜디오 프로필 사진이 완성되었습니다.
              <br />
              다운로드 버튼을 눌러 저장하세요.
            </p>

            {/* 액션 버튼 - 모바일에서 더 작게 */}
            <div className="flex mb-4 sm:mb-6">
              <Button className="flex items-center bg-gradient-to-r from-purple-500 to-sky-500 hover:from-purple-600 hover:to-sky-600 text-white text-xs sm:text-sm py-1 sm:py-1.5 px-2 sm:px-3">
                <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                {t("download")}
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* 하단 버튼 */}
      <div className="p-3 sm:p-4 border-t border-purple-200 bg-white">
        <Button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-purple-100 to-sky-100 text-purple-700 border border-purple-200 hover:from-purple-200 hover:to-sky-200"
        >
          {loading ? t("cancel") : t("close")}
        </Button>
      </div>
    </div>
  )
}
