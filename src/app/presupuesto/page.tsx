import type { Metadata } from "next"
import { Calculator } from "@/components/calculator"
import { Ruler } from "lucide-react"

export const metadata: Metadata = {
  title: "Calculadora de Construcción",
  description:
    "Estima el costo de tu proyecto de construcción. Calculadora gratuita para viviendas, urbanizaciones y más.",
}

export default function PresupuestoPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-primary py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent mb-4">
            Calculadora
          </span>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Calculadora de Construcción</h1>
          <p className="mt-4 text-lg text-primary-200 max-w-2xl mx-auto">
            Estima el costo de tu proyecto en minutos. Selecciona el tipo, área y acabados
            para obtener un presupuesto aproximado.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Calculator />
        </div>
      </section>
    </div>
  )
}
