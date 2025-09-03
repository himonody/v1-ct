"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

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

const translations = {
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

const languages = [
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

interface LanguageState {
  currentLanguage: string
  translations: Record<string, any>
  languages: typeof languages
  changeLanguage: (language: string) => void
  t: (key: string) => string
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set, get) => ({
      currentLanguage: "en",
      translations,
      languages,
      changeLanguage: (language: string) => {
        set({ currentLanguage: language })
      },
      t: (key: string) => {
        const { currentLanguage, translations } = get()
        const keys = key.split(".")
        let value = translations[currentLanguage]

        for (const k of keys) {
          if (value && typeof value === "object" && k in value) {
            value = value[k]
          } else {
            // Fallback to English if key not found
            value = translations["en"]
            for (const k of keys) {
              if (value && typeof value === "object" && k in value) {
                value = value[k]
              } else {
                return key // Return key if not found in any language
              }
            }
            break
          }
        }

        return typeof value === "string" ? value : key
      },
    }),
    {
      name: "language-storage",
    },
  ),
)
