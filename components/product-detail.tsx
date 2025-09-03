"use client"

import { useState, memo, useCallback, useMemo } from "react"
import { Star, Heart, Share2, ArrowLeft, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

interface ProductDetailProps {
  productId: string
}

const productData = {
  id: 1,
  name: "iPhone 15 Pro Max 256GB",
  price: 9999,
  originalPrice: 10999,
  images: ["/iphone-detail-1.png", "/iphone-detail-2.png", "/iphone-detail-3.png", "/iphone-detail-4.png"],
  rating: 4.8,
  sales: 1234,
  reviews: 856,
  tags: ["官方正品", "顺丰包邮", "7天无理由退货"],
  colors: ["深空黑色", "银色", "金色", "深紫色"],
  storage: ["128GB", "256GB", "512GB", "1TB"],
  description: "iPhone 15 Pro Max 采用钛金属设计，搭载 A17 Pro 芯片，配备专业级摄像头系统，支持 5G 网络。",
  specifications: [
    { label: "屏幕尺寸", value: "6.7英寸" },
    { label: "处理器", value: "A17 Pro芯片" },
    { label: "存储容量", value: "256GB" },
    { label: "摄像头", value: "4800万像素主摄" },
    { label: "电池", value: "支持无线充电" },
  ],
}

export const ProductDetail = memo(function ProductDetail({ productId }: ProductDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState(productData.colors[0])
  const [selectedStorage, setSelectedStorage] = useState(productData.storage[1])
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  const handleImageChange = useCallback((index: number) => {
    setCurrentImageIndex(index)
  }, [])

  const handleColorChange = useCallback((color: string) => {
    setSelectedColor(color)
  }, [])

  const handleStorageChange = useCallback((storage: string) => {
    setSelectedStorage(storage)
  }, [])

  const handleQuantityDecrease = useCallback(() => {
    setQuantity((prev) => Math.max(1, prev - 1))
  }, [])

  const handleQuantityIncrease = useCallback(() => {
    setQuantity((prev) => prev + 1)
  }, [])

  const handleFavoriteToggle = useCallback(() => {
    setIsFavorite((prev) => !prev)
  }, [])

  const handleBack = useCallback(() => {
    window.history.back()
  }, [])

  const handleShare = useCallback(() => {
    console.log("[v0] Share product")
  }, [])

  const handleAddToCart = useCallback(() => {
    console.log("[v0] Add to cart:", { productId, selectedColor, selectedStorage, quantity })
  }, [productId, selectedColor, selectedStorage, quantity])

  const handleBuyNow = useCallback(() => {
    console.log("[v0] Buy now:", { productId, selectedColor, selectedStorage, quantity })
  }, [productId, selectedColor, selectedStorage, quantity])

  const colorOptions = useMemo(
    () =>
      productData.colors.map((color) => (
        <Button
          key={color}
          variant={selectedColor === color ? "default" : "outline"}
          size="sm"
          onClick={() => handleColorChange(color)}
          className={`text-xs transition-smooth hover-lift ${
            selectedColor === color
              ? "bg-primary text-primary-foreground shadow-elegant"
              : "bg-card/50 border-border/50 hover:bg-card hover:shadow-elegant"
          }`}
        >
          {color}
        </Button>
      )),
    [selectedColor, handleColorChange],
  )

  const storageOptions = useMemo(
    () =>
      productData.storage.map((storage) => (
        <Button
          key={storage}
          variant={selectedStorage === storage ? "default" : "outline"}
          size="sm"
          onClick={() => handleStorageChange(storage)}
          className={`text-xs transition-smooth hover-lift ${
            selectedStorage === storage
              ? "bg-primary text-primary-foreground shadow-elegant"
              : "bg-card/50 border-border/50 hover:bg-card hover:shadow-elegant"
          }`}
        >
          {storage}
        </Button>
      )),
    [selectedStorage, handleStorageChange],
  )

  return (
    <div className="bg-background">
      {/* 商品图片轮播 */}
      <div className="relative">
        <div className="relative h-80 overflow-hidden">
          <Image
            src={productData.images[currentImageIndex] || "/placeholder.svg?height=320&width=400"}
            alt={productData.name}
            fill
            className="object-cover transition-transform duration-500"
            priority
            sizes="100vw"
          />

          {/* 返回按钮 */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4 glass-morphism hover:bg-card/80 text-foreground transition-smooth hover-lift"
            onClick={handleBack}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          {/* 分享和收藏 */}
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="glass-morphism hover:bg-card/80 text-foreground transition-smooth hover-lift"
              onClick={handleShare}
            >
              <Share2 className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="glass-morphism hover:bg-card/80 text-foreground transition-smooth hover-lift"
              onClick={handleFavoriteToggle}
            >
              <Heart className={`w-5 h-5 transition-colors ${isFavorite ? "fill-destructive text-destructive" : ""}`} />
            </Button>
          </div>
        </div>

        {/* 图片指示器 */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {productData.images.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentImageIndex ? "bg-white w-6" : "bg-white/50 w-2 hover:bg-white/70"
              }`}
              onClick={() => handleImageChange(index)}
            />
          ))}
        </div>
      </div>

      {/* 商品信息 */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gradient bg-gradient-to-r from-primary to-accent bg-clip-text">
              ¥{productData.price}
            </span>
            <span className="text-lg text-muted-foreground line-through">¥{productData.originalPrice}</span>
          </div>
          <Badge variant="destructive" className="text-xs shadow-elegant">
            限时特价
          </Badge>
        </div>

        <h1 className="text-lg font-bold text-foreground mb-3">{productData.name}</h1>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{productData.rating}</span>
          </div>
          <span className="text-sm text-muted-foreground">已售 {productData.sales}</span>
          <span className="text-sm text-muted-foreground">{productData.reviews} 条评价</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {productData.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs bg-card/50 border-border/50 transition-smooth hover:bg-card"
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* 颜色选择 */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-3">颜色</h3>
          <div className="flex gap-2">{colorOptions}</div>
        </div>

        {/* 存储容量选择 */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-3">存储容量</h3>
          <div className="flex gap-2">{storageOptions}</div>
        </div>

        {/* 数量选择 */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-3">数量</h3>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleQuantityDecrease}
              disabled={quantity <= 1}
              className="bg-card/50 border-border/50 hover:bg-card hover:shadow-elegant transition-smooth w-10 h-10 p-0"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="text-lg font-bold w-12 text-center bg-card/30 py-2 rounded-lg">{quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleQuantityIncrease}
              className="bg-card/50 border-border/50 hover:bg-card hover:shadow-elegant transition-smooth w-10 h-10 p-0"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* 详情标签页 */}
      <div className="px-4">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card/50 border border-border/50 shadow-elegant">
            <TabsTrigger value="details" className="transition-smooth">
              商品详情
            </TabsTrigger>
            <TabsTrigger value="specs" className="transition-smooth">
              规格参数
            </TabsTrigger>
            <TabsTrigger value="reviews" className="transition-smooth">
              用户评价
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-4">
            <Card className="border-0 bg-card/50 shadow-elegant">
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground leading-relaxed">{productData.description}</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="specs" className="mt-4">
            <Card>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {productData.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-border last:border-0">
                      <span className="text-sm text-muted-foreground">{spec.label}</span>
                      <span className="text-sm font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-4">
            <Card>
              <CardContent className="p-4">
                <div className="text-center text-muted-foreground">
                  <p className="text-sm">暂无评价</p>
                  <p className="text-xs mt-1">成为第一个评价的用户</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* 底部购买栏 */}
      <div className="fixed bottom-0 left-0 right-0 glass-morphism border-t border-border/50 p-4 shadow-elegant-lg">
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 bg-card/50 border-border/50 hover:bg-card hover:shadow-elegant transition-smooth"
            onClick={handleAddToCart}
          >
            加入购物车
          </Button>
          <Button
            className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-elegant transition-smooth"
            onClick={handleBuyNow}
          >
            立即购买
          </Button>
        </div>
      </div>
    </div>
  )
})
