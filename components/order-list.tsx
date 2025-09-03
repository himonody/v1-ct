"use client"

import { Package, Truck, Clock, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface OrderListProps {
  status: string
}

const mockOrders = [
  {
    id: "202312150001",
    status: "pending",
    statusText: "待付款",
    statusColor: "bg-orange-100 text-orange-600",
    createTime: "2023-12-15 14:30",
    totalAmount: 9999,
    items: [
      {
        id: 1,
        name: "iPhone 15 Pro Max 256GB",
        image: "/iphone-15-pro.png",
        price: 9999,
        quantity: 1,
        specs: "深空黑色 256GB",
      },
    ],
    actions: ["取消订单", "立即付款"],
  },
  {
    id: "202312140002",
    status: "processing",
    statusText: "待发货",
    statusColor: "bg-blue-100 text-blue-600",
    createTime: "2023-12-14 16:20",
    totalAmount: 1299,
    items: [
      {
        id: 2,
        name: "Apple Watch Series 9",
        image: "/apple-watch.png",
        price: 1299,
        quantity: 1,
        specs: "午夜色 41mm",
      },
    ],
    actions: ["查看物流", "联系客服"],
  },
  {
    id: "202312130003",
    status: "shipping",
    statusText: "待收货",
    statusColor: "bg-green-100 text-green-600",
    createTime: "2023-12-13 10:15",
    totalAmount: 598,
    items: [
      {
        id: 3,
        name: "春季连衣裙",
        image: "/spring-dress.png",
        price: 299,
        quantity: 2,
        specs: "蓝色 M码",
      },
    ],
    actions: ["查看物流", "确认收货"],
  },
  {
    id: "202312120004",
    status: "completed",
    statusText: "已完成",
    statusColor: "bg-gray-100 text-gray-600",
    createTime: "2023-12-12 09:45",
    totalAmount: 1999,
    items: [
      {
        id: 4,
        name: "AirPods Pro 2代",
        image: "/airpods-pro.png",
        price: 1999,
        quantity: 1,
        specs: "白色",
      },
    ],
    actions: ["再次购买", "评价商品"],
  },
]

const statusIcons = {
  pending: Clock,
  processing: Package,
  shipping: Truck,
  completed: CheckCircle,
  cancelled: XCircle,
}

export function OrderList({ status }: OrderListProps) {
  const filteredOrders = status === "all" ? mockOrders : mockOrders.filter((order) => order.status === status)

  if (filteredOrders.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-muted-foreground mb-4">
          <div className="w-20 h-20 mx-auto mb-6 bg-muted/30 rounded-full flex items-center justify-center">
            <Package className="w-10 h-10 opacity-50" />
          </div>
          <p className="text-lg font-medium mb-2">暂无订单</p>
          <p className="text-sm">快去选购心仪的商品吧</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {filteredOrders.map((order) => {
        const StatusIcon = statusIcons[order.status as keyof typeof statusIcons] || Package

        return (
          <Card
            key={order.id}
            className="overflow-hidden transition-all duration-300 hover-lift hover:shadow-elegant-lg border-0 bg-card/50 backdrop-blur-sm"
          >
            <CardContent className="p-0">
              {/* 订单头部 */}
              <div className="flex items-center justify-between p-4 border-b border-border/50 bg-muted/20">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <StatusIcon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">订单号: {order.id}</span>
                </div>
                <Badge className={`${order.statusColor} shadow-elegant font-medium`}>{order.statusText}</Badge>
              </div>

              {/* 商品列表 */}
              <div className="p-4">
                {order.items.map((item) => (
                  <Link key={item.id} href={`/orders/${order.id}`}>
                    <div className="flex gap-3 mb-3 last:mb-0 p-2 rounded-lg transition-smooth hover:bg-muted/30">
                      <div className="relative overflow-hidden rounded-lg">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-foreground line-clamp-2 mb-1">{item.name}</h4>
                        <p className="text-xs text-muted-foreground mb-2 bg-muted/30 px-2 py-1 rounded-full inline-block">
                          {item.specs}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-primary">¥{item.price}</span>
                          <span className="text-xs text-muted-foreground bg-card/50 px-2 py-1 rounded-full">
                            x{item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* 订单底部 */}
              <div className="px-4 pb-4">
                <div className="flex items-center justify-between mb-4 p-3 bg-muted/20 rounded-lg">
                  <span className="text-xs text-muted-foreground">{order.createTime}</span>
                  <span className="text-sm font-semibold">
                    共{order.items.reduce((sum, item) => sum + item.quantity, 0)}件商品 合计:
                    <span className="text-primary ml-1 text-lg">¥{order.totalAmount}</span>
                  </span>
                </div>

                <div className="flex gap-2 justify-end">
                  {order.actions.map((action, index) => (
                    <Button
                      key={action}
                      variant={index === order.actions.length - 1 ? "default" : "outline"}
                      size="sm"
                      className={`text-xs transition-smooth hover-lift ${
                        index === order.actions.length - 1
                          ? "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-elegant"
                          : "bg-card/50 border-border/50 hover:bg-card hover:shadow-elegant"
                      }`}
                    >
                      {action}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
