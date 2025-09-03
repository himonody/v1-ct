"use client"

import { useEffect } from "react"
import { useState } from "react"
import { useRef } from "react"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
}

// Company stats are now localized in the component

const branchOfficeImages = [
  { src: "/placeholder.svg?height=100&width=150", alt: "Office 1" },
  { src: "/placeholder.svg?height=100&width=150", alt: "Office 2" },
  { src: "/placeholder.svg?height=100&width=150", alt: "Office 3" },
  { src: "/placeholder.svg?height=100&width=150", alt: "Office 4" },
  { src: "/placeholder.svg?height=100&width=150", alt: "Office 5" },
  { src: "/placeholder.svg?height=100&width=150", alt: "Office 6" },
]

const merchantPartnerImages = [
  {
    src: "https://r.r10s.jp/com/img/thumb/200309/event/202506_recommend/ich_grpcpn_trv_ss.jpg",
    alt: "25%OFF商品をご用意！",
  },
  {
    src: "https://r.r10s.jp/com/img/thumb/200309/event/202506_recommend/ich_grpcpn_rtc_ss.jpg",
    alt: "対象期間のポイント10倍！",
  },
  {
    src: "https://r.r10s.jp/com/img/thumb/200309/event/202503_recommend/ich_grpcpn_boo_ss.gif",
    alt: "お得なセール実施中！",
  },
  {
    src: "https://r.r10s.jp/com/img/thumb/200309/event/202503_recommend/ich_grpcpn_bnk_ss.png",
    alt: "楽天銀行口座開設キャンペーン",
  },
  {
    src: "https://r.r10s.jp/com/img/thumb/200309/event/202506_recommend/ich_grpcpn_sup_ss.jpg",
    alt: "楽天のネットスーパー",
  },
  {
    src: "https://r.r10s.jp/com/img/thumb/200309/event/202506_recommend/ich_grpcpn_start1000_mobile_202506_ss.png",
    alt: "要エントリー＆条件あり",
  },
  {
    src: "https://r.r10s.jp/com/img/thumb/200309/event/202503_recommend/ich_grpcpn_kob_ss.gif",
    alt: "電子書籍半額セール開催中！",
  },
  {
    src: "https://r.r10s.jp/com/img/thumb/200309/event/202503_recommend/ich_grpcpn_kba_03ss.png",
    alt: "馬券購入でポイント貯まる！",
  },
  {
    src: "https://r.r10s.jp/com/img/thumb/200309/event/202501_recommend/ich_grpcpn_rmb.png",
    alt: "楽天市場でのお買い物がおトク!",
  },
]

const getFlashSaleProducts = (t: (key: string) => string): Product[] => [
  {
    id: "fs1",
    name: t("limitedEditionWatch"),
    description: t("stylishWatchDescription"),
    price: 199.99,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "fs2",
    name: t("wirelessEarbudsPro"),
    description: t("highFidelitySound"),
    price: 89.99,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "fs3",
    name: t("smartHomeHub"),
    description: t("controlAllDevices"),
    price: 129.99,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "fs4",
    name: t("portablePowerBank"),
    description: t("fastChargingDevices"),
    price: 39.99,
    image: "/placeholder.svg?height=300&width=400",
  },
]

const getGroupBuyingProducts = (t: (key: string) => string): Product[] => [
  {
    id: "gb1",
    name: t("organicCoffeeBeans"),
    description: t("premiumOrganicCoffee"),
    price: 25.0,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "gb2",
    name: t("ergonomicOfficeChair"),
    description: t("comfortableChairLongHours"),
    price: 249.0,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "gb3",
    name: t("fitnessTrackerBand"),
    description: t("monitorHealthFitness"),
    price: 49.99,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "gb4",
    name: t("stainlessSteelCookware"),
    description: t("durableElegantCookware"),
    price: 159.0,
    image: "/placeholder.svg?height=300&width=400",
  },
]

