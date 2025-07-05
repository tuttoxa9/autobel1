"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { getCachedImageUrl } from "@/lib/image-cache"

interface CreditCondition {
  id: string
  title: string
  description: string
  icon?: string
  isActive: boolean
  order: number
  createdAt: Date
}

export default function CreditConditions() {
  const [conditions, setConditions] = useState<CreditCondition[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadConditions()
  }, [])

  const loadConditions = async () => {
    try {
      const docRef = doc(db, "settings", "credit-conditions")
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const data = docSnap.data()
        if (data.conditions && Array.isArray(data.conditions)) {
          const activeConditions = data.conditions
            .filter((condition: CreditCondition) => condition.isActive)
            .sort((a: CreditCondition, b: CreditCondition) => a.order - b.order)
          setConditions(activeConditions)
        }
      }
    } catch (error) {
      console.error("Ошибка загрузки условий кредита:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-4 w-64 mx-auto"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-gray-200 rounded-lg h-32"></div>
          ))}
        </div>
      </div>
    )
  }

  if (!conditions.length) {
    return null
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Условия кредитования</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Ознакомьтесь с основными условиями получения автокредита в нашей компании
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {conditions.map((condition) => (
          <Card
            key={condition.id}
            className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 hover:border-l-blue-600"
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                {condition.icon && (
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                      <span className="text-xl">{condition.icon}</span>
                    </div>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {condition.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {condition.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Индивидуальный подход
          </h3>
          <p className="text-gray-600">
            Каждая заявка рассматривается индивидуально. Мы поможем найти оптимальное решение для вашей ситуации.
          </p>
        </div>
      </div>
    </div>
  )
}
