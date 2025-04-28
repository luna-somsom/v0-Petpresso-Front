// 공통 타입 정의
export type Language = "ko" | "ja"

// 사용자 관련 타입
export interface User {
  id: string
  name: string
  email: string
  profileImage: string | null
  joinDate: string
}

// 반려동물 관련 타입
export interface Pet {
  id: number
  name: string
  type: string
  breed: string
  age: number
  gender: string
  description: string
  profileImage: string
  style: string
  createdAt: string
}

// 프로필 결과 타입
export interface ProfileResult {
  id: number
  petId: number
  petName: string
  style: string
  date: string
  image: string
  likes: number
}

// 스타일 타입
export interface StyleOption {
  id: number
  name: string
  description: string
  imageSrc: string
  available: boolean
}

// 갤러리 사진 타입
export interface GalleryPhoto {
  id: number
  src: string
}

// 모달 관련 타입
export type ModalType = "login" | "signup" | "profile" | "terms" | "privacy" | "channel" | null

// 프로필 생성 단계 타입
export type ProfileCreationStep = "guidelines" | "gallery" | "styleSelection" | "uploading" | "loading" | "result"
