"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useResponsive } from "@/hooks/use-responsive"
import Image from "next/image"

interface OptimizedSlidingGalleryProps {
  className?: string
}

interface PetProfile {
  id: number
  name: string
  imageSrc: string
  style: string
}

export function OptimizedSlidingGallery({ className }: OptimizedSlidingGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemWidth, setItemWidth] = useState(0)
  const { isMobile } = useResponsive()
  const [isAnimating, setIsAnimating] = useState(false)
  const animationRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)

  // 실제 갤러리 아이템
  const galleryItems: PetProfile[] = [
    { id: 1, name: "곰순이", imageSrc: "/pet-profiles/gomsooni.png", style: "꽃단장 프로필" },
    { id: 2, name: "푸딩", imageSrc: "/pet-profiles/pudding.png", style: "지브리 스타일" },
    { id: 3, name: "냥이", imageSrc: "/pet-profiles/nyangi.png", style: "야구" },
    { id: 4, name: "로이", imageSrc: "/pet-profiles/roy.png", style: "꽃단장 프로필" },
    { id: 5, name: "루카", imageSrc: "/pet-profiles/luka.png", style: "지브리 스타일" },
    { id: 6, name: "룽지", imageSrc: "/pet-profiles/roongji.png", style: "야구" },
    { id: 7, name: "밀크", imageSrc: "/pet-profiles/milk.png", style: "꽃단장 프로필" },
  ]

  // 연속 스크롤을 위해 아이템 복제
  const allItems = [...galleryItems, ...galleryItems]

  // 아이템 너비 계산
  useEffect(() => {
    const calculateItemWidth = () => {
      if (!containerRef.current) return

      const containerWidth = containerRef.current.offsetWidth
      const itemsPerView = isMobile ? 2.5 : 4.5
      const calculatedWidth = containerWidth / itemsPerView

      setItemWidth(calculatedWidth)
    }

    calculateItemWidth()
    window.addEventListener("resize", calculateItemWidth)

    return () => {
      window.removeEventListener("resize", calculateItemWidth)
    }
  }, [isMobile])

  // 애니메이션 최적화를 위한 requestAnimationFrame 사용
  useEffect(() => {
    if (isPaused || !itemWidth || isAnimating) return

    const speed = isMobile ? 0.5 : 0.3 // 픽셀/밀리초
    let position = currentIndex * itemWidth

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp

      const elapsed = timestamp - lastTimeRef.current
      lastTimeRef.current = timestamp

      position += speed * elapsed

      // 모든 아이템을 지나면 처음으로 돌아감
      if (position >= galleryItems.length * itemWidth) {
        position = 0
      }

      if (containerRef.current) {
        containerRef.current.scrollLeft = position
      }

      setCurrentIndex(Math.floor(position / itemWidth))
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPaused, itemWidth, isAnimating, isMobile, currentIndex, galleryItems.length])

  // 수동 스크롤 처리
  const scrollToIndex = (index: number) => {
    if (!containerRef.current || !itemWidth) return

    setIsAnimating(true)

    const targetPosition = index * itemWidth
    const startPosition = containerRef.current.scrollLeft
    let startTime: number | null = null
    const duration = 300 // 밀리초

    const animateScroll = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime

      if (elapsed >= duration) {
        containerRef.current!.scrollLeft = targetPosition
        setCurrentIndex(index)
        setIsAnimating(false)
        return
      }

      // 이징 함수 적용 (easeInOutCubic)
      const progress = elapsed / duration
      const easeProgress = progress < 0.5 ? 4 * progress * progress * progress : 1 - Math.pow(-2 * progress + 2, 3) / 2

      const currentPosition = startPosition + (targetPosition - startPosition) * easeProgress
      containerRef.current!.scrollLeft = currentPosition

      requestAnimationFrame(animateScroll)
    }

    requestAnimationFrame(animateScroll)
  }

  const scrollLeft = (e: React.MouseEvent) => {
    e.stopPropagation()
    const newIndex = Math.max(0, currentIndex - 1)
    scrollToIndex(newIndex)
  }

  const scrollRight = (e: React.MouseEvent) => {
    e.stopPropagation()
    const newIndex = Math.min(allItems.length - 1, currentIndex + 1)
    scrollToIndex(newIndex)
  }

  return (
    <div className={`relative group overflow-hidden ${className} bg-gradient-to-b from-white to-gray-50`}>
      {/* 갤러리 컨테이너 */}
      <div
        className="py-1 md:py-2 relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* 스크롤 컨테이너 - will-change 속성 추가로 성능 향상 */}
        <div
          ref={containerRef}
          className="overflow-x-auto scrollbar-hide"
          style={{
            scrollSnapType: "x mandatory",
            willChange: "scroll-position",
            scrollBehavior: "auto", // smooth 대신 auto 사용하여 성능 향상
          }}
        >
          {/* 아이템 컨테이너 */}
          <div
            className="flex gap-3 md:gap-4"
            style={{
              paddingLeft: "4px",
              paddingRight: "4px",
              width: `${allItems.length * itemWidth}px`,
              willChange: "transform", // 성능 향상을 위한 속성
            }}
          >
            {allItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex-shrink-0 rounded-lg overflow-hidden shadow-md"
                style={{
                  width: `${itemWidth - (isMobile ? 12 : 16)}px`, // gap 고려
                  height: `${itemWidth - (isMobile ? 12 : 16)}px`,
                  scrollSnapAlign: "start",
                  willChange: "transform", // 성능 향상을 위한 속성
                  transform: "translateZ(0)", // 하드웨어 가속 활성화
                }}
              >
                <div className="w-full h-full relative">
                  {/* Next/Image 컴포넌트로 교체하여 이미지 최적화 */}
                  <div className="relative w-full h-full">
                    <Image
                      src={item.imageSrc || "/placeholder.svg"}
                      alt={`${item.name}의 프로필 사진`}
                      fill
                      className="object-cover"
                      loading="lazy"
                      sizes="(max-width: 768px) 120px, 200px"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-purple-900/70 to-transparent p-1 md:p-2">
                    <p className="text-white text-[10px] md:text-xs font-medium">{item.name}</p>
                    <p className="text-white/80 text-[8px] md:text-[10px]">{item.style}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 네비게이션 버튼 - 최적화된 버전 */}
      <button
        className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-1 md:p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-white transform-gpu"
        onClick={scrollLeft}
        aria-label="Previous image"
        style={{ transform: "translateZ(0)" }} // 하드웨어 가속 활성화
      >
        <ChevronLeft className="h-3 w-3 md:h-4 md:w-4 text-purple-700" />
      </button>
      <button
        className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-1 md:p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-white transform-gpu"
        onClick={scrollRight}
        aria-label="Next image"
        style={{ transform: "translateZ(0)" }} // 하드웨어 가속 활성화
      >
        <ChevronRight className="h-3 w-3 md:h-4 md:w-4 text-purple-700" />
      </button>
    </div>
  )
}
