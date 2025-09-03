"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Import all translation files
import enTranslations from "@/locales/en.json"
import zhCNTranslations from "@/locales/zh-CN.json"
import esTranslations from "@/locales/es.json"
import frTranslations from "@/locales/fr.json"
import arTranslations from "@/locales/ar.json"
import idTranslations from "@/locales/id.json"
import trTranslations from "@/locales/tr.json"
import ruTranslations from "@/locales/ru.json"
import jaTranslations from "@/locales/ja.json"

type Translations = typeof enTranslations

const translations: Record<string, Translations> = {
  en: enTranslations,
  "zh-CN": zhCNTranslations,
  es: esTranslations,
  fr: frTranslations,
  ar: arTranslations,
  id: idTranslations,
  tr: trTranslations,
  ru: ruTranslations,
  ja: jaTranslations,
}

export const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zh-CN", name: "简体中文", flag: "🇨🇳" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
]

interface LanguageContextType {
  locale: string
  t: (key: string) => string
  changeLanguage: (locale: string) => void
  languages: typeof languages
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState("en")

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale")
    if (savedLocale && translations[savedLocale]) {
      setLocale(savedLocale)
    }
  }, [])

  const changeLanguage = (newLocale: string) => {
    if (translations[newLocale]) {
      setLocale(newLocale)
      localStorage.setItem("locale", newLocale)
    }
  }

  const t = (key: string): string => {
    const keys = key.split(".")
    let value: any = translations[locale]

    for (const k of keys) {
      value = value?.[k]
    }

    return value || key
  }

  return (
    <LanguageContext.Provider value={{ locale, t, changeLanguage, languages }}>{children}</LanguageContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a LanguageProvider")
  }
  return context
}
