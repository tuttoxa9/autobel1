"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Gauge, Fuel, Settings } from "lucide-react"
import FadeInImage from "@/components/fade-in-image"
import { useUsdBynRate } from "@/components/providers/usd-byn-rate-provider"
import { convertUsdToByn } from "@/lib/utils"

interface CarCardProps {
  car: {
    id: string
    make: string
    model: string
    year: number
    price: number
    currency: string
    mileage: number
    engineVolume: number
    fuelType: string
    transmission: string
    imageUrls: string[]
    isAvailable: boolean
  }
}

export default function CarCard({ car }: CarCardProps) {
  const usdBynRate = useUsdBynRate()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat("ru-BY").format(mileage)
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/catalog/${car.id}`}>
        <div className="relative">
          <FadeInImage
            src={car.imageUrls[0] || "/placeholder.svg?height=200&width=300"}
            alt={`${car.make} ${car.model}`}
            className="w-full h-48 object-cover"
          />
          {!car.isAvailable && <Badge className="absolute top-2 left-2 bg-red-500">Продан</Badge>}
        </div>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-lg text-gray-900">
                {car.make} {car.model}
              </h3>
              <div className="space-y-1">
                <p className="text-2xl font-bold text-blue-600">{formatPrice(car.price)}</p>
                {usdBynRate && (
                  <p className="text-lg font-semibold text-gray-700">
                    ≈ {convertUsdToByn(car.price, usdBynRate)} BYN
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{car.year} г.</span>
              </div>
              <div className="flex items-center space-x-1">
                <Gauge className="h-4 w-4" />
                <span>{formatMileage(car.mileage)} км</span>
              </div>
              <div className="flex items-center space-x-1">
                <Fuel className="h-4 w-4" />
                <span>
                  {car.engineVolume}л {car.fuelType}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Settings className="h-4 w-4" />
                <span>{car.transmission}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
