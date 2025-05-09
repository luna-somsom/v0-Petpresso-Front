"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"
import { CheckCircle2 } from "lucide-react"

interface KakaoLoginModalProps {
  onLogin: () => void
}

export function KakaoLoginModal({ onLogin }: KakaoLoginModalProps) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<"login" | "confirmation">("login")

  const handleKakaoLogin = () => {
    // Simulate Kakao login
    console.log("Kakao login initiated")
    // Move to confirmation step
    setStep("confirmation")
  }

  const handleConfirmation = () => {
    setOpen(false)
    // Reset step for next time
    setTimeout(() => {
      setStep("login")
    }, 300)
    // Notify parent component about successful login
    onLogin()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen)
        if (!newOpen) {
          // Reset step when dialog is closed
          setTimeout(() => {
            setStep("login")
          }, 300)
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-sm md:text-base font-medium text-purple-700 hover:text-sky-900 hover:bg-purple-100"
        >
          로그인
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl bg-gradient-to-b from-purple-50 via-sky-50 to-white border-purple-200">
        {step === "login" ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-xl font-bold mb-4 text-purple-800">로그인</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center">
              <Button
                onClick={handleKakaoLogin}
                className="w-full bg-[#FEE500] hover:bg-[#FEE500]/90 text-black font-medium py-6 rounded-md flex items-center justify-center gap-2 shadow-md"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2.14282C6.26205 2.14282 1.71428 5.71337 1.71428 10.0714C1.71428 12.8371 3.6355 15.2595 6.48182 16.6548L5.42877 20.5714C5.38806 20.7286 5.44877 20.8976 5.58591 20.9857C5.72305 21.0738 5.90305 21.0619 6.02734 20.9571L10.6909 17.6571C11.1164 17.7095 11.5527 17.7381 12 17.7381C17.738 17.7381 22.2857 14.1676 22.2857 10.0714C22.2857 5.97528 17.738 2.14282 12 2.14282Z"
                    fill="black"
                  />
                </svg>
                카카오톡으로 로그인
              </Button>
              <p className="text-sm text-purple-500 mt-4">간편하게 카카오톡으로 로그인하세요</p>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center py-6 space-y-6">
              <CheckCircle2 className="h-16 w-16 text-green-500" />

              <div className="text-center">
                <h3 className="text-xl font-bold mb-2 text-purple-800">Luna로 로그인 되었습니다</h3>
                <p className="text-sky-600 mb-6">이제 서비스를 이용하실 수 있습니다</p>
              </div>

              <Button
                onClick={handleConfirmation}
                className="bg-gradient-to-r from-purple-400 to-sky-400 hover:from-purple-500 hover:to-sky-500 text-white font-bold py-3 px-8 rounded-full text-lg shadow-md"
              >
                확인
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
