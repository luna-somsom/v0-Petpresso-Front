"use client"

import { useState, useEffect } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { KakaoChannelModal } from "@/components/kakao-channel-modal"
import { CompletionScreen } from "./completion-screen"
import { ResultCompletionScreen } from "./result-completion-screen"
import { useLanguage } from "@/utils/i18n/language-context"
import { AlertCircle } from "lucide-react"
import { PetInfoInput, type PetInfo } from "./pet-info-input"
import { LimitReachedModal } from "./limit-reached-modal"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface LoadingScreenProps {
  onClose: () => void
  onGoToMyPage?: () => void
  usageLimitReached?: boolean
  selectedPhotos?: number[]
}

// 화면 상태 타입
type ScreenState = "input" | "completion" | "result"

export function LoadingScreen({
  onClose,
  onGoToMyPage,
  usageLimitReached = false,
  selectedPhotos = [],
}: LoadingScreenProps) {
  const { t } = useLanguage()

  // 화면 상태
  const [screenState, setScreenState] = useState<ScreenState>("input")

  // UI 상태
  const [showNotificationAlert, setShowNotificationAlert] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showKakaoChannelModal, setShowKakaoChannelModal] = useState(false)

  // 무료 횟수 소진 상태 (토글로 제어)
  const [isLimitReached, setIsLimitReached] = useState(usageLimitReached)
  const [showLimitModal, setShowLimitModal] = useState(false)

  // 반려동물 정보
  const [petInfo, setPetInfo] = useState<PetInfo | null>(null)

  // 선택된 사진 가져오기 - 간소화된 버전
  console.log("Selected Photos IDs:", selectedPhotos)

  // Console logs for debugging
  useEffect(() => {
    console.log("LoadingScreen - selectedPhotos:", selectedPhotos)
  }, [selectedPhotos])

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

  // 카카오 채널 추가 완료 처리
  const handleChannelAdded = () => {
    setShowNotificationAlert(true)
    setTimeout(() => {
      setShowNotificationAlert(false)
    }, 3000)
  }

  // 반려동물 정보 제출 처리
  const handlePetInfoSubmit = (info: PetInfo) => {
    setPetInfo(info)

    // 무료 횟수 소진 상태인 경우 모달 표시
    if (isLimitReached) {
      setShowLimitModal(true)
      return
    }

    // 정상 진행
    setScreenState("result")
  }

  // 완료 화면에서 닫기 버튼 클릭 또는 타이머 종료 시 처리
  const handleCompletionClose = () => {
    setScreenState("input")
    onClose()
  }

  // 결과 화면에서 닫기 버튼 클릭 시 처리
  const handleResultClose = () => {
    // 상태 초기화 없이 바로 닫기
    onClose()
  }

  // 화면 상태에 따라 다른 컴포넌트 렌더링
  const renderContent = () => {
    switch (screenState) {
      case "input":
        return (
          <div className="flex flex-col sm:flex-row h-full gap-3 sm:gap-4 md:gap-6">
            {/* 왼쪽 영역 - 안내 메시지 (모바일에서는 상단에 표시) */}
            <div className="flex flex-col items-center justify-center sm:w-1/3 p-3 sm:p-4 md:p-5">
              {/* 토글 스위치 - 무료 횟수 소진 상태 시뮬레이션 */}
              <div className="w-full flex items-center justify-end mb-2 sm:mb-3 bg-gray-100/50 p-1.5 rounded-md">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="limit-toggle" className="text-[9px] sm:text-[10px] text-gray-500">
                    무료 횟수 소진 시뮬레이션
                  </Label>
                  <Switch id="limit-toggle" checked={isLimitReached} onCheckedChange={setIsLimitReached} />
                </div>
              </div>

              {/* 제목 - 모바일에서 더 크게 */}
              <h3 className="font-medium text-sm sm:text-base md:text-lg mb-3 sm:mb-4 md:mb-5 bg-gradient-to-r from-purple-800 to-sky-700 bg-clip-text text-transparent">
                {t("shootingPrep")}
              </h3>

              {/* 선택된 사진 표시 또는 기본 로딩 애니메이션 */}
              <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-44 md:h-44 rounded-md mb-3 sm:mb-4 md:mb-5 relative overflow-hidden shadow-md">
                {selectedPhotos && selectedPhotos.length > 0 ? (
                  // 선택된 사진이 있으면 해당 사진 표시
                  <img
                    src={`/pet-profiles/gomsooni.png`}
                    alt="선택된 반려동물 사진"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  // 선택된 사진이 없으면 로딩 애니메이션 표시
                  <div className="w-full h-full bg-gradient-to-br from-purple-200 to-sky-200 animate-pulse flex items-center justify-center">
                    <span className="text-white text-xs">이미지 준비중...</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-300/30 to-sky-300/30"></div>
              </div>

              {/* 알림 메시지 */}
              {showNotificationAlert && (
                <Alert className="bg-gradient-to-r from-green-50 to-sky-50 border-green-200 mb-2 sm:mb-3 md:mb-4 w-full shadow-md p-2 sm:p-3">
                  <AlertCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-500" />
                  <AlertTitle className="text-xs sm:text-sm md:text-base font-medium text-green-700">
                    채널 추가 완료
                  </AlertTitle>
                  <AlertDescription className="text-[9px] sm:text-xs md:text-sm text-green-600">
                    이미지 생성이 완료되면 카카오톡으로 전송해 드릴게요!
                  </AlertDescription>
                </Alert>
              )}

              {/* 안내 메시지 - 모바일에서 더 크게 */}
              <div className="text-center mb-2 sm:mb-3 md:mb-4 w-full">
                <p className="text-xs sm:text-sm md:text-base text-purple-600 font-medium">
                  고객님의 소중한 반려동물이 꽃단장 중입니다..
                </p>
              </div>

              {/* 무료 횟수 안내 - 모바일에서 더 크게 */}
              <div className="w-full bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-300 rounded-md p-2 sm:p-2.5">
                <p className="text-[9px] sm:text-xs md:text-sm text-amber-700 text-center">
                  <span className="font-bold">무료 제작 횟수:</span> {isLimitReached ? "0" : "1"}/2회 남음
                </p>
              </div>
            </div>

            {/* 오른쪽 영역 - 반려동물 정보 입력 폼 (모바일에서는 하단에 표시) */}
            <div className="sm:w-2/3">
              <PetInfoInput onSubmit={handlePetInfoSubmit} selectedPhotos={selectedPhotos} />
            </div>
          </div>
        )

      case "completion":
        return <CompletionScreen onClose={handleCompletionClose} />

      case "result":
        return <ResultCompletionScreen onClose={handleResultClose} petName={petInfo?.petName || "룽지"} />
    }
  }

  return (
    <div className="bg-gradient-to-b from-purple-50 via-sky-50 to-white h-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        {/* 메인 컨텐츠 컨테이너 */}
        <div className="w-full h-full p-2 sm:p-3 md:p-4">{renderContent()}</div>
      </div>

      {/* 모달 컴포넌트 */}
      <KakaoChannelModal
        open={showKakaoChannelModal}
        onOpenChange={setShowKakaoChannelModal}
        onComplete={handleChannelAdded}
      />

      {/* 무료 횟수 소진 모달 */}
      <LimitReachedModal open={showLimitModal} onClose={() => setShowLimitModal(false)} />
    </div>
  )
}
