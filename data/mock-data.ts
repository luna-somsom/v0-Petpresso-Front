import type { User, Pet, ProfileResult } from "@/types/pet-profile"

// 더미 데이터 - 사용자 정보
export const mockUser: User = {
  name: "Luna Kim",
  email: "luna@example.com",
  profileImage: null, // 프로필 이미지가 없는 경우
  joinDate: "2025년 4월",
}

// 더미 데이터 - 반려동물 목록 (1개만 남김)
export const mockPets: Pet[] = [
  {
    id: 1,
    name: "멍이",
    type: "강아지",
    breed: "포메라니안",
    age: 2,
    gender: "남아",
    description: "활발하고 장난기 많은 포메라니안입니다. 노란색 털이 매력적이에요.",
    profileImage: "/pet-profiles/gomsooni.png",
    style: "꽃단장 프로필",
    createdAt: "2025년 4월 10일",
  },
]

// 더미 데이터 - 생성된 프로필 사진 (1개만 남김)
export const mockProfileResults: ProfileResult[] = [
  {
    id: 1,
    petName: "멍이",
    style: "꽃단장 프로필",
    date: "2025.04.15",
    image: "/pet-profiles/gomsooni.png",
    likes: 12,
  },
]
