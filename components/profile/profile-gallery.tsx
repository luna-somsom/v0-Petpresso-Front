"use client"

import type { ProfileResult } from "@/types/pet-profile"
import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

interface ProfileGalleryProps {
  profiles: ProfileResult[]
}

export function ProfileGallery({ profiles }: ProfileGalleryProps) {
  const [showImageModal, setShowImageModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  const handleViewImage = (image: string) => {
    setSelectedImage(image)
    setShowImageModal(true)
  }

  return (
    <>
      <section className="bg-white rounded-lg shadow-sm p-4">
        <div className="mb-4">
          <h2 className="text-base sm:text-lg font-bold text-purple-800">생성된 프로필 사진</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="group relative cursor-pointer"
              onClick={() => handleViewImage(profile.image)}
            >
              <div className="aspect-square rounded-md overflow-hidden shadow-sm">
                <img
                  src={profile.image || "/placeholder.svg"}
                  alt={`${profile.petName}의 ${profile.style}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                <p className="text-white text-xs font-medium truncate">{profile.petName}</p>
                <p className="text-white/80 text-[10px] truncate">{profile.style}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 이미지 모달 */}
      <Dialog open={showImageModal} onOpenChange={setShowImageModal}>
        <DialogContent
          className={`
          p-0 overflow-hidden bg-gradient-to-b from-purple-50 via-sky-50 to-white border-purple-200
          ${isMobile ? "w-[95vw] max-w-[95vw]" : "sm:max-w-md"}
        `}
        >
          <div className="p-3 sm:p-4">
            <div className="aspect-square w-full rounded-md mb-3 shadow-md overflow-hidden">
              <img
                src={selectedImage || "/pet-profiles/gomsooni.png"}
                alt="프로필 사진"
                className="w-full h-full object-contain"
                style={{ imageRendering: "high-quality" }}
              />
            </div>

            <div className="flex justify-center">
              <Button className="bg-gradient-to-r from-purple-400 to-sky-400 hover:from-purple-500 hover:to-sky-500 text-white text-sm py-2 px-4">
                <Calendar className="h-4 w-4 mr-2" />
                저장하기
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
