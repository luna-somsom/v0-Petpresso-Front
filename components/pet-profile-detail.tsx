"use client"

// 모달로 표시될 때 필요한 스타일 조정

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Heart, Share2, Download, Edit, Trash2 } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface PetProfileDetailProps {
  onClose: () => void
}

export function PetProfileDetail({ onClose }: PetProfileDetailProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showShareOptions, setShowShareOptions] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
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

  // Mock pet data
  const pet = {
    id: 1,
    name: "멍이",
    breed: "포메라니안",
    age: 2,
    gender: "남아",
    style: "꽃단장 프로필",
    createdAt: "2025년 4월 10일",
    description:
      "활발하고 장난기 많은 멍이의 특별한 프로필 사진입니다. 꽃과 함께 찍은 화려한 스타일로 멍이의 사랑스러운 모습을 담았습니다.",
    images: [{ id: 1, src: "/pet-profiles/gomsooni.png", alt: "멍이 프로필 사진 1" }],
  }

  const handleImageClick = (imageId: number) => {
    setSelectedImage(imageId)
  }

  const handleCloseImageView = () => {
    setSelectedImage(null)
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const handleShare = () => {
    setShowShareOptions(true)
  }

  const handleDelete = () => {
    setShowDeleteConfirm(true)
  }

  const confirmDelete = () => {
    // Handle delete logic here
    setShowDeleteConfirm(false)
    // After deletion, navigate back
    onClose()
  }

  return (
    <div>
      <div className="p-3 sm:p-4 max-h-full overflow-y-auto">
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="mr-1 sm:mr-2 text-purple-700 hover:text-sky-900 hover:bg-purple-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-base sm:text-lg font-bold bg-gradient-to-r from-purple-700 to-sky-700 bg-clip-text text-transparent">
              {pet.name}의 프로필
            </h1>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleFavorite}
              className={`h-8 w-8 ${isFavorite ? "text-red-500 hover:text-red-600" : "text-gray-400 hover:text-red-400"}`}
            >
              <Heart className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="h-8 w-8 text-sky-600 hover:text-sky-700 hover:bg-sky-50"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Left column - Main profile image */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-2 sm:p-3">
              <div className="aspect-square w-full rounded-lg overflow-hidden mb-2 relative group">
                <img
                  src={pet.images[0].src || "/placeholder.svg"}
                  alt={pet.images[0].alt}
                  className="w-full h-full object-cover"
                  style={{ imageRendering: "high-quality" }}
                  onClick={() => handleImageClick(pet.images[0].id)}
                />
              </div>

              <div className="flex justify-between mb-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 mr-2 border-purple-200 text-purple-700 hover:bg-purple-50 text-xs py-1"
                >
                  <Download className="h-3 w-3 mr-1" />
                  저장
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 border-sky-200 text-sky-700 hover:bg-sky-50 text-xs py-1"
                >
                  <Share2 className="h-3 w-3 mr-1" />
                  공유
                </Button>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">스타일</span>
                  <span className="text-xs font-medium text-purple-700">{pet.style}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">생성일</span>
                  <span className="text-xs font-medium text-purple-700">{pet.createdAt}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Pet info */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-2 sm:p-3">
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">이름</p>
                  <p className="text-sm font-medium text-purple-800">{pet.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">품종</p>
                  <p className="text-sm font-medium text-purple-800">{pet.breed}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">나이</p>
                  <p className="text-sm font-medium text-purple-800">{pet.age}살</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">성별</p>
                  <p className="text-sm font-medium text-purple-800">{pet.gender}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500">스타일</p>
                  <p className="text-sm font-medium text-purple-800">{pet.style}</p>
                </div>
              </div>

              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1">설명</p>
                <p className="text-xs text-purple-800 bg-gradient-to-r from-purple-50 to-sky-50 p-2 rounded-md">
                  {pet.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button className="flex-1 bg-gradient-to-r from-purple-500 to-sky-500 hover:from-purple-600 hover:to-sky-600 text-white text-xs py-2">
                  <Edit className="h-3 w-3 mr-1" />
                  프로필 수정
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 text-xs py-2"
                  onClick={handleDelete}
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  프로필 삭제
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Full image view dialog */}
        <Dialog open={selectedImage !== null} onOpenChange={handleCloseImageView}>
          <DialogContent
            className={`
          p-1 bg-gradient-to-b from-purple-50 via-sky-50 to-white border-purple-200
          ${isMobile ? "w-[95vw] max-w-[95vw]" : "sm:max-w-md"}
        `}
          >
            {selectedImage && (
              <div className="relative">
                <div className="aspect-square w-full overflow-hidden rounded-md">
                  <img
                    src={pet.images.find((img) => img.id === selectedImage)?.src || pet.images[0].src}
                    alt="확대된 프로필 사진"
                    className="w-full h-full object-contain"
                    style={{ imageRendering: "high-quality" }}
                  />
                </div>
                <div className="absolute top-2 right-2 flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/80 hover:bg-white border-purple-200 h-7 w-7 p-1"
                  >
                    <Download className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline" className="bg-white/80 hover:bg-white border-sky-200 h-7 w-7 p-1">
                    <Share2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Delete confirmation dialog */}
        <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
          <DialogContent
            className={`
          p-3 sm:p-4 bg-white
          ${isMobile ? "w-[95vw] max-w-[95vw]" : "sm:max-w-md"}
        `}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-2 sm:mb-3">
                <Trash2 className="h-5 w-5 text-red-500" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1">프로필을 삭제하시겠습니까?</h3>
              <p className="text-xs text-gray-500 mb-3 sm:mb-4">
                이 작업은 되돌릴 수 없으며 프로필 사진이 영구적으로 삭제됩니다.
              </p>
              <div className="flex gap-2 w-full">
                <Button variant="outline" className="flex-1 text-xs py-1.5" onClick={() => setShowDeleteConfirm(false)}>
                  취소
                </Button>
                <Button
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs py-1.5"
                  onClick={confirmDelete}
                >
                  삭제
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Share options dialog */}
        <Dialog open={showShareOptions} onOpenChange={setShowShareOptions}>
          <DialogContent
            className={`
          p-3 sm:p-4 bg-white
          ${isMobile ? "w-[95vw] max-w-[95vw]" : "sm:max-w-md"}
        `}
          >
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center mb-2 sm:mb-3">
                <Share2 className="h-5 w-5 text-sky-500" />
              </div>
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2 sm:mb-3">프로필 공유하기</h3>

              <div className="grid grid-cols-4 gap-2 w-full mb-3 sm:mb-4">
                <div className="flex flex-col items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-[#FEE500] border-none mb-1"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2.14282C6.26205 2.14282 1.71428 5.71337 1.71428 10.0714C1.71428 12.8371 3.6355 15.2595 6.48182 16.6548L5.42877 20.5714C5.38806 20.7286 5.44877 20.8976 5.58591 20.9857C5.72305 21.0738 5.90305 21.0619 6.02734 20.9571L10.6909 17.6571C11.1164 17.7095 11.5527 17.7381 12 17.7381C17.738 17.7381 22.2857 14.1676 22.2857 10.0714C22.2857 5.97528 17.738 2.14282 12 2.14282Z"
                        fill="black"
                      />
                    </svg>
                  </Button>
                  <span className="text-[10px]">카카오톡</span>
                </div>
                <div className="flex flex-col items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-[#03C75A] border-none mb-1"
                  >
                    <span className="text-white font-bold text-xs">N</span>
                  </Button>
                  <span className="text-[10px]">네이버</span>
                </div>
                <div className="flex flex-col items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-[#4267B2] border-none mb-1"
                  >
                    <span className="text-white font-bold text-xs">f</span>
                  </Button>
                  <span className="text-[10px]">페이스북</span>
                </div>
                <div className="flex flex-col items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 border-none mb-1"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-white"
                    >
                      <path
                        d="M12 2C14.717 2 15.056 2.01 16.122 2.06C17.187 2.11 17.912 2.277 18.55 2.525C19.21 2.779 19.766 3.123 20.322 3.678C20.8305 4.1779 21.224 4.78259 21.475 5.45C21.722 6.087 21.89 6.813 21.94 7.878C21.987 8.944 22 9.283 22 12C22 14.717 21.99 15.056 21.94 16.122C21.89 17.187 21.722 17.912 21.475 18.55C21.2247 19.2178 20.8311 19.8226 20.322 20.322C19.822 20.8303 19.2173 21.2238 18.55 21.475C17.913 21.722 17.187 21.89 16.122 21.94C15.056 21.987 14.717 22 12 22C9.283 22 8.944 21.99 7.878 21.94C6.813 21.89 6.088 21.722 5.45 21.475C4.78233 21.2245 4.17753 20.8309 3.678 20.322C3.16941 19.8222 2.77593 19.2175 2.525 18.55C2.277 17.913 2.11 17.187 2.06 16.122C2.013 15.056 2 14.717 2 12C2 9.283 2.01 8.944 2.06 7.878C2.11 6.812 2.277 6.088 2.525 5.45C2.77524 4.78218 3.1688 4.17732 3.678 3.678C4.17767 3.16923 4.78243 2.77573 5.45 2.525C6.088 2.277 6.812 2.11 7.878 2.06C8.944 2.013 9.283 2 12 2ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7ZM18.5 6.75C18.5 6.41848 18.3683 6.10054 18.1339 5.86612C17.8995 5.6317 17.5815 5.5 17.25 5.5C16.9185 5.5 16.6005 5.6317 16.3661 5.86612C16.1317 6.10054 16 6.41848 16 6.75C16 7.08152 16.1317 7.39946 16.3661 7.63388C16.6005 7.8683 16.9185 8 17.25 8C17.5815 8 17.8995 7.8683 18.1339 7.63388C18.3683 7.39946 18.5 7.08152 18.5 6.75ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9Z"
                        fill="white"
                      />
                    </svg>
                  </Button>
                  <span className="text-[10px]">인스타그램</span>
                </div>
              </div>

              <div className="w-full">
                <div className="relative flex items-center mb-2 sm:mb-3">
                  <input
                    type="text"
                    value="https://petprofile.example.com/share/12345"
                    readOnly
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 rounded-md pr-16"
                  />
                  <Button
                    size="sm"
                    className="absolute right-1 bg-gradient-to-r from-purple-500 to-sky-500 text-white text-xs py-0.5 px-2"
                  >
                    복사
                  </Button>
                </div>

                <Button variant="outline" className="w-full text-xs py-1.5" onClick={() => setShowShareOptions(false)}>
                  닫기
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
