"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, CreditCard, CheckCircle, Building, Percent, Clock } from "lucide-react"
import { doc, getDoc, addDoc, collection } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface CreditPageSettings {
  title: string
  subtitle: string
  description: string
  benefits: Array<{
    icon: string
    title: string
    description: string
  }>
  partners: Array<{
    name: string
    logoUrl: string
    minRate: number
    maxTerm: number
  }>
}

export default function CreditPage() {
  const [settings, setSettings] = useState<CreditPageSettings>({
    title: "Автокредит на выгодных условиях",
    subtitle: "Получите кредит на автомобиль мечты уже сегодня",
    description:
      "Мы работаем с ведущими банками Беларуси и поможем вам получить автокредит на самых выгодных условиях. Минимальный пакет документов, быстрое рассмотрение заявки.",
    benefits: [
      {
        icon: "percent",
        title: "Низкие процентные ставки",
        description: "От 12% годовых в белорусских рублях",
      },
      {
        icon: "clock",
        title: "Быстрое оформление",
        description: "Рассмотрение заявки в течение 1 дня",
      },
      {
        icon: "building",
        title: "Надежные банки-партнеры",
        description: "Работаем только с проверенными банками",
      },
    ],
    partners: [
      {
        name: "Беларусбанк",
        logoUrl: "/placeholder.svg?height=60&width=120",
        minRate: 12,
        maxTerm: 84,
      },
      {
        name: "Альфа-Банк",
        logoUrl: "/placeholder.svg?height=60&width=120",
        minRate: 13,
        maxTerm: 72,
      },
      {
        name: "БПС-Сбербанк",
        logoUrl: "/placeholder.svg?height=60&width=120",
        minRate: 14,
        maxTerm: 60,
      },
    ],
  })

  const [calculator, setCalculator] = useState({
    carPrice: [50000],
    downPayment: [15000],
    loanTerm: [36],
    interestRate: [15],
  })

  const [creditForm, setCreditForm] = useState({
    name: "",
    phone: "",
    email: "",
    carPrice: "",
    downPayment: "",
    loanTerm: "",
    bank: "",
    message: "",
  })

  useEffect(() => {
    loadPageSettings()
  }, [])

  const loadPageSettings = async () => {
    try {
      const pageDoc = await getDoc(doc(db, "pages", "credit"))
      if (pageDoc.exists()) {
        setSettings(pageDoc.data() as CreditPageSettings)
      }
    } catch (error) {
      console.error("Ошибка загрузки настроек страницы кредита:", error)
    }
  }

  const calculateMonthlyPayment = () => {
    const principal = calculator.carPrice[0] - calculator.downPayment[0]
    const monthlyRate = calculator.interestRate[0] / 100 / 12
    const numPayments = calculator.loanTerm[0]

    if (monthlyRate === 0) {
      return principal / numPayments
    }

    const monthlyPayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
      (Math.pow(1 + monthlyRate, numPayments) - 1)

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
        ...creditForm,
        type: "credit_request",
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
            ...creditForm,
            type: 'credit_request',
          }),
        })
      } catch (telegramError) {
        console.error('Ошибка отправки в Telegram:', telegramError)
      }

      setCreditForm({
        name: "",
        phone: "",
        email: "",
        carPrice: "",
        downPayment: "",
        loanTerm: "",
        bank: "",
        message: "",
      })
      alert("Заявка на кредит отправлена! Мы свяжемся с вами в ближайшее время.")
    } catch (error) {
      console.error("Ошибка отправки заявки:", error)
      alert("Произошла ошибка. Попробуйте еще раз.")
    }
  }

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "percent":
        return Percent
      case "clock":
        return Clock
      case "building":
        return Building
      default:
        return CreditCard
    }
  }

  const monthlyPayment = calculateMonthlyPayment()
  const totalAmount = monthlyPayment * calculator.loanTerm[0]
  const overpayment = totalAmount - (calculator.carPrice[0] - calculator.downPayment[0])

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
            <li className="text-gray-900">Кредит</li>
          </ol>
        </nav>

        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{settings.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{settings.subtitle}</p>
          <p className="text-gray-700 max-w-3xl mx-auto">{settings.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Кредитный калькулятор */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="h-6 w-6 mr-2" />
                  Кредитный калькулятор
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Стоимость автомобиля: {formatCurrency(calculator.carPrice[0])}</Label>
                  <Slider
                    value={calculator.carPrice}
                    onValueChange={(value) => setCalculator({ ...calculator, carPrice: value })}
                    max={200000}
                    min={10000}
                    step={5000}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Первоначальный взнос: {formatCurrency(calculator.downPayment[0])}</Label>
                  <Slider
                    value={calculator.downPayment}
                    onValueChange={(value) => setCalculator({ ...calculator, downPayment: value })}
                    max={calculator.carPrice[0] * 0.8}
                    min={calculator.carPrice[0] * 0.1}
                    step={1000}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Срок кредита: {calculator.loanTerm[0]} мес.</Label>
                  <Slider
                    value={calculator.loanTerm}
                    onValueChange={(value) => setCalculator({ ...calculator, loanTerm: value })}
                    max={84}
                    min={12}
                    step={6}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Процентная ставка: {calculator.interestRate[0]}%</Label>
                  <Slider
                    value={calculator.interestRate}
                    onValueChange={(value) => setCalculator({ ...calculator, interestRate: value })}
                    max={25}
                    min={10}
                    step={0.5}
                    className="mt-2"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                  <div className="flex justify-between">
                    <span>Сумма кредита:</span>
                    <span className="font-semibold">
                      {formatCurrency(calculator.carPrice[0] - calculator.downPayment[0])}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ежемесячный платеж:</span>
                    <span className="font-semibold text-blue-600">{formatCurrency(monthlyPayment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Общая сумма выплат:</span>
                    <span className="font-semibold">{formatCurrency(totalAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Переплата:</span>
                    <span className="font-semibold text-red-600">{formatCurrency(overpayment)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Форма заявки на кредит */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-6 w-6 mr-2" />
                  Заявка на кредит
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Ваше имя</Label>
                      <Input
                        id="name"
                        value={creditForm.name}
                        onChange={(e) => setCreditForm({ ...creditForm, name: e.target.value })}
                        placeholder="Введите ваше имя"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Номер телефона</Label>
                      <Input
                        id="phone"
                        value={creditForm.phone}
                        onChange={(e) => setCreditForm({ ...creditForm, phone: formatPhoneNumber(e.target.value) })}
                        placeholder="+375 XX XXX-XX-XX"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={creditForm.email}
                      onChange={(e) => setCreditForm({ ...creditForm, email: e.target.value })}
                      placeholder="your@email.com"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="carPrice">Стоимость автомобиля (BYN)</Label>
                      <Input
                        id="carPrice"
                        type="number"
                        value={creditForm.carPrice}
                        onChange={(e) => setCreditForm({ ...creditForm, carPrice: e.target.value })}
                        placeholder="50000"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="downPayment">Первоначальный взнос (BYN)</Label>
                      <Input
                        id="downPayment"
                        type="number"
                        value={creditForm.downPayment}
                        onChange={(e) => setCreditForm({ ...creditForm, downPayment: e.target.value })}
                        placeholder="15000"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="loanTerm">Срок кредита (месяцев)</Label>
                      <Select
                        value={creditForm.loanTerm}
                        onValueChange={(value) => setCreditForm({ ...creditForm, loanTerm: value })}
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
                          <SelectItem value="72">72 месяца</SelectItem>
                          <SelectItem value="84">84 месяца</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="bank">Предпочитаемый банк</Label>
                      <Select
                        value={creditForm.bank}
                        onValueChange={(value) => setCreditForm({ ...creditForm, bank: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите банк" />
                        </SelectTrigger>
                        <SelectContent>
                          {settings.partners && settings.partners.map((partner) => (
                            <SelectItem
                              key={partner.name}
                              value={partner.name.toLowerCase().replace(/[\s-]/g, '')}
                            >
                              {partner.name}
                            </SelectItem>
                          ))}
                          <SelectItem value="any">Любой банк</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Дополнительная информация</Label>
                    <Input
                      id="message"
                      value={creditForm.message}
                      onChange={(e) => setCreditForm({ ...creditForm, message: e.target.value })}
                      placeholder="Расскажите о ваших пожеланиях..."
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Отправить заявку на кредит
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Преимущества */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Преимущества автокредита</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {settings.benefits && settings.benefits.map((benefit, index) => {
              const IconComponent = getIcon(benefit.icon)
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Банки-партнеры */}
        <section className="py-16 bg-white rounded-lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Наши банки-партнеры</h2>
            <p className="text-gray-600">Работаем с ведущими банками Беларуси</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {settings.partners && settings.partners.map((partner, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <img
                    src={partner.logoUrl || "/placeholder.svg"}
                    alt={partner.name}
                    className="h-16 mx-auto mb-4 object-contain"
                  />
                  <h3 className="text-xl font-semibold mb-2">{partner.name}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Ставка от {partner.minRate}% годовых</p>
                    <p>Срок до {partner.maxTerm} месяцев</p>
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
