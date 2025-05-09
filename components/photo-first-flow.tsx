"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { GalleryScreen } from "./pet-profile/gallery-screen"
import { KakaoSignupModal } from "./kakao-signup-modal"
import { PhotoGuidelinesScreen } from "./pet-profile/photo-guidelines-screen"

interface PhotoFirstFlowProps {
  children: React.ReactNode
  onGoToMyPage?: () => void
  isLoggedIn: boolean
}

export function PhotoFirstFlow({ children, onGoToMyPage, isLoggedIn }: PhotoFirstFlowProps) {
  const [open, setOpen] = useState(false)
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>([])
  const [showSignup, setShowSignup] = useState(false)
  const [currentStep, setCurrentStep] = useState<"guidelines" | "gallery">("guidelines")
  const [isMobile, setIsMobile] = useState(false)

  // Check if the device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  const handleClose = () => {
    setOpen(false)
    // Reset state after modal is closed
    setTimeout(() => {
      setSelectedPhotos([])
      setShowSignup(false)
      setCurrentStep("guidelines")
    }, 300)
  }

  const handleContinueToGallery = () => {
    setCurrentStep("gallery")
  }

  const handlePhotosSelected = (photos: number[]) => {
    setSelectedPhotos(photos)

    // If user is already logged in, proceed directly
    if (isLoggedIn) {
      // Close this dialog and open the pet profile creator
      handleClose()
      // Here you would normally continue with the style selection
      // For now, we'll just go to my page as a placeholder
      if (onGoToMyPage) onGoToMyPage()
    } else {
      // Show signup dialog
      setShowSignup(true)
    }
  }

  const renderContent = () => {
    switch (currentStep) {
      case "guidelines":
        return <PhotoGuidelinesScreen onClose={handleClose} onContinue={handleContinueToGallery} />
      case "gallery":
        return (
          <GalleryScreen
            onClose={handleClose}
            onBack={() => setCurrentStep("guidelines")}
            onComplete={handlePhotosSelected}
            initialSelectedPhotos={selectedPhotos}
          />
        )
      default:
        return null
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent
          className={`
            p-0 overflow-hidden max-h-[90vh] 
            border-gradient-to-r from-purple-200 to-sky-200 shadow-lg
            ${isMobile ? "w-[95vw] max-w-[95vw]" : "sm:max-w-2xl"}
          `}
        >
          {renderContent()}
        </DialogContent>
      </Dialog>

      {/* Signup Modal that appears after photo selection */}
      {showSignup && (
        <KakaoSignupModal
          onGoToMyPage={onGoToMyPage}
          autoOpen={true}
          onClose={() => {
            setShowSignup(false)
            handleClose()
          }}
          selectedPhotos={selectedPhotos}
        />
      )}
    </>
  )
}
