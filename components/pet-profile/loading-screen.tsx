"use client"

/**
 * 로딩 화면 컴포넌트
 *
 * 이 컴포넌트는 다음 기능을 제공합니다:
 * 1. 로딩 애니메이션 표시 (배경 이미지 포함)
 * 2. 반려동물 정보 입력 폼
 * 3. 알림 메시지 표시
 * 4. 폼 제출 처리
 */

// ===== 임포트 =====
import type React from "react"
import { useState, useEffect } from "react"

// UI 컴포넌트
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { KakaoChannelModal } from "@/components/kakao-channel-modal"
import { CompletionScreen } from "./completion-screen"
import { ResultCompletionScreen } from "./result-completion-screen"
import { useLanguage } from "@/utils/i18n/language-context"

// 아이콘
import { Loader2, AlertCircle } from "lucide-react"

// ===== 타입 정의 =====
interface LoadingScreenProps {
  onClose: () => void
  onGoToMyPage?: () => void
}

// ===== 메인 컴포넌트 =====
export function LoadingScreen({ onClose, onGoToMyPage }: LoadingScreenProps) {
  const { t } = useLanguage()

  // ===== 상태 관리 =====
  // UI 상태
  const [showNotificationAlert, setShowNotificationAlert] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showKakaoChannelModal, setShowKakaoChannelModal] = useState(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [showCompletionScreen, setShowCompletionScreen] = useState(false)
  const [showResultScreen, setShowResultScreen] = useState(false)

  // 폼 상태 - 더미 데이터로 초기화
  const [email, setEmail] = useState("pet-lover@example.com")
  const [petName, setPetName] = useState("룽지")
  const [petAge, setPetAge] = useState("3살")
  const [petSpecies, setPetSpecies] = useState("포메라니안")
  const [petFeatures, setPetFeatures] = useState(
    "활발하고 장난기가 많아요. 노란색 털에 동그란 눈이 매력적인 강아지입니다. 사람을 좋아하고 항상 꼬리를 흔들며 반겨줍니다.",
  )

  // 폼 완료 여부 확인
  const isFormComplete = email && petName && petAge && petSpecies && petFeatures

  // ===== 이펙트 =====
  // 모바일 기기 감지
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

  // ===== 이벤트 핸들러 =====
  // 카카오 채널 추가 완료 처리
  const handleChannelAdded = () => {
    setShowNotificationAlert(true)
    setTimeout(() => {
      setShowNotificationAlert(false)
    }, 3000)
  }

  // 폼 제출 처리
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()

    // 폼 데이터 처리 (실제로는 API 호출 등이 여기에 들어감)
    console.log({ email, petName, petAge, petSpecies, petFeatures })

    // 결과 화면 표시
    setShowResultScreen(true)
  }

  // 완료 화면에서 닫기 버튼 클릭 또는 타이머 종료 시 처리
  const handleCompletionClose = () => {
    // 상태 초기화 후 화면 닫기
    setShowCompletionScreen(false)
    onClose()
  }

  // 결과 화면에서 닫기 버튼 클릭 시 처리
  const handleResultClose = () => {
    setShowResultScreen(false)
    onClose()
  }

  // ===== 렌더링 =====
  return (
    <div className="bg-gradient-to-b from-purple-50 via-sky-50 to-white h-full flex flex-col">
      {showCompletionScreen ? (
        <CompletionScreen onClose={handleCompletionClose} />
      ) : showResultScreen ? (
        <ResultCompletionScreen onClose={handleResultClose} petName={petName || "룽지"} />
      ) : (
        <div className="flex-1 overflow-y-auto">
          {/* 메인 컨텐츠 컨테이너 */}
          <div className="w-full h-full p-2 sm:p-3 md:p-4">
            {/* 가로 레이아웃 (큰 화면) / 세로 레이아웃 (모바일) */}
            <div className="flex flex-col sm:flex-row h-full gap-2 sm:gap-3 md:gap-4">
              {/* ===== 왼쪽 영역 - 로딩 컨텐츠 ===== */}
              <div className="flex flex-col items-center justify-center sm:w-2/5 p-1.5 sm:p-2 md:p-3">
                {/* 제목 */}
                <h3 className="font-medium text-xs sm:text-sm md:text-lg mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r from-purple-800 to-sky-700 bg-clip-text text-transparent">
                  {t("shootingPrep")}
                </h3>

                {/* 로딩 애니메이션 (배경 이미지 포함) - 모바일에서 더 작게 */}
                <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-40 md:h-40 rounded-md mb-2 sm:mb-3 md:mb-4 relative overflow-hidden shadow-md">
                  {/* 배경 이미지 (블러 없음) */}
                  <img src="/studio-puppy.png" alt="꽃 장식을 한 강아지" className="w-full h-full object-cover" />

                  {/* 반투명 오버레이 */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-300/30 to-sky-300/30"></div>

                  {/* 로딩 스피너 */}
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 md:h-16 md:w-16 text-white animate-spin drop-shadow-lg" />
                  </div>
                </div>

                {/* 알림 메시지 */}
                {showNotificationAlert && (
                  <Alert className="bg-gradient-to-r from-green-50 to-sky-50 border-green-200 mb-1.5 sm:mb-2 md:mb-3 w-full shadow-md p-2 sm:p-3">
                    <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                    <AlertTitle className="text-[10px] sm:text-xs md:text-sm font-medium text-green-700">
                      채널 추가 완료
                    </AlertTitle>
                    <AlertDescription className="text-[8px] sm:text-[10px] md:text-xs text-green-600">
                      이미지 생성이 완료되면 카카오톡으로 전송해 드릴게요!
                    </AlertDescription>
                  </Alert>
                )}

                {/* 안내 메시지 */}
                <div className="text-center mb-2 sm:mb-3 md:mb-4 w-full">
                  <p className="text-[10px] sm:text-xs md:text-sm text-purple-600 mb-0.5 sm:mb-1 md:mb-2">
                    {t("petDressing")}
                  </p>
                  <p className="text-[10px] sm:text-xs md:text-sm text-sky-600 mb-0.5 sm:mb-1 md:mb-2">
                    {t("sequentialDelivery")}
                  </p>
                  <p className="text-[10px] sm:text-xs md:text-sm text-purple-500 font-medium mb-2 sm:mb-3">
                    {t("pleaseWait")}
                  </p>
                </div>
              </div>

              {/* ===== 오른쪽 영역 - 반려동물 정보 입력 폼 ===== */}
              <div className="sm:w-3/5 bg-white rounded-lg shadow-md p-2 sm:p-3 md:p-4 flex flex-col">
                <h4 className="text-[10px] sm:text-xs md:text-sm font-medium text-purple-700 mb-1.5 sm:mb-2 md:mb-3 text-center">
                  {t("petInfoInput")}
                </h4>

                <form
                  onSubmit={handleSubmitForm}
                  className="space-y-1.5 sm:space-y-2 md:space-y-3 flex-1 overflow-y-auto"
                >
                  {/* 이메일 입력 필드 */}
                  <div className="space-y-0.5 sm:space-y-1">
                    <Label htmlFor="email" className="text-[10px] sm:text-xs text-purple-600">
                      {t("email")} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t("emailPlaceholder")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="text-[10px] sm:text-xs h-6 sm:h-7 md:h-8"
                    />
                  </div>

                  {/* 반려동물 이름 입력 필드 */}
                  <div className="space-y-0.5 sm:space-y-1">
                    <Label htmlFor="petName" className="text-[10px] sm:text-xs text-purple-600">
                      {t("petName")} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="petName"
                      placeholder={t("petNamePlaceholder")}
                      value={petName}
                      onChange={(e) => setPetName(e.target.value)}
                      required
                      className="text-[10px] sm:text-xs h-6 sm:h-7 md:h-8"
                    />
                  </div>

                  {/* 나이 및 품종 입력 필드 (2열 그리드) */}
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2 md:gap-3">
                    {/* 나이 입력 필드 */}
                    <div className="space-y-0.5 sm:space-y-1">
                      <Label htmlFor="petAge" className="text-[10px] sm:text-xs text-purple-600">
                        {t("age")} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="petAge"
                        placeholder={t("agePlaceholder")}
                        value={petAge}
                        onChange={(e) => setPetAge(e.target.value)}
                        required
                        className="text-[10px] sm:text-xs h-6 sm:h-7 md:h-8"
                      />
                    </div>

                    {/* 품종 입력 필드 */}
                    <div className="space-y-0.5 sm:space-y-1">
                      <Label htmlFor="petSpecies" className="text-[10px] sm:text-xs text-purple-600">
                        {t("species")} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="petSpecies"
                        placeholder={t("speciesPlaceholder")}
                        value={petSpecies}
                        onChange={(e) => setPetSpecies(e.target.value)}
                        required
                        className="text-[10px] sm:text-xs h-6 sm:h-7 md:h-8"
                      />
                    </div>
                  </div>

                  {/* 특징 입력 필드 (텍스트 영역) */}
                  <div className="space-y-0.5 sm:space-y-1">
                    <Label htmlFor="petFeatures" className="text-[10px] sm:text-xs text-purple-600">
                      {t("features")} <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="petFeatures"
                      placeholder={t("featuresPlaceholder")}
                      value={petFeatures}
                      onChange={(e) => setPetFeatures(e.target.value)}
                      required
                      className="text-[10px] sm:text-xs min-h-[50px] sm:min-h-[60px] md:min-h-[80px] resize-none"
                    />
                  </div>

                  {/* 제출 버튼 */}
                  <Button
                    type="submit"
                    disabled={!isFormComplete}
                    className="w-full bg-gradient-to-r from-purple-500 to-sky-500 hover:from-purple-600 hover:to-sky-600 text-white text-[10px] sm:text-xs md:text-sm py-1 sm:py-1.5 md:py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {t("completeApplication")}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== 모달 컴포넌트 ===== */}
      <KakaoChannelModal
        open={showKakaoChannelModal}
        onOpenChange={setShowKakaoChannelModal}
        onComplete={handleChannelAdded}
      />
    </div>
  )
}
