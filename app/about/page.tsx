"use client"

import { useState, useEffect } from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Users, Award, Clock } from "lucide-react"

export default function AboutPage() {
  const [aboutData, setAboutData] = useState({
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

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAboutData()
  }, [])

  const loadAboutData = async () => {
    try {
      const aboutDoc = await getDoc(doc(db, "pages", "about"))
      if (aboutDoc.exists()) {
        const data = aboutDoc.data()
        setAboutData({
          ...aboutData,
          ...data,
          stats: data.stats?.map((stat, index) => ({
            ...stat,
            icon: [Users, Award, Shield, Clock][index] || Users
          })) || aboutData.stats
        })
      }
    } catch (error) {
      console.error("Ошибка загрузки данных:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container px-4 py-8">
        {/* Хлебные крошки */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <a href="/" className="hover:text-blue-600">
                Главная
              </a>
            </li>
            <li>/</li>
            <li className="text-gray-900">О нас</li>
          </ol>
        </nav>

        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">О компании "АвтоБел Центр"</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Мы помогаем людям найти идеальный автомобиль уже более 12 лет. Наша миссия — сделать покупку автомобиля
            простой, безопасной и выгодной.
          </p>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-12">
          {aboutData.stats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-sm bg-gradient-to-br from-white to-gray-50/80">
              <CardContent className="p-3 lg:p-6 text-center">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 lg:mb-3 shadow-md">
                  <stat.icon className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
                </div>
                <div className="text-lg lg:text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-xs lg:text-sm text-gray-600 leading-tight">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Наша история</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Компания "АвтоБел Центр" была основана в 2012 году с простой идеей: сделать покупку подержанного автомобиля
                максимально прозрачной и безопасной для покупателя.
              </p>
              <p>
                За годы работы мы выработали строгие стандарты отбора автомобилей, создали собственную систему проверки
                технического состояния и юридической чистоты каждого автомобиля в нашем каталоге.
              </p>
              <p>
                Сегодня "АвтоБел Центр" — это команда профессионалов, которая помогает тысячам белорусов найти автомобиль
                мечты по справедливой цене.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Наши принципы</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Shield className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Честность и прозрачность</h3>
                  <p className="text-gray-600">
                    Мы предоставляем полную информацию о каждом автомобиле, включая историю обслуживания и возможные
                    недостатки.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Award className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Качество превыше всего</h3>
                  <p className="text-gray-600">
                    Каждый автомобиль проходит тщательную проверку нашими специалистами перед попаданием в каталог.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="h-4 w-4 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Клиент — наш приоритет</h3>
                  <p className="text-gray-600">
                    Мы сопровождаем клиента на всех этапах покупки: от выбора до оформления документов.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Услуги */}
        <div className="mb-16">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-8">Наши услуги</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200 bg-gradient-to-br from-blue-50 to-white">
              <CardContent className="p-4 lg:p-6 text-center">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Shield className="h-6 w-6 lg:h-7 lg:w-7 text-white" />
                </div>
                <h3 className="text-lg lg:text-xl font-semibold mb-2 text-gray-900">Проверка автомобилей</h3>
                <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                  Комплексная диагностика технического состояния и проверка юридической чистоты
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200 bg-gradient-to-br from-green-50 to-white">
              <CardContent className="p-4 lg:p-6 text-center">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Award className="h-6 w-6 lg:h-7 lg:w-7 text-white" />
                </div>
                <h3 className="text-lg lg:text-xl font-semibold mb-2 text-gray-900">Гарантия</h3>
                <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                  Предоставляем гарантию на каждый проданный автомобиль сроком до 6 месяцев
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm hover:shadow-md transition-shadow duration-200 bg-gradient-to-br from-amber-50 to-white md:col-span-3 lg:col-span-1">
              <CardContent className="p-4 lg:p-6 text-center">
                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Users className="h-6 w-6 lg:h-7 lg:w-7 text-white" />
                </div>
                <h3 className="text-lg lg:text-xl font-semibold mb-2 text-gray-900">Кредитование</h3>
                <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                  Помощь в оформлении автокредита в партнерских банках на выгодных условиях
                </p>
              </CardContent>
            </Card>
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
                    <span className="font-medium">Полное наименование:</span> {aboutData.companyInfo.fullName}
                  </p>
                  <p>
                    <span className="font-medium">УНП:</span> {aboutData.companyInfo.unp}
                  </p>
                  <p>
                    <span className="font-medium">Дата регистрации:</span> {aboutData.companyInfo.registrationDate}
                  </p>
                  <p>
                    <span className="font-medium">Юридический адрес:</span> {aboutData.companyInfo.legalAddress}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Банковские реквизиты</h3>
                <div className="space-y-2 text-gray-600">
                  <p>
                    <span className="font-medium">Расчетный счет:</span> {aboutData.bankDetails.account}
                  </p>
                  <p>
                    <span className="font-medium">Банк:</span> {aboutData.bankDetails.bankName}
                  </p>
                  <p>
                    <span className="font-medium">БИК:</span> {aboutData.bankDetails.bik}
                  </p>
                  <p>
                    <span className="font-medium">Адрес банка:</span> {aboutData.bankDetails.bankAddress}
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
