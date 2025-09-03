"use client"

import { useState, useEffect } from "react"
import { Clock, Flame, Users, ShoppingBag, Zap, Gift, Star, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const flashSaleProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    price: 7999,
    originalPrice: 10999,
    image: "/iphone-15-pro.png",
    stock: 50,
    sold: 35,
    discount: 27,
    isHot: true,
  },
  {
    id: 2,
    name: "AirPods Pro 2代 无线降噪耳机",
    price: 1299,
    originalPrice: 1999,
    image: "/airpods-pro.png",
    stock: 100,
    sold: 78,
    discount: 35,
    isHot: false,
  },
  {
    id: 3,
    name: "Apple Watch Series 9 智能手表",
    price: 2199,
    originalPrice: 2999,
    image: "/apple-watch.png",
    stock: 80,
    sold: 62,
    discount: 27,
    isHot: true,
  },
  {
    id: 4,
    name: "MacBook Air M2 13英寸笔记本",
    price: 6999,
    originalPrice: 8999,
    image: "/macbook-air.png",
    stock: 30,
    sold: 18,
    discount: 22,
    isHot: false,
  },
]

export default function FlashSalePage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 30,
    seconds: 45,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="bg-background min-h-screen pb-20">
      <div className="bg-gradient-to-br from-primary via-accent to-secondary text-primary-foreground p-6 relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Flame className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">限时抢购</h1>
                <p className="text-sm opacity-90">超值好物，限量秒杀</p>
              </div>
            </div>
            <Badge className="bg-white/20 text-white border-white/30 shadow-elegant backdrop-blur-sm">
              <Zap className="w-3 h-3 mr-1" />
              每日10:00开抢
            </Badge>
          </div>

          {/* 倒计时 */}
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-5 h-5" />
            <span className="text-sm font-medium">距离结束还有</span>
            <div className="flex gap-2">
              <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg text-lg font-bold shadow-elegant">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
              <span className="text-lg font-bold">:</span>
              <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg text-lg font-bold shadow-elegant">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <span className="text-lg font-bold">:</span>
              <div className="bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg text-lg font-bold shadow-elegant animate-pulse">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
            </div>
          </div>

          {/* 活动规则 */}
          <div className="glass-morphism rounded-xl p-4 border border-white/20">
            <h3 className="text-sm font-bold mb-3 flex items-center gap-2">
              <Gift className="w-4 h-4" />
              活动规则
            </h3>
            <ul className="text-xs space-y-2 text-white/90">
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-white/60 rounded-full" />
                每人限购1件，数量有限，先到先得
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-white/60 rounded-full" />
                活动商品不与其他优惠叠加使用
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 bg-white/60 rounded-full" />
                支付成功后不支持退换货
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-card/80 to-card/40 rounded-xl shadow-elegant">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">
                {flashSaleProducts.reduce((sum, p) => sum + p.sold, 0)}
              </div>
              <div className="text-xs text-muted-foreground">人已参与抢购</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">
                {flashSaleProducts.filter((p) => p.sold / p.stock > 0.8).length}
              </div>
              <div className="text-xs text-muted-foreground">件即将售罄</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {flashSaleProducts.map((product) => {
            const stockPercentage = (product.sold / product.stock) * 100
            const isLowStock = stockPercentage > 80
            const isSoldOut = product.sold >= product.stock

            return (
              <Card
                key={product.id}
                className="overflow-hidden border-0 bg-card/50 shadow-elegant transition-all duration-300 hover-lift hover:shadow-elegant-lg"
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative">
                      <div className="relative overflow-hidden rounded-xl">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-24 h-24 object-cover transition-transform duration-300 hover:scale-105"
                        />
                        {isSoldOut && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">已抢完</span>
                          </div>
                        )}
                      </div>
                      <Badge
                        variant="destructive"
                        className="absolute -top-2 -right-2 text-xs px-2 py-1 shadow-elegant animate-pulse"
                      >
                        -{product.discount}%
                      </Badge>
                      {product.isHot && (
                        <Badge className="absolute -top-2 -left-2 bg-gradient-to-r from-accent to-secondary text-primary-foreground text-xs px-2 py-1 shadow-elegant">
                          <Star className="w-3 h-3 mr-1" />
                          热卖
                        </Badge>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-foreground line-clamp-2 mb-3">{product.name}</h3>

                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xl font-bold text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text">
                          ¥{product.price}
                        </span>
                        <span className="text-sm text-muted-foreground line-through bg-muted/30 px-2 py-1 rounded-full">
                          ¥{product.originalPrice}
                        </span>
                      </div>

                      {/* 库存进度条 */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span className="text-muted-foreground font-medium">
                            已抢 {product.sold}/{product.stock}
                          </span>
                          {isLowStock && !isSoldOut && (
                            <span className="text-destructive font-bold bg-destructive/10 px-2 py-1 rounded-full animate-pulse">
                              仅剩 {product.stock - product.sold} 件
                            </span>
                          )}
                        </div>
                        <Progress
                          value={stockPercentage}
                          className="h-3 bg-muted/30"
                          style={{
                            background: isLowStock
                              ? "linear-gradient(to right, #ef4444, #f97316)"
                              : "linear-gradient(to right, #22c55e, #3b82f6)",
                          }}
                        />
                      </div>

                      <Button
                        size="sm"
                        className={`w-full transition-smooth hover-lift ${
                          isSoldOut
                            ? "bg-muted text-muted-foreground cursor-not-allowed"
                            : "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-elegant"
                        }`}
                        disabled={isSoldOut}
                      >
                        {isSoldOut ? (
                          "已抢完"
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4 mr-2" />
                            立即抢购
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card className="mt-8 border-0 bg-card/50 shadow-elegant">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              明日预告
              <Badge className="bg-gradient-to-r from-accent to-secondary text-primary-foreground shadow-elegant">
                10:00开抢
              </Badge>
            </h3>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="text-center">
                  <div className="w-full h-20 bg-gradient-to-br from-muted/30 to-muted/10 rounded-xl mb-2 flex items-center justify-center transition-smooth hover:bg-muted/40 hover-lift">
                    <div className="text-center">
                      <Gift className="w-6 h-6 mx-auto mb-1 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground font-medium">敬请期待</span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">神秘商品 {i}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
