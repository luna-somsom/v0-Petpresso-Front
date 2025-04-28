"use client"

import type { Pet } from "@/types/pet-profile"
import { ChevronRight } from "lucide-react"

interface PetListItemProps {
  pet: Pet
  isSelected: boolean
  onClick: () => void
}

export function PetListItem({ pet, isSelected, onClick }: PetListItemProps) {
  return (
    <div
      className={`flex items-center p-3 rounded-lg cursor-pointer transition-all
        ${
          isSelected
            ? "bg-gradient-to-r from-purple-100 to-sky-100 border-l-4 border-purple-500"
            : "bg-gray-50 hover:bg-gray-100"
        }`}
      onClick={onClick}
    >
      <div className="w-12 h-12 rounded-md overflow-hidden mr-3 flex-shrink-0">
        <img src={pet.profileImage || "/placeholder.svg"} alt={pet.name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-base text-purple-800">{pet.name}</h3>
        <p className="text-xs text-gray-600 truncate">
          {pet.breed} • {pet.age}살
        </p>
      </div>
      <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
    </div>
  )
}
