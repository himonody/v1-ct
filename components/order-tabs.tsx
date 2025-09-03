"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrderList } from "@/components/order-list"
import { useTranslation } from "@/lib/i18n"

const orderTabs = [
  { id: "all", labelKey: "orders.all", count: 12 },
  { id: "pending", labelKey: "orders.pending_payment", count: 2 },
  { id: "processing", labelKey: "orders.pending_shipment", count: 1 },
  { id: "shipping", labelKey: "orders.shipped", count: 3 },
  { id: "completed", labelKey: "orders.completed", count: 6 },
]

export function OrderTabs() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("all")

  return (
    <div className="p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gradient bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text">
          {t("orders.my_orders")}
        </h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6 glass-morphism border border-border/50 shadow-elegant">
          {orderTabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="text-xs relative transition-smooth hover-lift data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-elegant"
            >
              {t(tab.labelKey)}
              {tab.count > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-accent to-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-elegant animate-pulse">
                  {tab.count}
                </span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {orderTabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="animate-in fade-in-50 duration-300">
            <OrderList status={tab.id} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
