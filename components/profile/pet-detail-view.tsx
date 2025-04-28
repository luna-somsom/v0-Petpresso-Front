import type { Pet } from "@/types/pet-profile"
import { Button } from "@/components/ui/button"
import { Calendar, PawPrintIcon as Paw } from "lucide-react"

interface PetDetailViewProps {
  pet: Pet
}

export function PetDetailView({ pet }: PetDetailViewProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-purple-800">{pet.name}의 프로필</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
        {/* 왼쪽: 프로필 이미지 */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-3">
            <div className="aspect-square w-full rounded-lg overflow-hidden mb-3">
              <img src={pet.profileImage || "/placeholder.svg"} alt={pet.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 mr-2 border-purple-200 text-purple-700 hover:bg-purple-50 text-xs py-1"
              >
                <Calendar className="h-3 w-3 mr-1" />
                저장
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-sky-200 text-sky-700 hover:bg-sky-50 text-xs py-1"
              >
                <Paw className="h-3 w-3 mr-1" />
                수정
              </Button>
            </div>
          </div>
        </div>

        {/* 오른쪽: 상세 정보 */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-3 h-full">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="space-y-1">
                <p className="text-xs text-gray-500">이름</p>
                <p className="text-sm font-medium text-purple-800">{pet.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500">종류</p>
                <p className="text-sm font-medium text-purple-800">{pet.type}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500">품종</p>
                <p className="text-sm font-medium text-purple-800">{pet.breed}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500">나이</p>
                <p className="text-sm font-medium text-purple-800">{pet.age}살</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500">성별</p>
                <p className="text-sm font-medium text-purple-800">{pet.gender}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-gray-500">스타일</p>
                <p className="text-sm font-medium text-purple-800">{pet.style}</p>
              </div>
            </div>

            <div className="mb-3">
              <p className="text-xs text-gray-500 mb-1">설명</p>
              <p className="text-xs text-purple-800 bg-gradient-to-r from-purple-50 to-sky-50 p-2 rounded-md">
                {pet.description}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">생성일</span>
                <span className="text-xs font-medium text-purple-700">{pet.createdAt}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
