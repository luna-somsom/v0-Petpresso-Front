"use client"

/**
 * 반려동물 정보 입력 폼 컴포넌트
 */

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { PetInfo } from "./loading-screen-types"

interface PetInfoFormProps {
  onSubmit: (petInfo: PetInfo) => void
}

export function PetInfoForm({ onSubmit }: PetInfoFormProps) {
  // 폼 상태 - 더미 데이터로 초기화
  const [email, setEmail] = useState("pet-lover@example.com")
  const [petName, setPetName] = useState("룽지")
  const [petAge, setPetAge] = useState("3살")
  const [petSpecies, setPetSpecies] = useState("포메라니안")
  const [petFeatures, setPetFeatures] = useState(
    "활발하고 장난기가 많아요. 노란색 털에 동그란 눈이 매력적인 강아지입니다. 사람을 좋아하고 항상 꼬리를 흔들며 반겨줍니다.",
  )

  // 폼 완료 여부 확인
  const isFormComplete = email && petName && petAge && petSpecies && petFeatures

  // 폼 제출 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ email, petName, petAge, petSpecies, petFeatures })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3 flex-1 overflow-y-auto">
      {/* 이메일 입력 필드 */}
      <div className="space-y-1">
        <Label htmlFor="email" className="text-xs text-purple-600">
          이메일 <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="text-xs h-7 sm:h-8"
        />
      </div>

      {/* 반려동물 이름 입력 필드 */}
      <div className="space-y-1">
        <Label htmlFor="petName" className="text-xs text-purple-600">
          반려동물 이름 <span className="text-red-500">*</span>
        </Label>
        <Input
          id="petName"
          placeholder="예: 멍이, 냥이"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          required
          className="text-xs h-7 sm:h-8"
        />
      </div>

      {/* 나이 및 품종 입력 필드 (2열 그리드) */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {/* 나이 입력 필드 */}
        <div className="space-y-1">
          <Label htmlFor="petAge" className="text-xs text-purple-600">
            나이 <span className="text-red-500">*</span>
          </Label>
          <Input
            id="petAge"
            placeholder="예: 3살"
            value={petAge}
            onChange={(e) => setPetAge(e.target.value)}
            required
            className="text-xs h-7 sm:h-8"
          />
        </div>

        {/* 품종 입력 필드 */}
        <div className="space-y-1">
          <Label htmlFor="petSpecies" className="text-xs text-purple-600">
            종류/품종 <span className="text-red-500">*</span>
          </Label>
          <Input
            id="petSpecies"
            placeholder="예: 말티즈, 코리안숏헤어"
            value={petSpecies}
            onChange={(e) => setPetSpecies(e.target.value)}
            required
            className="text-xs h-7 sm:h-8"
          />
        </div>
      </div>

      {/* 특징 입력 필드 (텍스트 영역) */}
      <div className="space-y-1">
        <Label htmlFor="petFeatures" className="text-xs text-purple-600">
          특징 <span className="text-red-500">*</span>
        </Label>
        <Textarea
          id="petFeatures"
          placeholder="반려동물의 특징을 자유롭게 적어주세요. (성격, 외모 등)"
          value={petFeatures}
          onChange={(e) => setPetFeatures(e.target.value)}
          required
          className="text-xs min-h-[60px] sm:min-h-[80px] resize-none"
        />
      </div>

      {/* 제출 버튼 */}
      <Button
        type="submit"
        disabled={!isFormComplete}
        className="w-full bg-gradient-to-r from-purple-500 to-sky-500 hover:from-purple-600 hover:to-sky-600 text-white text-xs sm:text-sm py-1.5 sm:py-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        신청 완료하기
      </Button>
    </form>
  )
}
