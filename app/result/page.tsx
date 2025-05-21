"use client"

import { ResultPage } from "@/components/result-page"
import { LanguageProvider } from "@/utils/i18n/language-context"
import { AppProvider } from "@/contexts/app-context"
import { Toaster } from "@/components/ui/toaster"

export default function ResultPageRoute() {
  return (
    <LanguageProvider>
      <AppProvider>
        <ResultPage />
        <Toaster />
      </AppProvider>
    </LanguageProvider>
  )
}
