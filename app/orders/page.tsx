import { Suspense, lazy } from "react"
import { OrderListSkeleton } from "@/components/loading-skeleton"

const OrderTabs = lazy(() => import("@/components/order-tabs").then((module) => ({ default: module.OrderTabs })))

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <Suspense fallback={<OrderListSkeleton />}>
          <OrderTabs />
        </Suspense>
      </main>
    </div>
  )
}
