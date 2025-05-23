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
  const [isTablet, setIsTablet] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const selectedPhotosRef = useRef<HTMLDivElement>(null)

  // 최대 선택 가능한 사진 개수 (1장만)
  const MAX_PHOTOS = 1
  console.log("Initial Selected Photos:", initialSelectedPhotos)

  // Check device type
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

  // Log initial selected photos when component mounts
  useEffect(() => {
    console.log("GalleryScreen - Component mounted with initialSelectedPhotos:", initialSelectedPhotos)
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

  // 페이지당 사진 개수와 총 페이지 수 계산 - 반응형으로 조정
  const getPhotosPerPage = () => {
    if (isMobile) return 6
    if (isTablet) return 8
    return 12
  }

  const photosPerPage = getPhotosPerPage()
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
      console.log("GalleryScreen - Completing with selected photos:", selectedPhotos)
      // Find the actual photo objects to verify they exist
      const selectedPhotoObjects = selectedPhotos.map((id) => galleryPhotos.find((photo) => photo.id === id))
      console.log("GalleryScreen - Selected photo objects:", selectedPhotoObjects)
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
    <div className="flex flex-col h-full max-h-[90vh] sm:max-h-[85vh] md:max-h-[80vh] bg-gradient-to-b from-purple-50 via-sky-50 to-white">
      {/* Header - 반응형 패딩 및 폰트 크기 */}
      <div className="flex justify-between items-center p-2 sm:p-2.5 md:p-3 border-b border-purple-200">
        {!skipBackButton ? (
          <Button
            variant="outline"
            size="icon"
            onClick={onBack}
            className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 rounded-md border-purple-300 text-purple-700"
          >
            <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
          </Button>
        ) : (
          <div></div> // 빈 공간으로 중앙 정렬 유지
        )}
        <div className="text-center text-xs sm:text-sm md:text-base lg:text-lg font-medium text-purple-700">
          {t("selectOnePhoto")}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 rounded-md text-sky-700 hover:bg-sky-50"
        >
          <X className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 lg:h-6 lg:w-6" />
        </Button>
      </div>

      {/* Gallery Title - 반응형 패딩 및 폰트 크기 */}
      <div className="text-center text-[10px] sm:text-xs md:text-sm lg:text-base text-purple-500 py-1 sm:py-1.5 md:py-2 lg:py-2.5 border-b border-purple-100">
        {t("myGallery")}
      </div>

      {/* Gallery Content - 반응형 레이아웃 */}
      <div className="flex-1 overflow-y-auto relative">
        {/* Gallery Grid - 반응형 그리드 및 간격 */}
        <div className="p-2 sm:p-2.5 md:p-3 pb-6 sm:pb-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5 sm:gap-2 md:gap-3">
            {currentPagePhotos.map((photo) => (
              <div
                key={photo.id}
                className={`aspect-square rounded-md relative cursor-pointer shadow-sm transition-all duration-200 hover:shadow-md ${
                  selectedPhotos.includes(photo.id) ? "ring-2 ring-purple-500" : ""
                }`}
                onClick={() => handlePhotoSelect(photo.id)}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={photo.src || "/placeholder.svg"}
                    alt={`사진 ${photo.id}`}
                    className="w-full h-full object-cover rounded-md"
                    loading="lazy"
                  />
                </div>
                {selectedPhotos.includes(photo.id) && (
                  <div className="absolute top-1 sm:top-1.5 md:top-2 right-1 sm:right-1.5 md:right-2 bg-gradient-to-r from-purple-500 to-sky-500 rounded-full w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center justify-center">
                    <Check className="h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons - 페이지가 2개 이상일 때만 표시, 반응형 크기 */}
        {totalPages > 1 && (
          <>
            <div className="absolute left-2 sm:left-3 md:left-4 top-1/2 transform -translate-y-1/2 z-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPrevPage}
                disabled={currentPage === 0}
                className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-white/70 shadow-sm text-purple-700 hover:bg-white hover:text-purple-800 disabled:opacity-30"
              >
                <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
              </Button>
            </div>
            <div className="absolute right-2 sm:right-3 md:right-4 top-1/2 transform -translate-y-1/2 z-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNextPage}
                disabled={currentPage === totalPages - 1}
                className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 rounded-full bg-white/70 shadow-sm text-purple-700 hover:bg-white hover:text-purple-800 disabled:opacity-30"
              >
                <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:h-5" />
              </Button>
            </div>

            {/* Page Indicator - 반응형 크기 */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1 sm:gap-1.5 md:gap-2 py-2 sm:py-2.5 md:py-3 bg-gradient-to-t from-white/80 to-transparent">
              {Array.from({ length: totalPages }).map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 sm:h-2 md:h-2.5 rounded-full cursor-pointer transition-all duration-200 ${
                    currentPage === index
                      ? "w-5 sm:w-6 md:w-7 bg-purple-500"
                      : "w-1.5 sm:w-2 md:w-2.5 bg-purple-300 hover:bg-purple-400"
                  }`}
                  onClick={() => setCurrentPage(index)}
                ></div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Selected Photos Section - 반응형 패딩 및 폰트 크기 */}
      <div className="border-t border-purple-200 p-2 sm:p-2.5 md:p-3 bg-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-2 sm:mb-3 md:mb-4">
          <div className="text-xs sm:text-sm md:text-base font-medium text-purple-700">{t("selectedPhotos")}</div>
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <span className="text-xs sm:text-sm md:text-base text-sky-600">
              {selectedPhotos.length}/{MAX_PHOTOS}
            </span>
            <Button
              onClick={handleComplete}
              disabled={selectedPhotos.length < 1}
              className="bg-gradient-to-r from-purple-400 to-sky-400 hover:from-purple-500 hover:to-sky-500 text-white font-medium py-1.5 sm:py-2 md:py-2.5 px-3 sm:px-4 md:px-5 lg:px-6 rounded-md text-xs sm:text-sm md:text-base shadow-sm disabled:opacity-50"
            >
              {t("complete")}
            </Button>
          </div>
        </div>

        {/* Selected Photos - 반응형 크기 */}
        <div className="bg-gradient-to-br from-purple-50 to-sky-50 rounded-md shadow-inner">
          {selectedPhotos.length === 0 ? (
            <div className="h-16 sm:h-20 md:h-24 flex items-center justify-center">
              <span className="text-purple-400 text-xs sm:text-sm md:text-base">{t("noSelectedPhotos")}</span>
            </div>
          ) : (
            <div
              ref={selectedPhotosRef}
              className="flex gap-2 sm:gap-3 md:gap-4 p-2 sm:p-3 md:p-4 overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {selectedPhotos.map((photoId) => {
                const photo = galleryPhotos.find((p) => p.id === photoId)
                return (
                  <div
                    key={`selected-${photoId}`}
                    className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex-shrink-0 bg-gradient-to-br from-purple-200 to-sky-200 rounded-md relative shadow-sm transition-all duration-200 hover:shadow-md"
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
                    {/* X 버튼 - 반응형 크기 */}
                    <div className="absolute top-1 sm:top-1.5 md:top-2 right-1 sm:right-1.5 md:right-2 bg-gradient-to-r from-purple-500 to-sky-500 rounded-full w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center justify-center">
                      <X className="h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4 text-white" />
                    </div>
                  </div>
                )
              })}

              {/* 추가 선택 안내 - 반응형 크기 */}
              {selectedPhotos.length < MAX_PHOTOS && (
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:w-20 lg:w-24 lg:h-24 flex-shrink-0 bg-gradient-to-br from-purple-100/50 to-sky-100/50 border border-dashed border-purple-300 rounded-md flex items-center justify-center">
                  <span className="text-purple-400 text-[8px] sm:text-xs md:text-sm text-center px-1 sm:px-2">
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
