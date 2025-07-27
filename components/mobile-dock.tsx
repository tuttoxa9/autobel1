"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Car, CreditCard, Phone } from "lucide-react"
import { useEffect, useState } from "react"

const dockItems = [
  { name: "Главная", href: "/", icon: Home },
  { name: "Каталог", href: "/catalog", icon: Car },
  { name: "Кредит", href: "/credit", icon: CreditCard },
  { name: "Контакты", href: "/contacts", icon: Phone },
]

export default function MobileDock() {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Показываем меню сразу после монтирования
    setIsMounted(true)
  }, [])

  // Сразу рендерим видимое меню, не ждем загрузки страницы
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] md:hidden mobile-dock-stable">
      <div className="mx-2 mb-2">
        <div className={`bg-white/95 backdrop-blur-sm border border-gray-200/80 rounded-2xl shadow-lg shadow-black/10 transition-opacity duration-200 ${
          isMounted ? 'opacity-100' : 'opacity-90'
        }`}>
          <div className="grid grid-cols-4 px-1 py-1">
            {dockItems.map((item) => {
              // Упрощенная логика определения активного элемента
              const isActive = isMounted && (
                pathname === item.href ||
                (item.href === "/" && pathname === "/") ||
                (item.href !== "/" && pathname.startsWith(item.href))
              )

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex flex-col items-center justify-center py-3 px-2 text-xs transition-all duration-150 rounded-xl ${
                    isActive
                      ? "text-blue-600 bg-blue-50 shadow-sm"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50/80 active:scale-95"
                  }`}
                  style={{ willChange: 'transform' }}
                >
                  <item.icon className={`h-6 w-6 mb-1 transition-colors duration-150 ${
                    isActive ? "text-blue-600" : "text-gray-600"
                  }`} />
                  <span className="text-xs font-medium">{item.name}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
