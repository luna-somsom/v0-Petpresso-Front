// 사용자 정보 타입
export interface User {
  name: string
  email: string
  profileImage: string | null
  joinDate: string
}

// 반려동물 정보 타입
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
  petName: string
  style: string
  date: string
  image: string
  likes: number
}
