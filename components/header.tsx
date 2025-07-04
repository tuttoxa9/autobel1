"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Menu, Phone, Loader2 } from "lucide-react"
import { doc, getDoc, collection, addDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"

const navigation = [
  { name: "Главная", href: "/" },
  { name: "Каталог", href: "/catalog" },
  { name: "Кредит", href: "/credit" },
  { name: "Лизинг", href: "/leasing" },
  { name: "О нас", href: "/about" },
  { name: "Контакты", href: "/contacts" },
  { name: "Отзывы", href: "/reviews" },
]

interface Settings {
  companyName: string
  phone: string
  workingHours: string
}

export default function Header() {
  const pathname = usePathname()
  const [isCallbackOpen, setIsCallbackOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({ name: "", phone: "" })
  const [settings, setSettings] = useState<Settings | null>(null)
  const [phoneLoading, setPhoneLoading] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      setLoading(true)
      const settingsDoc = await getDoc(doc(db, "settings", "main"))
      if (settingsDoc.exists()) {
        setSettings(settingsDoc.data() as Settings)
      }
    } catch (error) {
      console.error("Ошибка загрузки настроек:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Сохраняем в Firebase
      await addDoc(collection(db, "leads"), {
        ...formData,
        type: "callback",
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
          ...formData,
          type: 'callback'
        })
      })

      setIsCallbackOpen(false)
      setFormData({ name: "", phone: "" })
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
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center px-4 md:justify-between">
        {/* Кнопка звонка для мобильных (слева) */}
        <div className="md:hidden">
          <Dialog open={isCallbackOpen} onOpenChange={(open) => { setIsCallbackOpen(open); if (!open) setPhoneLoading(false); }}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="bg-white hover:bg-gray-50 border-2 border-black text-xs w-8 h-8 p-0 rounded-full"
                onClick={() => setPhoneLoading(true)}
              >
                {phoneLoading ? (
                  <Loader2 className="h-3 w-3 animate-spin text-black" />
                ) : (
                  <Phone className="h-4 w-4 text-black" />
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Заказать обратный звонок</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCallbackSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Ваше имя</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Введите ваше имя"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Номер телефона</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: formatPhoneNumber(e.target.value) })}
                    placeholder="+375 XX XXX-XX-XX"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Заказать звонок
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Логотип по центру на мобильных, слева на десктопе */}
        <Link href="/" className="flex items-center space-x-3 flex-1 justify-center md:flex-none md:justify-start">
          <Image
            src="/logo4.png"
            alt="Белавто Центр"
            width={140}
            height={46}
            className="h-10 w-auto sm:h-12"
            priority
          />
          <span className="font-display font-bold text-base sm:text-xl text-gray-900 tracking-tight">Белавто Центр</span>
        </Link>

        {/* Мобильное меню (справа) */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <div className="flex items-center space-x-3 mb-8 p-4 border-b">
              <span className="font-bold text-xl text-gray-900">
                {loading ? (
                  <div className="flex items-center">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Загрузка...
                  </div>
                ) : (
                  settings?.companyName || "Белавто Центр"
                )}
              </span>
            </div>
            <div className="flex flex-col space-y-4 mt-8">
              {navigation
                .filter((item) => !["/", "/catalog", "/credit", "/contacts"].includes(item.href))
                .map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-lg font-medium transition-colors hover:text-blue-600 ${
                      pathname === item.href ? "text-blue-600" : "text-gray-900"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
            </div>
            <div className="mt-8 p-4 border-t">
              {loading ? (
                <div className="flex items-center mb-4">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <span className="text-gray-600">Загрузка телефона...</span>
                </div>
              ) : (
                <a
                  href={`tel:${settings?.phone?.replace(/\s/g, "") || ""}`}
                  className="text-blue-600 font-semibold text-lg block mb-4"
                >
                  {settings?.phone || "+375 XX XXX-XX-XX"}
                </a>
              )}
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setIsCallbackOpen(true)
                }}
              >
                Связаться
              </Button>
            </div>
          </SheetContent>
        </Sheet>

        {/* Десктопное меню */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold tracking-wide transition-colors hover:text-blue-600 ${
                pathname === item.href ? "text-blue-600" : "text-gray-700"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Контакты и кнопка звонка для десктопа */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="hidden sm:flex flex-col items-end">
            {loading ? (
              <div className="flex flex-col items-end">
                <div className="flex items-center">
                  <Loader2 className="h-3 w-3 animate-spin mr-1" />
                  <span className="text-xs text-gray-600">Загрузка...</span>
                </div>
                <span className="text-xs text-gray-500 font-medium hidden lg:block">Пн-Пт: 9:00-21:00, Сб-Вс: 10:00-19:00</span>
              </div>
            ) : (
              <>
                <a href={`tel:${settings?.phone?.replace(/\s/g, "") || ""}`} className="text-xs sm:text-sm font-bold text-gray-900 tracking-tight">
                  {phoneLoading ? (
                    <div className="flex items-center">
                      <Loader2 className="h-3 w-3 animate-spin mr-1" />
                      Загрузка...
                    </div>
                  ) : (
                    settings?.phone || "+375 XX XXX-XX-XX"
                  )}
                </a>
                <span className="text-xs text-gray-500 font-medium hidden lg:block">{settings?.workingHours || "Пн-Пт: 9:00-21:00, Сб-Вс: 10:00-19:00"}</span>
              </>
            )}
          </div>

          <Dialog open={isCallbackOpen} onOpenChange={(open) => { setIsCallbackOpen(open); if (!open) setPhoneLoading(false); }}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm px-2 sm:px-4"
                onClick={() => setPhoneLoading(true)}
              >
                {phoneLoading ? (
                  <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 animate-spin" />
                ) : (
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                )}
                <span className="hidden sm:inline">Заказать звонок</span>
                <span className="sm:hidden">Звонок</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Заказать обратный звонок</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCallbackSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Ваше имя</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Введите ваше имя"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Номер телефона</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: formatPhoneNumber(e.target.value) })}
                    placeholder="+375 XX XXX-XX-XX"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Заказать звонок
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  )
}
