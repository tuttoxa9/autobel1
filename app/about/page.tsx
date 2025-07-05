"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Users, Award, Clock, Car, Phone, MapPin, CheckCircle, Star, Wrench, CreditCard, DollarSign, FileText, Building, TrendingUp, Calculator, Handshake, Check } from "lucide-react"
import AboutPageSkeleton from "@/components/about-page-skeleton"

export default function AboutPage() {
  const [loading, setLoading] = useState(true)
  const [aboutData, setAboutData] = useState({
    pageTitle: "О компании \"АвтоБел Центр\"",
    pageSubtitle: "Мы помогаем людям найти идеальный автомобиль уже более 12 лет. Наша миссия — сделать покупку автомобиля простой, безопасной и выгодной.",
    stats: [
      { icon: Users, label: "Довольных клиентов", value: "2500+" },
      { icon: Award, label: "Лет на рынке", value: "12" },
      { icon: Shield, label: "Проданных автомобилей", value: "5000+" },
      { icon: Clock, label: "Среднее время продажи", value: "7 дней" },
    ],
    companyInfo: {
      fullName: 'ООО "Белавто Центр"',
      unp: "123456789",
      registrationDate: "15.03.2012",
      legalAddress: "г. Минск, ул. Примерная, 123",
    },
    bankDetails: {
      account: "BY12 ALFA 1234 5678 9012 3456 7890",
      bankName: 'ОАО "Альфа-Банк"',
      bik: "ALFABY2X",
      bankAddress: "г. Минск, пр. Дзержинского, 1",
    },
  })

  const loadAboutData = async () => {
    try {
      const aboutDoc = await getDoc(doc(db, "pages", "about"))
      if (aboutDoc.exists()) {
        const data = aboutDoc.data()

        // Merge data with proper null checks
        setAboutData(prev => ({
          ...prev,
          ...data,
          pageTitle: data?.pageTitle || prev.pageTitle,
          pageSubtitle: data?.pageSubtitle || prev.pageSubtitle,
          stats: data?.stats?.map((stat, index) => ({
            ...stat,
            icon: [Users, Award, Shield, Clock][index] || Users
          })) || prev.stats,
          history: data?.history || prev.history,
          principles: data?.principles || prev.principles,
          services: data?.services || prev.services,
          companyInfo: data?.companyInfo || prev.companyInfo,
          bankDetails: data?.bankDetails || prev.bankDetails
        }))
      }
    } catch (error) {
      console.error("Ошибка загрузки данных:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAboutData()
  }, [])

  if (loading) {
    return <AboutPageSkeleton />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container px-4 py-8">
        {/* Хлебные крошки */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Главная
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">О нас</li>
          </ol>
        </nav>

        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{aboutData.pageTitle}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {aboutData.pageSubtitle}
          </p>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-12">
          {aboutData?.stats?.map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm bg-gradient-to-br from-white to-gray-50/80">
              <CardContent className="p-3 lg:p-6 text-center">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 lg:mb-3 shadow-md">
                  {stat?.icon && <stat.icon className="h-5 w-5 lg:h-6 lg:w-6 text-white" />}
                </div>
                <div className="text-lg lg:text-2xl font-bold text-gray-900 mb-1">{stat?.value || ''}</div>
                <div className="text-xs lg:text-sm text-gray-600 leading-tight">{stat?.label || ''}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {aboutData.history?.title || "Наша история"}
            </h2>
            <div className="space-y-4 text-gray-700">
              {aboutData.history?.content?.map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {aboutData.principles?.title || "Наши принципы"}
            </h2>
            <div className="space-y-6">
              {aboutData?.principles?.items?.map((principle, index) => {
                const getIcon = (iconName: string) => {

                  switch (iconName) {
                    case "shield": return Shield
                    case "award": return Award
                    case "users": return Users
                    case "car": return Car
                    case "phone": return Phone
                    case "mappin":
                    case "map-pin": return MapPin
                    case "clock": return Clock
                    case "checkcircle":
                    case "check-circle": return CheckCircle
                    case "star": return Star
                    case "wrench": return Wrench
                    case "credit-card":
                    case "creditcard": return CreditCard
                    case "dollar-sign":
                    case "dollarsign": return DollarSign
                    case "file-text":
                    case "filetext": return FileText
                    case "building": return Building
                    case "trending-up":
                    case "trendingup": return TrendingUp
                    case "calculator": return Calculator
                    case "handshake": return Handshake
                    default:

                      return Shield
                  }
                }
                const IconComponent = getIcon(principle?.icon || 'shield')
                const getIconColor = (index: number) => {
                  const colors = ["blue", "green", "yellow"]
                  return colors[index % colors.length]
                }
                const color = getIconColor(index)

                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`w-8 h-8 bg-${color}-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1`}>
                      <IconComponent className={`h-4 w-4 text-${color}-600`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">{principle?.title || ''}</h3>
                      <p className="text-gray-600">{principle?.description || ''}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Услуги - Новый современный дизайн */}
        <div className="mb-16">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              {aboutData.services?.title || "Наши услуги"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Полный спектр профессиональных услуг для комфортной покупки автомобиля
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aboutData?.services?.items?.map((service, index) => (
              <div key={index} className="group">
                <div className="relative bg-white border border-gray-200 rounded-3xl p-8 hover:shadow-2xl hover:border-blue-200 transition-all duration-500 h-full transform hover:-translate-y-2">
                  {/* Декоративный градиент */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500 rounded-t-3xl"></div>

                  {/* Галочка */}
                  <div className="relative mb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <Check className="h-7 w-7 text-white stroke-[3]" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  </div>

                  {/* Контент */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                      {service?.title || ''}
                    </h3>
                    <p className="text-gray-600 leading-relaxed line-height-7">
                      {service?.description || ''}
                    </p>
                  </div>

                  {/* Декоративный элемент внизу */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Дополнительный блок с преимуществами */}
          <div className="mt-16 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-8 lg:p-12">
            <div className="text-center mb-10">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                Почему выбирают нас
              </h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Мы гордимся нашим подходом к работе и результатами, которых достигаем
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Гарантия качества", desc: "Все автомобили проходят тщательную проверку" },
                { title: "Прозрачность", desc: "Полная информация о каждом автомобиле" },
                { title: "Быстрое оформление", desc: "Минимум бумажной волокиты" },
                { title: "Поддержка 24/7", desc: "Всегда готовы помочь нашим клиентам" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md">
                    <Check className="h-6 w-6 text-green-500 stroke-[3]" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Реквизиты */}
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Реквизиты компании</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Общая информация</h3>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <span className="font-medium">Полное наименование:</span> {aboutData?.companyInfo?.fullName || ''}
                  </p>
                  <p>
                    <span className="font-medium">УНП:</span> {aboutData?.companyInfo?.unp || ''}
                  </p>
                  <p>
                    <span className="font-medium">Дата регистрации:</span> {aboutData?.companyInfo?.registrationDate || ''}
                  </p>
                  <p>
                    <span className="font-medium">Юридический адрес:</span> {aboutData?.companyInfo?.legalAddress || ''}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Банковские реквизиты</h3>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <span className="font-medium">Расчетный счет:</span> {aboutData?.bankDetails?.account || ''}
                  </p>
                  <p>
                    <span className="font-medium">Банк:</span> {aboutData?.bankDetails?.bankName || ''}
                  </p>
                  <p>
                    <span className="font-medium">БИК:</span> {aboutData?.bankDetails?.bik || ''}
                  </p>
                  <p>
                    <span className="font-medium">Адрес банка:</span> {aboutData?.bankDetails?.bankAddress || ''}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
