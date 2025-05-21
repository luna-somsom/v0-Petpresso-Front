"use client"

import { useState, useEffect } from "react"
import { KakaoChannelModal } from "@/components/kakao-channel-modal"
import { CompletionScreen } from "./completion-screen"
import { useLanguage } from "@/utils/i18n/language-context"
import { PetInfoInput, type PetInfo } from "./pet-info-input"
import { LimitReachedModal } from "./limit-reached-modal"
import { useRouter } from "next/navigation"
import { Sparkles } from "lucide-react" // Import Sparkles component

interface LoadingScreenProps {
  onClose: () => void
  onGoToMyPage?: () => void
  usageLimitReached?: boolean
  selectedPhotos?: number[]
  onBack?: () => void
  onChangePhoto?: () => void
}

type ScreenState = "input" | "loading" | "completion"

export function LoadingScreen({
  onClose,
  onGoToMyPage,
  usageLimitReached = false,
  selectedPhotos = [],
  onBack,
  onChangePhoto,
}: LoadingScreenProps) {
  const { t } = useLanguage()
  const router = useRouter()

  // 화면 상태
  const [screenState, setScreenState] = useState<ScreenState>("input")
  const [progress, setProgress] = useState(0)

  // UI 상태
  const [showNotificationAlert, setShowNotificationAlert] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [showKakaoChannelModal, setShowKakaoChannelModal] = useState(false)

  // 무료 횟수 소진 상태 (토글로 제어)
  const [isLimitReached, setIsLimitReached] = useState(usageLimitReached)
  const [showLimitModal, setShowLimitModal] = useState(false)

  // 반려동물 정보
  const [petInfo, setPetInfo] = useState<PetInfo | null>(null)

  // 디버깅 로그
  console.log("LoadingScreen - selectedPhotos:", selectedPhotos)

  // 디바이스 타입 체크
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

  // 로딩 애니메이션 및 진행 상태 업데이트 (로딩 상태일 때만)
  useEffect(() => {
    if (screenState === "loading") {
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
          // 결과 페이지로 이동
          router.push("/result")
        }
      }, interval)

      return () => clearInterval(timer)
    }
  }, [screenState, router])

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

    // 정상 진행 - 로딩 상태로 전환
    setScreenState("loading")
  }

  // 완료 화면에서 닫기 버튼 클릭 또는 타이머 종료 시 처리
  const handleCompletionClose = () => {
    setScreenState("input")
    onClose()
  }

  // 화면 상태에 따라 다른 컴포넌트 렌더링
  const renderContent = () => {
    switch (screenState) {
      case "input":
        return (
          <div className="flex flex-col h-full">
            {/* 반려동물 정보 입력 폼만 표시 - 반응형 패딩 */}
            <div className="w-full p-2 sm:p-3 md:p-4 lg:p-5 overflow-y-auto">
              <PetInfoInput
                onSubmit={handlePetInfoSubmit}
                selectedPhotos={selectedPhotos}
                onChangePhoto={onChangePhoto}
              />
            </div>
          </div>
        )

      case "loading":
        return (
          <div className="flex flex-col items-center justify-center h-full p-4">
            <h3 className="font-medium text-base sm:text-lg md:text-xl mb-4 sm:mb-5 md:mb-6 bg-gradient-to-r from-purple-800 to-sky-700 bg-clip-text text-transparent">
              {t("creatingProfile")}
            </h3>

            {/* 로딩 애니메이션 */}
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
        )

      case "completion":
        return <CompletionScreen onClose={handleCompletionClose} />

      default:
        return null
    }
  }

  return (
    <div className="bg-gradient-to-b from-purple-50 via-sky-50 to-white h-full max-h-[80vh] flex flex-col w-full max-w-full overflow-y-auto">
      <div className="flex-1 w-full">
        {/* 메인 컨텐츠 컨테이너 */}
        <div className="w-full h-full">{renderContent()}</div>
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
