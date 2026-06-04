import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { WhatsAppButton } from "@/components/layout/whatsapp-button"
import { ChatBot } from "@/components/layout/chatbot"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const baseUrl = "https://amsestudio.com"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "AmsEstudio | Arquitectura y Construcción en Panamá",
    template: "%s | AmsEstudio",
  },
  description:
    "Empresa panameña de arquitectura y construcción. Construimos hogares, comunidades y ciudades. Viviendas, urbanizaciones, infraestructura y diseño arquitectónico.",
  keywords: [
    "construcción Panamá",
    "arquitectos Panamá",
    "urbanizaciones residenciales",
    "construcción de casas",
    "diseño arquitectónico",
    "construcción llave en mano",
    "remodelaciones Panamá",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "AmsEstudio | Arquitectura y Construcción en Panamá",
    description:
      "Construimos hogares, comunidades y ciudades para el futuro. Calidad, seguridad e innovación.",
    url: baseUrl,
    type: "website",
    locale: "es_PA",
    siteName: "AmsEstudio",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AmsEstudio | Arquitectura y Construcción en Panamá",
    description:
      "Construimos hogares, comunidades y ciudades para el futuro. Calidad, seguridad e innovación.",
    images: ["/opengraph-image.png"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AmsEstudio",
  url: baseUrl,
  logo: `${baseUrl}/opengraph-image.png`,
  description:
    "Empresa panameña de arquitectura y construcción. Construimos hogares, comunidades y ciudades.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "PA",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+507-6000-0000",
    contactType: "customer service",
    availableLanguage: "Spanish",
  },
  sameAs: [],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatBot />
        <WhatsAppButton />
      </body>
    </html>
  )
}
