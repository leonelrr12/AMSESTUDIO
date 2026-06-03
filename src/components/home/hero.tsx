"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
    title: "Construimos hogares, comunidades y ciudades para el futuro",
    subtitle: "Arquitectura y construcción con calidad, seguridad e innovación",
  },
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
    title: "Proyectos residenciales que superan expectativas",
    subtitle: "Diseño moderno, acabados de lujo, entrega puntual",
  },
  {
    image: "https://images.unsplash.com/photo-1541888946425-d81bb6a179b0?w=1920&q=80",
    title: "Desarrollamos urbanizaciones completas",
    subtitle: "Infraestructura, diseño urbano y sostenibilidad",
  },
]

export function Hero() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), [])
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), [])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="relative h-[85vh] min-h-[500px] max-h-[800px] overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
      ))}

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl animate-fade-in-up">
          <span className="inline-block rounded-full bg-accent/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent mb-6">
            Arquitectura y Construcción
          </span>
          <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {slides[current].title}
          </h1>
          <p className="mt-4 text-lg text-white/80 sm:text-xl max-w-xl">
            {slides[current].subtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" variant="accent" asChild>
              <Link href="/#contacto">Solicitar Cotización</Link>
            </Button>
            <Button size="lg" variant="white" asChild>
              <a
                href={`https://wa.me/50760000000?text=${encodeURIComponent("Hola, me gustaría solicitar información sobre sus servicios de construcción.")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm hover:bg-white/20 transition-all"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white backdrop-blur-sm hover:bg-white/20 transition-all"
        aria-label="Siguiente"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${
              i === current ? "w-8 bg-accent" : "w-2 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Ir a slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
