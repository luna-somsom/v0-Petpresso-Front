"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

interface UploadingScreenProps {
  onClose: () => void
  onComplete: () => void
}

export function UploadingScreen({ onClose, onComplete }: UploadingScreenProps) {
  const [progress, setProgress] = useState(0)

  // Simulate upload progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 10
        return newProgress <= 100 ? newProgress : 100
      })
    }, 200) // Update every 200ms to complete in ~2 seconds

    // Trigger completion after 2 seconds
    const timer = setTimeout(() => {
      onComplete()
    }, 2000)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [onComplete])

  return (
    <div className="bg-gradient-to-b from-purple-50 via-sky-50 to-white h-full flex flex-col">
      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-3 sm:p-4 md:p-6">
        <h3 className="font-medium text-base sm:text-lg md:text-xl mb-4 sm:mb-6 md:mb-8 bg-gradient-to-r from-purple-800 to-sky-700 bg-clip-text text-transparent">
          업로드 중...
        </h3>

        {/* Blurred rectangle with loading animation */}
        <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-gradient-to-br from-purple-200 to-sky-200 rounded-md mb-4 sm:mb-6 md:mb-8 relative overflow-hidden shadow-md">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-300/50 to-sky-300/50 backdrop-blur-sm"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 text-white animate-spin" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full max-w-xs bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-gradient-to-r from-purple-400 to-sky-400 h-2.5 rounded-full transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-xs sm:text-sm text-purple-500 mb-3 sm:mb-4 text-center">
          사진을 업로드하고 있어요. 잠시만 기다려주세요!
        </p>
      </div>

      {/* Bottom buttons */}
      <div className="p-3 sm:p-4 border-t border-purple-200 bg-white">
        <Button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-purple-50 to-sky-50 text-purple-500 border border-sky-300 hover:bg-gradient-to-r hover:from-purple-100 hover:to-sky-100 text-xs sm:text-sm py-1.5 sm:py-2"
        >
          취소
        </Button>
      </div>
    </div>
  )
}
