"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Clock, AlertCircle } from "lucide-react"

interface PreparationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PreparationModal({ open, onOpenChange }: PreparationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-6 bg-gradient-to-b from-purple-50 via-sky-50 to-white">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-4">
            <Clock className="h-8 w-8 text-amber-500" />
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-2">현재 준비중입니다</h3>

          <div className="mb-6 text-gray-600">
            <p className="mb-2">서비스 오픈을 위해 열심히 준비하고 있어요!</p>
            <p className="text-sm text-gray-500">빠른 시일 내에 만나뵙겠습니다.</p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-6 w-full">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-amber-700">
                서비스 오픈 소식을 가장 먼저 받아보시려면 카카오톡 채널을 추가해주세요!
              </p>
            </div>
          </div>

          <Button
            className="w-full bg-gradient-to-r from-purple-500 to-sky-500 hover:from-purple-600 hover:to-sky-600 text-white"
            onClick={() => onOpenChange(false)}
          >
            확인
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
