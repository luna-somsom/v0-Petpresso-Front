"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, Download, CheckCircle, Star } from "lucide-react"
import { useLanguage } from "@/utils/i18n/language-context"
import confetti from "canvas-confetti"

// 애니메이션 키프레임 정의
const shineAnimation = `
  @keyframes shine {
    0% {
      left: -150%;
      opacity: 0;
    }
    10% {
      opacity: 0.5;
    }
    50% {
      opacity: 0.8;
    }
    100% {
      left: 150%;
      opacity: 0;
    }
  }
  
  @keyframes pulse-glow {
    0%, 100% {
      opacity: 0.3;
      transform: scale(1);
    }
    50% {
      opacity: 0.7;
      transform: scale(1.05);
    }
  }

  @keyframes float {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
    100% {
      transform: translateY(0);
    }
  }
`

interface ResultCompletionScreenProps {
  onClose: () => void
  petName?: string
}

export function ResultCompletionScreen({ onClose, petName = "룽지" }: ResultCompletionScreenProps) {
  // 애니메이션 스타일 추가
  useEffect(() => {
    // 스타일 태그 생성 및 추가
    const styleElement = document.createElement("style")
    styleElement.textContent = shineAnimation
    document.head.appendChild(styleElement)

    // 컴포넌트 언마운트 시 스타일 태그 제거
    return () => {
      document.head.removeChild(styleElement)
    }
  }, [])

  const { t } = useLanguage()
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [rating, setRating] = useState<number>(0)
  const [hoverRating, setHoverRating] = useState<number>(0)

  useEffect(() => {
    // Check if running on the client-side and determine if it's a mobile device
    if (typeof window !== "undefined") {
      const checkDeviceType = () => {
        const width = window.innerWidth
        setIsMobile(width < 640)
        setIsTablet(width >= 640 && width < 1024)
      }

      checkDeviceType()
      window.addEventListener("resize", checkDeviceType)
      return () => window.removeEventListener("resize", checkDeviceType)
    }
  }, [])

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
    <div className="bg-gradient-to-b from-purple-50 via-sky-50 to-white h-full max-h-[80vh] flex flex-col w-full max-w-full overflow-y-auto">
      <div className="flex-1 p-2.5 sm:p-3 md:p-4">
        {loading ? (
          // 로딩 화면 - 모바일에서 더 크게
          <div className="flex flex-col items-center justify-center h-full">
            <h3 className="font-medium text-base sm:text-lg md:text-xl mb-4 sm:mb-5 md:mb-6 bg-gradient-to-r from-purple-800 to-sky-700 bg-clip-text text-transparent">
              {t("creatingProfile")}
            </h3>

            {/* 로딩 애니메이션 - 모바일에서 더 작게 */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 relative mb-4 sm:mb-5">
              {/* 배경 원 */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-200 to-sky-200 animate-pulse"></div>

              {/* 회전하는 테두리 */}
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-500 border-r-sky-500 animate-spin"></div>

              {/* 중앙 아이콘 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 text-white drop-shadow-lg animate-pulse" />
              </div>
            </div>

            <div className="w-full max-w-xs mb-4 sm:mb-5 px-4 sm:px-0">
              <div className="h-2 sm:h-2.5 md:h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-sky-500 rounded-full transition-all duration-100 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-right text-xs sm:text-sm text-purple-600 mt-1 sm:mt-1.5">{progress}%</p>
            </div>

            <p className="text-sm sm:text-base text-center text-purple-700 max-w-xs px-4 sm:px-0">
              {t("aiProcessing")} <br />
              {t("pleaseWaitMoment")}
            </p>
          </div>
        ) : (
          // 결과 화면 - 단일 컬럼 레이아웃으로 변경
          <div className="flex flex-col items-center w-full max-w-full max-h-full">
            {/* 성공 메시지 */}
            <div className="flex items-center mb-4 sm:mb-5 md:mb-6 justify-center">
              <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-green-500 mr-2 sm:mr-2.5" />
              <h3 className="font-bold text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-purple-700 to-sky-600 bg-clip-text text-transparent">
                {t("profileComplete")}
              </h3>
            </div>

            {/* 이미지 레이아웃 - 메인 이미지와 아래에 가로로 배치된 이미지들 */}
            <div className="flex flex-col items-center">
              {/* 메인 이미지 */}
              <div className="relative mb-2 sm:mb-3 w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px]">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-sky-400 rounded-lg blur opacity-30"></div>
                <div className="relative rounded-lg overflow-hidden shadow-lg">
                  <img src="/result-profile.png" alt={`${petName}의 프로필 사진`} className="w-full h-auto" />
                </div>

                {/* 펫 이름 */}
                <h4 className="text-base sm:text-lg md:text-xl font-medium text-purple-800 mt-3 text-center">
                  {petName}
                </h4>

                {/* 별점 컴포넌트 */}
                <div className="flex items-center justify-center mt-2 mb-1">
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="focus:outline-none transition-transform duration-200 hover:scale-110"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                      >
                        <Star
                          className={`h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 ${
                            (hoverRating || rating) >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                          } transition-colors duration-200`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* 별점 텍스트 표시 */}
                <div className="text-xs sm:text-sm text-purple-600 text-center mb-2">
                  {rating > 0 ? `${rating}점을 주셨습니다!` : "별점을 선택해주세요"}
                </div>

                {/* 설명 텍스트를 이름 아래로 이동 */}
                <p className="text-sm sm:text-base text-center text-sky-600 mt-1 mb-3">
                  멋진 스튜디오 프로필 사진이 완성되었습니다.
                  {isMobile ? "\n화면을 꾹 눌러 사진을 저장하세요." : ""}
                </p>
              </div>

              {/* 가로로 배치된 이미지들 */}
              <div className="flex flex-row gap-4 sm:gap-6 md:gap-8 justify-center mt-2 sm:mt-3 w-full max-w-[600px] sm:max-w-[700px] md:max-w-[800px]">
                {/* 첫 번째 이미지 - 고양이 포토카드 */}
                <div className="relative rounded-lg overflow-hidden shadow-xl group transform transition-all duration-300 hover:scale-105 hover:z-10 w-[150px] sm:w-[180px] md:w-[220px]">
                  {/* 강화된 빛나는 테두리 효과 */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400 rounded-lg blur opacity-75 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-300 to-amber-200 rounded-lg opacity-50 group-hover:opacity-80"></div>

                  {/* 추가 장식 효과 - 모서리 반짝임 */}
                  <div className="absolute top-0 right-0 w-3 h-3 bg-white rounded-full blur-sm opacity-80 animate-pulse"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 bg-white rounded-full blur-sm opacity-80 animate-pulse delay-300"></div>

                  <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: "5/4" }}>
                    <img
                      src="/images/photo-cards-cat.png"
                      alt="고양이 포토카드 예시"
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* 이미지 위에 오버레이 효과 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* 두 번째 이미지 - 강아지 포토카드 */}
                <div className="relative rounded-lg overflow-hidden shadow-xl group transform transition-all duration-300 hover:scale-105 hover:z-10 w-[150px] sm:w-[180px] md:w-[220px]">
                  {/* 강화된 빛나는 테두리 효과 */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400 rounded-lg blur opacity-75 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-300 to-amber-200 rounded-lg opacity-50 group-hover:opacity-80"></div>

                  {/* 추가 장식 효과 - 모서리 반짝임 */}
                  <div className="absolute top-0 left-0 w-3 h-3 bg-white rounded-full blur-sm opacity-80 animate-pulse"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-white rounded-full blur-sm opacity-80 animate-pulse delay-300"></div>

                  <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: "5/4" }}>
                    <img
                      src="/images/photo-cards-dog.png"
                      alt="강아지 포토카드 예시"
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* 이미지 위에 오버레이 효과 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              </div>

              {/* 포토카드 제작 버튼 - 가운데 배치 */}
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto mb-5 mt-6 sm:mt-8 md:mt-10">
                <Button
                  onClick={() =>
                    window.open(
                      "https://reconlabs.notion.site/PetPresso-1f10a8f7e66880d1ba5bc8926d6f5776?pvs=4",
                      "_blank",
                    )
                  }
                  className="w-full relative group overflow-hidden rounded-full bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-500 hover:to-emerald-600 text-black font-bold py-3 sm:py-4 md:py-5 px-3 sm:px-5 md:px-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 border-teal-300"
                >
                  {/* 강화된 빛나는 효과 */}
                  <div className="absolute inset-0 w-full h-full">
                    <div className="absolute -inset-[2px] bg-teal-300 rounded-full opacity-0 group-hover:opacity-80 blur-md animate-pulse"></div>
                    <div className="absolute -inset-[3px] bg-teal-200 rounded-full opacity-0 group-hover:opacity-60 blur-lg animate-pulse delay-75"></div>
                    <div className="absolute -inset-[4px] bg-white rounded-full opacity-0 group-hover:opacity-40 blur-xl animate-pulse delay-150"></div>
                  </div>

                  {/* 반짝이는 효과 - 더 강화 */}
                  <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                    <div className="absolute h-20 w-32 -rotate-45 transform -translate-x-12 -translate-y-2 bg-white opacity-20 group-hover:opacity-40 animate-[shine_2s_ease-in-out_infinite]"></div>
                    <div className="absolute h-10 w-20 -rotate-45 transform translate-x-32 translate-y-8 bg-white opacity-20 group-hover:opacity-30 animate-[shine_2s_ease-in-out_infinite_500ms]"></div>
                  </div>

                  <div className="relative z-10 text-center">
                    <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold">
                      사진을 포토카드로 제작해준다구? Click!
                    </span>
                  </div>
                </Button>
              </div>

              {/* 액션 버튼 - 모바일에서는 표시하지 않음 */}
              {!isMobile && (
                <div className="flex justify-center mb-3 sm:mb-4">
                  <Button className="flex items-center bg-gradient-to-r from-purple-500 to-sky-500 hover:from-purple-600 hover:to-sky-600 text-white text-sm sm:text-base py-2 sm:py-2.5 px-4 sm:px-5">
                    <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-2.5" />
                    {t("download")}
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 하단 버튼 - 모바일에서 더 크게 */}
      <div className="p-3 sm:p-4 border-t border-purple-200 bg-white">
        <Button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-purple-100 to-sky-100 text-purple-700 border border-purple-200 hover:from-purple-200 hover:to-sky-200 text-sm sm:text-base py-2.5 sm:py-3"
        >
          {loading ? t("cancel") : t("close")}
        </Button>
      </div>
    </div>
  )
}
