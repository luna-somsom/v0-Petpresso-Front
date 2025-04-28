/**
 * 리팩토링된 로딩 화면 컴포넌트
 *
 * 이 파일은 로딩 화면을 더 모듈화된 방식으로 구현합니다.
 * 각 부분이 별도의 컴포넌트로 분리되어 있어 유지보수가 용이합니다.
 */

"use client"

import { useState, useEffect } from "react"
import { KakaoChannelModal } from "@/components/kakao-channel-modal"
import { LoadingAnimation } from "./loading-animation"
import { PetInfoForm } from "./pet-info-form"
import { NotificationAlert } from "./notification-alert"
import { LoadingMessage } from "./loading-message"
import type { LoadingScreenProps, PetInfo } from "./loading-screen-types"

export function LoadingScreenRefactored({ onClose, onGoToMyPage }: LoadingScreenProps) {
  // ===== 상태 관리 =====
  const [showNotificationAlert, setShowNotificationAlert] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showKakaoChannelModal, setShowKakaoChannelModal] = useState(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [alertType, setAlertType] = useState<"success" | "channel">("channel")

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
    setAlertType("channel")
    setShowNotificationAlert(true)
    setTimeout(() => {
      setShowNotificationAlert(false)
    }, 3000)
  }

  // 폼 제출 처리
  const handleSubmitForm = (petInfo: PetInfo) => {
    // 폼 데이터 처리 (실제로는 API 호출 등이 여기에 들어감)
    console.log(petInfo)

    // 상태 업데이트
    setIsFormSubmitted(true)
    setAlertType("success")
    setShowNotificationAlert(true)

    // 1초 후 화면 닫기
    setTimeout(() => {
      onClose()
    }, 1000)
  }

  // ===== 렌더링 =====
  return (
    <div className="bg-gradient-to-b from-purple-50 via-sky-50 to-white h-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        {/* 메인 컨텐츠 컨테이너 */}
        <div className="w-full h-full p-3 sm:p-4">
          {/* 가로 레이아웃 (큰 화면) / 세로 레이아웃 (모바일) */}
          <div className="flex flex-col sm:flex-row h-full gap-3 sm:gap-4">
            {/* ===== 왼쪽 영역 - 로딩 컨텐츠 ===== */}
            <div className="flex flex-col items-center justify-center sm:w-2/5 p-2 sm:p-3">
              {/* 제목 */}
              <h3 className="font-medium text-sm sm:text-base md:text-lg mb-3 sm:mb-4 bg-gradient-to-r from-purple-800 to-sky-700 bg-clip-text text-transparent">
                촬영 준비중...
              </h3>

              {/* 로딩 애니메이션 */}
              <LoadingAnimation size="md" className="mb-3 sm:mb-4" />

              {/* 알림 메시지 */}
              {showNotificationAlert && <NotificationAlert type={alertType} className="mb-2 sm:mb-3 w-full" />}

              {/* 안내 메시지 */}
              <LoadingMessage className="mb-3 sm:mb-4 w-full" />
            </div>

            {/* ===== 오른쪽 영역 - 반려동물 정보 입력 폼 ===== */}
            <div className="sm:w-3/5 bg-white rounded-lg shadow-md p-3 sm:p-4 flex flex-col">
              <h4 className="text-xs sm:text-sm font-medium text-purple-700 mb-2 sm:mb-3 text-center">
                반려동물 정보 입력
              </h4>

              <PetInfoForm onSubmit={handleSubmitForm} />
            </div>
          </div>
        </div>
      </div>

      {/* ===== 모달 컴포넌트 ===== */}
      <KakaoChannelModal
        open={showKakaoChannelModal}
        onOpenChange={setShowKakaoChannelModal}
        onComplete={handleChannelAdded}
      />
    </div>
  )
}
