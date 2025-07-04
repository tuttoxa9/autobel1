"use client"

import { useState, useEffect } from "react"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, Loader2, Plus, Trash2 } from "lucide-react"
import ImageUpload from "./image-upload"

export default function AdminCredit() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [creditData, setCreditData] = useState({
    title: "Автокредит на выгодных условиях",
    subtitle: "Получите кредит на автомобиль мечты уже сегодня",
    description:
      "Мы работаем с ведущими банками Беларуси и поможем вам получить автокредит на самых выгодных условиях.",
    partners: [
      {
        name: "Беларусбанк",
        logoUrl: "",
        minRate: 12,
        maxTerm: 84,
      },
      {
        name: "Альфа-Банк",
        logoUrl: "",
        minRate: 13,
        maxTerm: 72,
      },
      {
        name: "БПС-Сбербанк",
        logoUrl: "",
        minRate: 14,
        maxTerm: 60,
      },
    ],
  })

  useEffect(() => {
    loadCreditData()
  }, [])

  const loadCreditData = async () => {
    try {
      const creditDoc = await getDoc(doc(db, "pages", "credit"))
      if (creditDoc.exists()) {
        setCreditData(creditDoc.data())
      }
    } catch (error) {
      console.error("Ошибка загрузки данных:", error)
    } finally {
      setLoading(false)
    }
  }

  const saveCreditData = async () => {
    setSaving(true)
    try {
      await setDoc(doc(db, "pages", "credit"), creditData)
      alert("Данные сохранены!")
    } catch (error) {
      console.error("Ошибка сохранения:", error)
      alert("Ошибка сохранения данных")
    } finally {
      setSaving(false)
    }
  }

  const addPartner = () => {
    setCreditData({
      ...creditData,
      partners: [
        ...creditData.partners,
        {
          name: "",
          logoUrl: "",
          minRate: 12,
          maxTerm: 60,
        },
      ],
    })
  }

  const updatePartner = (index, field, value) => {
    const newPartners = [...creditData.partners]
    newPartners[index] = { ...newPartners[index], [field]: value }
    setCreditData({ ...creditData, partners: newPartners })
  }

  const removePartner = (index) => {
    const newPartners = creditData.partners.filter((_, i) => i !== index)
    setCreditData({ ...creditData, partners: newPartners })
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
        <h2 className="text-2xl font-bold text-white">Страница "Кредит"</h2>
        <Button onClick={saveCreditData} disabled={saving} className="bg-gradient-to-r from-purple-500 to-blue-500">
          {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
          Сохранить
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Основная информация */}
        <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Основная информация</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-white">Заголовок</Label>
              <Input
                value={creditData.title}
                onChange={(e) => setCreditData({ ...creditData, title: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Подзаголовок</Label>
              <Input
                value={creditData.subtitle}
                onChange={(e) => setCreditData({ ...creditData, subtitle: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <div>
              <Label className="text-white">Описание</Label>
              <Textarea
                value={creditData.description}
                onChange={(e) => setCreditData({ ...creditData, description: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Банки-партнеры */}
        <Card className="bg-slate-800/50 backdrop-blur-lg border-slate-700">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Банки-партнеры</CardTitle>
              <Button onClick={addPartner} size="sm" className="bg-gradient-to-r from-purple-500 to-blue-500">
                <Plus className="h-4 w-4 mr-2" />
                Добавить банк
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {creditData.partners.map((partner, index) => (
              <div key={index} className="p-4 bg-slate-700/50 rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-white font-medium">Банк {index + 1}</h4>
                  <Button
                    onClick={() => removePartner(index)}
                    size="sm"
                    variant="outline"
                    className="border-red-500 text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white">Название банка</Label>
                    <Input
                      value={partner.name}
                      onChange={(e) => updatePartner(index, "name", e.target.value)}
                      className="bg-slate-600 border-slate-500 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Минимальная ставка (%)</Label>
                    <Input
                      type="number"
                      value={partner.minRate}
                      onChange={(e) => updatePartner(index, "minRate", Number(e.target.value))}
                      className="bg-slate-600 border-slate-500 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Максимальный срок (мес.)</Label>
                    <Input
                      type="number"
                      value={partner.maxTerm}
                      onChange={(e) => updatePartner(index, "maxTerm", Number(e.target.value))}
                      className="bg-slate-600 border-slate-500 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Логотип банка</Label>
                    <ImageUpload
                      onUpload={(url) => updatePartner(index, "logoUrl", url)}
                      path={`banks/${partner.name}`}
                      currentImage={partner.logoUrl}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
