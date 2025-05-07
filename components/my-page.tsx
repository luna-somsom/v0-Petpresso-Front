"use client"

import { useState, useEffect } from "react"
import { UserProfilePage } from "./user-profile-page"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

interface MyPageProps {
  onClose: () => void
}

export function MyPage({ onClose }: MyPageProps) {
  const [showUserProfile, setShowUserProfile] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // 모바일 감지
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-72px)]">
      {/* 간단한 뒤로가기 버튼 */}
      <div className="container mx-auto max-w-4xl px-4 py-4 flex items-center">
        <Button
          variant="ghost"
          onClick={onClose}
          className="mr-2 text-purple-700 hover:text-sky-900 hover:bg-purple-100"
          aria-label="뒤로 가기"
        >
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
          <span className="text-sm">돌아가기</span>
        </Button>
        <h1 className="text-base sm:text-lg font-bold bg-gradient-to-r from-purple-700 to-sky-700 bg-clip-text text-transparent">
          마이페이지
        </h1>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="container mx-auto max-w-4xl px-4 pb-8">
        {showUserProfile ? (
          <UserProfilePage onClose={onClose} />
        ) : (
          <div className="text-center py-12">
            <p>새로운 사용자 프로필 페이지로 이동합니다...</p>
          </div>
        )}
      </div>
    </div>
  )
}
