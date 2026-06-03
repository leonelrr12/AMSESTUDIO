import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { WhatsAppButton } from "@/components/layout/whatsapp-button"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
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
  openGraph: {
    title: "AmsEstudio | Arquitectura y Construcción en Panamá",
    description:
      "Construimos hogares, comunidades y ciudades para el futuro. Calidad, seguridad e innovación.",
    type: "website",
    locale: "es_PA",
    siteName: "AmsEstudio",
  },
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
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}
