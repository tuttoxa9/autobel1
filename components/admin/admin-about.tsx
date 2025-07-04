"use client"

import { useState, useEffect } from "react"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, Loader2 } from "lucide-react"

export default function AdminAbout() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [aboutData, setAboutData] = useState({
    stats: [
      { label: "Довольных клиентов", value: "2500+" },
      { label: "Лет на рынке", value: "12" },
      { label: "Проданных автомобилей", value: "5000+" },
      { label: "Среднее время продажи", value: "7 дней" },
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

  useEffect(() => {
    loadAboutData()
  }, [])

  const loadAboutData = async () => {
    try {
      const aboutDoc = await getDoc(doc(db, "pages", "about"))
      if (aboutDoc.exists()) {
        setAboutData(aboutDoc.data())
      }
    } catch (error) {
      console.error("Ошибка загрузки данных:", error)
    } finally {
      setLoading(false)
    }
  }

  const saveAboutData = async () => {
    setSaving(true)
    try {
      await setDoc(doc(db, "pages", "about"), aboutData)
      alert("Данные сохранены!")
    } catch (error) {
      console.error("Ошибка сохранения:", error)
      alert("Ошибка сохранения данных")
    } finally {
      setSaving(false)
    }
  }

  const updateStat = (index, field, value) => {
    const newStats = [...aboutData.stats]
    newStats[index] = { ...newStats[index], [field]: value }
    setAboutData({ ...aboutData, stats: newStats })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Страница "О нас"</h2>
        <Button onClick={saveAboutData} disabled={saving} className="bg-gradient-to-r from-purple-500 to-blue-500">
          {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          Сохранить
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Статистика */}
        <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Статистика</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {aboutData.stats.map((stat, index) => (
              <div key={index} className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">Название</Label>
                  <Input
                    value={stat.label}
                    onChange={(e) => updateStat(index, "label", e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white">Значение</Label>
                  <Input
                    value={stat.value}
                    onChange={(e) => updateStat(index, "value", e.target.value)}
                    className="bg-slate-700 border-slate-600 text-white"
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Информация о компании */}
        <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Информация о компании</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-white">Полное наименование</Label>
              <Input
                value={aboutData.companyInfo.fullName}
                onChange={(e) =>
                  setAboutData({
                    ...aboutData,
                    companyInfo: { ...aboutData.companyInfo, fullName: e.target.value },
                  })
                }
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-white">УНП</Label>
              <Input
                value={aboutData.companyInfo.unp}
                onChange={(e) =>
                  setAboutData({
                    ...aboutData,
                    companyInfo: { ...aboutData.companyInfo, unp: e.target.value },
                  })
                }
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Дата регистрации</Label>
              <Input
                value={aboutData.companyInfo.registrationDate}
                onChange={(e) =>
                  setAboutData({
                    ...aboutData,
                    companyInfo: { ...aboutData.companyInfo, registrationDate: e.target.value },
                  })
                }
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Юридический адрес</Label>
              <Input
                value={aboutData.companyInfo.legalAddress}
                onChange={(e) =>
                  setAboutData({
                    ...aboutData,
                    companyInfo: { ...aboutData.companyInfo, legalAddress: e.target.value },
                  })
                }
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Банковские реквизиты */}
        <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Банковские реквизиты</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-white">Расчетный счет</Label>
              <Input
                value={aboutData.bankDetails.account}
                onChange={(e) =>
                  setAboutData({
                    ...aboutData,
                    bankDetails: { ...aboutData.bankDetails, account: e.target.value },
                  })
                }
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Банк</Label>
              <Input
                value={aboutData.bankDetails.bankName}
                onChange={(e) =>
                  setAboutData({
                    ...aboutData,
                    bankDetails: { ...aboutData.bankDetails, bankName: e.target.value },
                  })
                }
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-white">БИК</Label>
              <Input
                value={aboutData.bankDetails.bik}
                onChange={(e) =>
                  setAboutData({
                    ...aboutData,
                    bankDetails: { ...aboutData.bankDetails, bik: e.target.value },
                  })
                }
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Адрес банка</Label>
              <Input
                value={aboutData.bankDetails.bankAddress}
                onChange={(e) =>
                  setAboutData({
                    ...aboutData,
                    bankDetails: { ...aboutData.bankDetails, bankAddress: e.target.value },
                  })
                }
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
