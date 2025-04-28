"use client"

import { useState, useEffect } from "react"

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl"

interface BreakpointConfig {
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
}

const defaultBreakpoints: BreakpointConfig = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
}

/**
 * 반응형 디자인을 위한 커스텀 훅
 * @param {BreakpointConfig} customBreakpoints - 사용자 정의 브레이크포인트
 * @returns 현재 화면 크기 정보
 */
export function useResponsive(customBreakpoints?: Partial<BreakpointConfig>) {
  const breakpoints = { ...defaultBreakpoints, ...customBreakpoints }

  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  })

  useEffect(() => {
    // 서버 사이드 렌더링 시 실행 방지
    if (typeof window === "undefined") return

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // 초기 설정
    handleResize()

    // 이벤트 리스너 등록
    window.addEventListener("resize", handleResize)

    // 클린업
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // 현재 브레이크포인트 계산
  const getCurrentBreakpoint = (): Breakpoint => {
    const { width } = windowSize

    if (width < breakpoints.sm) return "xs"
    if (width < breakpoints.md) return "sm"
    if (width < breakpoints.lg) return "md"
    if (width < breakpoints.xl) return "lg"
    return "xl"
  }

  const currentBreakpoint = getCurrentBreakpoint()

  // 브레이크포인트 비교 헬퍼 함수
  const isXs = currentBreakpoint === "xs"
  const isSm = currentBreakpoint === "sm"
  const isMd = currentBreakpoint === "md"
  const isLg = currentBreakpoint === "lg"
  const isXl = currentBreakpoint === "xl"

  const isSmDown = ["xs"].includes(currentBreakpoint)
  const isMdDown = ["xs", "sm"].includes(currentBreakpoint)
  const isLgDown = ["xs", "sm", "md"].includes(currentBreakpoint)
  const isXlDown = ["xs", "sm", "md", "lg"].includes(currentBreakpoint)

  const isSmUp = ["sm", "md", "lg", "xl"].includes(currentBreakpoint)
  const isMdUp = ["md", "lg", "xl"].includes(currentBreakpoint)
  const isLgUp = ["lg", "xl"].includes(currentBreakpoint)
  const isXlUp = ["xl"].includes(currentBreakpoint)

  return {
    width: windowSize.width,
    height: windowSize.height,
    breakpoint: currentBreakpoint,

    // 정확한 브레이크포인트 매칭
    isXs,
    isSm,
    isMd,
    isLg,
    isXl,

    // 이하 브레이크포인트
    isSmDown,
    isMdDown,
    isLgDown,
    isXlDown,

    // 이상 브레이크포인트
    isSmUp,
    isMdUp,
    isLgUp,
    isXlUp,

    // 모바일 여부 (md 미만)
    isMobile: isMdDown,
    // 태블릿 여부 (md 이상, lg 미만)
    isTablet: isMd,
    // 데스크톱 여부 (lg 이상)
    isDesktop: isLgUp,
  }
}
