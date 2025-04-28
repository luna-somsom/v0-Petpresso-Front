"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

interface DeleteAccountModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DeleteAccountModal({ isOpen, onClose, onConfirm }: DeleteAccountModalProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleConfirm = () => {
    setIsDeleting(true)

    // 실제 구현에서는 API 호출이 필요합니다
    setTimeout(() => {
      onConfirm()
      setIsDeleting(false)
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </div>

          <DialogTitle className="text-xl font-bold text-gray-900 mb-2">회원 탈퇴</DialogTitle>

          <DialogDescription className="text-sm text-gray-500 mb-6">
            정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없으며, 모든 데이터가 영구적으로 삭제됩니다.
          </DialogDescription>

          <div className="flex gap-3 w-full">
            <Button
              variant="outline"
              className="flex-1 border-gray-300 text-gray-700"
              onClick={onClose}
              disabled={isDeleting}
            >
              취소
            </Button>
            <Button
              className="flex-1 bg-red-500 hover:bg-red-600 text-white"
              onClick={handleConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? "처리 중..." : "탈퇴하기"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
