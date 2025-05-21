"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useLanguage } from "@/utils/i18n/language-context"
import Image from "next/image"
import { X } from "lucide-react"

interface PhotoGuidelinesScreenProps {
  onClose: () => void
  onContinue: () => void
}

export function PhotoGuidelinesScreen({ onClose, onContinue }: PhotoGuidelinesScreenProps) {
  const { t } = useLanguage()
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

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-purple-100 to-sky-100">
      {/* Header - 반응형 패딩 및 폰트 크기 */}
      <div className="p-2 sm:p-2.5 md:p-3 lg:p-4 text-center border-b border-purple-200 flex items-center justify-between">
        <div className="w-8"></div> {/* 빈 공간으로 중앙 정렬 유지 */}
        <div className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-purple-800">
          {t("photoUploadGuide")}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-purple-700 hover:bg-purple-100/50"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
        </Button>
      </div>

      {/* 무료 사용 안내 메시지 - 반응형 마진 및 패딩 */}
      <div className="mx-2 sm:mx-2.5 md:mx-3 mt-2 bg-gradient-to-r from-yellow-100 to-amber-100 border-2 border-yellow-400 rounded-md p-1.5 sm:p-2 md:p-2.5 shadow-md">
        <p className="text-center text-xs sm:text-sm md:text-base lg:text-lg font-bold text-amber-700 drop-shadow-sm">
          프로필 사진은 한 계정당 무료로 2번까지 만들어보실 수 있어요!
        </p>
      </div>

      {/* Content Area - 반응형 레이아웃 */}
      <div className="flex-1 flex flex-col justify-between overflow-y-auto">
        <div>
          {/* Info Box - 반응형 마진 및 패딩 */}
          <div className="mx-2 sm:mx-3 md:mx-4 lg:mx-6 mt-2 sm:mt-3 md:mt-4 p-2 sm:p-3 md:p-4">
            <p className="text-center text-xs sm:text-sm md:text-base text-purple-700 mb-1 sm:mb-2 md:mb-3">
              {t("forBestResults")}
            </p>
            <p className="text-center text-[10px] sm:text-xs md:text-sm text-sky-600">{t("clearSoloPhoto")}</p>
          </div>

          {/* Guidelines Grid - 반응형 그리드 및 간격 */}
          <div className="px-2 sm:px-4 md:px-6 lg:px-8 mt-2 sm:mt-3 md:mt-4 lg:mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
              {/* Row 1 - All with X marks */}
              <div className="relative rounded-md overflow-hidden shadow-sm aspect-square">
                {/* 배경 이미지 */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src="/images/covered-dog.png"
                    alt="가려진 사진 예시"
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                  />
                </div>
                {/* 붉은 배경 오버레이 추가 */}
                <div className="absolute inset-0 bg-red-200/30 z-10"></div>
                {/* 텍스트 배경 - 이미지가 잘 보이도록 상단에만 반투명 배경 적용 */}
                <div className="absolute top-0 left-0 right-0 bg-red-500/50 py-1 z-20">
                  <span className="text-center text-[10px] sm:text-xs md:text-sm text-white font-medium drop-shadow-md block">
                    {t("obscuredPhoto")}
                  </span>
                </div>
                {/* X 표시 - 우측 하단에 배치 */}
                <div className="absolute bottom-1 right-1 bg-white/80 rounded-full w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex items-center justify-center z-20">
                  <span className="text-sm sm:text-base md:text-lg font-bold text-red-500">X</span>
                </div>
              </div>

              <div className="relative rounded-md overflow-hidden shadow-sm aspect-square">
                {/* 배경 이미지 */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src="/images/sleeping-dog.png"
                    alt="자고 있는 사진 예시"
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                  />
                </div>
                {/* 붉은 배경 오버레이 추가 */}
                <div className="absolute inset-0 bg-red-200/30 z-10"></div>
                {/* 텍스트 배경 - 이미지가 잘 보이도록 상단에만 반투명 배경 적용 */}
                <div className="absolute top-0 left-0 right-0 bg-red-500/50 py-1 z-20">
                  <span className="text-center text-[10px] sm:text-xs md:text-sm text-white font-medium drop-shadow-md block">
                    자고 있는 사진
                  </span>
                </div>
                {/* X 표시 - 우측 하단에 배치 */}
                <div className="absolute bottom-1 right-1 bg-white/80 rounded-full w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex items-center justify-center z-20">
                  <span className="text-sm sm:text-base md:text-lg font-bold text-red-500">X</span>
                </div>
              </div>

              <div className="relative rounded-md overflow-hidden shadow-sm aspect-square">
                {/* 배경 이미지 */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src="/images/with-person.png"
                    alt="같이 찍은 사진 예시"
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                  />
                </div>
                {/* 붉은 배경 오버레이 추가 */}
                <div className="absolute inset-0 bg-red-200/30 z-10"></div>
                {/* 텍스트 배경 - 이미지가 잘 보이도록 상단에만 반투명 배경 적용 */}
                <div className="absolute top-0 left-0 right-0 bg-red-500/50 py-1 z-20">
                  <span className="text-center text-[10px] sm:text-xs md:text-sm text-white font-medium drop-shadow-md block">
                    같이 찍은 사진
                  </span>
                </div>
                {/* X 표시 - 우측 하단에 배치 */}
                <div className="absolute bottom-1 right-1 bg-white/80 rounded-full w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex items-center justify-center z-20">
                  <span className="text-sm sm:text-base md:text-lg font-bold text-red-500">X</span>
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
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                  />
                </div>
                {/* 텍스트 배경 - 이미지가 잘 보이도록 상단에만 반투명 배경 적용 */}
                <div className="absolute top-0 left-0 right-0 bg-sky-500/50 py-1 z-20">
                  <span className="text-center text-[10px] sm:text-xs md:text-sm text-white font-medium drop-shadow-md block">
                    {t("soloPhoto")}
                  </span>
                </div>
                {/* O 표시 - 우측 하단에 배치 */}
                <div className="absolute bottom-1 right-1 bg-white/80 rounded-full w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex items-center justify-center z-20">
                  <span className="text-sm sm:text-base md:text-lg font-bold text-green-500">O</span>
                </div>
              </div>

              <div className="relative rounded-md overflow-hidden shadow-sm aspect-square">
                {/* 배경 이미지 */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src="/images/full-body-dog.png"
                    alt="전신 사진 예시"
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                  />
                </div>
                {/* 텍스트 배경 - 이미지가 잘 보이도록 상단에만 반투명 배경 적용 */}
                <div className="absolute top-0 left-0 right-0 bg-sky-500/50 py-1 z-20">
                  <span className="text-center text-[10px] sm:text-xs md:text-sm text-white font-medium drop-shadow-md block">
                    {t("fullBodyPhoto")}
                  </span>
                </div>
                {/* O 표시 - 우측 하단에 배치 */}
                <div className="absolute bottom-1 right-1 bg-white/80 rounded-full w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex items-center justify-center z-20">
                  <span className="text-sm sm:text-base md:text-lg font-bold text-green-500">O</span>
                </div>
              </div>

              <div className="relative rounded-md overflow-hidden shadow-sm aspect-square">
                {/* 배경 이미지 */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src="/images/front-facing-dog.png"
                    alt="정면 사진 예시"
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                  />
                </div>
                {/* 텍스트 배경 - 이미지가 잘 보이도록 상단에만 반투명 배경 적용 */}
                <div className="absolute top-0 left-0 right-0 bg-sky-500/50 py-1 z-20">
                  <span className="text-center text-[10px] sm:text-xs md:text-sm text-white font-medium drop-shadow-md block">
                    정면 사진
                  </span>
                </div>
                {/* O 표시 - 우측 하단에 배치 */}
                <div className="absolute bottom-1 right-1 bg-white/80 rounded-full w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex items-center justify-center z-20">
                  <span className="text-sm sm:text-base md:text-lg font-bold text-green-500">O</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Button - 반응형 버튼 및 카운터 */}
        <div className="p-2 sm:p-2.5 md:p-3 pb-2 sm:pb-3 md:pb-4 flex flex-col sm:flex-row justify-center items-center gap-2 border-t border-purple-200 bg-white mt-2">
          <Button
            onClick={onContinue}
            className="w-full sm:w-auto bg-gradient-to-r from-purple-400 to-sky-400 hover:from-purple-500 hover:to-sky-500 text-white font-bold py-2 sm:py-2.5 md:py-3 px-4 sm:px-6 md:px-8 lg:px-10 rounded-full text-xs sm:text-sm md:text-base shadow-md"
          >
            사진 업로드
          </Button>
          <div className="flex items-center bg-yellow-100 border border-yellow-300 rounded-full px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2">
            <span className="text-[10px] sm:text-xs md:text-sm text-yellow-700 font-medium">
              무료 생성 남은 횟수: <span className="font-bold text-yellow-800">2</span>회
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
