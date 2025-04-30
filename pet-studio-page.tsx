"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { Sparkles, Menu, X, Star, Heart, PawPrint, User, LogOut } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { GalleryScreen } from "@/components/pet-profile/gallery-screen"
import { PhotoGuidelinesScreen } from "@/components/pet-profile/photo-guidelines-screen"
import { StyleSelectionScreen } from "@/components/pet-profile/style-selection-screen"
import { LoadingScreen } from "@/components/pet-profile/loading-screen"
import { KakaoLoginModal } from "@/components/kakao-login-modal"
import { KakaoSignupModal } from "@/components/kakao-signup-modal"
import { LanguageProvider } from "@/utils/i18n/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/utils/i18n/language-context"
import { MyPage } from "@/components/my-page"
import { AppProvider, useApp } from "@/contexts/app-context"
import { useResponsive } from "@/hooks/use-responsive"
import { STYLE_OPTIONS } from "@/constants"
import type { ProfileCreationStep } from "@/types"
// 기존 import 유지
import { OptimizedSlidingGallery } from "@/components/optimized-sliding-gallery"

// 언어 컨텍스트를 사용하는 내부 컴포넌트
function PetStudioPageContent() {
  const { t } = useLanguage()
  const { isLoggedIn, login, logout, openModal, closeModal, user } = useApp()
  const { isMobile } = useResponsive()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeStyle, setActiveStyle] = useState<number | null>(null)
  const [showMyPage, setShowMyPage] = useState(false)

  // 프로필 생성 플로우 관련 상태
  const [profileDialogOpen, setProfileDialogOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState<ProfileCreationStep>("guidelines")
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([])
  const [selectedStyle, setSelectedStyle] = useState<number | null>(null)

  // 회원가입 모달 관련 상태
  const [showSignupModal, setShowSignupModal] = useState(false)

  const goToHome = () => {
    setMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // 프로필 생성 플로우 핸들러
  const handleDialogClose = () => {
    setProfileDialogOpen(false)
    // 상태 초기화
    setTimeout(() => {
      setCurrentStep("guidelines")
      setSelectedPhotos([])
      setSelectedStyle(null)
    }, 300)
  }

  const handleContinueToGallery = () => {
    setCurrentStep("gallery")
  }

  const handlePhotosSelected = (photos: number[]) => {
    setSelectedPhotos(photos)

    // 로그인 상태에 따라 다른 플로우
    if (isLoggedIn) {
      // 로그인 상태면 바로 스타일 선택으로
      setCurrentStep("styleSelection")
    } else {
      // 비로그인 상태면 회원가입 모달 표시
      setProfileDialogOpen(false)
      setShowSignupModal(true)
    }
  }

  // 회원가입 완료 후 처리
  const handleSignupComplete = () => {
    login()
    // 회원가입 완료 후 프로필 생성 플로우 계속
    setProfileDialogOpen(true)
    setCurrentStep("styleSelection")
  }

  const handleStyleSelected = (styleId: number) => {
    setSelectedStyle(styleId)
    setCurrentStep("loading")
  }

  const handleBackToGuidelines = () => {
    setCurrentStep("guidelines")
  }

  const handleBackToGallery = () => {
    setCurrentStep("gallery")
  }

  const handleLogin = () => {
    login()
    setMobileMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    setMobileMenuOpen(false)
  }

  // 현재 단계에 따른 컨텐츠 렌더링
  const renderProfileContent = () => {
    switch (currentStep) {
      case "guidelines":
        return <PhotoGuidelinesScreen onClose={handleDialogClose} onContinue={handleContinueToGallery} />
      case "gallery":
        return (
          <GalleryScreen
            onClose={handleDialogClose}
            onBack={handleBackToGuidelines}
            onComplete={handlePhotosSelected}
            initialSelectedPhotos={selectedPhotos}
          />
        )
      case "styleSelection":
        return (
          <StyleSelectionScreen
            onClose={handleDialogClose}
            onBack={handleBackToGallery}
            onComplete={handleStyleSelected}
            initialSelectedStyle={selectedStyle}
          />
        )
      case "loading":
        return <LoadingScreen onClose={handleDialogClose} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation bar */}
      <nav className="w-full bg-white shadow-sm py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex-1">
            <Button
              variant="ghost"
              onClick={goToHome}
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
                  className="text-sm md:text-base font-medium text-purple-700 hover:text-sky-900 hover:bg-purple-100"
                  onClick={() => setShowMyPage(true)}
                >
                  <User className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" />
                  {t("myPage")}
                </Button>
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
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md py-2 px-4 z-50">
            {isLoggedIn ? (
              <div className="flex flex-col space-y-2">
                <Button
                  variant="ghost"
                  className="justify-start text-sm font-medium text-purple-700 hover:text-sky-900 hover:bg-purple-100"
                  onClick={() => {
                    setShowMyPage(true)
                    setMobileMenuOpen(false)
                  }}
                >
                  <User className="h-4 w-4 mr-2" />
                  {t("myPage")}
                </Button>
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
      </nav>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <main className="container mx-auto px-4 md:px-6 py-6 md:py-12 flex-1">
          <div className="max-w-4xl mx-auto">
            {/* Hero 섹션 */}
            <section className="text-center mb-8 md:mb-12 py-6 md:py-8 relative">
              {/* 그라데이션 배경 효과 */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Top left decorative element */}
                <div className="absolute -top-4 -left-4 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-purple-200/40 to-transparent rounded-full blur-xl"></div>

                {/* Bottom right decorative element */}
                <div className="absolute -bottom-4 -right-4 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-tl from-sky-200/40 to-transparent rounded-full blur-xl"></div>

                {/* Center decorative element */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 bg-gradient-to-r from-purple-100/20 to-sky-100/20 rounded-full blur-3xl"></div>
              </div>

              {/* 상단 장식 요소 */}
              <div className="relative flex justify-center items-center mb-3 md:mb-4">
                <div className="h-0.5 w-12 md:w-16 bg-gradient-to-r from-transparent to-purple-300 rounded-full"></div>
                <div className="mx-2 md:mx-3 text-purple-400 animate-bounce">
                  <PawPrint className="h-4 w-4 md:h-5 md:w-5 transform rotate-neg90" />
                </div>
                <div className="h-0.5 w-12 md:w-16 bg-gradient-to-r from-purple-300 to-sky-300 rounded-full"></div>
                <div className="mx-2 md:mx-3 text-sky-400 animate-bounce delay-100">
                  <PawPrint className="h-4 w-4 md:h-5 md:w-5 transform rotate-neg90" />
                </div>
                <div className="h-0.5 w-12 md:w-16 bg-gradient-to-r from-sky-300 to-transparent rounded-full"></div>
              </div>

              {/* 장식 부제목 */}
              <p className="relative text-xs sm:text-sm md:text-base font-medium text-purple-600 tracking-wider uppercase mb-3 md:mb-4 animate-pulse">
                {t("specialMoment")}
              </p>

              {/* Sparkling stars around the title */}
              <div className="absolute top-1/4 left-1/4 animate-pulse">
                <Sparkles className="h-4 w-4 md:h-6 md:w-6 text-yellow-400" />
              </div>
              <div className="absolute top-1/3 right-1/4 animate-pulse delay-300">
                <Star className="h-3 w-3 md:h-5 md:w-5 text-purple-400" />
              </div>
              <div className="absolute bottom-1/3 left-1/3 animate-pulse delay-700">
                <Sparkles className="h-3 w-3 md:h-5 md:w-5 text-sky-400" />
              </div>
              <div className="absolute bottom-1/4 right-1/3 animate-pulse delay-500">
                <Heart className="h-3 w-3 md:h-4 md:w-4 text-pink-400" />
              </div>

              {/* 메인 타이틀 */}
              <div className="relative mb-4 md:mb-6">
                {/* Title background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-sky-400/20 to-purple-400/20 rounded-2xl blur-xl"></div>

                {/* Main title */}
                <div className="relative px-4 py-3 md:px-6 md:py-4 z-10">
                  {/* PetPresso 강조 */}
                  <div className="mb-3 md:mb-5 relative">
                    {/* 배경 효과 */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-300/30 via-sky-300/30 to-purple-300/30 rounded-full blur-lg"></div>

                    {/* 강조된 PetPresso 텍스트 */}
                    <div className="relative inline-flex items-center justify-center py-1 px-4 md:py-2 md:px-6 rounded-full border-2 border-purple-300/50 shadow-lg bg-white/30 backdrop-blur-sm">
                      {/* 강아지 발바닥 아이콘 */}
                      <PawPrint className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 mr-2 md:mr-3 text-purple-600 transform rotate-neg90" />

                      <span
                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-cherry-bomb bg-gradient-to-r from-purple-600 via-sky-500 to-purple-600 bg-clip-text text-transparent drop-shadow-md tracking-wider"
                        style={{ textShadow: "0 0 15px rgba(147, 51, 234, 0.3)" }}
                      >
                        Petpresso
                      </span>
                      <div className="absolute -top-1 -right-1">
                        <Sparkles className="h-4 w-4 md:h-6 md:w-6 text-yellow-400" />
                      </div>
                    </div>
                  </div>

                  <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-sky-500 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
                    <div className="mb-1 md:mb-2">{t("mainTitle1")}</div>
                    <div className="flex flex-wrap justify-center items-center">
                      <span
                        className="inline-block bg-gradient-to-r from-purple-600 via-sky-500 to-purple-600 bg-clip-text text-transparent"
                        style={{ animation: "float 3s ease-in-out infinite" }}
                      >
                        {t("mainTitle2")}
                      </span>
                      <span className="inline-block bg-gradient-to-r from-purple-600 via-sky-500 to-purple-600 bg-clip-text text-transparent">
                        {t("mainTitle3")}
                      </span>
                    </div>
                  </h1>
                </div>

                {/* Decorative elements around title */}
                <div className="absolute -top-3 -right-3 md:-top-5 md:-right-5 animate-pulse">
                  <Sparkles className="h-6 w-6 md:h-10 md:w-10 text-yellow-400" />
                </div>
                <div className="absolute -bottom-2 -left-2 md:-bottom-4 md:-left-4 animate-pulse delay-500">
                  <Sparkles className="h-5 w-5 md:h-8 md:w-8 text-purple-400" />
                </div>
              </div>

              {/* 부제목 */}
              <div className="relative inline-block">
                <p className="text-base sm:text-lg md:text-xl mb-4 md:mb-6 text-sky-600 font-medium px-3 py-1 md:px-4 md:py-2 rounded-full bg-gradient-to-r from-purple-50 to-sky-50 shadow-sm border border-purple-100">
                  {t("subtitle")}
                  <span className="absolute -right-1 -bottom-1 text-pink-400">
                    <Heart className="h-4 w-4 md:h-5 md:w-5 fill-pink-400" />
                  </span>
                </p>
              </div>

              {/* 하단 장식 요소 */}
              <div className="relative flex justify-center items-center mt-3 md:mt-4">
                <div className="h-0.5 w-12 md:w-16 bg-gradient-to-r from-transparent to-purple-300 rounded-full"></div>
                <div className="mx-2 md:mx-3 text-purple-400 animate-bounce delay-200">
                  <PawPrint className="h-4 w-4 md:h-5 md:w-5 transform rotate-neg90" />
                </div>
                <div className="h-0.5 w-12 md:w-16 bg-gradient-to-r from-purple-300 to-sky-300 rounded-full"></div>
                <div className="mx-2 md:mx-3 text-sky-400 animate-bounce delay-300">
                  <PawPrint className="h-4 w-4 md:h-5 md:w-5 transform rotate-neg90" />
                </div>
                <div className="h-0.5 w-12 md:w-16 bg-gradient-to-r from-sky-300 to-transparent rounded-full"></div>
              </div>
            </section>

            {/* Main images - Side by side layout */}
            <div className="mb-6 md:mb-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                {/* Left image - Home photo */}
                <div className="flex flex-col items-center">
                  <div className="w-full max-w-xs mx-auto">
                    <div className="overflow-hidden rounded-2xl shadow-md aspect-square">
                      <img
                        src="/kancho-home.jpeg"
                        alt="강아지 칸쵸의 일상 사진"
                        className="w-full h-full object-cover"
                        loading="eager"
                        style={{ imageRendering: "high-quality" }}
                      />
                    </div>
                  </div>
                  <p className="text-center mt-2 md:mt-4 text-purple-700 font-medium text-sm md:text-base">
                    {t("dailyPhoto")}
                  </p>
                </div>

                {/* Right image - Studio photo */}
                <div className="flex flex-col items-center">
                  <div className="w-full max-w-xs mx-auto">
                    <div className="overflow-hidden rounded-2xl shadow-md aspect-square">
                      <img
                        src="/kancho-profile.png"
                        alt="강아지 칸쵸의 프로필 사진"
                        className="w-full h-full object-cover"
                        loading="eager"
                        style={{ imageRendering: "high-quality" }}
                      />
                    </div>
                  </div>
                  <p className="text-center mt-2 md:mt-4 text-purple-700 font-medium text-sm md:text-base">
                    {t("profilePhoto")}
                  </p>
                </div>
              </div>

              {/* Before and After text */}
              <div className="text-center mt-4 md:mt-6 mb-4 md:mb-6">
                <p className="text-base md:text-lg font-medium bg-gradient-to-r from-purple-600 to-sky-600 bg-clip-text text-transparent inline-block px-3 md:px-4 py-1 md:py-2 border-b-2 border-purple-200">
                  {t("beforeAfter")}
                </p>
              </div>
            </div>

            {/* Create Profile Button */}
            <div className="flex justify-center mb-8 md:mb-12">
              <div className="w-full max-w-sm md:max-w-lg mx-auto text-center">
                <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-purple-500 to-sky-500 hover:from-purple-600 hover:to-sky-600 text-white font-bold py-5 md:py-6 px-10 md:px-14 rounded-full text-xl md:text-2xl w-full shadow-lg transform transition-transform hover:scale-105 relative">
                      <div className="absolute -top-1 -right-1 animate-pulse">
                        <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-yellow-200" />
                      </div>
                      <span className="drop-shadow-md">{t("createProfile")}</span>
                      <div className="absolute -bottom-1 -left-1 animate-pulse delay-300">
                        <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-yellow-200" />
                      </div>
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    className={`
                      p-0 overflow-hidden border-gradient-to-r from-purple-200 to-sky-200 shadow-lg
                      ${isMobile ? "w-[95vw] max-w-[95vw]" : "sm:max-w-md"}
                    `}
                  >
                    {renderProfileContent()}
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* 부시시한 덕선이 이미지 섹션 */}
            <section className="text-center mb-6 md:mb-8">
              <div className="flex flex-col items-center">
                <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-purple-200 shadow-lg mb-2 sm:mb-3">
                  <img
                    src="/duksun.jpeg"
                    alt="부시시한 덕선이"
                    className="w-full h-full object-cover"
                    style={{ imageRendering: "high-quality" }}
                  />
                </div>
                <p className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  {t("duksunTransformed")}
                </p>
              </div>
            </section>

            {/* Photo Style Options */}
            <section className="mb-6 md:mb-8">
              <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-8">
                {STYLE_OPTIONS.map((style) => (
                  <div
                    key={style.id}
                    className={`flex flex-col items-center ${activeStyle === style.id ? "scale-105 transition-transform" : ""}`}
                    onMouseEnter={() => setActiveStyle(style.id)}
                    onMouseLeave={() => setActiveStyle(null)}
                  >
                    <div className="relative w-full max-w-[120px] sm:max-w-[144px] md:max-w-full mx-auto">
                      {/* Decorative frame */}
                      <div className="absolute -inset-1 md:-inset-2 bg-gradient-to-br from-purple-300 via-pink-200 to-purple-300 rounded-lg opacity-70 blur-sm"></div>

                      {/* Image container */}
                      <div className="relative aspect-[3/4] rounded-lg overflow-hidden shadow-lg border-2 border-purple-200 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <div className="w-full h-full overflow-hidden">
                          <img
                            src={style.imageSrc || "/placeholder.svg"}
                            alt={`${style.name} 예시`}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                            loading="eager"
                            style={{ imageRendering: "high-quality" }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Label */}
                    <div className="mt-3 md:mt-4 text-center">
                      <p className="font-bold text-xs sm:text-sm md:text-base bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                        {style.name}
                      </p>
                      <p className="text-[10px] md:text-xs text-purple-500 mt-0.5">{style.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Auto-sliding Gallery Section */}
            <section className="mb-4 md:mb-6 mt-12 md:mt-16 pt-6 md:pt-8 border-t border-purple-100">
              <h2 className="text-base md:text-lg font-bold text-center mb-2 md:mb-3 bg-gradient-to-r from-purple-700 to-sky-700 bg-clip-text text-transparent">
                {t("recentProfiles")}
              </h2>
              <div className="overflow-hidden rounded-lg shadow-md relative">
                <OptimizedSlidingGallery />
              </div>
            </section>
          </div>
        </main>

        {/* Footer */}
        <div className="w-full bg-gray-100">
          <Footer />
        </div>
      </div>

      {/* 마이페이지 */}
      {showMyPage && (
        <div className="fixed inset-0 bg-white z-50 overflow-auto">
          <MyPage onClose={() => setShowMyPage(false)} />
        </div>
      )}

      {/* 회원가입 모달 */}
      <KakaoSignupModal
        autoOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSignupComplete={handleSignupComplete}
        selectedPhotos={selectedPhotos}
      />
    </div>
  )
}

// 메인 컴포넌트 - 컨텍스트 제공
export default function PetStudioPage() {
  return (
    <LanguageProvider>
      <AppProvider>
        <PetStudioPageContent />
      </AppProvider>
    </LanguageProvider>
  )
}
