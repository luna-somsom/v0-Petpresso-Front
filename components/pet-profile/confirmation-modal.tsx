"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle } from "lucide-react"
import type { PetInfo } from "./pet-info-input"

interface ConfirmationModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  petInfo: PetInfo
  selectedPhotos?: number[]
}

export function ConfirmationModal({ open, onClose, onConfirm, petInfo, selectedPhotos = [] }: ConfirmationModalProps) {
  // 선택된 사진 중 첫 번째 사진을 대표 이미지로 사용
  const previewImage = selectedPhotos.length > 0 ? getPhotoSrc(selectedPhotos[0]) : "/pet-profiles/gomsooni.png"

  // 사진 ID로부터 이미지 소스 가져오기
  function getPhotoSrc(photoId: number): string {
    // 실제 구현에서는 갤러리 사진 배열에서 해당 ID의 사진을 찾아야 합니다
    const galleryPhotos = [
      { id: 1, src: "/gallery-dog.jpeg" },
      { id: 2, src: "/pet-profiles/gomsooni.png" },
      { id: 3, src: "/pet-profiles/pudding.png" },
      { id: 4, src: "/pet-profiles/nyangi.png" },
      { id: 5, src: "/pet-profiles/roy.png" },
      { id: 6, src: "/pet-profiles/luka.png" },
      { id: 7, src: "/pet-profiles/roongji.png" },
      { id: 8, src: "/pet-profiles/milk.png" },
      { id: 9, src: "/duksun.jpeg" },
      { id: 10, src: "/kancho-home.jpeg" },
      { id: 11, src: "/kancho-profile.png" },
      { id: 12, src: "/flower-profile-dog.png" },
    ]

    const photo = galleryPhotos.find((p) => p.id === photoId)
    return photo ? photo.src : "/pet-profiles/gomsooni.png"
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-gradient-to-b from-purple-50 via-sky-50 to-white border-purple-200">
        <div className="p-4 sm:p-6">
          <DialogTitle className="text-center text-lg font-bold text-purple-800 mb-4">신청 정보 확인</DialogTitle>

          <div className="flex flex-col items-center mb-4">
            <div className="relative mb-4">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-sky-400 rounded-lg blur opacity-30"></div>
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden relative">
                <img
                  src={previewImage || "/placeholder.svg"}
                  alt="선택한 반려동물 사진"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="w-full bg-white rounded-lg p-4 shadow-sm mb-4">
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div>
                  <p className="text-xs text-gray-500">이름</p>
                  <p className="text-sm font-medium text-purple-800">{petInfo.petName}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">나이</p>
                  <p className="text-sm font-medium text-purple-800">{petInfo.petAge}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">성별</p>
                  <p className="text-sm font-medium text-purple-800">{petInfo.petGender}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">품종</p>
                  <p className="text-sm font-medium text-purple-800">{petInfo.petSpecies}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-1">특징</p>
                <p className="text-xs text-purple-800 bg-gradient-to-r from-purple-50 to-sky-50 p-2 rounded-md">
                  {petInfo.petFeatures}
                </p>
              </div>
            </div>

            <div className="flex items-center mb-4 p-2 bg-yellow-50 rounded-md border border-yellow-200 w-full">
              <AlertCircle className="h-4 w-4 text-yellow-500 mr-2 flex-shrink-0" />
              <p className="text-xs text-yellow-700">위 정보로 프로필 사진을 생성합니다. 정보가 맞는지 확인해주세요.</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1 border-gray-300 text-gray-700">
              수정하기
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 bg-gradient-to-r from-purple-500 to-sky-500 hover:from-purple-600 hover:to-sky-600 text-white"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              확인 완료
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
