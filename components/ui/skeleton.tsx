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
  ContactsPageSkeleton,
  PrivacyPageSkeleton,
  BankSelectSkeleton,
  BankLoadingSkeleton,
  ReviewsPageSkeleton
}
