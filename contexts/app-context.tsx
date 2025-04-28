"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User, Pet, ProfileResult, ModalType } from "@/types"
import { getFromLocalStorage, saveToLocalStorage } from "@/utils/helpers"

// 컨텍스트 타입 정의
interface AppContextType {
  // 인증 관련
  isLoggedIn: boolean
  login: () => void
  logout: () => void

  // 사용자 관련
  user: User | null
  updateUser: (user: User) => void

  // 모달 관련
  activeModal: ModalType
  openModal: (type: ModalType) => void
  closeModal: () => void

  // 반려동물 관련
  pets: Pet[]
  addPet: (pet: Pet) => void
  updatePet: (pet: Pet) => void
  deletePet: (petId: number) => void

  // 프로필 결과 관련
  profileResults: ProfileResult[]
  addProfileResult: (result: ProfileResult) => void
  deleteProfileResult: (resultId: number) => void
}

// 기본값 생성
const defaultContext: AppContextType = {
  isLoggedIn: false,
  login: () => {},
  logout: () => {},

  user: null,
  updateUser: () => {},

  activeModal: null,
  openModal: () => {},
  closeModal: () => {},

  pets: [],
  addPet: () => {},
  updatePet: () => {},
  deletePet: () => {},

  profileResults: [],
  addProfileResult: () => {},
  deleteProfileResult: () => {},
}

// 컨텍스트 생성
const AppContext = createContext<AppContextType>(defaultContext)

// 컨텍스트 제공자 컴포넌트
export function AppProvider({ children }: { children: ReactNode }) {
  // 인증 상태
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  // 사용자 정보
  const [user, setUser] = useState<User | null>(null)

  // 활성 모달
  const [activeModal, setActiveModal] = useState<ModalType>(null)

  // 반려동물 목록
  const [pets, setPets] = useState<Pet[]>([])

  // 프로필 결과 목록
  const [profileResults, setProfileResults] = useState<ProfileResult[]>([])

  // 초기화
  useEffect(() => {
    // 로컬 스토리지에서 로그인 상태 불러오기
    const savedIsLoggedIn = getFromLocalStorage<boolean>("isLoggedIn", false)
    setIsLoggedIn(savedIsLoggedIn)

    // 로그인 상태인 경우 사용자 정보 불러오기
    if (savedIsLoggedIn) {
      const savedUser = getFromLocalStorage<User | null>("user", null)
      setUser(savedUser)

      // 반려동물 목록 불러오기
      const savedPets = getFromLocalStorage<Pet[]>("pets", [])
      setPets(savedPets)

      // 프로필 결과 불러오기
      const savedProfileResults = getFromLocalStorage<ProfileResult[]>("profileResults", [])
      setProfileResults(savedProfileResults)
    }
  }, [])

  // 로그인 처리
  const login = () => {
    setIsLoggedIn(true)
    saveToLocalStorage("isLoggedIn", true)

    // 더미 사용자 데이터 (실제로는 API 응답으로 대체)
    const dummyUser: User = {
      id: "1",
      name: "Luna Kim",
      email: "luna@example.com",
      profileImage: null,
      joinDate: "2025년 4월",
    }

    setUser(dummyUser)
    saveToLocalStorage("user", dummyUser)
  }

  // 로그아웃 처리
  const logout = () => {
    setIsLoggedIn(false)
    setUser(null)
    setPets([])
    setProfileResults([])

    saveToLocalStorage("isLoggedIn", false)
    localStorage.removeItem("user")
    localStorage.removeItem("pets")
    localStorage.removeItem("profileResults")
  }

  // 사용자 정보 업데이트
  const updateUser = (updatedUser: User) => {
    setUser(updatedUser)
    saveToLocalStorage("user", updatedUser)
  }

  // 모달 열기
  const openModal = (type: ModalType) => {
    setActiveModal(type)
  }

  // 모달 닫기
  const closeModal = () => {
    setActiveModal(null)
  }

  // 반려동물 추가
  const addPet = (pet: Pet) => {
    const updatedPets = [...pets, pet]
    setPets(updatedPets)
    saveToLocalStorage("pets", updatedPets)
  }

  // 반려동물 업데이트
  const updatePet = (updatedPet: Pet) => {
    const updatedPets = pets.map((pet) => (pet.id === updatedPet.id ? updatedPet : pet))
    setPets(updatedPets)
    saveToLocalStorage("pets", updatedPets)
  }

  // 반려동물 삭제
  const deletePet = (petId: number) => {
    const updatedPets = pets.filter((pet) => pet.id !== petId)
    setPets(updatedPets)
    saveToLocalStorage("pets", updatedPets)
  }

  // 프로필 결과 추가
  const addProfileResult = (result: ProfileResult) => {
    const updatedResults = [...profileResults, result]
    setProfileResults(updatedResults)
    saveToLocalStorage("profileResults", updatedResults)
  }

  // 프로필 결과 삭제
  const deleteProfileResult = (resultId: number) => {
    const updatedResults = profileResults.filter((result) => result.id !== resultId)
    setProfileResults(updatedResults)
    saveToLocalStorage("profileResults", updatedResults)
  }

  // 컨텍스트 값
  const value: AppContextType = {
    isLoggedIn,
    login,
    logout,

    user,
    updateUser,

    activeModal,
    openModal,
    closeModal,

    pets,
    addPet,
    updatePet,
    deletePet,

    profileResults,
    addProfileResult,
    deleteProfileResult,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// 커스텀 훅
export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
