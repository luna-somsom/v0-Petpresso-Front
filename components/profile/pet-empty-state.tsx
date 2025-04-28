import { PawPrintIcon as Paw } from "lucide-react"

export function PetEmptyState() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center p-6">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <Paw className="h-8 w-8 text-purple-400" />
        </div>
        <h3 className="text-lg font-medium text-purple-800 mb-2">반려동물을 선택해주세요</h3>
        <p className="text-sm text-gray-500">
          왼쪽에서 반려동물을 선택하면
          <br />
          상세 정보를 확인할 수 있습니다.
        </p>
      </div>
    </div>
  )
}
