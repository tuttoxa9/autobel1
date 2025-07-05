"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, Car, CheckCircle, Building, TrendingDown, Shield, Loader2 } from "lucide-react"
import { doc, getDoc, addDoc, collection } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface LeasingPageSettings {
  title: string
  subtitle: string
  description: string
  benefits: Array<{
    icon: string
    title: string
    description: string
  }>
  leasingCompanies: Array<{
    name: string
    logoUrl: string
    minAdvance: number
    maxTerm: number
  }>
}

export default function LeasingPage() {
  const [settings, setSettings] = useState<LeasingPageSettings | null>(null)
  const [loading, setLoading] = useState(true)

  const [calculator, setCalculator] = useState({
    carPrice: [80000],
    advance: [16000],
    leasingTerm: [36],
    residualValue: [20],
  })

  const [leasingForm, setLeasingForm] = useState({
    companyName: "",
    contactPerson: "",
    phone: "",
    email: "",
    unp: "",
    carPrice: "",
    advance: "",
    leasingTerm: "",
    company: "",
    message: "",
  })

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const doc_ref = doc(db, "pages", "leasing")
      const doc_snap = await getDoc(doc_ref)

      if (doc_snap.exists()) {
        setSettings(doc_snap.data() as LeasingPageSettings)
      } else {
        // Default fallback data only if no data exists
        setSettings({
          title: "Лизинг автомобилей для бизнеса",
          subtitle: "Выгодное решение для предпринимателей и юридических лиц",
          description: "Лизинг автомобилей - это удобный способ получить транспорт для бизнеса без больших первоначальных затрат.",
          benefits: [],
          leasingCompanies: []
        })
      }
    } catch (error) {
      console.error("Ошибка загрузки настроек:", error)
    } finally {
      setLoading(false)
    }
  }

  const calculateMonthlyPayment = () => {
    const carPrice = calculator.carPrice[0]
    const advance = calculator.advance[0]
    const term = calculator.leasingTerm[0]
    const residualValue = (carPrice * calculator.residualValue[0]) / 100

    const leasingAmount = carPrice - advance - residualValue
    const monthlyPayment = leasingAmount / term

    return monthlyPayment
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("ru-BY", {
      style: "currency",
      currency: "BYN",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.startsWith("375")) {
      const formatted = numbers.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "+$1 $2 $3-$4-$5")
      return formatted
    }
    return value
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Сохраняем в Firebase
      await addDoc(collection(db, "leads"), {
        ...leasingForm,
        type: "leasing_request",
        status: "new",
        createdAt: new Date(),
      })

      // Отправляем уведомление в Telegram
      try {
        await fetch('/api/send-telegram', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: leasingForm.contactPerson,
            phone: leasingForm.phone,
            email: leasingForm.email,
            carPrice: leasingForm.carPrice,
            downPayment: leasingForm.advance,
            loanTerm: leasingForm.leasingTerm,
            message: leasingForm.message,
            type: 'leasing_request',
          }),
        })
      } catch (telegramError) {
        console.error('Ошибка отправки в Telegram:', telegramError)
      }

      setLeasingForm({
        companyName: "",
        contactPerson: "",
        phone: "",
        email: "",
        unp: "",
        carPrice: "",
        advance: "",
        leasingTerm: "",
        company: "",
        message: "",
      })
      alert("Заявка на лизинг отправлена! Мы свяжемся с вами в ближайшее время.")
    } catch (error) {
      console.error("Ошибка отправки заявки:", error)
      alert("Произошла ошибка. Попробуйте еще раз.")
    }
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "trending-down":
        return TrendingDown
      case "shield":
        return Shield
      case "building":
        return Building
      default:
        return Car
    }
  }

  const monthlyPayment = calculateMonthlyPayment()
  const residualValue = (calculator.carPrice[0] * calculator.residualValue[0]) / 100
  const totalPayments = monthlyPayment * calculator.leasingTerm[0] + calculator.advance[0]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Загружаем информацию о лизинге</h2>
          <p className="text-gray-600">Подбираем лучшие условия для вашего бизнеса...</p>
        </div>
      </div>
    )
  }

  if (!settings) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Не удалось загрузить информацию о лизинге</p>
        </div>
      </div>
    )
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
            <li className="text-gray-900">Лизинг</li>
          </ol>
        </nav>

        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{settings?.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{settings?.subtitle}</p>
          <p className="text-gray-700 max-w-3xl mx-auto">{settings?.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Лизинговый калькулятор */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="h-6 w-6 mr-2" />
                  Лизинговый калькулятор
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Стоимость автомобиля: {formatCurrency(calculator.carPrice[0])}</Label>
                  <Slider
                    value={calculator.carPrice}
                    onValueChange={(value) => setCalculator({ ...calculator, carPrice: value })}
                    max={300000}
                    min={20000}
                    step={5000}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Авансовый платеж: {formatCurrency(calculator.advance[0])}</Label>
                  <Slider
                    value={calculator.advance}
                    onValueChange={(value) => setCalculator({ ...calculator, advance: value })}
                    max={calculator.carPrice[0] * 0.5}
                    min={calculator.carPrice[0] * 0.1}
                    step={1000}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Срок лизинга: {calculator.leasingTerm[0]} мес.</Label>
                  <Slider
                    value={calculator.leasingTerm}
                    onValueChange={(value) => setCalculator({ ...calculator, leasingTerm: value })}
                    max={60}
                    min={12}
                    step={6}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Остаточная стоимость: {calculator.residualValue[0]}%</Label>
                  <Slider
                    value={calculator.residualValue}
                    onValueChange={(value) => setCalculator({ ...calculator, residualValue: value })}
                    max={50}
                    min={10}
                    step={5}
                    className="mt-2"
                  />
                </div>

                <div className="bg-green-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span>Авансовый платеж:</span>
                    <span className="font-semibold">{formatCurrency(calculator.advance[0])}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ежемесячный платеж:</span>
                    <span className="font-semibold text-green-600">{formatCurrency(monthlyPayment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Остаточная стоимость:</span>
                    <span className="font-semibold">{formatCurrency(residualValue)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Общая сумма платежей:</span>
                    <span className="font-semibold">{formatCurrency(totalPayments)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Форма заявки на лизинг */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Car className="h-6 w-6 mr-2" />
                  Заявка на лизинг
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">Название организации</Label>
                    <Input
                      id="companyName"
                      value={leasingForm.companyName}
                      onChange={(e) => setLeasingForm({ ...leasingForm, companyName: e.target.value })}
                      placeholder="ООО 'Ваша компания'"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactPerson">Контактное лицо</Label>
                      <Input
                        id="contactPerson"
                        value={leasingForm.contactPerson}
                        onChange={(e) => setLeasingForm({ ...leasingForm, contactPerson: e.target.value })}
                        placeholder="Иванов Иван Иванович"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="unp">УНП</Label>
                      <Input
                        id="unp"
                        value={leasingForm.unp}
                        onChange={(e) => setLeasingForm({ ...leasingForm, unp: e.target.value })}
                        placeholder="123456789"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Номер телефона</Label>
                      <Input
                        id="phone"
                        value={leasingForm.phone}
                        onChange={(e) => setLeasingForm({ ...leasingForm, phone: formatPhoneNumber(e.target.value) })}
                        placeholder="+375 XX XXX-XX-XX"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={leasingForm.email}
                        onChange={(e) => setLeasingForm({ ...leasingForm, email: e.target.value })}
                        placeholder="your@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="carPrice">Стоимость автомобиля (BYN)</Label>
                      <Input
                        id="carPrice"
                        type="number"
                        value={leasingForm.carPrice}
                        onChange={(e) => setLeasingForm({ ...leasingForm, carPrice: e.target.value })}
                        placeholder="80000"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="advance">Авансовый платеж (BYN)</Label>
                      <Input
                        id="advance"
                        type="number"
                        value={leasingForm.advance}
                        onChange={(e) => setLeasingForm({ ...leasingForm, advance: e.target.value })}
                        placeholder="16000"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="leasingTerm">Срок лизинга (месяцев)</Label>
                      <Select
                        value={leasingForm.leasingTerm}
                        onValueChange={(value) => setLeasingForm({ ...leasingForm, leasingTerm: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите срок" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="12">12 месяцев</SelectItem>
                          <SelectItem value="24">24 месяца</SelectItem>
                          <SelectItem value="36">36 месяцев</SelectItem>
                          <SelectItem value="48">48 месяцев</SelectItem>
                          <SelectItem value="60">60 месяцев</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="company">Лизинговая компания</Label>
                      <Select
                        value={leasingForm.company}
                        onValueChange={(value) => setLeasingForm({ ...leasingForm, company: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите компанию" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="belleasing">БелЛизинг</SelectItem>
                          <SelectItem value="leasingcenter">Лизинг-Центр</SelectItem>
                          <SelectItem value="autoleasing">АвтоЛизинг</SelectItem>
                          <SelectItem value="any">Любая компания</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Дополнительная информация</Label>
                    <Input
                      id="message"
                      value={leasingForm.message}
                      onChange={(e) => setLeasingForm({ ...leasingForm, message: e.target.value })}
                      placeholder="Расскажите о ваших пожеланиях..."
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Отправить заявку на лизинг
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Преимущества */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Преимущества лизинга</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {settings?.benefits?.map((benefit, index) => {
              const IconComponent = getIcon(benefit.icon)
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Лизинговые компании */}
        <section className="py-16 bg-white rounded-lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Наши партнеры по лизингу</h2>
            <p className="text-gray-600">Работаем с ведущими лизинговыми компаниями Беларуси</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {settings?.leasingCompanies?.map((company, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <img
                    src={company.logoUrl || "/placeholder.svg"}
                    alt={company.name}
                    className="h-16 mx-auto mb-4 object-contain"
                  />
                  <h3 className="text-xl font-semibold mb-2">{company.name}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Аванс от {company.minAdvance}%</p>
                    <p>Срок до {company.maxTerm} месяцев</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
