"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface FadeInImageProps {
  src: string
  alt: string
  className?: string
  fallback?: string
}

export default function FadeInImage({ src, alt, className, fallback = "/placeholder.svg?height=200&width=300" }: FadeInImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  return (
    <div className="relative overflow-hidden">
      {!isLoaded && !hasError && (
        <div className={cn("absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer", className)} />
      )}
      <img
        src={hasError ? fallback : src}
        alt={alt}
        className={cn(
          "transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true)
          setIsLoaded(true)
        }}
      />
    </div>
  )
}
