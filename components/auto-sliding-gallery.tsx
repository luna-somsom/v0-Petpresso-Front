"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface AutoSlidingGalleryProps {
  className?: string
}

interface PetProfile {
  id: number
  name: string
  imageSrc: string
  style: string
}

export function AutoSlidingGallery({ className }: AutoSlidingGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemWidth, setItemWidth] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Check if the device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Real pet gallery items
  const galleryItems: PetProfile[] = [
    { id: 1, name: "곰순이", imageSrc: "/pet-profiles/gomsooni.png", style: "꽃단장 프로필" },
    { id: 2, name: "푸딩", imageSrc: "/pet-profiles/pudding.png", style: "지브리 스타일" },
    { id: 3, name: "냥이", imageSrc: "/pet-profiles/nyangi.png", style: "야구" },
    { id: 4, name: "로이", imageSrc: "/pet-profiles/roy.png", style: "꽃단장 프로필" },
    { id: 5, name: "루카", imageSrc: "/pet-profiles/luka.png", style: "지브리 스타일" },
    { id: 6, name: "룽지", imageSrc: "/pet-profiles/roongji.png", style: "야구" },
    { id: 7, name: "밀크", imageSrc: "/pet-profiles/milk.png", style: "꽃단장 프로필" },
  ]

  // Duplicate items for continuous scrolling
  const allItems = [...galleryItems, ...galleryItems]

  // Calculate item width on mount and window resize
  useEffect(() => {
    const calculateItemWidth = () => {
      if (itemsRef.current && itemsRef.current.children.length > 0) {
        const firstItem = itemsRef.current.children[0] as HTMLElement
        // Get the width of the item plus the gap (16px)
        const width = firstItem.offsetWidth + (isMobile ? 12 : 16)
        setItemWidth(width)
      }
    }

    calculateItemWidth()
    window.addEventListener("resize", calculateItemWidth)

    return () => {
      window.removeEventListener("resize", calculateItemWidth)
    }
  }, [isMobile])

  // Function to scroll to a specific index
  const scrollToIndex = (index: number) => {
    if (containerRef.current && itemWidth > 0) {
      const newIndex = Math.max(0, Math.min(index, allItems.length - 1))
      containerRef.current.scrollTo({
        left: newIndex * itemWidth,
        behavior: "smooth",
      })
      setCurrentIndex(newIndex)
    }
  }

  const scrollLeft = (e: React.MouseEvent) => {
    e.stopPropagation() // 이벤트 버블링 방지
    scrollToIndex(currentIndex - 1)
  }

  const scrollRight = (e: React.MouseEvent) => {
    e.stopPropagation() // 이벤트 버블링 방지
    scrollToIndex(currentIndex + 1)
  }

  // Handle manual scroll
  const handleScroll = () => {
    if (containerRef.current && itemWidth > 0) {
      const scrollLeft = containerRef.current.scrollLeft
      const newIndex = Math.round(scrollLeft / itemWidth)
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex)
      }
    }
  }

  return (
    <div className={`relative group overflow-hidden ${className} bg-gradient-to-b from-white to-gray-50`}>
      {/* Animation container - 높이 축소 */}
      <div
        className="py-1 md:py-2 relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Scrollable container */}
        <div
          ref={containerRef}
          className="overflow-x-auto scrollbar-hide"
          onScroll={handleScroll}
          style={{ scrollSnapType: "x mandatory" }}
        >
          {/* Items container */}
          <div
            ref={itemsRef}
            className={`flex gap-3 md:gap-4 ${!isPaused ? "animate-marquee" : ""}`}
            style={{
              animationDuration: isMobile ? "20s" : "30s",
              paddingLeft: "4px",
              paddingRight: "4px",
            }}
          >
            {allItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex-shrink-0 w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[200px] md:h-[200px] rounded-lg overflow-hidden shadow-md"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="w-full h-full relative">
                  <img
                    src={item.imageSrc || "/placeholder.svg"}
                    alt={`${item.name}의 프로필 사진`}
                    className="w-full h-full object-cover"
                    style={{ imageRendering: "high-quality" }}
                  />
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

      {/* Navigation buttons - visible on hover with improved z-index and positioning */}
      <button
        className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 md:p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-white"
        onClick={scrollLeft}
        aria-label="Previous image"
      >
        <ChevronLeft className="h-3 w-3 md:h-4 md:w-4 text-purple-700" />
      </button>
      <button
        className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 md:p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:bg-white"
        onClick={scrollRight}
        aria-label="Next image"
      >
        <ChevronRight className="h-3 w-3 md:h-4 md:w-4 text-purple-700" />
      </button>
    </div>
  )
}
