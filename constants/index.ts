import type { StyleOption, GalleryPhoto } from "@/types"

// 스타일 옵션 상수
export const STYLE_OPTIONS: StyleOption[] = [
  {
    id: 1,
    name: "꽃단장 프로필",
    description: "화려한 색감과 꽃 장식",
    imageSrc: "/flower-profile-dog.png",
    available: true,
  },
  {
    id: 2,
    name: "애니메이션 스타일",
    description: "동화같은 따뜻한 분위기",
    imageSrc: "/ghibli-style-dog.png",
    available: false,
  },
  {
    id: 3,
    name: "야구",
    description: "응원 팀 정보 필요",
    imageSrc: "/baseball-dog-new.png",
    available: false,
  },
]

// 갤러리 사진 상수
export const GALLERY_PHOTOS: GalleryPhoto[] = [
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

// 애플리케이션 설정
export const APP_CONFIG = {
  MAX_SELECTED_PHOTOS: 3,
  MIN_SELECTED_PHOTOS: 1,
  ANIMATION_DURATION: {
    short: 300,
    medium: 500,
    long: 1000,
  },
  API_ENDPOINTS: {
    login: "/api/auth/login",
    signup: "/api/auth/signup",
    profile: "/api/profile",
    pet: "/api/pet",
  },
}
