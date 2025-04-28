"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react"
import { CheckCircle2, Sparkles } from "lucide-react"

interface KakaoSignupModalProps {
  children?: React.ReactNode
  autoOpen?: boolean
  onClose?: () => void
  onSignupComplete?: () => void
  selectedPhotos?: number[]
}

export function KakaoSignupModal({
  children,
  autoOpen = false,
  onClose,
  onSignupComplete,
  selectedPhotos = [],
}: KakaoSignupModalProps) {
  const [open, setOpen] = useState(autoOpen)
  const [step, setStep] = useState<"signup" | "consent" | "success">("signup")
  const [consentChecked, setConsentChecked] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Check if the device is mobile
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

  // Set open state when autoOpen prop changes
  useEffect(() => {
    setOpen(autoOpen)
  }, [autoOpen])

  const handleKakaoSignup = () => {
    // Move to the consent step after selecting Kakao signup
    setStep("consent")
  }

  const handleConsent = () => {
    if (consentChecked) {
      // Move to success step after consent
      setStep("success")
    }
  }

  const handleComplete = () => {
    // Close the modal and reset the flow
    setOpen(false)
    // Reset the flow for next time
    setTimeout(() => {
      setStep("signup")
      setConsentChecked(false)
    }, 300)

    // Call the onSignupComplete callback if provided
    if (onSignupComplete) {
      onSignupComplete()
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen)
    if (!newOpen) {
      // Reset the flow when dialog is closed
      setTimeout(() => {
        setStep("signup")
        setConsentChecked(false)
      }, 300)
      // Call the onClose callback if provided
      if (onClose) onClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent
        className={`
          bg-gradient-to-b from-purple-50 via-sky-50 to-white border-purple-200
          ${isMobile ? "w-[95vw] max-w-[95vw] p-3" : "sm:max-w-md sm:p-6"}
        `}
      >
        {step === "signup" ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 text-purple-800">
                간편 회원가입
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center">
              <Button
                onClick={handleKakaoSignup}
                className="w-full bg-[#FEE500] hover:bg-[#FEE500]/90 text-black font-medium py-3 sm:py-4 md:py-6 rounded-md flex items-center justify-center gap-2 shadow-md text-xs sm:text-sm"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="sm:w-20 sm:h-20"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2.14282C6.26205 2.14282 1.71428 5.71337 1.71428 10.0714C1.71428 12.8371 3.6355 15.2595 6.48182 16.6548L5.42877 20.5714C5.38806 20.7286 5.44877 20.8976 5.58591 20.9857C5.72305 21.0738 5.90305 21.0619 6.02734 20.9571L10.6909 17.6571C11.1164 17.7095 11.5527 17.7381 12 17.7381C17.738 17.7381 22.2857 14.1676 22.2857 10.0714C22.2857 5.97528 17.738 2.14282 12 2.14282Z"
                    fill="black"
                  />
                </svg>
                카카오톡으로 회원가입
              </Button>
              <p className="text-[10px] sm:text-xs md:text-sm text-purple-500 mt-2 sm:mt-3 md:mt-4">
                간편하게 카카오톡으로 회원가입하세요
              </p>
            </div>
          </>
        ) : step === "consent" ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 md:mb-4 text-purple-800">
                개인정보 수집 및 이용 동의
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col space-y-2 sm:space-y-3 md:space-y-4">
              <div className="border border-purple-200 rounded-md p-2 sm:p-3 md:p-4 max-h-36 sm:max-h-48 md:max-h-60 overflow-y-auto text-[10px] sm:text-xs md:text-sm bg-gradient-to-br from-white to-sky-50/50">
                <p className="font-medium mb-1 sm:mb-2 text-purple-800">개인정보 수집 및 이용 동의 (필수)</p>
                <p className="text-sky-700 mb-1 sm:mb-2">
                  회사는 서비스 제공을 위해 아래와 같이 개인정보를 수집 및 이용합니다.
                </p>
                <ul className="list-disc pl-3 sm:pl-4 md:pl-5 text-purple-600 space-y-0.5 sm:space-y-1">
                  <li>수집 항목: 이름, 이메일 주소, 프로필 정보</li>
                  <li>수집 목적: 서비스 제공, 계정 관리, 고객 지원</li>
                  <li>보유 기간: 회원 탈퇴 시까지</li>
                </ul>
                <p className="mt-1 sm:mt-2 text-sky-600">
                  동의를 거부할 권리가 있으며, 동의 거부 시 서비스 이용이 제한될 수 있습니다.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="consent"
                  checked={consentChecked}
                  onCheckedChange={(checked) => setConsentChecked(checked as boolean)}
                  className="border-purple-400 text-sky-600 focus:ring-purple-500 h-3 w-3 sm:h-4 sm:w-4"
                />
                <Label htmlFor="consent" className="text-[10px] sm:text-xs md:text-sm font-medium text-purple-700">
                  개인정보 수집 및 이용에 동의합니다.
                </Label>
              </div>

              <Button
                onClick={handleConsent}
                disabled={!consentChecked}
                className="w-full py-1.5 sm:py-2 md:py-3 bg-gradient-to-r from-purple-500 to-sky-400 hover:from-purple-600 hover:to-sky-500 text-white shadow-md text-xs sm:text-sm md:text-base"
              >
                동의하고 계속하기
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center py-3 sm:py-4 md:py-6 space-y-3 sm:space-y-4 md:space-y-6">
              <CheckCircle2 className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16 text-green-500" />

              <div className="text-center">
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 text-purple-800">
                  회원가입이 완료되었습니다
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-sky-600 mb-3 sm:mb-4 md:mb-6">
                  이제 펫 프로필을 만들어보세요
                </p>
              </div>

              <Button
                onClick={handleComplete}
                className="bg-gradient-to-r from-purple-500 to-sky-500 hover:from-purple-600 hover:to-sky-600 text-white font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-full text-sm sm:text-base shadow-lg relative"
              >
                <div className="absolute -top-1 -right-1 animate-pulse">
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-yellow-200" />
                </div>
                <span className="drop-shadow-md">확인</span>
                <div className="absolute -bottom-1 -left-1 animate-pulse delay-300">
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-yellow-200" />
                </div>
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
