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
  const [isTablet, setIsTablet] = useState(false)

  // Check device type
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
          bg-gradient-to-b from-yellow-50 via-white to-white border-yellow-200 p-0 max-h-[90vh] overflow-y-auto
          ${isMobile ? "w-[95vw] max-w-[95vw]" : isTablet ? "sm:max-w-md" : "sm:max-w-2xl"}
        `}
      >
        <div className="flex flex-col">
          {/* Header - 반응형 패딩 및 폰트 크기 */}
          <div className="flex justify-between items-center p-3 sm:p-4 md:p-5 border-b border-yellow-200">
            <div className="flex items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-[#FEE500] rounded-full flex items-center justify-center mr-2 sm:mr-3 md:mr-4">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2.14282C6.26205 2.14282 1.71428 5.71337 1.71428 10.0714C1.71428 12.8371 3.6355 15.2595 6.48182 16.6548L5.42877 20.5714C5.38806 20.7286 5.44877 20.8976 5.58591 20.9857C5.72305 21.0738 5.90305 21.0619 6.02734 20.9571L10.6909 17.6571C11.1164 17.7095 11.5527 17.7381 12 17.7381C17.738 17.7381 22.2857 14.1676 22.2857 10.0714C22.2857 5.97528 17.738 2.14282 12 2.14282Z"
                    fill="black"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-sm sm:text-base md:text-lg lg:text-xl text-gray-800">카카오톡 채널 추가</h3>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-gray-500 hover:bg-yellow-100"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
            </Button>
          </div>

          {/* Content - 반응형 패딩 및 폰트 크기 */}
          <div className="p-3 sm:p-4 md:p-5 lg:p-6">
            <div className="flex flex-col items-center mb-4 sm:mb-5 md:mb-6 lg:mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-[#FEE500] rounded-full flex items-center justify-center mb-3 sm:mb-4 md:mb-5 border-2 border-yellow-300">
                <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">P</span>
              </div>
              <h4 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 mb-1 sm:mb-2 md:mb-3">
                Petpresso
              </h4>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 text-center">
                카카오톡 채널 추가하고 생성된 이미지를 바로 받아보세요!
              </p>
            </div>

            <div className="bg-gray-50 rounded-md p-3 sm:p-4 md:p-5 mb-4 sm:mb-5 md:mb-6 lg:mb-8 border border-gray-200">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-yellow-500"
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
                <div className="ml-2 sm:ml-3">
                  <p className="text-xs sm:text-sm md:text-base text-gray-600">
                    채널 추가 시 다음과 같은 혜택이 있습니다:
                  </p>
                  <ul className="list-disc pl-4 sm:pl-5 md:pl-6 mt-1 sm:mt-2 text-xs sm:text-sm md:text-base text-gray-600 space-y-1 sm:space-y-2">
                    <li>생성된 이미지를 카카오톡으로 바로 받기</li>
                    <li>신규 스타일 업데이트 소식 받기</li>
                    <li>특별 할인 이벤트 참여 기회</li>
                  </ul>
                </div>
              </div>
            </div>

            <Button
              onClick={handleAddChannel}
              className="w-full bg-[#FEE500] hover:bg-[#FEE500]/90 text-black font-bold py-3 sm:py-3.5 md:py-4 lg:py-5 rounded-md flex items-center justify-center gap-2 sm:gap-3 shadow-md text-sm sm:text-base md:text-lg lg:text-xl transition-all duration-200"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
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
