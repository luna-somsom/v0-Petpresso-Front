"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/utils/i18n/language-context"
import { ExternalLink } from "lucide-react"

export function Footer() {
  const { t } = useLanguage()
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
    <footer className="bg-gray-100 py-2 sm:py-3 md:py-4 mt-2 sm:mt-4 md:mt-6">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between mb-1 sm:mb-2 md:mb-3">
            <div className="mb-1 md:mb-0">
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-blue-900 mb-0.5">주) 리콘랩스</h3>
              <p className="text-[8px] sm:text-[10px] md:text-xs text-blue-900">대표이사: 반성훈</p>
            </div>
            <div>
              <p className="text-[8px] sm:text-[10px] md:text-xs text-blue-900 mb-0.5">
                통신판매업신고번호: 2021-서울강남-04763
              </p>
              <p className="text-[8px] sm:text-[10px] md:text-xs text-blue-900">사업자등록번호: 497-86-01565</p>
            </div>
          </div>

          <div className="pt-1 sm:pt-1.5 md:pt-2 mb-1 sm:mb-1.5 md:mb-2">
            <p className="text-[8px] sm:text-[10px] md:text-xs text-blue-900 mb-0.5">서울 강남구 학동로53길 30</p>
            <p className="text-[8px] sm:text-[10px] md:text-xs text-blue-900">
              30, Hakdong-ro 53-gil, Gangnam-gu, Seoul
            </p>
          </div>

          <div className="text-center">
            <p className="text-[6px] sm:text-[8px] md:text-[10px] text-blue-900 mb-1">
              Copyright ⓒ 2025 리콘랩스(RECON Labs) All rights reserved.
            </p>
            <a
              href="https://www.reconlabs.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[8px] sm:text-[10px] md:text-xs text-blue-700 hover:text-blue-900 transition-colors"
            >
              <span>https://www.reconlabs.ai/</span>
              <ExternalLink className="ml-1 h-2 w-2 sm:h-3 sm:w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
