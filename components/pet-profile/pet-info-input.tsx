"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/utils/i18n/language-context"
import { ConfirmationModal } from "./confirmation-modal"

export interface PetInfo {
  petName: string
  petAge: string
  petGender: string
  petSpecies: string
  petFeatures: string
}

interface PetInfoInputProps {
  onSubmit: (petInfo: PetInfo) => void
  initialValues?: Partial<PetInfo>
  selectedPhotos?: number[]
}

export function PetInfoInput({ onSubmit, initialValues = {}, selectedPhotos = [] }: PetInfoInputProps) {
  const { t } = useLanguage()

  // 폼 상태 - 초기값 또는 기본값으로 초기화
  const [petName, setPetName] = useState(initialValues.petName || "룽지")
  const [petAge, setPetAge] = useState(initialValues.petAge || "3살")
  const [petGender, setPetGender] = useState(initialValues.petGender || "남아")
  const [petSpecies, setPetSpecies] = useState(initialValues.petSpecies || "포메라니안")
  const [petFeatures, setPetFeatures] = useState(
    initialValues.petFeatures ||
      "활발하고 장난기가 많아요. 노란색 털에 동그란 눈이 매력적인 강아지입니다. 사람을 좋아하고 항상 꼬리를 흔들며 반겨줍니다.",
  )

  // 확인 모달 상태
  const [showConfirmation, setShowConfirmation] = useState(false)

  // 폼 완료 여부 확인
  const isFormComplete = petName && petAge && petGender && petSpecies && petFeatures

  // 폼 제출 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 확인 모달 표시
    setShowConfirmation(true)
  }

  // 확인 모달에서 확인 버튼 클릭 시
  const handleConfirm = () => {
    setShowConfirmation(false)
    // 부모 컴포넌트에 제출
    onSubmit({
      petName,
      petAge,
      petGender,
      petSpecies,
      petFeatures,
    })
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 md:p-5 flex flex-col w-full">
        <h4 className="text-xs sm:text-sm md:text-base font-medium text-purple-700 mb-2 sm:mb-3 md:mb-4 text-center">
          {t("petInfoInput")}
        </h4>

        <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3 md:space-y-4 flex-1 overflow-y-auto">
          {/* 반려동물 이름 입력 필드 - 모바일에서 더 크게 */}
          <div className="space-y-1 sm:space-y-1.5">
            <Label htmlFor="petName" className="text-xs sm:text-sm text-purple-600">
              {t("petName")} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="petName"
              placeholder={t("petNamePlaceholder")}
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              required
              className="text-xs sm:text-sm h-8 sm:h-9 md:h-10"
            />
          </div>

          {/* 나이, 성별, 품종 입력 필드 (모바일에서는 1열, 태블릿 이상에서는 3열 그리드) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
            {/* 나이 입력 필드 */}
            <div className="space-y-1 sm:space-y-1.5">
              <Label htmlFor="petAge" className="text-xs sm:text-sm text-purple-600">
                {t("age")} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="petAge"
                placeholder={t("agePlaceholder")}
                value={petAge}
                onChange={(e) => setPetAge(e.target.value)}
                required
                className="text-xs sm:text-sm h-8 sm:h-9 md:h-10"
              />
            </div>

            {/* 성별 입력 필드 */}
            <div className="space-y-1 sm:space-y-1.5">
              <Label htmlFor="petGender" className="text-xs sm:text-sm text-purple-600">
                성별 <span className="text-red-500">*</span>
              </Label>
              <Input
                id="petGender"
                placeholder="예: 남아, 여아"
                value={petGender}
                onChange={(e) => setPetGender(e.target.value)}
                required
                className="text-xs sm:text-sm h-8 sm:h-9 md:h-10"
              />
            </div>

            {/* 품종 입력 필드 */}
            <div className="space-y-1 sm:space-y-1.5">
              <Label htmlFor="petSpecies" className="text-xs sm:text-sm text-purple-600">
                {t("species")} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="petSpecies"
                placeholder={t("speciesPlaceholder")}
                value={petSpecies}
                onChange={(e) => setPetSpecies(e.target.value)}
                required
                className="text-xs sm:text-sm h-8 sm:h-9 md:h-10"
              />
            </div>
          </div>

          {/* 특징 입력 필드 (텍스트 영역) - 모바일에서 더 크게 */}
          <div className="space-y-1 sm:space-y-1.5">
            <Label htmlFor="petFeatures" className="text-xs sm:text-sm text-purple-600">
              {t("features")} <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="petFeatures"
              placeholder={t("featuresPlaceholder")}
              value={petFeatures}
              onChange={(e) => setPetFeatures(e.target.value)}
              required
              className="text-xs sm:text-sm min-h-[80px] sm:min-h-[100px] md:min-h-[120px] resize-none"
            />
          </div>

          {/* 제출 버튼 - 모바일에서 더 크게 */}
          <Button
            type="submit"
            disabled={!isFormComplete}
            className="w-full bg-gradient-to-r from-purple-500 to-sky-500 hover:from-purple-600 hover:to-sky-600 text-white text-xs sm:text-sm md:text-base py-2 sm:py-2.5 md:py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t("completeApplication")}
          </Button>
        </form>
      </div>

      {/* 확인 모달 */}
      <ConfirmationModal
        open={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirm}
        petInfo={{
          petName,
          petAge,
          petGender,
          petSpecies,
          petFeatures,
        }}
        selectedPhotos={selectedPhotos}
      />
    </>
  )
}
