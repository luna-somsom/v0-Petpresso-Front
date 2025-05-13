// 필요한 경우 이 파일에 타입 정의를 추가하세요
export interface LoadingScreenProps {
  onClose: () => void
  onGoToMyPage?: () => void
  usageLimitReached?: boolean
  selectedPhotos?: number[]
  onBack?: () => void
  onChangePhoto?: () => void // 사진 변경 기능을 위한 콜백
}

export interface PetInfo {
  petName: string
  petAge: string
  petGender: string
  petSpecies: string
  petFeatures: string
}
