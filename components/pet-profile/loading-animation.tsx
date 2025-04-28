/**
 * 로딩 애니메이션 컴포넌트
 *
 * 배경 이미지와 로딩 스피너를 포함한 애니메이션 표시
 */

import { Loader2 } from "lucide-react"

interface LoadingAnimationProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

export function LoadingAnimation({ className = "", size = "md" }: LoadingAnimationProps) {
  // 크기에 따른 클래스 결정
  const sizeClasses = {
    sm: "w-24 h-24",
    md: "w-28 h-28 sm:w-32 sm:h-32",
    lg: "w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48",
  }

  // 스피너 크기 결정
  const spinnerSizes = {
    sm: "h-8 w-8 sm:h-10 sm:w-10",
    md: "h-10 w-10 sm:h-12 sm:w-12",
    lg: "h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20",
  }

  return (
    <div className={`${sizeClasses[size]} rounded-md relative overflow-hidden shadow-md ${className}`}>
      {/* 배경 이미지 (블러 없음) */}
      <img src="/studio-puppy.png" alt="꽃 장식을 한 강아지" className="w-full h-full object-cover" />

      {/* 반투명 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-300/30 to-sky-300/30"></div>

      {/* 로딩 스피너 */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <Loader2 className={`${spinnerSizes[size]} text-white animate-spin drop-shadow-lg`} />
      </div>
    </div>
  )
}
