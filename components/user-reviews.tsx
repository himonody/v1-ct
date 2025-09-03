"use client"

import { useTranslation } from "@/lib/i18n"

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

const userTestimonials = Array.from({ length: 16 }).map((_, i) => ({
  username: realNames[i],
  avatar: realAvatars[i],
  rating: Math.floor(Math.random() * 2) + 4, // 4或5星
  content: realContents[i],
}))

export function UserReviews() {
  const { t } = useTranslation()

  return (
    <section className="w-full bg-gray-50 py-4 px-3 sm:py-6 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center mb-4 sm:mb-6">
          <div className="flex items-center justify-center mb-4">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#00b67a"
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              <polygon points="12,2 15,9 22,9.3 17,14.1 18.5,21 12,17.3 5.5,21 7,14.1 2,9.3 9,9" />
            </svg>
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-gray-900">
              {t("trustpilotReviews")}
            </h2>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-full">
            {userTestimonials.slice(0, 8).map((testimonial, i) => (
              <div
                key={i}
                className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 sm:p-4 flex flex-col items-center"
              >
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.username}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mb-2 object-cover border border-gray-200"
                />
                <div className="flex flex-col items-center mb-2">
                  <span className="font-bold text-xs sm:text-sm text-purple-700 mb-1">{testimonial.username}</span>
                  <span className="flex items-center">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <svg
                        key={j}
                        className={`h-3 w-3 sm:h-4 sm:w-4 ${j < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <polygon points="10,1 12.59,7.36 19.51,7.64 14,12.14 15.82,18.99 10,15.27 4.18,18.99 6,12.14 0.49,7.64 7.41,7.36" />
                      </svg>
                    ))}
                  </span>
                </div>
                <div className="text-gray-700 text-xs sm:text-sm text-center leading-relaxed">
                  {testimonial.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
