import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/lib/i18n"
import { Suspense } from "react"
import Header from "@/components/header"
import { BottomNav } from "@/components/bottom-nav"
import MainFooter from "@/components/main-footer"
import { Toaster } from "@/components/ui/toaster"
import "./globals.css"

export const metadata: Metadata = {
  title: "Etsy - Handcrafted & Creative Marketplace",
  description: "Discover unique, handcrafted items from creative entrepreneurs around the world",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <LanguageProvider>
            <Header />

            <main className="pb-20 min-h-screen">{children}</main>

            <MainFooter />

            <BottomNav />

            <Toaster />
          </LanguageProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
