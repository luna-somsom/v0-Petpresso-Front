import { NextResponse } from "next/server"
import type { Pet } from "@/types"

export async function GET(request: Request) {
  try {
    // URL 파라미터 파싱
    const url = new URL(request.url)
    const userId = url.searchParams.get("userId")

    // 실제 구현에서는 데이터베이스에서 반려동물 목록 조회

    // 더미 응답
    const mockPets: Pet[] = [
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

    return NextResponse.json({
      success: true,
      pets: mockPets,
    })
  } catch (error) {
    console.error("반려동물 조회 오류:", error)
    return NextResponse.json({ success: false, error: "반려동물 조회 중 오류가 발생했습니다." }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // 요청 본문 파싱
    const body = await request.json()
    const { name, type, breed, age, gender, description } = body

    // 실제 구현에서는 데이터베이스에 반려동물 정보 저장

    // 더미 응답
    return NextResponse.json({
      success: true,
      pet: {
        id: Date.now(),
        name,
        type,
        breed,
        age,
        gender,
        description,
        profileImage: "/placeholder.svg",
        style: "",
        createdAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("반려동물 등록 오류:", error)
    return NextResponse.json({ success: false, error: "반려동물 등록 중 오류가 발생했습니다." }, { status: 500 })
  }
}
