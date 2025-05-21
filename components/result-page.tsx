"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download, CheckCircle, Star, PawPrint, Menu, X, LogOut, Sparkles, Send, ThumbsUp } from "lucide-react"
import { useLanguage } from "@/utils/i18n/language-context"
import confetti from "canvas-confetti"
import { useRouter } from "next/navigation"
import { LanguageSwitcher } from "@/components/language-switcher"
import { KakaoLoginModal } from "@/components/kakao-login-modal"
import { useApp } from "@/contexts/app-context"
import { useToast } from "@/components/ui/use-toast"
import { PreparationModal } from "@/components/preparation-modal"

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

interface ResultPageProps {
  petName?: string
}

export function ResultPage({ petName = "룽지" }: ResultPageProps) {
  const router = useRouter()
  const { isLoggedIn, login, logout } = useApp()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { toast } = useToast()

  // 준비중 모달 상태 추가
  const [showPreparationModal, setShowPreparationModal] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleLogin = () => {
    login()
    setMobileMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    setMobileMenuOpen(false)
  }

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
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [rating, setRating] = useState<number>(0)
  const [hoverRating, setHoverRating] = useState<number>(0)
  const [ratingSubmitted, setRatingSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [ratingComment, setRatingComment] = useState("")

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

  // 페이지 로드 시 축하 효과 (confetti)
  useEffect(() => {
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
  }, [])

  const handleGoHome = () => {
    router.push("/")
  }

  // 버튼 클릭 핸들러 - 준비중 모달 표시
  const handleButtonClick = () => {
    setShowPreparationModal(true)
  }

  // 별점 제출 함수
  const handleSubmitRating = async () => {
    if (rating === 0) {
      toast({
        title: "별점을 선택해주세요",
        description: "1점부터 5점까지 선택할 수 있습니다.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // 실제 구현에서는 API 호출로 대체
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 성공 처리
      setRatingSubmitted(true)

      // 성공 토스트 메시지
      toast({
        title: "별점이 제출되었습니다",
        description: `${rating}점을 주셔서 감사합니다!`,
        variant: "default",
      })

      // 별점 5점이면 추가 효과
      if (rating === 5) {
        // 추가 confetti 효과
        const duration = 2000
        const end = Date.now() + duration

        const frame = () => {
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 70,
            origin: { x: 0.3, y: 0.5 },
            colors: ["#9333ea", "#0ea5e9", "#f97316"],
          })

          confetti({
            particleCount: 3,
            angle: 120,
            spread: 70,
            origin: { x: 0.7, y: 0.5 },
            colors: ["#9333ea", "#0ea5e9", "#f97316"],
          })

          if (Date.now() < end) {
            requestAnimationFrame(frame)
          }
        }

        frame()
      }
    } catch (error) {
      console.error("별점 제출 오류:", error)
      toast({
        title: "별점 제출 실패",
        description: "잠시 후 다시 시도해주세요.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 via-sky-50 to-white">
      {/* 헤더 */}
      <nav className="w-full bg-white shadow-sm py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex-1">
            <Button
              variant="ghost"
              onClick={handleGoHome}
              className="relative group overflow-hidden rounded-full px-5 sm:px-6 py-2 sm:py-2.5 border-none hover:bg-transparent"
            >
              {/* 배경 그라데이션 효과 */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-100 via-sky-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>

              {/* 서비스 명 텍스트 */}
              <div className="relative flex items-center">
                {/* 강아지 발바닥 아이콘 */}
                <PawPrint className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 mr-1 sm:mr-2 text-purple-600 transform rotate-neg90" />

                <span className="text-lg sm:text-xl md:text-2xl font-bold font-cherry-bomb bg-gradient-to-r from-purple-600 via-sky-500 to-purple-600 bg-clip-text text-transparent tracking-wider">
                  Petpresso
                </span>

                {/* 장식 요소 */}
                <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400" />
                </div>
              </div>

              {/* 밑줄 효과 */}
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-sky-400 group-hover:w-4/5 transition-all duration-300"></div>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="text-purple-700">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            {isLoggedIn ? (
              <>
                <Button
                  variant="ghost"
                  className="text-sm md:text-base font-medium text-sky-700 hover:text-purple-900 hover:bg-purple-50"
                  onClick={handleLogout}
                >
                  {t("logout")}
                </Button>
              </>
            ) : (
              <KakaoLoginModal onLogin={handleLogin} />
            )}
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-2 px-4 z-50">
              {isLoggedIn ? (
                <div className="flex flex-col space-y-2">
                  <Button
                    variant="ghost"
                    className="justify-start text-sm font-medium text-sky-700 hover:text-purple-900 hover:bg-purple-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {t("logout")}
                  </Button>
                </div>
              ) : (
                <div className="py-2">
                  <KakaoLoginModal onLogin={handleLogin} />
                </div>
              )}
            </div>
          )}
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* 성공 메시지 */}
          <div className="flex items-center mb-6 sm:mb-8 md:mb-10 justify-center">
            <CheckCircle className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-green-500 mr-2 sm:mr-3" />
            <h1 className="font-bold text-xl sm:text-2xl md:text-3xl bg-gradient-to-r from-purple-700 to-sky-600 bg-clip-text text-transparent">
              {t("profileComplete")}
            </h1>
          </div>

          {/* 이미지 레이아웃 - 메인 이미지와 아래에 가로로 배치된 이미지들 */}
          <div className="flex flex-col items-center">
            {/* 메인 이미지 */}
            <div className="relative mb-4 sm:mb-6 w-full max-w-[320px] sm:max-w-[400px] md:max-w-[480px]">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-sky-400 rounded-lg blur opacity-30"></div>
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <img src="/result-profile.png" alt={`${petName}의 프로필 사진`} className="w-full h-auto" />
              </div>

              {/* 펫 이름 */}
              <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-purple-800 mt-4 text-center">{petName}</h2>

              {/* 별점 섹션 */}
              <div className="w-full max-w-sm mx-auto mt-4 mb-2 bg-gradient-to-r from-purple-50 to-sky-50 p-3 sm:p-4 rounded-lg shadow-sm">
                <h3 className="text-sm sm:text-base font-medium text-purple-700 mb-2 text-center">
                  {ratingSubmitted ? "소중한 평가 감사합니다!" : "프로필 사진은 어떠셨나요?"}
                </h3>

                {/* 별점 컴포넌트 */}
                <div className="flex items-center justify-center mb-3">
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`focus:outline-none transition-all duration-200 ${
                          ratingSubmitted ? "" : "hover:scale-110"
                        }`}
                        onClick={() => !ratingSubmitted && setRating(star)}
                        onMouseEnter={() => !ratingSubmitted && setHoverRating(star)}
                        onMouseLeave={() => !ratingSubmitted && setHoverRating(0)}
                        disabled={ratingSubmitted}
                      >
                        <Star
                          className={`h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 ${
                            (ratingSubmitted ? rating : hoverRating || rating) >= star
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          } transition-colors duration-200 ${ratingSubmitted && rating >= star ? "animate-pulse" : ""}`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* 별점 텍스트 표시 */}
                <div className="text-sm text-center mb-3">
                  {ratingSubmitted ? (
                    <div className="flex items-center justify-center text-green-600 font-medium">
                      <ThumbsUp className="h-4 w-4 mr-1.5 inline" />
                      <span>{rating}점을 주셨습니다!</span>
                    </div>
                  ) : rating > 0 ? (
                    <span className="text-purple-600">{rating}점을 선택하셨습니다</span>
                  ) : (
                    <span className="text-gray-500">별점을 선택해주세요 (1~5점)</span>
                  )}
                </div>

                {/* 코멘트 입력 (선택 사항) */}
                {!ratingSubmitted && (
                  <div className="mb-3">
                    <textarea
                      placeholder="추가 의견이 있으시면 남겨주세요 (선택사항)"
                      className="w-full p-2 border border-purple-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 resize-none"
                      rows={2}
                      value={ratingComment}
                      onChange={(e) => setRatingComment(e.target.value)}
                    ></textarea>
                  </div>
                )}

                {/* 제출 버튼 */}
                {!ratingSubmitted && (
                  <div className="flex justify-center">
                    <Button
                      onClick={handleSubmitRating}
                      disabled={rating === 0 || isSubmitting}
                      className="bg-gradient-to-r from-purple-500 to-sky-500 hover:from-purple-600 hover:to-sky-600 text-white text-sm py-1.5 px-4 rounded-full flex items-center"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          <span>제출 중...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-3.5 w-3.5 mr-1.5" />
                          <span>별점 제출하기</span>
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>

              {/* 설명 텍스트를 이름 아래로 이동 */}
              <p className="text-sm sm:text-base md:text-lg text-center text-sky-600 mt-2 mb-4">
                멋진 스튜디오 프로필 사진이 완성되었습니다.
                {isMobile ? "\n화면을 꾹 눌러 사진을 저장하세요." : ""}
              </p>
            </div>

            {/* 다운로드 버튼 */}
            <div className="flex justify-center mb-8 sm:mb-10">
              <Button className="flex items-center bg-gradient-to-r from-purple-500 to-sky-500 hover:from-purple-600 hover:to-sky-600 text-white text-sm sm:text-base md:text-lg py-2.5 sm:py-3 md:py-4 px-5 sm:px-6 md:px-8 rounded-md shadow-md">
                <Download className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                {t("download")}
              </Button>
            </div>

            {/* 가로로 배치된 이미지들 */}
            <div className="flex flex-row gap-6 sm:gap-8 md:gap-10 justify-center mt-4 sm:mt-6 w-full max-w-[800px] sm:max-w-[900px] md:max-w-[1000px]">
              {/* 첫 번째 이미지 - 하늘색 배경 포토카드 */}
              <div className="relative rounded-lg overflow-hidden shadow-xl group transform transition-all duration-300 hover:scale-105 hover:z-10 w-[200px] sm:w-[250px] md:w-[320px]">
                {/* 강화된 빛나는 테두리 효과 */}
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400 rounded-lg blur opacity-75 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-300 to-amber-200 rounded-lg opacity-50 group-hover:opacity-80"></div>

                {/* 추가 장식 효과 - 모서리 반짝임 */}
                <div className="absolute top-0 right-0 w-3 h-3 bg-white rounded-full blur-sm opacity-80 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 bg-white rounded-full blur-sm opacity-80 animate-pulse delay-300"></div>

                <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: "5/4" }}>
                  <img
                    src="/images/pet-card-collection-blue.png"
                    alt="반려동물 포토카드 컬렉션"
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* 이미지 위에 오버레이 효과 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* 두 번째 이미지 - 분홍색 배경 포토카드 */}
              <div className="relative rounded-lg overflow-hidden shadow-xl group transform transition-all duration-300 hover:scale-105 hover:z-10 w-[200px] sm:w-[250px] md:w-[320px]">
                {/* 강화된 빛나는 테두리 효과 */}
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-400 rounded-lg blur opacity-75 group-hover:opacity-100 animate-pulse transition-opacity duration-300"></div>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-300 to-amber-200 rounded-lg opacity-50 group-hover:opacity-80"></div>

                {/* 추가 장식 효과 - 모서리 반짝임 */}
                <div className="absolute top-0 left-0 w-3 h-3 bg-white rounded-full blur-sm opacity-80 animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-white rounded-full blur-sm opacity-80 animate-pulse delay-300"></div>

                <div className="relative w-full rounded-lg overflow-hidden" style={{ aspectRatio: "5/4" }}>
                  <img
                    src="/images/pet-card-collection-pink.png"
                    alt="반려동물 포토카드 컬렉션"
                    className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* 이미지 위에 오버레이 효과 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>

            {/* 포토카드 제작 버튼 - 가운데 배치 */}
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto mb-5 mt-8 sm:mt-10 md:mt-12">
              <Button
                onClick={handleButtonClick}
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
                    하나뿐인 반려동물 굿즈 제작하기 Click ✨
                  </span>
                </div>
              </Button>
            </div>
            {/* 이벤트 참여 버튼 */}
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto mb-8 sm:mb-10 md:mb-12 mt-2 sm:mt-3">
              <Button
                onClick={handleButtonClick}
                className="w-full relative group overflow-hidden rounded-full bg-gradient-to-r from-pink-400 to-orange-400 hover:from-pink-500 hover:to-orange-500 text-white font-bold py-3 sm:py-4 md:py-5 px-3 sm:px-5 md:px-6 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 border-2 border-pink-300"
              >
                {/* 강화된 빛나는 효과 */}
                <div className="absolute inset-0 w-full h-full">
                  <div className="absolute -inset-[2px] bg-pink-300 rounded-full opacity-0 group-hover:opacity-80 blur-md animate-pulse"></div>
                  <div className="absolute -inset-[3px] bg-pink-200 rounded-full opacity-0 group-hover:opacity-60 blur-lg animate-pulse delay-75"></div>
                  <div className="absolute -inset-[4px] bg-white rounded-full opacity-0 group-hover:opacity-40 blur-xl animate-pulse delay-150"></div>
                </div>

                {/* 반짝이는 효과 - 더 강화 */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                  <div className="absolute h-20 w-32 -rotate-45 transform -translate-x-12 -translate-y-2 bg-white opacity-20 group-hover:opacity-40 animate-[shine_2s_ease-in-out_infinite]"></div>
                  <div className="absolute h-10 w-20 -rotate-45 transform translate-x-32 translate-y-8 bg-white opacity-20 group-hover:opacity-30 animate-[shine_2s_ease-in-out_infinite_500ms]"></div>
                </div>

                <div className="relative z-10 text-center">
                  <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-black">
                    이벤트 참여하고 귀여운 굿즈 받기 🎁
                  </span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* 준비중 모달 */}
      <PreparationModal open={showPreparationModal} onOpenChange={setShowPreparationModal} />
    </div>
  )
}
