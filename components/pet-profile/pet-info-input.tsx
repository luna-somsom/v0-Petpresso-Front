"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/utils/i18n/language-context"
import { GALLERY_PHOTOS } from "@/constants"

interface PetInfoInputProps {
  onSubmit: (petInfo: PetInfo) => void
  initialValues?: Partial<PetInfo>
  selectedPhotos?: number[]
  onChangePhoto?: () => void
}

export interface PetInfo {
  petName: string
  petAge: string
  petGender: string
  petSpecies: string
  petFeatures: string
}

export function PetInfoInput({ onSubmit, initialValues = {}, selectedPhotos = [], onChangePhoto }: PetInfoInputProps) {
  const { t } = useLanguage()
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  // 디바이스 타입 체크
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

  // 폼 상태 - 초기값 또는 기본값으로 초기화
  const [petName, setPetName] = useState(initialValues.petName || "룽지")
  const [petAge, setPetAge] = useState(initialValues.petAge || "3살")
  const [petGender, setPetGender] = useState(initialValues.petGender || "남아")
  const [petSpecies, setPetSpecies] = useState(initialValues.petSpecies || "포메라니안")
  const [petFeatures, setPetFeatures] = useState(
    initialValues.petFeatures ||
      "활발하고 장난기가 많아요. 노란색 털에 동그란 눈이 매력적인 강아지입니다. 사람을 좋아하고 항상 꼬리를 흔들며 반겨줍니다.",
  )

  // 폼 완료 여부 확인
  const isFormComplete = petName && petAge && petGender && petSpecies && petFeatures

  // 선택된 사진 가져오기
  const selectedPhoto =
    selectedPhotos.length > 0 ? GALLERY_PHOTOS.find((photo) => photo.id === selectedPhotos[0]) : null

  // 폼 제출 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 바로 부모 컴포넌트에 제출
    onSubmit({
      petName,
      petAge,
      petGender,
      petSpecies,
      petFeatures,
    })
  }

  // 사진 클릭 핸들러 추가
  const handlePhotoClick = () => {
    if (onChangePhoto) {
      onChangePhoto()
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-2.5 sm:p-3 md:p-4 flex flex-col w-full max-h-[calc(100vh-8rem)] overflow-hidden">
      <h4 className="text-sm sm:text-base md:text-lg lg:text-xl font-medium text-purple-700 mb-3 sm:mb-4 md:mb-5 text-center">
        {t("petInfoInput")}
      </h4>

      {/* 선택된 사진 표시 - 반응형 크기 */}
      {selectedPhoto && (
        <div className="mb-2.5 sm:mb-3 md:mb-4 flex justify-center">
          <div
            className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-lg overflow-hidden shadow-md border-2 border-purple-300 cursor-pointer transition-all duration-300 hover:border-purple-500 hover:shadow-lg group"
            onClick={handlePhotoClick}
          >
            <img
              src={selectedPhoto.src || "/placeholder.svg"}
              alt="선택된 반려동물 사진"
              className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent"></div>

            {/* 사진 변경 안내 오버레이 */}
            <div className="absolute inset-0 bg-purple-800/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white text-xs sm:text-sm md:text-base font-medium">사진 변경하기</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3 md:space-y-4 flex-1 overflow-y-auto">
        {/* 반려동물 이름 입력 필드 - 반응형 폰트 크기 */}
        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="petName" className="text-xs sm:text-sm md:text-base text-purple-600">
            {t("petName")} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="petName"
            placeholder={t("petNamePlaceholder")}
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            required
            className="text-xs sm:text-sm md:text-base h-9 sm:h-10 md:h-11 lg:h-12"
          />
        </div>

        {/* 나이, 성별, 품종 입력 필드 (모바일에서는 1열, 태블릿 이상에서는 3열 그리드) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
          {/* 나이 입력 필드 */}
          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="petAge" className="text-xs sm:text-sm md:text-base text-purple-600">
              {t("age")} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="petAge"
              placeholder={t("agePlaceholder")}
              value={petAge}
              onChange={(e) => setPetAge(e.target.value)}
              required
              className="text-xs sm:text-sm md:text-base h-9 sm:h-10 md:h-11 lg:h-12"
            />
          </div>

          {/* 성별 입력 필드 */}
          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="petGender" className="text-xs sm:text-sm md:text-base text-purple-600">
              성별 <span className="text-red-500">*</span>
            </Label>
            <Input
              id="petGender"
              placeholder="예: 남아, 여아"
              value={petGender}
              onChange={(e) => setPetGender(e.target.value)}
              required
              className="text-xs sm:text-sm md:text-base h-9 sm:h-10 md:h-11 lg:h-12"
            />
          </div>

          {/* 품종 입력 필드 */}
          <div className="space-y-1 sm:space-y-2">
            <Label htmlFor="petSpecies" className="text-xs sm:text-sm md:text-base text-purple-600">
              {t("species")} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="petSpecies"
              placeholder={t("speciesPlaceholder")}
              value={petSpecies}
              onChange={(e) => setPetSpecies(e.target.value)}
              required
              className="text-xs sm:text-sm md:text-base h-9 sm:h-10 md:h-11 lg:h-12"
            />
          </div>
        </div>

        {/* 특징 입력 필드 (텍스트 영역) - 반응형 높이 */}
        <div className="space-y-1 sm:space-y-2">
          <Label htmlFor="petFeatures" className="text-xs sm:text-sm md:text-base text-purple-600">
            {t("features")} <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="petFeatures"
            placeholder={t("featuresPlaceholder")}
            value={petFeatures}
            onChange={(e) => setPetFeatures(e.target.value)}
            required
            className="text-xs sm:text-sm md:text-base min-h-[80px] sm:min-h-[100px] md:min-h-[120px] lg:min-h-[140px] resize-none"
          />
        </div>

        {/* 제출 버튼 - 반응형 패딩 및 폰트 크기 */}
        <Button
          type="submit"
          disabled={!isFormComplete}
          className="w-full bg-gradient-to-r from-purple-500 to-sky-500 hover:from-purple-600 hover:to-sky-600 text-white text-xs sm:text-sm md:text-base lg:text-lg py-2 sm:py-2.5 md:py-3 lg:py-3.5 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {t("completeApplication")}
        </Button>
      </form>
    </div>
  )
}
