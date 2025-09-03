import { Suspense, lazy } from "react"
import { ProductCardSkeleton } from "@/components/loading-skeleton"

const ProductFilter = lazy(() =>
  import("@/components/product-filter").then((module) => ({ default: module.ProductFilter })),
)
const ProductList = lazy(() => import("@/components/product-list").then((module) => ({ default: module.ProductList })))

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Suspense
          fallback={
            <div className="p-4">
              <div className="flex gap-2 mb-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="h-8 bg-muted animate-pulse rounded w-16" />
                ))}
              </div>
            </div>
          }
        >
          <ProductFilter />
        </Suspense>

        <Suspense
          fallback={
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                {[...Array(6)].map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            </div>
          }
        >
          <ProductList />
        </Suspense>
      </main>
    </div>
  )
}
