"use client"

import { useState } from "react"
import { Filter, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const sortOptions = [
  { id: "default", label: "综合排序" },
  { id: "price-asc", label: "价格从低到高" },
  { id: "price-desc", label: "价格从高到低" },
  { id: "sales", label: "销量优先" },
  { id: "rating", label: "评分优先" },
]

const filterCategories = [
  { id: "brand", label: "品牌", options: ["苹果", "华为", "小米", "OPPO"] },
  { id: "price", label: "价格", options: ["0-100", "100-500", "500-1000", "1000+"] },
  { id: "rating", label: "评分", options: ["4.5+", "4.0+", "3.5+", "3.0+"] },
]

export function ProductFilter() {
  const [selectedSort, setSelectedSort] = useState("default")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const toggleFilter = (filterId: string) => {
    setSelectedFilters((prev) => (prev.includes(filterId) ? prev.filter((id) => id !== filterId) : [...prev, filterId]))
  }

  return (
    <div className="glass-morphism border-b border-border/50 shadow-elegant">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 transition-smooth hover-lift hover:shadow-elegant border-border/50 bg-card/30"
          >
            <Filter className="w-4 h-4" />
            筛选
            <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </Button>

          <div className="relative">
            <select
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="bg-card/50 border border-border/50 rounded-lg px-4 py-2 text-sm transition-smooth hover:bg-card focus:bg-card focus:shadow-elegant appearance-none pr-8"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        <div className="text-sm text-muted-foreground font-medium">
          共找到 <span className="text-primary font-bold">1,234</span> 件商品
        </div>
      </div>

      {selectedFilters.length > 0 && (
        <div className="px-4 pb-3">
          <div className="flex flex-wrap gap-2">
            {selectedFilters.map((filterId) => (
              <Badge
                key={filterId}
                variant="secondary"
                className="flex items-center gap-1 bg-primary/10 text-primary border-primary/20 transition-smooth hover:bg-primary/20"
              >
                {filterId}
                <button
                  onClick={() => toggleFilter(filterId)}
                  className="ml-1 hover:bg-primary/30 rounded-full p-0.5 transition-smooth"
                >
                  ×
                </button>
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedFilters([])}
              className="text-xs h-6 hover:text-destructive transition-smooth"
            >
              清空全部
            </Button>
          </div>
        </div>
      )}

      {showFilters && (
        <div className="border-t border-border/50 bg-card/30 backdrop-blur-sm p-4 animate-in slide-in-from-top-2 duration-300">
          {filterCategories.map((category) => (
            <div key={category.id} className="mb-4 last:mb-0">
              <h4 className="text-sm font-semibold mb-3 text-foreground">{category.label}</h4>
              <div className="flex flex-wrap gap-2">
                {category.options.map((option) => (
                  <Button
                    key={option}
                    variant={selectedFilters.includes(option) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleFilter(option)}
                    className={`text-xs transition-smooth hover-lift ${
                      selectedFilters.includes(option)
                        ? "bg-primary text-primary-foreground shadow-elegant"
                        : "bg-card/50 border-border/50 hover:bg-card hover:shadow-elegant"
                    }`}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
