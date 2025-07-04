import type React from "react"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import MobileDock from "@/components/mobile-dock"
import { UsdBynRateProvider } from "@/components/providers/usd-byn-rate-provider"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: '--font-inter',
})

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://autobelcenter.by'),
  title: {
    default: "Белавто Центр - Продажа автомобилей с пробегом в Беларуси",
    template: "%s | Белавто Центр"
  },
  description: "Большой выбор качественных автомобилей с пробегом. Гарантия, кредит, лизинг. Более 500 проверенных автомобилей в наличии в Минске.",
  keywords: [
    "автомобили с пробегом",
    "купить авто в Минске",
    "автосалон Минск",
    "подержанные автомобили Беларусь",
    "Белавто Центр",
    "автомобили в кредит",
    "лизинг авто",
    "проверенные автомобили",
    "качественные авто с пробегом"
  ],
  authors: [{ name: "Белавто Центр" }],
  creator: "Белавто Центр",
  publisher: "Белавто Центр",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://autobelcenter.by',
    siteName: 'Белавто Центр',
    title: 'Белавто Центр - Продажа автомобилей с пробегом в Беларуси',
    description: 'Большой выбор качественных автомобилей с пробегом. Гарантия, кредит, лизинг. Более 500 проверенных автомобилей в наличии в Минске.',
    images: [
      {
        url: 'https://autobelcenter.by/logo.png',
        width: 1200,
        height: 630,
        alt: 'Белавто Центр - логотип',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Белавто Центр - Продажа автомобилей с пробегом в Беларуси',
    description: 'Большой выбор качественных автомобилей с пробегом. Гарантия, кредит, лизинг.',
    images: ['https://autobelcenter.by/logo.png'],
    creator: '@autobelcenter',
  },
  verification: {
    google: 'google-site-verification',
    yandex: 'yandex-verification',
  },
  alternates: {
    canonical: 'https://autobelcenter.by',
    languages: {
      'ru-RU': 'https://autobelcenter.by',
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/favicon.ico',
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-sans min-h-screen bg-white flex flex-col">
        <UsdBynRateProvider>
          <Header />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
          <MobileDock />
        </UsdBynRateProvider>
      </body>
    </html>
  )
}
