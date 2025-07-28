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
        {/* Хлебные крошки */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm">
            <Skeleton className="h-4 w-16" />
            <span className="text-gray-400">/</span>
            <Skeleton className="h-4 w-12" />
          </ol>
        </nav>

        {/* Заголовок */}
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-12">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border-0 shadow-sm bg-gradient-to-br from-white to-gray-50/80 rounded-lg p-3 lg:p-6 text-center">
              <Skeleton className="w-10 h-10 lg:w-12 lg:h-12 rounded-full mx-auto mb-2 lg:mb-3" />
              <Skeleton className="h-6 lg:h-8 w-16 mx-auto mb-1" />
              <Skeleton className="h-3 lg:h-4 w-20 mx-auto" />
            </div>
          ))}
        </div>

        {/* Основной контент */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <Skeleton className="h-9 w-48 mb-6" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>

          <div>
            <Skeleton className="h-9 w-56 mb-6" />
            <div className="space-y-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                </div>
              ))}
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
        {/* Хлебные крошки */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm">
            <Skeleton className="h-4 w-16" />
            <span className="text-gray-400">/</span>
            <Skeleton className="h-4 w-16" />
          </ol>
        </nav>

        {/* Заголовок */}
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-56 mx-auto mb-4" />
          <Skeleton className="h-6 w-80 mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Левая колонка - Карта */}
          <div className="space-y-6">
            <div>
              <Skeleton className="h-8 w-40 mb-4" />
              <Skeleton className="h-72 lg:h-80 w-full rounded-xl" />
            </div>

            {/* Форма обратной связи под картой */}
            <div className="shadow-xl border-0 bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
                <Skeleton className="h-6 w-64 bg-white/20" />
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <Skeleton className="h-4 w-20 mb-1" />
                  <Skeleton className="h-10 w-full rounded" />
                </div>
                <div>
                  <Skeleton className="h-4 w-32 mb-1" />
                  <Skeleton className="h-10 w-full rounded" />
                </div>
                <div>
                  <Skeleton className="h-4 w-24 mb-1" />
                  <Skeleton className="h-24 w-full rounded" />
                </div>
                <Skeleton className="h-10 w-32 rounded" />
              </div>
            </div>
          </div>

          {/* Правая колонка - Контактная информация */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
              <Skeleton className="h-8 w-48" />

              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <Skeleton className="h-12 w-12 rounded-lg flex-shrink-0" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>

            {/* График работы */}
            <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
              <Skeleton className="h-6 w-32" />
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="flex justify-between items-center">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
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
      <div className="container px-4 py-8">
        {/* Хлебные крошки */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm">
            <Skeleton className="h-4 w-16" />
            <span className="text-gray-400">/</span>
            <Skeleton className="h-4 w-12" />
          </ol>
        </nav>

        {/* Заголовок */}
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-80 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto mb-6" />
          <Skeleton className="h-4 w-full max-w-3xl mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Кредитный калькулятор */}
          <div>
            <div className="bg-white rounded-lg shadow border p-6">
              <div className="border-b pb-4 mb-6">
                <div className="flex items-center">
                  <Skeleton className="h-6 w-6 mr-2" />
                  <Skeleton className="h-6 w-48" />
                </div>
              </div>
              <div className="space-y-4">
                {/* Переключатель валюты */}
                <div className="flex items-center space-x-2 p-2 bg-slate-50 rounded-lg">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-40" />
                </div>

                {/* Поля калькулятора */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i}>
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-6 w-full mb-1" />
                      <Skeleton className="h-10 w-full rounded" />
                    </div>
                  ))}
                </div>

                <div>
                  <Skeleton className="h-4 w-28 mb-2" />
                  <Skeleton className="h-6 w-full mb-1" />
                  <Skeleton className="h-10 w-full rounded" />
                </div>

                {/* Результаты */}
                <div className="pt-4 border-t space-y-2">
                  <Skeleton className="h-8 w-64" />
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-6 w-56" />
                </div>
              </div>
            </div>
          </div>

          {/* Условия кредитования */}
          <div>
            <div className="bg-white rounded-lg shadow border p-6 mb-6">
              <Skeleton className="h-6 w-48 mb-6" />
              <div className="space-y-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}
              </div>
            </div>

            {/* Банки-партнеры */}
            <div className="bg-white rounded-lg shadow border p-6">
              <Skeleton className="h-6 w-40 mb-6" />
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full rounded-lg" />
                ))}
              </div>
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
      <div className="container px-4 py-8">
        {/* Хлебные крошки */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm">
            <Skeleton className="h-4 w-16" />
            <span className="text-gray-400">/</span>
            <Skeleton className="h-4 w-12" />
          </ol>
        </nav>

        {/* Заголовок */}
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-72 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto mb-6" />
          <Skeleton className="h-4 w-full max-w-3xl mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Лизинговый калькулятор */}
          <div>
            <div className="bg-white rounded-lg shadow border p-6">
              <div className="border-b pb-4 mb-6">
                <div className="flex items-center">
                  <Skeleton className="h-6 w-6 mr-2" />
                  <Skeleton className="h-6 w-56" />
                </div>
              </div>
              <div className="space-y-4">
                {/* Поля калькулятора */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-10 w-full rounded" />
                  </div>
                ))}

                {/* Результат */}
                <div className="pt-4 border-t space-y-2">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-8 w-56" />
                  <Skeleton className="h-6 w-40" />
                </div>
              </div>
            </div>
          </div>

          {/* Форма заявки на лизинг */}
          <div>
            <div className="bg-white rounded-lg shadow border p-6">
              <div className="border-b pb-4 mb-6">
                <div className="flex items-center">
                  <Skeleton className="h-6 w-6 mr-2" />
                  <Skeleton className="h-6 w-40" />
                </div>
              </div>
              <div className="space-y-4">
                {/* Тип клиента */}
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <div className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </div>

                {/* Поля формы */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i}>
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-10 w-full rounded" />
                  </div>
                ))}

                <Skeleton className="h-10 w-full rounded bg-blue-200" />
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
      <div className="container px-4 py-8 max-w-4xl mx-auto">
        {/* Хлебные крошки */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm">
            <Skeleton className="h-4 w-16" />
            <span className="text-gray-400">/</span>
            <Skeleton className="h-4 w-32" />
          </ol>
        </nav>

        {/* Заголовок */}
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-96 mx-auto mb-4" />
          <Skeleton className="h-6 w-80 mx-auto mb-6" />
          <Skeleton className="h-4 w-full max-w-2xl mx-auto" />
        </div>

        {/* Содержание */}
        <div className="space-y-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-gradient-to-r from-blue-50 to-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <Skeleton className="h-6 w-64" />
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </div>
          ))}
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
      <div className="container px-4 py-8">
        {/* Хлебные крошки */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm">
            <Skeleton className="h-4 w-16" />
            <span className="text-gray-400">/</span>
            <Skeleton className="h-4 w-14" />
          </ol>
        </nav>

        {/* Заголовок */}
        <div className="text-center mb-12">
          <Skeleton className="h-12 w-80 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto mb-6" />
          <div className="flex items-center justify-center space-x-2">
            <div className="flex space-x-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-5 w-5" />
              ))}
            </div>
            <Skeleton className="h-6 w-8" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>

        {/* Сетка отзывов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
              {/* Заголовок отзыва */}
              <div className="flex items-center space-x-3 mb-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-5 w-24 mb-1" />
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Skeleton key={starIndex} className="h-4 w-4" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Модель автомобиля */}
              <Skeleton className="h-4 w-32 mb-2" />

              {/* Текст отзыва */}
              <div className="space-y-2 mb-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>

              {/* Дата */}
              <Skeleton className="h-3 w-20" />
            </div>
          ))}
        </div>

        {/* Форма добавления отзыва */}
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 space-y-6">
          <Skeleton className="h-8 w-48" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-10 w-full rounded" />
            </div>
            <div>
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-10 w-full rounded" />
            </div>
          </div>

          <div>
            <Skeleton className="h-4 w-28 mb-2" />
            <Skeleton className="h-24 w-full rounded" />
          </div>

          <div>
            <Skeleton className="h-4 w-20 mb-2" />
            <div className="flex space-x-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-8" />
              ))}
            </div>
          </div>

          <Skeleton className="h-10 w-32 rounded" />
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
