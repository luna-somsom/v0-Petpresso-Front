import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // 요청 본문 파싱
    const body = await request.json()
    const { email, provider } = body

    // 실제 구현에서는 데이터베이스 조회 및 인증 로직 추가

    // 더미 응답
    return NextResponse.json({
      success: true,
      user: {
        id: "1",
        name: "Luna Kim",
        email: email || "luna@example.com",
        profileImage: null,
        joinDate: "2025년 4월",
      },
    })
  } catch (error) {
    console.error("로그인 오류:", error)
    return NextResponse.json({ success: false, error: "로그인 처리 중 오류가 발생했습니다." }, { status: 500 })
  }
}
