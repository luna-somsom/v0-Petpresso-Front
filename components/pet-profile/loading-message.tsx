/**
 * 로딩 메시지 컴포넌트
 */

interface LoadingMessageProps {
  className?: string
}

export function LoadingMessage({ className = "" }: LoadingMessageProps) {
  return (
    <div className={`text-center ${className}`}>
      <p className="text-xs text-purple-600 mb-1 sm:mb-2">고객님의 소중한 반려동물이 꽃단장 중입니다..</p>
      <p className="text-xs text-sky-600 mb-1 sm:mb-2">완료된 사진은 순차적으로 발송해드릴 예정입니다.</p>
      <p className="text-xs text-purple-500 font-medium mb-3">조금만 기다려주세요!</p>
    </div>
  )
}
