"use client"

import { Button } from "@/components/ui/button"
import { X, Check, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useLanguage } from "@/utils/i18n/language-context"

interface GalleryScreenProps {
  onClose: () => void
  onBack: () => void
  onComplete: (selectedPhotos: number[]) => void
  initialSelectedPhotos?: number[]
  skipBackButton?: boolean
}

export function GalleryScreen({
  onClose,
  onBack,
  onComplete,
  initialSelectedPhotos = [],
  skipBackButton = false,
}: GalleryScreenProps) {
  const { t } = useLanguage()
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>(initialSelectedPhotos)
  const [isMobile, setIsMobile] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const selectedPhotosRef = useRef<HTMLDivElement>(null)

  // 최대 선택 가능한 사진 개수 (1~3개)
  const MAX_PHOTOS = 3

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

  // 실제 이미지를 포함한 갤러리 사진 배열 - 빈칸 없이 실제 이미지만 포함
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

  // 페이지당 사진 개수와 총 페이지 수 계산
  const photosPerPage = 12
  const totalPages = Math.ceil(galleryPhotos.length / photosPerPage)

  // 현재 페이지의 사진들만 필터링
  const currentPagePhotos = galleryPhotos.slice(currentPage * photosPerPage, (currentPage + 1) * photosPerPage)

  const handlePhotoSelect = (photoId: number) => {
    if (selectedPhotos.includes(photoId)) {
      setSelectedPhotos(selectedPhotos.filter((id) => id !== photoId))
    } else {
      if (selectedPhotos.length < MAX_PHOTOS) {
        setSelectedPhotos([...selectedPhotos, photoId])
      }
    }
  }

  const handleComplete = () => {
    // 최소 1개 이상, 최대 3개까지 선택 가능
    if (selectedPhotos.length >= 1 && selectedPhotos.length <= MAX_PHOTOS) {
      onComplete(selectedPhotos)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  // 선택된 사진 영역 스크롤 위치 조정
  useEffect(() => {
    if (selectedPhotosRef.current && selectedPhotos.length > 0) {
      selectedPhotosRef.current.scrollLeft = selectedPhotosRef.current.scrollWidth
    }
  }, [selectedPhotos.length])

  return (
    <div className="flex flex-col h-full max-h-[80vh] sm:max-h-[85vh] bg-gradient-to-b from-purple-50 via-sky-50 to-white">
      {/* Header */}
      <div className="flex justify-between items-center p-1.5 sm:p-2 md:p-3 border-b border-purple-200">
        {!skipBackButton ? (
          <Button
            variant="outline"
            size="icon"
            onClick={onBack}
            className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 rounded-md border-purple-300 text-purple-700"
          >
            <ChevronLeft className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
          </Button>
        ) : (
          <div></div> // Empty div to maintain layout
        )}
        <div className="text-center text-xs sm:text-sm md:text-base font-medium text-purple-700">
          {t("selectPhotos")}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 rounded-md text-sky-700 hover:bg-sky-50"
        >
          <X className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
        </Button>
      </div>

      {/* Gallery Title */}
      <div className="text-center text-[10px] sm:text-xs md:text-sm text-purple-500 py-0.5 sm:py-1 md:py-2 border-b border-purple-100">
        {t("myGallery")}
      </div>

      {/* Gallery Content - 모바일 반응형 개선 */}
      <div className="flex-1 overflow-y-auto relative">
        {/* Gallery Grid */}
        <div className="p-1.5 sm:p-2 md:p-3 pb-8 sm:pb-10">
          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-1 sm:gap-1.5 md:gap-2">
            {currentPagePhotos.map((photo) => (
              <div
                key={photo.id}
                className={`aspect-square rounded-md relative cursor-pointer shadow-sm ${
                  selectedPhotos.includes(photo.id) ? "ring-2 ring-purple-500" : ""
                }`}
                onClick={() => handlePhotoSelect(photo.id)}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={photo.src || "/placeholder.svg"}
                    alt={`사진 ${photo.id}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                {selectedPhotos.includes(photo.id) && (
                  <div className="absolute top-0.5 sm:top-1 right-0.5 sm:right-1 bg-gradient-to-r from-purple-500 to-sky-500 rounded-full w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 flex items-center justify-center">
                    <Check className="h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons - 페이지가 2개 이상일 때만 표시 */}
        {totalPages > 1 && (
          <>
            <div className="absolute left-1 top-1/2 transform -translate-y-1/2 z-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevPage}
                disabled={currentPage === 0}
                className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 rounded-full bg-white/70 shadow-sm text-purple-700 hover:bg-white hover:text-purple-800 disabled:opacity-30"
              >
                <ChevronLeft className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" />
              </Button>
            </div>
            <div className="absolute right-1 top-1/2 transform -translate-y-1/2 z-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNextPage}
                disabled={currentPage === totalPages - 1}
                className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 rounded-full bg-white/70 shadow-sm text-purple-700 hover:bg-white hover:text-purple-800 disabled:opacity-30"
              >
                <ChevronRight className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4" />
              </Button>
            </div>

            {/* Page Indicator */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1 py-1 bg-gradient-to-t from-white/80 to-transparent">
              {Array.from({ length: totalPages }).map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full ${currentPage === index ? "w-4 bg-purple-500" : "w-1.5 bg-purple-300"}`}
                  onClick={() => setCurrentPage(index)}
                ></div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Selected Photos Section */}
      <div className="border-t border-purple-200 p-1.5 sm:p-2 md:p-3 bg-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-1.5 sm:mb-2">
          <div className="text-[10px] sm:text-xs md:text-sm font-medium text-purple-700">{t("selectedPhotos")}</div>
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-[10px] sm:text-xs md:text-sm text-sky-600">
              {selectedPhotos.length}/{MAX_PHOTOS}
            </span>
            <Button
              onClick={handleComplete}
              disabled={selectedPhotos.length < 1}
              className="bg-gradient-to-r from-purple-400 to-sky-400 hover:from-purple-500 hover:to-sky-500 text-white font-medium py-0.5 sm:py-1 md:py-1.5 px-2 sm:px-3 md:px-4 rounded-md text-[10px] sm:text-xs md:text-sm shadow-sm disabled:opacity-50"
            >
              {t("complete")}
            </Button>
          </div>
        </div>

        {/* Selected Photos */}
        <div className="bg-gradient-to-br from-purple-50 to-sky-50 rounded-md shadow-inner">
          {selectedPhotos.length === 0 ? (
            <div className="h-12 sm:h-14 md:h-16 flex items-center justify-center">
              <span className="text-purple-400 text-[10px] sm:text-xs md:text-sm">{t("noSelectedPhotos")}</span>
            </div>
          ) : (
            <div
              ref={selectedPhotosRef}
              className="flex gap-1.5 sm:gap-2 p-1.5 sm:p-2 overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {selectedPhotos.map((photoId) => {
                const photo = galleryPhotos.find((p) => p.id === photoId)
                return (
                  <div
                    key={`selected-${photoId}`}
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex-shrink-0 bg-gradient-to-br from-purple-200 to-sky-200 rounded-md relative shadow-sm"
                    onClick={() => handlePhotoSelect(photoId)}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      {photo && (
                        <img
                          src={photo.src || "/placeholder.svg"}
                          alt={`선택된 사진 ${photoId}`}
                          className="w-full h-full object-cover rounded-md"
                        />
                      )}
                    </div>
                    {/* X 버튼 */}
                    <div className="absolute top-0.5 sm:top-1 right-0.5 sm:right-1 bg-gradient-to-r from-purple-500 to-sky-500 rounded-full w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 flex items-center justify-center">
                      <X className="h-2 w-2 sm:h-2.5 sm:w-2.5 md:h-3 md:w-3 text-white" />
                    </div>
                  </div>
                )
              })}

              {/* 추가 선택 안내 */}
              {selectedPhotos.length < MAX_PHOTOS && (
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex-shrink-0 bg-gradient-to-br from-purple-100/50 to-sky-100/50 border border-dashed border-purple-300 rounded-md flex items-center justify-center">
                  <span className="text-purple-400 text-[8px] sm:text-[10px] md:text-xs text-center px-1">
                    {MAX_PHOTOS - selectedPhotos.length}
                    {t("morePhotosNeeded")}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
