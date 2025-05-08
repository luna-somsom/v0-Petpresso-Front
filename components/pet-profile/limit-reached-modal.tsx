"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface LimitReachedModalProps {
  open: boolean
  onClose: () => void
}

export function LimitReachedModal({ open, onClose }: LimitReachedModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-4 sm:p-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
            <AlertTriangle className="h-6 w-6 text-amber-500" />
          </div>

          <DialogTitle className="text-lg sm:text-xl font-bold text-gray-900 mb-2">무료 제작 횟수 소진</DialogTitle>

          <p className="text-sm text-gray-600 mb-6">
            무료제공 횟수를 모두 사용하셨습니다.
            <br />
            추가 제작이 필요하시면 카카오톡 채널로 문의를 남겨주세요.
          </p>

          <div className="flex gap-3 w-full">
            <Button variant="outline" className="flex-1 border-gray-300 text-gray-700" onClick={onClose}>
              닫기
            </Button>
            <Button
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white"
              onClick={() => {
                // 여기에 카카오톡 채널로 연결하는 로직 추가
                window.open("https://pf.kakao.com/_xhpewn", "_blank")
                onClose()
              }}
            >
              카카오톡 문의하기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
