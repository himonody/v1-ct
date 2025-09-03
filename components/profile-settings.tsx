"use client"

import { useState } from "react"
import { ArrowLeft, Camera, ChevronRight, User, Mail, Phone, Calendar, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export function ProfileSettings() {
  const [userInfo, setUserInfo] = useState({
    nickname: "张三",
    phone: "13888888888",
    email: "zhangsan@example.com",
    gender: "男",
    birthday: "1990-01-01",
  })

  const handleSave = () => {
    // 保存用户信息逻辑
    console.log("保存用户信息", userInfo)
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
        <h1 className="text-lg font-bold">个人信息</h1>
        <div className="flex-1" />
        <Button
          onClick={handleSave}
          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-elegant transition-smooth"
        >
          保存
        </Button>
      </div>

      <div className="p-4 space-y-4">
        {/* 头像设置 */}
        <Card className="border-0 bg-card/50 shadow-elegant">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm font-semibold">头像</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center text-white font-bold shadow-elegant">
                    张三
                  </div>
                  <Button
                    size="icon"
                    className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full glass-morphism hover:bg-primary hover:text-primary-foreground transition-smooth"
                  >
                    <Camera className="w-3 h-3" />
                  </Button>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 基本信息 */}
        <Card className="border-0 bg-card/50 shadow-elegant">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                <User className="w-4 h-4 text-accent" />
              </div>
              基本信息
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nickname" className="text-sm font-semibold">
                昵称
              </Label>
              <Input
                id="nickname"
                value={userInfo.nickname}
                onChange={(e) => setUserInfo({ ...userInfo, nickname: e.target.value })}
                className="bg-muted/20 border-border/50 focus:bg-card focus:shadow-elegant transition-smooth"
              />
            </div>

            <Separator className="opacity-50" />

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-semibold flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary" />
                手机号
              </Label>
              <div className="flex items-center gap-3">
                <Input id="phone" value={userInfo.phone} disabled className="flex-1 bg-muted/20 border-border/50" />
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-card/50 border-border/50 hover:bg-card hover:shadow-elegant transition-smooth"
                >
                  更换
                </Button>
              </div>
            </div>

            <Separator className="opacity-50" />

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold flex items-center gap-2">
                <Mail className="w-4 h-4 text-accent" />
                邮箱
              </Label>
              <Input
                id="email"
                type="email"
                value={userInfo.email}
                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                className="bg-muted/20 border-border/50 focus:bg-card focus:shadow-elegant transition-smooth"
              />
            </div>

            <Separator className="opacity-50" />

            <div className="space-y-2">
              <Label className="text-sm font-semibold">性别</Label>
              <div className="flex gap-3">
                <Button
                  variant={userInfo.gender === "男" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUserInfo({ ...userInfo, gender: "男" })}
                  className={`transition-smooth hover-lift ${
                    userInfo.gender === "男"
                      ? "bg-primary text-primary-foreground shadow-elegant"
                      : "bg-card/50 border-border/50 hover:bg-card hover:shadow-elegant"
                  }`}
                >
                  男
                </Button>
                <Button
                  variant={userInfo.gender === "女" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUserInfo({ ...userInfo, gender: "女" })}
                  className={`transition-smooth hover-lift ${
                    userInfo.gender === "女"
                      ? "bg-primary text-primary-foreground shadow-elegant"
                      : "bg-card/50 border-border/50 hover:bg-card hover:shadow-elegant"
                  }`}
                >
                  女
                </Button>
              </div>
            </div>

            <Separator className="opacity-50" />

            <div className="space-y-2">
              <Label htmlFor="birthday" className="text-sm font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-secondary" />
                生日
              </Label>
              <Input
                id="birthday"
                type="date"
                value={userInfo.birthday}
                onChange={(e) => setUserInfo({ ...userInfo, birthday: e.target.value })}
                className="bg-muted/20 border-border/50 focus:bg-card focus:shadow-elegant transition-smooth"
              />
            </div>
          </CardContent>
        </Card>

        {/* 账户安全 */}
        <Card className="border-0 bg-card/50 shadow-elegant">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <Shield className="w-4 h-4 text-green-600" />
              </div>
              账户安全
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between py-3 px-3 bg-muted/20 rounded-lg transition-smooth hover:bg-muted/30">
              <span className="text-sm font-semibold">登录密码</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-green-600 font-medium">已设置</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>

            <div className="flex items-center justify-between py-3 px-3 bg-muted/20 rounded-lg transition-smooth hover:bg-muted/30">
              <span className="text-sm font-semibold">支付密码</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-green-600 font-medium">已设置</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>

            <div className="flex items-center justify-between py-3 px-3 bg-muted/20 rounded-lg transition-smooth hover:bg-muted/30">
              <span className="text-sm font-semibold">实名认证</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-green-600 font-medium">已认证</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
