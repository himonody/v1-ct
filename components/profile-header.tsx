"use client"

import { Camera, ChevronRight, Crown, Coins, Gift, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function ProfileHeader() {
  return (
    <div className="p-4">
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm shadow-elegant-lg">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            {/* 用户头像 */}
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center text-white text-xl font-bold shadow-elegant">
                张三
              </div>
              <Button
                size="icon"
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full glass-morphism hover:bg-primary hover:text-primary-foreground transition-smooth hover-lift shadow-elegant"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>

            {/* 用户信息 */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl font-bold text-foreground">张三</h2>
                <Badge className="bg-gradient-to-r from-accent to-primary text-primary-foreground shadow-elegant">
                  <Crown className="w-3 h-3 mr-1" />
                  VIP
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3 bg-muted/30 px-2 py-1 rounded-full inline-block">
                手机号: 138****8888
              </p>
            </div>

            <Button variant="ghost" size="icon" className="transition-smooth hover-lift">
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Button>
          </div>

          {/* 用户资产信息 */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-muted/20 rounded-xl transition-smooth hover:bg-muted/30">
              <div className="w-8 h-8 mx-auto mb-2 bg-primary/10 rounded-full flex items-center justify-center">
                <Coins className="w-4 h-4 text-primary" />
              </div>
              <div className="text-lg font-bold text-foreground">1,280</div>
              <div className="text-xs text-muted-foreground">积分</div>
            </div>
            <div className="text-center p-3 bg-muted/20 rounded-xl transition-smooth hover:bg-muted/30">
              <div className="w-8 h-8 mx-auto mb-2 bg-accent/10 rounded-full flex items-center justify-center">
                <Gift className="w-4 h-4 text-accent" />
              </div>
              <div className="text-lg font-bold text-foreground">5</div>
              <div className="text-xs text-muted-foreground">优惠券</div>
            </div>
            <div className="text-center p-3 bg-muted/20 rounded-xl transition-smooth hover:bg-muted/30">
              <div className="w-8 h-8 mx-auto mb-2 bg-secondary/10 rounded-full flex items-center justify-center">
                <Wallet className="w-4 h-4 text-secondary" />
              </div>
              <div className="text-lg font-bold text-foreground">¥128.50</div>
              <div className="text-xs text-muted-foreground">余额</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
