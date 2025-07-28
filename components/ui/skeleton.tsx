import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-200", className)}
      {...props}
    />
  )
}

// Скелетон для страницы "О нас"
function AboutPageSkeleton() {
  return (
    <div className="min-h-[calc(100vh-120px)] bg-gray-50 pb-24 md:pb-0">
      <div className="container mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-128 mx-auto" />
        </div>

        {/* Основной контент */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
            {/* Секция истории */}
            <div className="space-y-4">
              <Skeleton className="h-8 w-48" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>

            {/* Секция миссии */}
            <div className="space-y-4">
              <Skeleton className="h-8 w-32" />
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>

            {/* Преимущества */}
            <div className="space-y-4">
              <Skeleton className="h-8 w-64" />
              <div className="grid md:grid-cols-2 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <Skeleton className="h-12 w-12 rounded-lg flex-shrink-0" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Скелетон для страницы контактов
function ContactsPageSkeleton() {
  return (
    <div className="min-h-[calc(100vh-120px)] bg-gray-50 pb-24 md:pb-0">
      <div className="container mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Контактная информация */}
            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
              <Skeleton className="h-8 w-48" />

              {/* Контактные блоки */}
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <Skeleton className="h-12 w-12 rounded-lg flex-shrink-0" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              ))}

              {/* Социальные сети */}
              <div className="space-y-4">
                <Skeleton className="h-6 w-40" />
                <div className="flex space-x-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-10 rounded-lg" />
                  ))}
                </div>
              </div>
            </div>

            {/* Карта */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <Skeleton className="h-96 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Скелетон для страницы кредитов
function CreditPageSkeleton() {
  return (
    <div className="min-h-[calc(100vh-120px)] bg-gray-50 pb-24 md:pb-0">
      <div className="container mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-80 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Описание */}
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-4">
            <Skeleton className="h-8 w-64" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>

          {/* Условия кредитования */}
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
            <Skeleton className="h-8 w-56" />

            <div className="grid md:grid-cols-2 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          </div>

          {/* Банки-партнеры */}
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
            <Skeleton className="h-8 w-48" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Скелетон для страницы лизинга
function LeasingPageSkeleton() {
  return (
    <div className="min-h-[calc(100vh-120px)] bg-gray-50 pb-24 md:pb-0">
      <div className="container mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-72 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Калькулятор */}
            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
              <Skeleton className="h-8 w-56" />

              {/* Поля калькулятора */}
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-12 w-full rounded-lg" />
                  </div>
                ))}
              </div>

              {/* Результат */}
              <div className="space-y-4 pt-4 border-t">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-8 w-48" />
              </div>
            </div>

            {/* Условия лизинга */}
            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
              <Skeleton className="h-8 w-48" />

              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <Skeleton className="h-10 w-10 rounded-lg flex-shrink-0" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Скелетон для страницы политики конфиденциальности
function PrivacyPageSkeleton() {
  return (
    <div className="min-h-[calc(100vh-120px)] bg-gray-50 pb-24 md:pb-0">
      <div className="container mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-80 mx-auto" />
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
            {/* Разделы политики */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-7 w-64" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
                {i < 5 && <div className="border-b border-gray-200 pt-4"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Скелетон для выбора банка в деталях автомобиля
function BankSelectSkeleton() {
  return (
    <div className="text-center py-4">
      <div className="flex justify-center mb-2">
        <Skeleton className="h-6 w-6 rounded-full" />
      </div>
      <Skeleton className="h-4 w-48 mx-auto" />
    </div>
  )
}

// Скелетон для загрузки банков в деталях автомобиля
function BankLoadingSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
    </div>
  )
}

// Скелетон для страницы отзывов
function ReviewsPageSkeleton() {
  return (
    <div className="min-h-[calc(100vh-120px)] bg-gray-50 pb-24 md:pb-0">
      <div className="container mx-auto px-4 py-8">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Сетка отзывов */}
          <div className="grid md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
                {/* Заголовок отзыва */}
                <div className="flex items-start space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <div className="flex space-x-1">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Skeleton key={starIndex} className="h-4 w-4 rounded-sm" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Текст отзыва */}
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>

                {/* Дата */}
                <div className="pt-2 border-t">
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>

          {/* Форма добавления отзыва */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 space-y-6">
            <Skeleton className="h-8 w-48" />

            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-32 w-full rounded-lg" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-20" />
                <div className="flex space-x-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Skeleton key={i} className="h-8 w-8 rounded-sm" />
                  ))}
                </div>
              </div>
              <Skeleton className="h-12 w-32 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export {
  Skeleton,
  AboutPageSkeleton,
  ContactsPageSkeleton,
  CreditPageSkeleton,
  LeasingPageSkeleton,
  PrivacyPageSkeleton,
  BankSelectSkeleton,
  BankLoadingSkeleton,
  ReviewsPageSkeleton
}
