import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    // 요청 본문 파싱
    const body = await request.json()
    const { email, name, provider } = body

    // 실제 구현에서는 데이터베이스에 사용자 생성 로직 추가

    // 더미 응답
    return NextResponse.json({
      success: true,
      user: {
        id: "1",
        name: name || "Luna Kim",
        email: email || "luna@example.com",
        profileImage: null,
        joinDate: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("회원가입 오류:", error)
    return NextResponse.json({ success: false, error: "회원가입 처리 중 오류가 발생했습니다." }, { status: 500 })
  }
}
