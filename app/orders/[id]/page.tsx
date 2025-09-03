import { OrderDetail } from "@/components/order-detail"

interface OrderPageProps {
  params: {
    id: string
  }
}

export default function OrderPage({ params }: OrderPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <main>
        <OrderDetail orderId={params.id} />
      </main>
    </div>
  )
}
