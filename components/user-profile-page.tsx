"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { mockUser, mockPets, mockProfileResults } from "@/data/mock-data"
import { UserInfoCard } from "@/components/profile/user-info-card"
import { PetListItem } from "@/components/profile/pet-list-item"
import { PetDetailView } from "@/components/profile/pet-detail-view"
import { PetEmptyState } from "@/components/profile/pet-empty-state"
import { ProfileGallery } from "@/components/profile/profile-gallery"
import type { User, Pet } from "@/types/pet-profile"
// 필요한 import 추가
import { DeleteAccountModal } from "@/components/profile/delete-account-modal"

interface UserProfilePageProps {
  onClose: () => void
}

export function UserProfilePage({ onClose }: UserProfilePageProps) {
  // 기존 상태 유지...
  const [user, setUser] = useState<User>(mockUser)
  const [selectedPet, setSelectedPet] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [showPetList, setShowPetList] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  // 기존 함수들 유지...

  // 모바일 감지
  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileView = window.innerWidth < 768
      setIsMobile(isMobileView)

      // 모바일에서는 기본적으로 목록만 표시
      if (isMobileView && selectedPet !== null) {
        setShowPetList(false)
      } else {
        setShowPetList(true)
      }
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [selectedPet])

  const handleSelectPet = (petId: number) => {
    setSelectedPet(petId)
    // 모바일에서는 선택 시 상세 화면으로 전환
    if (isMobile) {
      setShowPetList(false)
    }
  }

  // 선택된 반려동물 정보 가져오기
  const getSelectedPet = (): Pet | undefined => {
    return mockPets.find((pet) => pet.id === selectedPet)
  }

  // 모바일에서 목록으로 돌아가기
  const handleBackToList = () => {
    setShowPetList(true)
  }

  // 사용자 정보 업데이트
  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser)
    // 실제 구현에서는 API 호출이 필요합니다
    console.log("사용자 정보 업데이트:", updatedUser)
  }

  // 회원 탈퇴 함수 추가
  const handleDeleteAccount = () => {
    // 실제 구현에서는 API 호출이 필요합니다
    console.log("회원 탈퇴 처리")
    // 탈퇴 후 로그아웃 처리 및 홈으로 이동
    onClose()
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-4 sm:py-6">
      <div className="space-y-4 sm:space-y-6">
        {/* 내 정보 섹션 - onDeleteRequest 추가 */}
        <UserInfoCard user={user} onUpdateUser={handleUpdateUser} onDeleteRequest={() => setShowDeleteModal(true)} />

        {/* 기존 코드 유지... */}
        {/* 내 반려동물 정보 섹션 - 모바일 최적화 */}
        <section className="bg-white rounded-lg shadow-sm p-4">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-base sm:text-lg font-bold text-purple-800">내 반려동물</h2>

            {/* 모바일에서 뒤로가기 버튼 */}
            {isMobile && !showPetList && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToList}
                className="text-purple-600 hover:text-purple-800 hover:bg-purple-50 text-xs"
              >
                목록으로
              </Button>
            )}
          </div>

          <div className={`${isMobile ? "block" : "flex"} gap-4`}>
            {/* 왼쪽: 반려동물 목록 (모바일에서는 조건부 표시) */}
            {(!isMobile || showPetList) && (
              <div className={`${isMobile ? "w-full" : "md:w-1/3"} space-y-3`}>
                {mockPets.map((pet) => (
                  <PetListItem
                    key={pet.id}
                    pet={pet}
                    isSelected={selectedPet === pet.id}
                    onClick={() => handleSelectPet(pet.id)}
                  />
                ))}

                <Button
                  variant="outline"
                  className="w-full py-3 border-2 border-dashed border-purple-200 bg-purple-50/50 hover:bg-purple-100/50 text-purple-600"
                >
                  <PlusCircle className="h-5 w-5 mr-2" />
                  <span>새 반려동물 추가하기</span>
                </Button>
              </div>
            )}

            {/* 오른쪽: 선택된 반려동물 정보 (모바일에서는 조건부 표시) */}
            {(!isMobile || !showPetList) && (
              <div className={`${isMobile ? "w-full" : "md:w-2/3"} bg-gray-50 rounded-lg p-4 min-h-[300px]`}>
                {selectedPet ? (
                  (() => {
                    const pet = getSelectedPet()
                    if (!pet)
                      return <div className="text-center text-gray-500">반려동물 정보를 불러올 수 없습니다.</div>
                    return <PetDetailView pet={pet} />
                  })()
                ) : (
                  <PetEmptyState />
                )}
              </div>
            )}
          </div>
        </section>

        {/* 프로필사진 결과 섹션 */}
        <ProfileGallery profiles={mockProfileResults} />

        {/* 회원 탈퇴 모달 추가 */}
        <DeleteAccountModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteAccount}
        />
      </div>
    </div>
  )
}
