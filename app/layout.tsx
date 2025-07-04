import type React from "react"
import type { Metadata } from "next"
import { Inter, Montserrat } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import MobileDock from "@/components/mobile-dock"

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="geo.region" content="BY-MI" />
        <meta name="geo.placename" content="Минск" />
        <meta name="geo.position" content="53.9045;27.5615" />
        <meta name="ICBM" content="53.9045, 27.5615" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoDealer",
              "name": "Белавто Центр",
              "description": "Продажа качественных автомобилей с пробегом в Минске",
              "url": "https://autobelcenter.by",
              "logo": "https://autobelcenter.by/logo.png",
              "image": "https://autobelcenter.by/logo.png",
              "telephone": "+375291234567",
              "email": "info@autobelcenter.by",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Большое Стиклево 83",
                "addressLocality": "Минск",
                "addressCountry": "BY",
                "postalCode": "220000"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "53.9045",
                "longitude": "27.5615"
              },
              "openingHours": [
                "Mo-Fr 09:00-21:00",
                "Sa-Su 10:00-19:00"
              ],
              "sameAs": [
                "https://www.instagram.com/autobelcenter",
                "https://t.me/autobelcenter"
              ],
              "areaServed": {
                "@type": "Country",
                "name": "Belarus"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Автомобили с пробегом",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Car",
                      "name": "Автомобили с пробегом"
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${montserrat.variable} font-sans`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileDock />
      </body>
    </html>
  )
}
