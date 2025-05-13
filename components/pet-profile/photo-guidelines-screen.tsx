"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useLanguage } from "@/utils/i18n/language-context"
import Image from "next/image"

interface PhotoGuidelinesScreenProps {
  onClose: () => void
  onContinue: () => void
}

export function PhotoGuidelinesScreen({ onClose, onContinue }: PhotoGuidelinesScreenProps) {
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
    <div className="flex flex-col h-full bg-gradient-to-b from-purple-100 to-sky-100">
      {/* Header */}
      <div className="p-1.5 sm:p-2 md:p-3 text-center border-b border-purple-200">
        <div className="text-base sm:text-lg md:text-xl font-bold text-purple-800">{t("photoUploadGuide")}</div>
      </div>

      {/* 무료 사용 안내 메시지 */}
      <div className="mx-1.5 sm:mx-2 md:mx-3 mt-1.5 sm:mt-2 md:mt-3 bg-gradient-to-r from-yellow-100 to-amber-100 border-2 border-yellow-400 rounded-md p-1.5 sm:p-2 md:p-3 shadow-md">
        <p className="text-center text-[10px] sm:text-xs md:text-sm font-bold text-amber-700 drop-shadow-sm">
          프로필 사진은 한 계정당 무료로 2번까지 만들어보실 수 있어요!
        </p>
      </div>

      {/* Content Area - No Scroll */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Info Box - More compact */}
          <div className="mx-1.5 sm:mx-2 md:mx-3 mt-1.5 sm:mt-2 p-1 sm:p-1.5 md:p-2">
            <p className="text-center text-[10px] sm:text-xs md:text-sm text-purple-700 mb-0.5 sm:mb-1">
              {t("forBestResults")}
            </p>
            <p className="text-center text-[8px] sm:text-[10px] md:text-xs text-sky-600">{t("clearSoloPhoto")}</p>
          </div>

          {/* Guidelines Grid - More compact */}
          <div className="px-2 sm:px-4 md:px-6 mt-2 sm:mt-3 md:mt-4">
            <div className="grid grid-cols-3 gap-1 sm:gap-2 md:gap-4 lg:gap-6">
              {/* Row 1 - All with X marks */}
              <div className="relative rounded-md overflow-hidden shadow-sm aspect-square">
                {/* 배경 이미지 */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src="/images/covered-dog.png"
                    alt="가려진 사진 예시"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                {/* 붉은 배경 오버레이 추가 */}
                <div className="absolute inset-0 bg-red-200/30 z-10"></div>
                {/* 텍스트 배경 - 이미지가 잘 보이도록 상단에만 반투명 배경 적용 */}
                <div className="absolute top-0 left-0 right-0 bg-red-500/50 py-1 z-20">
                  <span className="text-center text-[10px] sm:text-[12px] md:text-sm text-white font-medium drop-shadow-md block">
                    {t("obscuredPhoto")}
                  </span>
                </div>
                {/* X 표시 - 우측 하단에 배치 */}
                <div className="absolute bottom-1 right-1 bg-white/80 rounded-full w-5 h-5 flex items-center justify-center z-20">
                  <span className="text-base font-bold text-red-500">X</span>
                </div>
              </div>

              <div className="relative rounded-md overflow-hidden shadow-sm aspect-square">
                {/* 배경 이미지 */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src="/images/sleeping-dog.png"
                    alt="자고 있는 사진 예시"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                {/* 붉은 배경 오버레이 추가 */}
                <div className="absolute inset-0 bg-red-200/30 z-10"></div>
                {/* 텍스트 배경 - 이미지가 잘 보이도록 상단에만 반투명 배경 적용 */}
                <div className="absolute top-0 left-0 right-0 bg-red-500/50 py-1 z-20">
                  <span className="text-center text-[10px] sm:text-[12px] md:text-sm text-white font-medium drop-shadow-md block">
                    자고 있는 사진
                  </span>
                </div>
                {/* X 표시 - 우측 하단에 배치 */}
                <div className="absolute bottom-1 right-1 bg-white/80 rounded-full w-5 h-5 flex items-center justify-center z-20">
                  <span className="text-base font-bold text-red-500">X</span>
                </div>
              </div>

              <div className="relative rounded-md overflow-hidden shadow-sm aspect-square">
                {/* 배경 이미지 */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src="/images/with-person.png"
                    alt="같이 찍은 사진 예시"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                {/* 붉은 배경 오버레이 추가 */}
                <div className="absolute inset-0 bg-red-200/30 z-10"></div>
                {/* 텍스트 배경 - 이미지가 잘 보이도록 상단에만 반투명 배경 적용 */}
                <div className="absolute top-0 left-0 right-0 bg-red-500/50 py-1 z-20">
                  <span className="text-center text-[10px] sm:text-[12px] md:text-sm text-white font-medium drop-shadow-md block">
                    같이 찍은 사진
                  </span>
                </div>
                {/* X 표시 - 우측 하단에 배치 */}
                <div className="absolute bottom-1 right-1 bg-white/80 rounded-full w-5 h-5 flex items-center justify-center z-20">
                  <span className="text-base font-bold text-red-500">X</span>
                </div>
              </div>

              {/* Row 2 - O 표시 네모들에 이미지 적용 */}
              <div className="relative rounded-md overflow-hidden shadow-sm aspect-square">
                {/* 배경 이미지 */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src="/images/solo-dog.png"
                    alt="단독 사진 예시"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                {/* 텍스트 배경 - 이미지가 잘 보이도록 상단에만 반투명 배경 적용 */}
                <div className="absolute top-0 left-0 right-0 bg-sky-500/50 py-1 z-20">
                  <span className="text-center text-[10px] sm:text-[12px] md:text-sm text-white font-medium drop-shadow-md block">
                    {t("soloPhoto")}
                  </span>
                </div>
                {/* O 표시 - 우측 하단에 배치 */}
                <div className="absolute bottom-1 right-1 bg-white/80 rounded-full w-5 h-5 flex items-center justify-center z-20">
                  <span className="text-base font-bold text-green-500">O</span>
                </div>
              </div>

              <div className="relative rounded-md overflow-hidden shadow-sm aspect-square">
                {/* 배경 이미지 */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src="/images/full-body-dog.png"
                    alt="전신 사진 예시"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                {/* 텍스트 배경 - 이미지가 잘 보이도록 상단에만 반투명 배경 적용 */}
                <div className="absolute top-0 left-0 right-0 bg-purple-500/50 py-1 z-20">
                  <span className="text-center text-[10px] sm:text-[12px] md:text-sm text-white font-medium drop-shadow-md block">
                    {t("fullBodyPhoto")}
                  </span>
                </div>
                {/* O 표시 - 우측 하단에 배치 */}
                <div className="absolute bottom-1 right-1 bg-white/80 rounded-full w-5 h-5 flex items-center justify-center z-20">
                  <span className="text-base font-bold text-green-500">O</span>
                </div>
              </div>

              <div className="relative rounded-md overflow-hidden shadow-sm aspect-square">
                {/* 배경 이미지 */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src="/images/front-facing-dog.png"
                    alt="정면 사진 예시"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                {/* 텍스트 배경 - 이미지가 잘 보이도록 상단에만 반투명 배경 적용 */}
                <div className="absolute top-0 left-0 right-0 bg-sky-500/50 py-1 z-20">
                  <span className="text-center text-[10px] sm:text-[12px] md:text-sm text-white font-medium drop-shadow-md block">
                    정면 사진
                  </span>
                </div>
                {/* O 표시 - 우측 하단에 배치 */}
                <div className="absolute bottom-1 right-1 bg-white/80 rounded-full w-5 h-5 flex items-center justify-center z-20">
                  <span className="text-base font-bold text-green-500">O</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Button */}
        <div className="p-1.5 sm:p-2 md:p-3 pb-2 sm:pb-3 md:pb-4 flex justify-center border-t border-purple-200 bg-white mt-1.5 sm:mt-2">
          <Button
            onClick={onContinue}
            className="bg-gradient-to-r from-purple-400 to-sky-400 hover:from-purple-500 hover:to-sky-500 text-white font-bold py-1 sm:py-1.5 md:py-2 px-4 sm:px-6 md:px-8 rounded-full text-xs sm:text-sm md:text-base shadow-md"
          >
            사진 업로드
          </Button>
        </div>
      </div>
    </div>
  )
}
