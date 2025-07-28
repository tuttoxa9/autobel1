import React from "react"
import { cn } from "@/lib/utils"

interface SpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function Spinner({ size = "md", className }: SpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  }

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-gray-300 border-t-blue-600",
        sizeClasses[size],
        className
      )}
    />
  )
}

interface LoadingStateProps {
  title?: string
  subtitle?: string
  className?: string
}

export function LoadingState({
  title = "Загружаем данные",
  subtitle = "Пожалуйста, подождите...",
  className
}: LoadingStateProps) {
  return (
    <div className={cn("min-h-screen bg-gray-50 flex items-center justify-center", className)}>
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Spinner size="lg" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-gray-600">{subtitle}</p>
        </div>
      </div>
    </div>
  )
}

interface CardsLoadingStateProps {
  count?: number
  className?: string
}

export function CardsLoadingState({ count = 6, className }: CardsLoadingStateProps) {
  return (
    <div className={cn("grid gap-6 md:grid-cols-2 lg:grid-cols-3", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="h-48 bg-gray-200 animate-pulse" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  )
}
