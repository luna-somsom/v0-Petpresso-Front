"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/utils/i18n/language-context"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center space-x-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage("ko")}
        className={`px-2 py-1 h-auto text-sm ${
          language === "ko"
            ? "bg-purple-100 text-purple-700 font-medium"
            : "text-gray-600 hover:text-purple-700 hover:bg-purple-50"
        }`}
      >
        한국어
      </Button>
      <span className="text-gray-300">/</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage("ja")}
        className={`px-2 py-1 h-auto text-sm ${
          language === "ja"
            ? "bg-purple-100 text-purple-700 font-medium"
            : "text-gray-600 hover:text-purple-700 hover:bg-purple-50"
        }`}
      >
        日本語
      </Button>
    </div>
  )
}