// 生成100条假评论
const reviewContents = [
  "Rakuten really helped me save a lot on my daily shopping! Highly recommended!",
  "Great cashback experience, and the site is easy to use.",
  "Customer service is super responsive. I love the variety of stores available.",
  "Got my cashback quickly, and the offers are real!",
  "Nice UI, smooth experience, and real savings. Will use again!",
  "Cashback arrived faster than expected!",
  "Lots of brands, lots of deals!",
  "I use Rakuten for every online purchase now.",
  "The best cashback platform I've tried.",
  "Simple, effective, and rewarding!",
]
const realNames = [
  "Olivia Bennett",
  "Ethan Carter",
  "Mia Thompson",
  "Lucas Mitchell",
  "Harper Evans",
  "Mason Brooks",
  "Ella Parker",
  "Henry Foster",
  "Grace Morgan",
  "Jack Turner",
  "Lily Cooper",
  "Samuel Reed",
  "Chloe Adams",
  "Benjamin Hayes",
  "Zoe Phillips",
  "Daniel Scott",
]
const realAvatars = [
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/65.jpg",
  "https://randomuser.me/api/portraits/men/41.jpg",
  "https://randomuser.me/api/portraits/women/68.jpg",
  "https://randomuser.me/api/portraits/men/36.jpg",
  "https://randomuser.me/api/portraits/women/12.jpg",
  "https://randomuser.me/api/portraits/men/22.jpg",
  "https://randomuser.me/api/portraits/women/25.jpg",
  "https://randomuser.me/api/portraits/men/15.jpg",
  "https://randomuser.me/api/portraits/women/30.jpg",
  "https://randomuser.me/api/portraits/men/28.jpg",
  "https://randomuser.me/api/portraits/women/50.jpg",
  "https://randomuser.me/api/portraits/men/48.jpg",
  "https://randomuser.me/api/portraits/women/33.jpg",
  "https://randomuser.me/api/portraits/men/53.jpg",
]
const realContents = [
  "Rakuten helped me save money on things I buy every day. Super easy to use! 💸🛒",
  "I got my cashback without any hassle. Highly recommend this platform. 👍😊",
  "Customer support was quick to respond and very helpful. 🙌",
  "I was surprised how many stores are included. Great for online shopping! 🛍️✨",
  "The cashback rates are better than other sites I've tried. 💰🔥",
  "Easy to track my rewards and payments. Love it! 📱❤️",
  "I use Rakuten for all my travel bookings now. The savings add up fast. ✈️💵",
  "Signing up was simple and I started earning cashback right away. 🚀",
  "I've told all my friends about Rakuten. It's a must for online shoppers. 🗣️🛒",
  "Cashback was credited to my account faster than I expected. ⏱️💲",
  "Lots of brands and deals. I always check Rakuten before buying. 🏷️🛍️",
  "The app is user-friendly and makes saving money effortless. 📲😃",
  "I've earned over $100 in cashback so far. It really works! 🎉💵",
  "Great experience every time I shop. Never had an issue. ⭐️⭐️⭐️⭐️⭐️",
  "I love getting paid just for shopping like I normally do. 😍🤑",
  "Rakuten is now my go-to for online purchases. Highly recommended! 🥇🛒",
]
const userTestimonials = Array.from({ length: 100 }).map((_, i) => ({
  username: i < 16 ? realNames[i] : `User${i + 1}`,
  avatar: i < 16 ? realAvatars[i] : "/placeholder-user.jpg",
  rating: Math.floor(Math.random() * 2) + 4, // 4或5星
  content: i < 16 ? realContents[i] : reviewContents[i % reviewContents.length],
}))

// 横向自动滚动评论组件
function ReviewAutoScroll({ testimonials }: { testimonials: { username: string; rating: number; content: string }[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const CARD_WIDTH = 260
  const GAP = 20
  useEffect(() => {
    let frame: number
    function step() {
      if (!isPaused && scrollRef.current) {
        const scrollArea = scrollRef.current
        scrollArea.scrollLeft += 2.5
        console.log("scrollLeft:", scrollArea.scrollLeft, "scrollWidth:", scrollArea.scrollWidth)
        if (scrollArea.scrollLeft >= scrollArea.scrollWidth / 2) {
          scrollArea.scrollLeft = 0
        }
      }
      frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [isPaused])
  return (
    <div
      className="max-w-[900px] mx-auto overflow-hidden relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        ref={scrollRef}
        className="flex flex-nowrap items-center overflow-x-auto"
        style={{
          gap: `${GAP}px`,
          width: "max-content",
          scrollBehavior: "auto",
        }}
      >
        {[...testimonials, ...testimonials].map((testimonial, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl shadow-lg px-4 py-4 flex flex-col items-center min-h-[120px] mx-0"
            style={{ width: CARD_WIDTH, flex: "0 0 auto" }}
          >
            <div className="flex items-center mb-2">
              <span className="font-bold text-base text-purple-700 mr-2">{testimonial.username}</span>
              <span className="flex items-center">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg
                    key={j}
                    className={`h-4 w-4 ${j < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <polygon points="10,1 12.59,7.36 19.51,7.64 14,12.14 15.82,18.99 10,15.27 4.18,18.99 6,12.14 0.49,7.64 7.41,7.36" />
                  </svg>
                ))}
              </span>
            </div>
            <div className="text-gray-700 text-sm text-center max-w-xs">{testimonial.content}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
