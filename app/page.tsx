import { Suspense, lazy } from "react"
import { HeroCarouselSkeleton } from "@/components/loading-skeleton"

const HeroSection = lazy(() => import("@/components/hero-section").then((module) => ({ default: module.HeroSection })))
const CompanyStats = lazy(() =>
  import("@/components/company-stats").then((module) => ({ default: module.CompanyStats })),
)
const HowItWorks = lazy(() => import("@/components/how-it-works").then((module) => ({ default: module.HowItWorks })))
const FeatureCards = lazy(() =>
  import("@/components/feature-cards").then((module) => ({ default: module.FeatureCards })),
)
const UserReviews = lazy(() => import("@/components/user-reviews").then((module) => ({ default: module.UserReviews })))

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Suspense fallback={<HeroCarouselSkeleton />}>
          <HeroSection />
        </Suspense>

        <Suspense fallback={<div className="h-64 bg-muted animate-pulse" />}>
          <CompanyStats />
        </Suspense>

        <Suspense fallback={<div className="h-64 bg-muted animate-pulse" />}>
          <HowItWorks />
        </Suspense>

        <Suspense fallback={<div className="h-64 bg-muted animate-pulse" />}>
          <FeatureCards />
        </Suspense>

        <Suspense fallback={<div className="h-64 bg-muted animate-pulse" />}>
          <UserReviews />
        </Suspense>
      </main>
    </div>
  )
}
