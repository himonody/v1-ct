"use client"

import { useState } from "react"
import { ArrowLeft, Plus, MapPin, Edit, Trash2, Home, Building, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const mockAddresses = [
  {
    id: 1,
    name: "张三",
    phone: "13888888888",
    address: "北京市朝阳区三里屯街道工体北路8号院1号楼101室",
    isDefault: true,
    type: "home",
  },
  {
    id: 2,
    name: "张三",
    phone: "13888888888",
    address: "上海市浦东新区陆家嘴环路1000号恒生银行大厦20楼",
    isDefault: false,
    type: "office",
  },
  {
    id: 3,
    name: "李四",
    phone: "13999999999",
    address: "广州市天河区珠江新城花城大道85号高德置地广场A座30楼",
    isDefault: false,
    type: "other",
  },
]

const addressTypeIcons = {
  home: Home,
  office: Building,
  other: User,
}

const addressTypeLabels = {
  home: "家",
  office: "公司",
  other: "其他",
}

export function AddressManagement() {
  const [addresses, setAddresses] = useState(mockAddresses)

  const setDefaultAddress = (id: number) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    )
  }

  const deleteAddress = (id: number) => {
    setAddresses((prev) => prev.filter((addr) => addr.id !== id))
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
        <h1 className="text-lg font-bold">地址管理</h1>
        <div className="flex-1" />
        <Button
          size="sm"
          className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-elegant transition-smooth"
        >
          <Plus className="w-4 h-4" />
          新增地址
        </Button>
      </div>

      <div className="p-4 space-y-4">
        {addresses.map((address) => {
          const TypeIcon = addressTypeIcons[address.type as keyof typeof addressTypeIcons]
          return (
            <Card
              key={address.id}
              className="overflow-hidden border-0 bg-card/50 shadow-elegant transition-all duration-300 hover-lift hover:shadow-elegant-lg"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <TypeIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-foreground">{address.name}</span>
                        <span className="text-sm text-muted-foreground bg-muted/30 px-2 py-1 rounded-full">
                          {address.phone}
                        </span>
                        {address.isDefault && (
                          <Badge className="bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-elegant">
                            默认
                          </Badge>
                        )}
                      </div>
                      <span className="text-xs text-accent font-medium bg-accent/10 px-2 py-1 rounded-full">
                        {addressTypeLabels[address.type as keyof typeof addressTypeLabels]}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-10 h-10 transition-smooth hover-lift hover:bg-primary/10 hover:text-primary"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-10 h-10 text-destructive hover:text-destructive hover:bg-destructive/10 transition-smooth hover-lift"
                      onClick={() => deleteAddress(address.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-3 mb-4 p-3 bg-muted/20 rounded-lg">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{address.address}</p>
                </div>

                {!address.isDefault && (
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDefaultAddress(address.id)}
                      className="bg-card/50 border-border/50 hover:bg-primary hover:text-primary-foreground hover:shadow-elegant transition-smooth"
                    >
                      设为默认
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}

        {addresses.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 bg-muted/30 rounded-full flex items-center justify-center">
              <MapPin className="w-10 h-10 opacity-50" />
            </div>
            <p className="text-lg font-medium text-muted-foreground mb-2">暂无收货地址</p>
            <p className="text-sm text-muted-foreground mb-6">添加收货地址，享受便捷购物体验</p>
            <Button className="flex items-center gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-elegant transition-smooth">
              <Plus className="w-4 h-4" />
              添加收货地址
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
