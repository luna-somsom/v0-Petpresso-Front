"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { User } from "@/types/pet-profile"
import { EditUserProfileForm } from "./edit-user-profile-form"
import { Edit } from "lucide-react"

interface UserInfoCardProps {
  user: User
  onUpdateUser: (updatedUser: User) => void
  onDeleteRequest: () => void
}

export function UserInfoCard({ user, onUpdateUser, onDeleteRequest }: UserInfoCardProps) {
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = (updatedUser: User) => {
    onUpdateUser(updatedUser)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <section className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-base sm:text-lg font-bold text-purple-800">내 정보</h2>

        {!isEditing && (
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="text-purple-600 hover:text-purple-800 hover:bg-purple-50"
            >
              <Edit className="h-4 w-4 mr-1" />
              수정
            </Button>
          </div>
        )}
      </div>

      {isEditing ? (
        <EditUserProfileForm
          user={user}
          onSave={handleSave}
          onCancel={handleCancel}
          onDeleteRequest={onDeleteRequest}
        />
      ) : (
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-300 to-sky-300 rounded-full flex items-center justify-center mx-auto sm:mx-0 overflow-hidden">
            {user.profileImage ? (
              <img
                src={user.profileImage || "/placeholder.svg"}
                alt={`${user.name}의 프로필`}
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 sm:h-10 sm:w-10 text-white"
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
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-purple-800">{user.name}</h3>
            <p className="text-sm text-sky-600">{user.email}</p>
            <p className="text-xs text-gray-500 mt-1">가입일: {user.joinDate}</p>
          </div>
        </div>
      )}
    </section>
  )
}
