"use client"

import { useState, useEffect } from "react"
import { KakaoChannelModal } from "@/components/kakao-channel-modal"
import { CompletionScreen } from "./completion-screen"
import { ResultCompletionScreen } from "./result-completion-screen"
import { useLanguage } from "@/utils/i18n/language-context"
import { PetInfoInput, type PetInfo } from "./pet-info-input"
import { LimitReachedModal } from "./limit-reached-modal"

// LoadingScreenProps 인터페이스에 onChangePhoto 함수 추가
interface LoadingScreenProps {
  onClose: () => void
  onGoToMyPage?: () => void
  usageLimitReached?: boolean
  selectedPhotos?: number[]
  onBack?: () => void
  onChangePhoto?: () => void // 사진 변경 함수 추가
}

type ScreenState = "input" | "completion" | "result"

// LoadingScreen 함수 매개변수에 onChangePhoto 추가
export function LoadingScreen({
  onClose,
  onGoToMyPage,
  usageLimitReached = false,
  selectedPhotos = [],
  onBack,
  onChangePhoto,
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

  // 디버깅 로그
  console.log("LoadingScreen - selectedPhotos:", selectedPhotos)

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

  // 선택된 사진 ID에 따라 이미지 경로 결정
  const getImagePath = (photoId: number) => {
    // 간단한 매핑 테이블
    const imagePaths: Record<number, string> = {
      1: "/gallery-dog.jpeg",
      2: "/pet-profiles/gomsooni.png",
      3: "/pet-profiles/pudding.png",
      4: "/pet-profiles/nyangi.png",
      5: "/pet-profiles/roy.png",
      6: "/pet-profiles/luka.png",
      7: "/pet-profiles/roongji.png",
      8: "/pet-profiles/milk.png",
      9: "/duksun.jpeg",
      10: "/kancho-home.jpeg",
      11: "/kancho-profile.png",
      12: "/flower-profile-dog.png",
    }

    return imagePaths[photoId] || "/placeholder.svg"
  }

  // 화면 상태에 따라 다른 컴포넌트 렌더링
  const renderContent = () => {
    switch (screenState) {
      case "input":
        return (
          <div className="flex flex-col h-full">
            {/* 반려동물 정보 입력 폼만 표시 - onChangePhoto 콜백 전달 */}
            <div className="w-full">
              <PetInfoInput
                onSubmit={handlePetInfoSubmit}
                selectedPhotos={selectedPhotos}
                onChangePhoto={onChangePhoto} // 사진 변경 콜백 전달
              />
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
