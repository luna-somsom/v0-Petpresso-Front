"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, Home } from "lucide-react"
import { useState, useEffect } from "react"
import { UserProfilePage } from "./user-profile-page"
import { Footer } from "./footer"

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
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* 헤더 */}
      <header className="bg-white shadow-sm py-2 sm:py-3 px-3 sm:px-4 sticky top-0 z-10">
        <div className="container mx-auto max-w-4xl flex items-center justify-between">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="mr-2 text-purple-700 hover:text-sky-900 hover:bg-purple-100 h-8 w-8 sm:h-9 sm:w-9"
              aria-label="뒤로 가기"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <h1 className="text-base sm:text-lg font-bold bg-gradient-to-r from-purple-700 to-sky-700 bg-clip-text text-transparent">
              마이페이지
            </h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-purple-700 hover:text-sky-900 hover:bg-purple-100 h-8 w-8 sm:h-9 sm:w-9"
            aria-label="홈으로 가기"
          >
            <Home className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="flex-1">
        {showUserProfile ? (
          <UserProfilePage onClose={onClose} />
        ) : (
          <div className="container mx-auto max-w-4xl px-4 py-8">
            <div className="text-center py-12">
              <p>새로운 사용자 프로필 페이지로 이동합니다...</p>
            </div>
          </div>
        )}
      </main>

      {/* 푸터 */}
      <Footer />
    </div>
  )
}
