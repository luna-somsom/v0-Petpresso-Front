"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import type { Step } from "./pet-profile/types"
import { GalleryScreen } from "./pet-profile/gallery-screen"
import { StyleSelectionScreen } from "./pet-profile/style-selection-screen"
import { LoadingScreen } from "./pet-profile/loading-screen"
import { UploadingScreen } from "./pet-profile/uploading-screen"
import { PhotoGuidelinesScreen } from "./pet-profile/photo-guidelines-screen"

interface PetProfileCreatorProps {
  children: React.ReactNode
  onComplete?: () => void
  onGoToMyPage?: () => void
  initialSelectedPhotos?: number[]
  skipGalleryStep?: boolean
}

export function PetProfileCreator({
  children,
  onComplete,
  onGoToMyPage,
  initialSelectedPhotos = [],
  skipGalleryStep = false,
}: PetProfileCreatorProps) {
  // If skipGalleryStep is true and we have photos, start at style selection
  const initialStep: Step = skipGalleryStep ? "styleSelection" : "guidelines"

  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<Step>(initialStep)
  const [selectedPhotos, setSelectedPhotos] = useState<number[]>(initialSelectedPhotos)
  const [selectedStyle, setSelectedStyle] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [usageLimitReached, setUsageLimitReached] = useState(false)

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
      setStep(initialStep)
      if (!skipGalleryStep) {
        setSelectedPhotos([])
      }
      setSelectedStyle(null)
    }, 300)

    // Call the onComplete callback if provided
    if (onComplete) {
      onComplete()
    }
  }

  const handleBack = () => {
    if (step === "gallery") {
      setStep("guidelines")
    } else if (step === "styleSelection") {
      setStep(skipGalleryStep ? "guidelines" : "gallery")
    }
  }

  const handlePhotosSelected = (photos: number[]) => {
    setSelectedPhotos(photos)
    setStep("styleSelection")
  }

  const handleStyleSelected = (styleId: number) => {
    setSelectedStyle(styleId)
    // First go to uploading screen
    setStep("uploading")
  }

  const handleUploadingComplete = () => {
    // After uploading is complete, move to loading screen
    setStep("loading")
  }

  // 무료 횟수 소진 상태 변경 처리
  const handleUsageLimitChange = (isLimitReached: boolean) => {
    setUsageLimitReached(isLimitReached)
  }

  const renderContent = () => {
    switch (step) {
      case "guidelines":
        return (
          <PhotoGuidelinesScreen
            onClose={handleClose}
            onContinue={() => setStep(skipGalleryStep ? "styleSelection" : "gallery")}
          />
        )
      case "gallery":
        return (
          <GalleryScreen
            onClose={handleClose}
            onBack={handleBack}
            onComplete={handlePhotosSelected}
            initialSelectedPhotos={selectedPhotos}
          />
        )
      case "styleSelection":
        return (
          <StyleSelectionScreen
            onClose={handleClose}
            onBack={handleBack}
            onComplete={handleStyleSelected}
            initialSelectedStyle={selectedStyle}
          />
        )
      case "uploading":
        return <UploadingScreen onClose={handleClose} onComplete={handleUploadingComplete} />
      case "loading":
        return <LoadingScreen onClose={handleClose} onGoToMyPage={onGoToMyPage} usageLimitReached={usageLimitReached} />
      default:
        return null
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={`
        p-0 overflow-hidden max-h-[90vh] border-gradient-to-r from-purple-200 to-sky-200 shadow-lg
        ${isMobile ? "w-[95vw] max-w-[95vw]" : "sm:max-w-2xl"}
      `}
      >
        {renderContent()}
      </DialogContent>
    </Dialog>
  )
}
