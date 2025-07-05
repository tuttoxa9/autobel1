"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import Stories from "@/components/stories"
import CarCard from "@/components/car-card"
import CarCardSkeleton from "@/components/car-card-skeleton"
import FadeInImage from "@/components/fade-in-image"
import { CheckCircle } from "lucide-react"
import { collection, query, orderBy, limit, getDocs, doc, getDoc, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { getCachedImageUrl } from "@/lib/image-cache"

interface HomepageSettings {
  heroTitle: string
  heroSubtitle: string
  heroButtonText: string
  ctaTitle: string
  ctaSubtitle: string
}

// Моковые данные удалены

export default function HomePage() {
  const [searchForm, setSearchForm] = useState({
    make: "",
    model: "",
    priceFrom: "",
    priceTo: "",
  })

  const [contactForm, setContactForm] = useState({
    name: "",
    phone: "",
  })

  const [cars, setCars] = useState([])
  const [loadingCars, setLoadingCars] = useState(true)
  const [settings, setSettings] = useState<HomepageSettings>({
    heroTitle: "Найди свой автомобиль надежным способом",
    heroSubtitle: "Гарантия качества. Помощь в оформлении кредита.",
    heroButtonText: "Посмотреть каталог",
    ctaTitle: "Не нашли подходящий автомобиль?",
    ctaSubtitle: "Оставьте заявку, и мы подберем автомобиль специально для вас",
  })

  useEffect(() => {
    loadHomepageSettings()
    loadFeaturedCars()
  }, [])

  const loadHomepageSettings = async () => {
    try {
      const settingsDoc = await getDoc(doc(db, "settings", "homepage"))
      if (settingsDoc.exists()) {
        const data = settingsDoc.data() as Partial<HomepageSettings>
        setSettings((prev) => ({
          ...prev,
          ...data,
        }))
      }
    } catch (error) {
      console.error("Ошибка загрузки настроек главной страницы:", error)
    }
  }

  const loadFeaturedCars = async () => {
    try {
      setLoadingCars(true)
      const carsQuery = query(collection(db, "cars"), orderBy("createdAt", "desc"), limit(4))
      const snapshot = await getDocs(carsQuery)
      const carsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      if (carsData.length > 0) {
        setCars(carsData as any)
      }
    } catch (error) {
      console.error("Ошибка загрузки автомобилей:", error)
    } finally {
      setLoadingCars(false)
    }
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchForm.make) params.set("make", searchForm.make)
    if (searchForm.model) params.set("model", searchForm.model)
    if (searchForm.priceFrom) params.set("priceFrom", searchForm.priceFrom)
    if (searchForm.priceTo) params.set("priceTo", searchForm.priceTo)

    window.location.href = `/catalog?${params.toString()}`
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Сохраняем в Firebase
      await addDoc(collection(db, "leads"), {
        ...contactForm,
        type: "car_selection",
        status: "new",
        createdAt: new Date(),
      })

      // Отправляем уведомление в Telegram
      await fetch('/api/send-telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...contactForm,
          type: 'car_selection'
        })
      })

      setContactForm({ name: "", phone: "" })
      alert("Заявка отправлена! Мы свяжемся с вами в ближайшее время.")
    } catch (error) {
      console.error("Ошибка отправки заявки:", error)
      alert("Произошла ошибка. Попробуйте еще раз.")
    }
  }

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.startsWith("375")) {
      const formatted = numbers.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "+$1 $2 $3-$4-$5")
      return formatted
    }
    return value
  }

  return (
    <div className="min-h-screen">
      {/* Главный баннер */}
      <section className="relative h-[70vh] sm:h-[75vh] flex items-center justify-center smooth-divider">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${getCachedImageUrl('/image_(2).jpg')}')`,
            backgroundSize: 'cover'
          }}
        />

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-hero text-2xl sm:text-3xl md:text-6xl mb-4 sm:mb-6 leading-tight">
            Найди свой <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">идеальный автомобиль</span> надежным способом
          </h1>
          <p className="text-base sm:text-lg md:text-2xl mb-6 sm:mb-8 text-gray-100 font-medium leading-relaxed">
            {settings.heroSubtitle}
          </p>

          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-6 rounded-2xl font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300"
            asChild
          >
            <a href="/catalog">{settings.heroButtonText}</a>
          </Button>
        </div>
      </section>

      {/* Блок "Свежие поступления и новости" */}
      <Stories />

      {/* Блок "Специальное предложение" */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container px-4">
          {loadingCars ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Array.from({ length: 4 }).map((_, index) => (
                <CarCardSkeleton key={index} />
              ))}
            </div>
          ) : cars && cars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {cars.map((car, index) => (
                <div key={car.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <CarCard car={car} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="bg-white rounded-3xl p-12 shadow-lg max-w-md mx-auto">
                <div className="text-6xl mb-6">🚗</div>
                <h3 className="font-display text-2xl font-semibold text-gray-900 mb-4">
                  Скоро здесь появятся автомобили
                </h3>
                <p className="text-gray-600 mb-6">
                  Мы работаем над наполнением каталога лучшими предложениями
                </p>
              </div>
            </div>
          )}

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="rounded-2xl px-8 py-4 text-lg font-semibold border-2 hover:shadow-lg transition-all duration-300"
              asChild
            >
              <a href="/catalog">Посмотреть весь каталог</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Блок призыва к действию */}
      <section className="relative pt-12 sm:pt-16 pb-32 sm:pb-40 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-t-[30px] sm:rounded-t-[50px] -mb-20 overflow-hidden">
        {/* Фоновое изображение автомобиля */}
        <div
          className="absolute inset-0 opacity-20 bg-no-repeat bg-center mix-blend-overlay bg-[length:90%] md:bg-[length:60%]"
          style={{
            backgroundImage: `url('${getCachedImageUrl('/car.png')}')`,
            backgroundPosition: 'center 70%',
            filter: 'brightness(0) invert(1)'
          }}
        />

        <div className="container px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">{settings.ctaTitle}</h2>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-blue-100">{settings.ctaSubtitle}</p>

            {/* Оптимизированная форма для мобильных */}
            <form onSubmit={handleContactSubmit} className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-center max-w-lg mx-auto">
              <div className="flex-1 sm:flex-none sm:w-32">
                <Input
                  placeholder="Имя"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                  className="bg-white/10 backdrop-blur-md border-white/40 text-white placeholder:text-white/60 focus:border-white/80 focus:bg-white/20 h-10 sm:h-9 text-sm w-full"
                />
              </div>
              <div className="flex-1 sm:flex-none sm:w-40">
                <Input
                  placeholder="Телефон"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({ ...contactForm, phone: formatPhoneNumber(e.target.value) })}
                  required
                  className="bg-white/10 backdrop-blur-md border-white/40 text-white placeholder:text-white/60 focus:border-white/80 focus:bg-white/20 h-10 sm:h-9 text-sm w-full"
                />
              </div>
              <Button type="submit" size="sm" className="bg-white/20 hover:bg-white/30 text-white border border-white/40 backdrop-blur-sm px-4 h-10 sm:h-9 text-sm whitespace-nowrap">
                <CheckCircle className="h-3 w-3 mr-1" />
                Отправить
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
