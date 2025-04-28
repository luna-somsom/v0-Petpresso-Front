/**
 * 로딩 화면 관련 타입 정의
 */

// 로딩 화면 컴포넌트 props
export interface LoadingScreenProps {
  onClose: () => void
  onGoToMyPage?: () => void
}

// 반려동물 정보 타입
export interface PetInfo {
  email: string
  petName: string
  petAge: string
  petSpecies: string
  petFeatures: string
}
