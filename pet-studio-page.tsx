"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"
import { Sparkles, Menu, X, Star, Heart, PawPrint, LogOut } from "lucide-react"
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
import { AppProvider, useApp } from "@/contexts/app-context"
import { useResponsive } from "@/hooks/use-responsive"
import { STYLE_OPTIONS } from "@/constants"
import type { ProfileCreationStep } from "@/types"
import { OptimizedSlidingGallery } from "@/components/optimized-sliding-gallery"
import Image from "next/image"

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
    // 마이페이지 관련 상태 변경 비활성화
    // setShowMyPage(false);
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
    setShowMyPage(false) // 로그아웃 시 마이페이지 숨기기
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
      {/* Navigation bar - 항상 표시 */}
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
                {/* 마이페이지 버튼 숨김 처리 */}
                {/* <Button
                  variant="ghost"
                  className="text-sm md:text-base font-medium text-purple-700 hover:text-sky-900 hover:bg-purple-100"
                  onClick={() => setShowMyPage(true)}
                >
                  <User className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2" />
                  {t("myPage")}
                </Button> */}
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
                  {/* 마이페이지 버튼 숨김 처리 */}
                  {/* <Button
                    variant="ghost"
                    className="justify-start text-sm font-medium text-purple-700 hover:text-sky-900 hover:bg-purple-100"
                    onClick={() => {
                      setShowMyPage(true)
                      setMobileMenuOpen(false)
                    }}
                  >
                    <User className="h-4 w-4 mr-2" />
                    {t("myPage")}
                  </Button> */}
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

      {/* 메인 콘텐츠 - 마이페이지 숨김 */}
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
                    {/* 강조된 PetPresso 텍스트 */}
                    <div className="relative inline-flex items-center justify-center">
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
                <p className="text-base sm:text-lg md:text-xl mb-4 md:mb-6 text-sky-600 font-medium">{t("subtitle")}</p>
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

            {/* Create Profile Button */}
            <div className="flex justify-center mb-20 md:mb-28">
              <div className="w-full max-w-sm md:max-w-lg mx-auto text-center">
                <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="relative overflow-hidden bg-gradient-to-r from-purple-500 via-pink-400 to-indigo-500 hover:from-purple-400 hover:via-pink-300 hover:to-indigo-400 text-white font-bold py-5 md:py-7 px-12 md:px-16 rounded-full text-xl md:text-2xl max-w-xl mx-auto shadow-2xl transform transition-all duration-300 hover:shadow-xl hover:translate-y-[4px] border-2 border-white/30 animate-glow">
                      {/* 강화된 글로우 효과 */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-300/40 via-pink-300/40 to-indigo-300/40 opacity-50 blur-lg"></div>

                      {/* 반짝이는 효과 */}
                      <div className="absolute -top-2 -right-2 animate-pulse">
                        <Sparkles className="h-6 w-6 md:h-8 md:w-8 text-yellow-200" />
                      </div>
                      <div className="absolute -bottom-2 -left-2 animate-pulse delay-300">
                        <Sparkles className="h-5 w-5 md:h-7 md:w-7 text-purple-200" />
                      </div>

                      {/* 버튼 내용 */}
                      <div className="relative z-10 flex items-center justify-center">
                        <span className="tracking-wide drop-shadow-md">펫 프로필 사진 만들기</span>
                      </div>

                      {/* 강화된 하이라이트 효과 */}
                      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/70 to-transparent"></div>
                      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    </Button>
                  </DialogTrigger>
                  <DialogContent
                    className={`
          p-0 overflow-hidden border-gradient-to-r from-purple-200 to-sky-200 shadow-lg
          ${isMobile ? "w-[95vw] max-w-[95vw]" : "sm:max-w-2xl"}
        `}
                  >
                    {renderProfileContent()}
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Main images - Side by side layout */}
            <div className="mb-6 md:mb-8 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                {/* Left image - Home photo */}
                <div className="flex flex-col items-center">
                  <div className="w-full max-w-xs mx-auto">
                    <div className="overflow-hidden rounded-2xl shadow-md aspect-square relative">
                      <Image
                        src="/kancho-home.jpeg"
                        alt="강아지 칸쵸의 일상 사진"
                        fill
                        className="object-cover"
                        priority
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
                    <div className="overflow-hidden rounded-2xl shadow-md aspect-square relative">
                      <Image
                        src="/kancho-profile.png"
                        alt="강아지 칸쵸의 프로필 사진"
                        fill
                        className="object-cover"
                        priority
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

            {/* 부시시한 덕선이 이미지 섹션 */}
            <section className="text-center mb-6 md:mb-8">
              <div className="flex flex-col items-center">
                <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-purple-200 shadow-lg mb-2 sm:mb-3 relative">
                  <Image src="/duksun.jpeg" alt="부시시한 덕선이" fill className="object-cover" priority />
                </div>
                <p className="text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                  {t("duksunTransformed")}
                </p>
              </div>
            </section>

            {/* Photo Style Options */}
            <section className="mb-6 md:mb-8">
              <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-8">
                {STYLE_OPTIONS.map((style, index) => (
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
                        <div className="w-full h-full overflow-hidden relative">
                          <Image
                            src={style.imageSrc || "/placeholder.svg"}
                            alt={`${style.name} 예시`}
                            fill
                            className="object-cover transition-transform duration-700 hover:scale-110"
                            priority={index < 3} // 처음 3개 이미지만 priority 설정
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

            {/* 카카오톡 채널 섹션 */}
            <section className="mb-8 md:mb-12 mt-8 md:mt-12 text-center">
              <a href="https://pf.kakao.com/_xhpewn" target="_blank" rel="noopener noreferrer" className="inline-block">
                <div className="bg-[#FEE500] rounded-full p-3 md:p-4 shadow-md transition-all duration-300 hover:shadow-lg hover:bg-[#FEE500]/90 mx-auto">
                  <div className="flex items-center justify-center gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FEE500] rounded-full flex items-center justify-center border border-yellow-400">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="md:w-24 md:h-24"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12 2.14282C6.26205 2.14282 1.71428 5.71337 1.71428 10.0714C1.71428 12.8371 3.6355 15.2595 6.48182 16.6548L5.42877 20.5714C5.38806 20.7286 5.44877 20.8976 5.58591 20.9857C5.72305 21.0738 5.90305 21.0619 6.02734 20.9571L10.6909 17.6571C11.1164 17.7095 11.5527 17.7381 12 17.7381C17.738 17.7381 22.2857 14.1676 22.2857 10.0714C22.2857 5.97528 17.738 2.14282 12 2.14282Z"
                            fill="black"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="text-left">
                      <h3 className="text-sm md:text-base font-bold text-gray-800">카카오톡 1:1 문의하기</h3>
                    </div>
                  </div>
                </div>
              </a>
            </section>
          </div>
        </main>

        {/* Footer */}
        <div className="w-full bg-gray-100">
          <Footer />
        </div>
      </div>

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
