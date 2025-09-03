"use client"

export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number> = new Map()

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  startTiming(label: string): void {
    this.metrics.set(`${label}_start`, performance.now())
  }

  endTiming(label: string): number {
    const startTime = this.metrics.get(`${label}_start`)
    if (!startTime) {
      console.warn(`[v0] No start time found for: ${label}`)
      return 0
    }

    const duration = performance.now() - startTime
    this.metrics.set(label, duration)
    console.log(`[v0] ${label}: ${duration.toFixed(2)}ms`)
    return duration
  }

  getMetric(label: string): number | undefined {
    return this.metrics.get(label)
  }

  getAllMetrics(): Record<string, number> {
    return Object.fromEntries(this.metrics.entries())
  }

  measureComponentRender<T extends (...args: any[]) => any>(component: T, componentName: string): T {
    return ((...args: Parameters<T>) => {
      this.startTiming(`${componentName}_render`)
      const result = component(...args)
      this.endTiming(`${componentName}_render`)
      return result
    }) as T
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance()

// Web Vitals 监控
export function reportWebVitals(metric: any) {
  console.log(`[v0] Web Vital - ${metric.name}:`, metric.value)

  // 可以发送到分析服务
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", metric.name, {
      value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      event_label: metric.id,
      non_interaction: true,
    })
  }
}
