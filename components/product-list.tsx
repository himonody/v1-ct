"use client"

import type React from "react"

import { Star, ShoppingCart, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { memo, useCallback } from "react"

const products = [
  {
    id: 1,
    name: "iPhone 15 Pro Max 256GB",
    price: 9999,
    originalPrice: 10999,
    image: "/iphone-15-pro.png",
    rating: 4.8,
    sales: 1234,
    tags: ["官方正品", "顺丰包邮"],
  },
  {
    id: 2,
    name: "春季时尚连衣裙 优雅气质款",
    price: 299,
    originalPrice: 399,
    image: "/spring-dress.png",
    rating: 4.6,
    sales: 856,
    tags: ["新品上市", "限时特价"],
  },
  {
    id: 3,
    name: "AirPods Pro 2代 无线降噪耳机",
    price: 1999,
    originalPrice: 2299,
    image: "/airpods-pro.png",
    rating: 4.7,
    sales: 2341,
    tags: ["Apple官方", "降噪神器"],
  },
  {
    id: 4,
    name: "Apple Watch Series 9 智能手表",
    price: 2999,
    originalPrice: 3299,
    image: "/apple-watch.png",
    rating: 4.5,
    sales: 567,
    tags: ["健康监测", "运动必备"],
  },
  {
    id: 5,
    name: "MacBook Air M2 13英寸笔记本",
    price: 8999,
    originalPrice: 9999,
    image: "/macbook-air.png",
    rating: 4.9,
    sales: 432,
    tags: ["学生优选", "轻薄便携"],
  },
  {
    id: 6,
    name: "Nike Air Max 270 运动鞋",
    price: 899,
    originalPrice: 1199,
    image: "/nike-shoes.png",
    rating: 4.4,
    sales: 1876,
    tags: ["舒适透气", "时尚百搭"],
  },
]

export const ProductList = memo(function ProductList() {
  const handleFavorite = useCallback((e: React.MouseEvent, productId: number) => {
    e.preventDefault()
    // 收藏逻辑
    console.log("[v0] Favorite product:", productId)
  }, [])

  const handleAddToCart = useCallback((e: React.MouseEvent, productId: number) => {
    e.preventDefault()
    // 添加到购物车逻辑
    console.log("[v0] Add to cart:", productId)
  }, [])

  return (
    <div className="p-4">
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <Card className="overflow-hidden transition-all duration-300 hover-lift hover:shadow-elegant-lg border-0 bg-card/50 backdrop-blur-sm group">
              <CardContent className="p-0">
                <div className="relative overflow-hidden h-40">
                  <Image
                    src={product.image || "/placeholder.svg?height=160&width=200"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  />

                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="icon"
                      className="glass-morphism hover:bg-primary hover:text-primary-foreground w-8 h-8 transition-smooth"
                      onClick={(e) => handleFavorite(e, product.id)}
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      className="glass-morphism hover:bg-primary hover:text-primary-foreground w-8 h-8 transition-smooth"
                      onClick={(e) => handleAddToCart(e, product.id)}
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
                    {product.tags.slice(0, 1).map((tag) => (
                      <span
                        key={tag}
                        className="bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs px-2 py-1 rounded-full shadow-elegant font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3">
                  <h3 className="text-sm font-semibold text-foreground line-clamp-2 mb-2 leading-tight group-hover:text-primary transition-colors">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-3 h-3 fill-accent text-accent" />
                    <span className="text-xs text-muted-foreground font-medium">{product.rating}</span>
                    <span className="text-xs text-muted-foreground">({product.sales})</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-primary">¥{product.price}</span>
                      <span className="text-xs text-muted-foreground line-through">¥{product.originalPrice}</span>
                    </div>
                    <div className="text-xs text-accent font-semibold">
                      -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
})
