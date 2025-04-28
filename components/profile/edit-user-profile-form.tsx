"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { User } from "@/types/pet-profile"
import { Camera, UserMinus } from "lucide-react"

interface EditUserProfileFormProps {
  user: User
  onSave: (updatedUser: User) => void
  onCancel: () => void
  onDeleteRequest: () => void
}

export function EditUserProfileForm({ user, onSave, onCancel, onDeleteRequest }: EditUserProfileFormProps) {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [profileImage, setProfileImage] = useState<string | null>(user.profileImage)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // 실제 구현에서는 API 호출이 필요합니다
    setTimeout(() => {
      onSave({
        ...user,
        name,
        email,
        profileImage,
      })
      setIsSubmitting(false)
    }, 500)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 프로필 이미지 업로드 */}
      <div className="flex flex-col items-center mb-4">
        <div className="relative mb-2">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-300 to-sky-300 rounded-full flex items-center justify-center overflow-hidden">
            {profileImage ? (
              <img
                src={profileImage || "/placeholder.svg"}
                alt="프로필 이미지"
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 sm:h-12 sm:w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            )}
          </div>
          <label
            htmlFor="profile-image-upload"
            className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-1.5 cursor-pointer shadow-md"
          >
            <Camera className="h-4 w-4" />
            <input
              type="file"
              id="profile-image-upload"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  // 실제 구현에서는 서버에 업로드하고 URL을 받아와야 합니다
                  const reader = new FileReader()
                  reader.onload = (event) => {
                    setProfileImage(event.target?.result as string)
                  }
                  reader.readAsDataURL(file)
                }
              }}
            />
          </label>
        </div>
        <p className="text-xs text-gray-500">프로필 이미지 변경</p>
      </div>

      {/* 이름 입력 필드 */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm text-purple-700">
          이름
        </Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
          placeholder="이름을 입력하세요"
          required
        />
      </div>

      {/* 이메일 입력 필드 */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm text-purple-700">
          이메일
        </Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-purple-200 focus:border-purple-400 focus:ring-purple-400"
          placeholder="이메일을 입력하세요"
          required
        />
      </div>

      {/* 버튼 그룹 */}
      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          className="flex-1 bg-gradient-to-r from-purple-500 to-sky-500 hover:from-purple-600 hover:to-sky-600 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? "저장 중..." : "저장하기"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="flex-1 border-gray-300 text-gray-700"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          취소
        </Button>
      </div>

      {/* 회원 탈퇴 버튼 - 구분선으로 분리 */}
      <div className="pt-4 mt-4 border-t border-gray-200">
        <Button
          type="button"
          variant="ghost"
          className="w-full text-red-500 hover:text-red-700 hover:bg-red-50 flex items-center justify-center"
          onClick={onDeleteRequest}
        >
          <UserMinus className="h-4 w-4 mr-2" />
          회원 탈퇴
        </Button>
      </div>
    </form>
  )
}
