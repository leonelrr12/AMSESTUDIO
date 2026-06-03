"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    name: "María Fernanda R.",
    role: "Propietaria de vivienda",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    text: "Excelente calidad y cumplimiento en tiempos. Construyeron nuestra casa soñada y superaron todas nuestras expectativas. Muy profesionales y atentos a cada detalle.",
  },
  {
    name: "Carlos Mendoza",
    role: "Desarrollador inmobiliario",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    text: "Trabajamos con AmsEstudio en la urbanización Residencial Las Palmas. Entregaron antes de lo previsto y con una calidad impecable. Sin duda nuestro socio de confianza.",
  },
  {
    name: "Ana Lucía Torres",
    role: "Arquitecta asociada",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80",
    text: "Su capacidad de ejecución es impresionante. Los renderizados 3D y el diseño arquitectónico fueron clave para visualizar el proyecto antes de construirlo.",
  },
  {
    name: "Roberto Castillo",
    role: "CEO Constructora Castillo",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80",
    text: "Hemos subcontratado obras de infraestructura con ellos en tres proyectos. Siempre con los más altos estándares de seguridad y calidad. Altamente recomendados.",
  },
]

export function Testimonials() {
  const [current, setCurrent] = useState(0)

  const next = () => setCurrent((c) => (c + 1) % testimonials.length)
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)

  return (
    <section className="bg-primary py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent mb-4">
            Testimonios
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Lo que dicen nuestros clientes
          </h2>
          <p className="mt-4 text-lg text-primary-200">
            La satisfacción de nuestros clientes es nuestra mejor carta de presentación.
          </p>
        </div>

        <div className="relative mx-auto mt-14 max-w-3xl">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <div key={i} className="w-full shrink-0 px-4">
                  <div className="rounded-2xl bg-white/10 p-8 text-center backdrop-blur-sm">
                    <div className="flex justify-center gap-1">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} className="h-5 w-5 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="mt-6 text-lg leading-relaxed text-white/90 italic">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <div className="mt-6 flex items-center justify-center gap-4">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="h-12 w-12 rounded-full object-cover ring-2 ring-white/30"
                      />
                      <div className="text-left">
                        <div className="font-semibold text-white">{t.name}</div>
                        <div className="text-sm text-primary-200">{t.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2.5 text-white backdrop-blur-sm hover:bg-white/30 transition-all"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute -right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-2.5 text-white backdrop-blur-sm hover:bg-white/30 transition-all"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current ? "w-8 bg-accent" : "w-2 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Ir a testimonio ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
