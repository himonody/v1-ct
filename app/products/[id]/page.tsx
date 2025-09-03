import { Suspense, lazy } from "react"
import { ProductDetailSkeleton } from "@/components/loading-skeleton"

const ProductDetail = lazy(() =>
  import("@/components/product-detail").then((module) => ({ default: module.ProductDetail })),
)

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Suspense fallback={<ProductDetailSkeleton />}>
          <ProductDetail productId={params.id} />
        </Suspense>
      </main>
    </div>
  )
}
