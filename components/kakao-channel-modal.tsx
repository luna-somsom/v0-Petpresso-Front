"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface KakaoChannelModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onComplete?: () => void
}

export function KakaoChannelModal({ open, onOpenChange, onComplete }: KakaoChannelModalProps) {
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

  const handleAddChannel = () => {
    // In a real implementation, this would use the Kakao SDK to add the channel
    // For now, we'll just simulate the action
    if (onComplete) {
      onComplete()
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`
          bg-gradient-to-b from-yellow-50 via-white to-white border-yellow-200 p-0
          ${isMobile ? "w-[95vw] max-w-[95vw]" : "sm:max-w-md"}
        `}
      >
        <div className="flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-3 sm:p-4 border-b border-yellow-200">
            <div className="flex items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#FEE500] rounded-full flex items-center justify-center mr-2 sm:mr-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="sm:w-24 sm:h-24"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2.14282C6.26205 2.14282 1.71428 5.71337 1.71428 10.0714C1.71428 12.8371 3.6355 15.2595 6.48182 16.6548L5.42877 20.5714C5.38806 20.7286 5.44877 20.8976 5.58591 20.9857C5.72305 21.0738 5.90305 21.0619 6.02734 20.9571L10.6909 17.6571C11.1164 17.7095 11.5527 17.7381 12 17.7381C17.738 17.7381 22.2857 14.1676 22.2857 10.0714C22.2857 5.97528 17.738 2.14282 12 2.14282Z"
                    fill="black"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-sm sm:text-base text-gray-800">카카오톡 채널 추가</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 text-gray-500 hover:bg-yellow-100"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6">
            <div className="flex flex-col items-center mb-4 sm:mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FEE500] rounded-full flex items-center justify-center mb-3 sm:mb-4 border-2 border-yellow-300">
                <span className="text-xl sm:text-2xl font-bold">P</span>
              </div>
              <h4 className="font-bold text-base sm:text-lg text-gray-800 mb-1 sm:mb-2">Petpresso</h4>
              <p className="text-xs sm:text-sm text-gray-600 text-center">
                카카오톡 채널 추가하고 생성된 이미지를 바로 받아보세요!
              </p>
            </div>

            <div className="bg-gray-50 rounded-md p-3 sm:p-4 mb-4 sm:mb-6 border border-gray-200">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    className="h-4 w-4 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div className="ml-2">
                  <p className="text-xs sm:text-sm text-gray-600">채널 추가 시 다음과 같은 혜택이 있습니다:</p>
                  <ul className="list-disc pl-4 mt-1 text-xs sm:text-sm text-gray-600 space-y-1">
                    <li>생성된 이미지를 카카오톡으로 바로 받기</li>
                    <li>신규 스타일 업데이트 소식 받기</li>
                    <li>특별 할인 이벤트 참여 기회</li>
                  </ul>
                </div>
              </div>
            </div>

            <Button
              onClick={handleAddChannel}
              className="w-full bg-[#FEE500] hover:bg-[#FEE500]/90 text-black font-bold py-3 sm:py-4 rounded-md flex items-center justify-center gap-2 shadow-md"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="sm:w-24 sm:h-24"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2.14282C6.26205 2.14282 1.71428 5.71337 1.71428 10.0714C1.71428 12.8371 3.6355 15.2595 6.48182 16.6548L5.42877 20.5714C5.38806 20.7286 5.44877 20.8976 5.58591 20.9857C5.72305 21.0738 5.90305 21.0619 6.02734 20.9571L10.6909 17.6571C11.1164 17.7095 11.5527 17.7381 12 17.7381C17.738 17.7381 22.2857 14.1676 22.2857 10.0714C22.2857 5.97528 17.738 2.14282 12 2.14282Z"
                  fill="black"
                />
              </svg>
              채널 추가하기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
