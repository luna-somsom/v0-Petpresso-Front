"use client"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useEffect, useState } from "react"

interface GuidelinesScreenProps {
  onClose: () => void
  onContinue: () => void
}

export function GuidelinesScreen({ onClose, onContinue }: GuidelinesScreenProps) {
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

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-purple-100 to-sky-100">
      {/* Header */}
      <div className="flex justify-between items-center p-2 sm:p-3 border-b border-purple-200">
        <div></div>
        <div className="text-center font-bold text-base sm:text-lg text-purple-800">사진 업로드 가이드</div>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-purple-700 hover:bg-sky-200/50">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content Area - No Scroll */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Info Box - More compact */}
          <div className="mx-2 sm:mx-3 mt-2 bg-white/80 backdrop-blur-sm rounded-md p-1.5 sm:p-2 shadow-sm border border-purple-200">
            <p className="text-center text-xs sm:text-sm text-purple-700">
              멋진 작업물을 위해서 가이드라인을 참고해주세요.
            </p>
          </div>

          {/* Guidelines Grid - More compact */}
          <div className="px-2 sm:px-3 mt-2">
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {/* Row 1 - All with X marks */}
              <div className="bg-gradient-to-br from-purple-200 to-sky-200 rounded-md p-1.5 sm:p-2 flex flex-col items-center justify-center aspect-square shadow-sm">
                <span className="text-center text-[10px] sm:text-xs text-purple-700">가려진 사진</span>
                <span className="text-base sm:text-lg font-bold text-purple-500">X</span>
              </div>
              <div className="bg-gradient-to-br from-sky-200 to-purple-200 rounded-md p-1.5 sm:p-2 flex flex-col items-center justify-center aspect-square shadow-sm">
                <span className="text-center text-[10px] sm:text-xs text-sky-700">같이 나온 사진</span>
                <span className="text-base sm:text-lg font-bold text-sky-500">X</span>
              </div>
              <div className="bg-gradient-to-br from-purple-200 to-sky-200 rounded-md p-1.5 sm:p-2 flex flex-col items-center justify-center aspect-square shadow-sm">
                <span className="text-center text-[10px] sm:text-xs text-purple-700">흐린 사진</span>
                <span className="text-base sm:text-lg font-bold text-purple-500">X</span>
              </div>

              {/* Row 2 */}
              <div className="bg-gradient-to-br from-sky-200 to-purple-200 rounded-md p-1.5 sm:p-2 flex flex-col items-center justify-center aspect-square shadow-sm">
                <span className="text-center text-[10px] sm:text-xs text-sky-700">단독사진</span>
                <span className="text-base sm:text-lg font-bold text-green-500">O</span>
              </div>
              <div className="bg-gradient-to-br from-purple-200 to-sky-200 rounded-md p-1.5 sm:p-2 flex flex-col items-center justify-center aspect-square shadow-sm">
                <span className="text-center text-[10px] sm:text-xs text-purple-700">전신사진</span>
                <span className="text-base sm:text-lg font-bold text-green-500">O</span>
              </div>
              <div className="bg-gradient-to-br from-sky-200 to-purple-200 rounded-md p-1.5 sm:p-2 flex flex-col items-center justify-center aspect-square shadow-sm">
                <span className="text-center text-[10px] sm:text-xs text-sky-700">선명한 사진</span>
                <span className="text-base sm:text-lg font-bold text-green-500">O</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Button */}
        <div className="p-2 sm:p-3 pb-3 sm:pb-4 flex justify-center border-t border-purple-200 bg-white mt-2">
          <Button
            onClick={onContinue}
            className="bg-gradient-to-r from-purple-400 to-sky-400 hover:from-purple-500 hover:to-sky-500 text-white font-bold py-1.5 sm:py-2 px-6 sm:px-8 rounded-full text-sm sm:text-base shadow-md"
          >
            5개 사진 선택
          </Button>
        </div>
      </div>
    </div>
  )
}
