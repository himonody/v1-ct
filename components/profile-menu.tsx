"use client"

import {
  User,
  MapPin,
  CreditCard,
  Heart,
  MessageCircle,
  Shield,
  HelpCircle,
  Settings,
  LogOut,
  ChevronRight,
  Package,
  Star,
  Gift,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

const menuSections = [
  {
    title: "订单服务",
    items: [
      { icon: Package, label: "我的订单", href: "/orders", badge: "3", color: "text-primary" },
      { icon: Heart, label: "我的收藏", href: "/favorites", badge: "", color: "text-destructive" },
      { icon: Star, label: "评价晒单", href: "/reviews", badge: "", color: "text-accent" },
      { icon: Gift, label: "优惠券", href: "/coupons", badge: "5", color: "text-secondary" },
    ],
  },
  {
    title: "账户管理",
    items: [
      { icon: User, label: "个人信息", href: "/profile/settings", badge: "", color: "text-primary" },
      { icon: MapPin, label: "地址管理", href: "/profile/address", badge: "", color: "text-accent" },
      { icon: CreditCard, label: "支付方式", href: "/profile/payment", badge: "", color: "text-secondary" },
      { icon: Shield, label: "账户安全", href: "/profile/security", badge: "", color: "text-green-600" },
    ],
  },
  {
    title: "客户服务",
    items: [
      { icon: MessageCircle, label: "联系客服", href: "/customer-service", badge: "", color: "text-blue-600" },
      { icon: HelpCircle, label: "帮助中心", href: "/help", badge: "", color: "text-purple-600" },
      { icon: Settings, label: "设置", href: "/settings", badge: "", color: "text-muted-foreground" },
    ],
  },
]

export function ProfileMenu() {
  const handleLogout = () => {
    // 退出登录逻辑
    console.log("退出登录")
  }

  return (
    <div className="px-4 space-y-4">
      {menuSections.map((section, sectionIndex) => (
        <Card key={sectionIndex} className="border-0 bg-card/50 shadow-elegant">
          <CardContent className="p-0">
            <div className="p-4 pb-2">
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{section.title}</h3>
            </div>
            <div className="space-y-0">
              {section.items.map((item, itemIndex) => {
                const IconComponent = item.icon
                return (
                  <div key={itemIndex}>
                    <Link href={item.href}>
                      <div className="flex items-center gap-4 px-4 py-4 hover:bg-muted/30 transition-smooth hover-lift group">
                        <div className="w-10 h-10 rounded-xl bg-muted/20 flex items-center justify-center group-hover:bg-primary/10 transition-smooth">
                          <IconComponent
                            className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`}
                          />
                        </div>
                        <span className="flex-1 text-sm font-semibold group-hover:text-primary transition-colors">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className="bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs px-2 py-1 rounded-full shadow-elegant animate-pulse">
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </Link>
                    {itemIndex < section.items.length - 1 && <Separator className="ml-14 opacity-50" />}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* 退出登录 */}
      <Card className="border-0 bg-card/50 shadow-elegant">
        <CardContent className="p-0">
          <Button
            variant="ghost"
            className="w-full justify-start gap-4 px-4 py-4 h-auto text-destructive hover:text-destructive hover:bg-destructive/10 transition-smooth hover-lift group"
            onClick={handleLogout}
          >
            <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center group-hover:bg-destructive/20 transition-smooth">
              <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-sm font-semibold">退出登录</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
