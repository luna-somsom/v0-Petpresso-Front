/**
 * 알림 메시지 컴포넌트
 */

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface NotificationAlertProps {
  type: "success" | "channel"
  className?: string
}

export function NotificationAlert({ type, className = "" }: NotificationAlertProps) {
  return (
    <Alert className={`bg-gradient-to-r from-green-50 to-sky-50 border-green-200 ${className}`}>
      <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
      <AlertTitle className="text-xs text-green-700">
        {type === "success" ? "신청이 완료되었습니다" : "채널 추가 완료"}
      </AlertTitle>
      <AlertDescription className="text-[10px] text-green-600">
        {type === "success"
          ? "입력하신 정보로 신청이 성공적으로 완료되었습니다."
          : "이미지 생성이 완료되면 카카오톡으로 전송해 드릴게요!"}
      </AlertDescription>
    </Alert>
  )
}
