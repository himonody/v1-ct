"use client"

import { ArrowLeft, Package, Truck, MapPin, Phone, Copy, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface OrderDetailProps {
  orderId: string
}

const mockOrderDetail = {
  id: "202312150001",
  status: "shipping",
  statusText: "待收货",
  statusColor: "bg-green-100 text-green-600",
  createTime: "2023-12-15 14:30",
  payTime: "2023-12-15 14:35",
  shipTime: "2023-12-16 09:20",
  totalAmount: 9999,
  shippingFee: 0,
  discount: 1000,
  actualAmount: 8999,
  paymentMethod: "微信支付",

  // 收货地址
  address: {
    name: "张三",
    phone: "138****8888",
    address: "北京市朝阳区三里屯街道工体北路8号院1号楼101室",
  },

  // 物流信息
  logistics: {
    company: "顺丰速运",
    trackingNumber: "SF1234567890",
    status: "运输中",
    updates: [
      { time: "2023-12-16 15:30", status: "快件已到达北京转运中心" },
      { time: "2023-12-16 12:20", status: "快件已从上海转运中心发出" },
      { time: "2023-12-16 09:20", status: "快件已从商家仓库发出" },
      { time: "2023-12-15 14:35", status: "订单支付成功，准备发货" },
    ],
  },

  // 商品列表
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
}

export function OrderDetail({ orderId }: OrderDetailProps) {
  const order = mockOrderDetail

  const copyTrackingNumber = () => {
    navigator.clipboard.writeText(order.logistics.trackingNumber)
    // 这里可以添加复制成功的提示
  }

  return (
    <div className="bg-background">
      {/* 头部 */}
      <div className="flex items-center gap-3 p-4 glass-morphism border-b border-border/50 shadow-elegant sticky top-0 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => window.history.back()}
          className="transition-smooth hover-lift"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-lg font-bold">订单详情</h1>
      </div>

      <div className="p-4 space-y-4 pb-24">
        {/* 订单状态 */}
        <Card className="border-0 bg-card/50 shadow-elegant">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <span className="font-bold text-lg">订单状态</span>
              </div>
              <Badge className={`${order.statusColor} shadow-elegant font-medium px-3 py-1`}>{order.statusText}</Badge>
            </div>
            <div className="space-y-2 bg-muted/20 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">
                订单号: <span className="font-medium text-foreground">{order.id}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                下单时间: <span className="font-medium text-foreground">{order.createTime}</span>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 物流信息 */}
        <Card className="border-0 bg-card/50 shadow-elegant">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                <Package className="w-4 h-4 text-accent" />
              </div>
              物流信息
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-center justify-between mb-4 p-3 bg-muted/20 rounded-lg">
              <span className="text-sm font-semibold">{order.logistics.company}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground font-mono bg-card/50 px-2 py-1 rounded">
                  {order.logistics.trackingNumber}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 transition-smooth hover-lift hover:bg-primary/10"
                  onClick={copyTrackingNumber}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {order.logistics.updates.map((update, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-3 h-3 rounded-full transition-all ${index === 0 ? "bg-primary shadow-elegant" : "bg-muted"}`}
                    />
                    {index < order.logistics.updates.length - 1 && <div className="w-px h-8 bg-border mt-2" />}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className={`text-sm font-medium ${index === 0 ? "text-primary" : "text-foreground"}`}>
                      {update.status}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{update.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 收货地址 */}
        <Card className="border-0 bg-card/50 shadow-elegant">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-secondary" />
              </div>
              收货地址
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex items-start gap-3 p-3 bg-muted/20 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold">{order.address.name}</span>
                  <span className="text-sm text-muted-foreground bg-card/50 px-2 py-1 rounded-full">
                    {order.address.phone}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{order.address.address}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 transition-smooth hover-lift hover:bg-primary/10"
              >
                <Phone className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 商品信息 */}
        <Card className="border-0 bg-card/50 shadow-elegant">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">商品信息</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-3 p-3 bg-muted/20 rounded-lg">
                <div className="relative overflow-hidden rounded-lg">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-16 h-16 object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-foreground line-clamp-2 mb-1">{item.name}</h4>
                  <p className="text-xs text-muted-foreground mb-2 bg-card/50 px-2 py-1 rounded-full inline-block">
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
            ))}
          </CardContent>
        </Card>

        {/* 费用明细 */}
        <Card className="border-0 bg-card/50 shadow-elegant">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">费用明细</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3 p-3 bg-muted/20 rounded-lg">
              <div className="flex justify-between text-sm">
                <span>商品金额</span>
                <span className="font-medium">¥{order.totalAmount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>运费</span>
                <span className="font-medium">¥{order.shippingFee}</span>
              </div>
              <div className="flex justify-between text-sm text-green-600">
                <span>优惠金额</span>
                <span className="font-medium">-¥{order.discount}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>实付金额</span>
                <span className="text-primary">¥{order.actualAmount}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 支付信息 */}
        <Card className="border-0 bg-card/50 shadow-elegant">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4 text-green-600" />
              </div>
              支付信息
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3 p-3 bg-muted/20 rounded-lg">
              <div className="flex justify-between text-sm">
                <span>支付方式</span>
                <span className="font-medium">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>支付时间</span>
                <span className="font-medium">{order.payTime}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-0 right-0 glass-morphism border-t border-border/50 p-4 shadow-elegant-lg">
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 bg-card/50 border-border/50 hover:bg-card hover:shadow-elegant transition-smooth"
          >
            联系客服
          </Button>
          <Button className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-elegant transition-smooth">
            确认收货
          </Button>
        </div>
      </div>
    </div>
  )
}
