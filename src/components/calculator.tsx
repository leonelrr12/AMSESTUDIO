"use client"

import { useState, type FormEvent } from "react"
import {
  Ruler,
  Home,
  Paintbrush,
  Package,
  Calculator as CalculatorIcon,
  Send,
  Loader2,
  CheckCircle2,
  ChevronLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const projectTypes = [
  { value: "residencial", label: "Construcción Residencial", icon: Home, basePrice: 850 },
  { value: "urbanizacion", label: "Urbanización", icon: Home, basePrice: 600 },
  { value: "infraestructura", label: "Infraestructura", icon: Home, basePrice: 500 },
  { value: "remodelacion", label: "Remodelación", icon: Home, basePrice: 700 },
  { value: "diseno", label: "Diseño Arquitectónico", icon: Home, basePrice: 80 },
]

const finishLevels = [
  {
    value: "BASICO",
    label: "Básico",
    multiplier: 1.0,
    desc: "Acabados funcionales, materiales estándar",
    pricePerM2: 0,
  },
  {
    value: "ESTANDAR",
    label: "Estándar",
    multiplier: 1.25,
    desc: "Acabados de buena calidad, materiales modernos",
    pricePerM2: 0,
  },
  {
    value: "PREMIUM",
    label: "Premium",
    multiplier: 1.6,
    desc: "Acabados de lujo, materiales importados",
    pricePerM2: 0,
  },
]

const extrasList = [
  { value: "piscina", label: "Piscina", price: 20000 },
  { value: "jardineria", label: "Jardinería", price: 5000 },
  { value: "solar", label: "Sistema Solar", price: 8000 },
  { value: "inteligente", label: "Casa Inteligente", price: 5000 },
  { value: "cerca", label: "Cerca Perimetral", price: 3000 },
]

function estimateTime(m2: number, type: string): string {
  const base = type === "diseno" ? 1 : type === "remodelacion" ? 2 : 3
  const months = Math.round(Math.sqrt(m2 / 40) * base)
  if (months <= 1) return "1 mes"
  if (months >= 24) return `${Math.round(months / 6) * 6} meses`
  return `${months} meses`
}

function formatCurrency(n: number): string {
  return new Intl.NumberFormat("es-PA", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n)
}

export function Calculator() {
  const [step, setStep] = useState(1)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [result, setResult] = useState<{
    minCost: number
    maxCost: number
    estimatedTime: string
  } | null>(null)

  const [form, setForm] = useState({
    squareMeters: 100,
    projectType: "",
    finishLevel: "ESTANDAR",
    extras: [] as string[],
    name: "",
    phone: "",
    email: "",
    message: "",
  })

  function calc() {
    const type = projectTypes.find((t) => t.value === form.projectType)
    const finish = finishLevels.find((f) => f.value === form.finishLevel)
    if (!type || !finish) return

    const m2 = form.squareMeters
    const basePerM2 = type.basePrice
    const baseCost = m2 * basePerM2 * finish.multiplier
    const extrasCost = form.extras.reduce((sum, e) => {
      const extra = extrasList.find((x) => x.value === e)
      return sum + (extra?.price || 0)
    }, 0)

    const total = baseCost + extrasCost
    const variance = 0.15

    setResult({
      minCost: Math.round(total * (1 - variance)),
      maxCost: Math.round(total * (1 + variance)),
      estimatedTime: estimateTime(m2, form.projectType),
    })

    setStep(4)
  }

  function toggleExtra(value: string) {
    setForm((f) => ({
      ...f,
      extras: f.extras.includes(value) ? f.extras.filter((e) => e !== value) : [...f.extras, value],
    }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!result) return
    setSending(true)

    try {
      await fetch("/api/estimates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          squareMeters: form.squareMeters,
          projectType: form.projectType,
          finishLevel: form.finishLevel,
          extras: form.extras,
          estimatedCost: Math.round((result.minCost + result.maxCost) / 2),
          estimatedTime: result.estimatedTime,
          name: form.name,
          phone: form.phone,
          email: form.email,
          message: form.message,
        }),
      })
      setSent(true)
    } catch {
      // silent
    } finally {
      setSending(false)
    }
  }

  function reset() {
    setStep(1)
    setSent(false)
    setResult(null)
    setForm({
      squareMeters: 100,
      projectType: "",
      finishLevel: "ESTANDAR",
      extras: [],
      name: "",
      phone: "",
      email: "",
      message: "",
    })
  }

  const canNext =
    (step === 1 && form.projectType) ||
    (step === 2 && form.squareMeters > 0) ||
    (step === 3)

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-10 flex items-center justify-center gap-2">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                step > s
                  ? "bg-accent text-white"
                  : step === s
                    ? "bg-primary text-white"
                    : "bg-secondary-100 text-secondary-500"
              )}
            >
              {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
            </div>
            {s < 4 && <div className={cn("h-0.5 w-12", step > s ? "bg-accent" : "bg-secondary-200")} />}
          </div>
        ))}
      </div>

      {sent ? (
        <div className="rounded-2xl border bg-accent-50 p-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h3 className="mt-4 text-2xl font-bold text-primary">¡Cotización enviada!</h3>
          <p className="mt-2 text-secondary">
            Te contactaremos en menos de 24 horas para darte un presupuesto detallado.
          </p>
          <p className="mt-1 text-sm text-secondary-500">
            Costo estimado: {result && formatCurrency(result.minCost)} – {result && formatCurrency(result.maxCost)}
          </p>
          <Button variant="outline" className="mt-6" onClick={reset}>
            Calcular otro proyecto
          </Button>
        </div>
      ) : (
        <>
          {/* Step 1: Project type */}
          {step === 1 && (
            <div className="animate-fade-in-up">
              <div className="text-center mb-8">
                <span className="inline-block rounded-full bg-primary-50 px-4 py-1 text-xs font-semibold text-primary mb-3">
                  Paso 1 de 4
                </span>
                <h3 className="text-2xl font-bold text-primary">Tipo de proyecto</h3>
                <p className="mt-2 text-secondary">Selecciona el tipo de proyecto que deseas construir</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {projectTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setForm({ ...form, projectType: type.value })}
                    className={cn(
                      "rounded-xl border-2 p-6 text-left transition-all hover:shadow-md",
                      form.projectType === type.value
                        ? "border-accent bg-accent-50 shadow-sm"
                        : "border-secondary-200 bg-white hover:border-secondary-300"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
                        form.projectType === type.value ? "bg-accent text-white" : "bg-primary-50 text-primary"
                      )}
                    >
                      <type.icon className="h-6 w-6" />
                    </div>
                    <h4 className="mt-4 font-semibold text-primary">{type.label}</h4>
                    <p className="mt-1 text-sm text-secondary">Desde {formatCurrency(type.basePrice)}/m²</p>
                  </button>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button size="lg" disabled={!canNext} onClick={() => setStep(2)}>
                  Siguiente
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Area and finishes */}
          {step === 2 && (
            <div className="animate-fade-in-up">
              <div className="text-center mb-8">
                <span className="inline-block rounded-full bg-primary-50 px-4 py-1 text-xs font-semibold text-primary mb-3">
                  Paso 2 de 4
                </span>
                <h3 className="text-2xl font-bold text-primary">Dimensiones y acabados</h3>
                <p className="mt-2 text-secondary">Indica el área y el nivel de acabados deseado</p>
              </div>

              <div className="max-w-lg mx-auto space-y-8">
                <div className="rounded-xl border bg-muted p-6">
                  <Label className="text-base font-semibold text-primary">
                    Metros cuadrados: <span className="text-accent font-bold">{form.squareMeters} m²</span>
                  </Label>
                  <input
                    type="range"
                    min={20}
                    max={2000}
                    step={10}
                    value={form.squareMeters}
                    onChange={(e) => setForm({ ...form, squareMeters: Number(e.target.value) })}
                    className="mt-4 w-full accent-accent h-2 rounded-lg appearance-none cursor-pointer bg-secondary-200"
                  />
                  <div className="flex justify-between text-xs text-secondary mt-1">
                    <span>20 m²</span>
                    <span>2000 m²</span>
                  </div>
                </div>

                <div className="grid gap-4">
                  {finishLevels.map((finish) => (
                    <button
                      key={finish.value}
                      onClick={() => setForm({ ...form, finishLevel: finish.value })}
                      className={cn(
                        "rounded-xl border-2 p-4 text-left transition-all",
                        form.finishLevel === finish.value
                          ? "border-accent bg-accent-50"
                          : "border-secondary-200 bg-white hover:border-secondary-300"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-primary">{finish.label}</span>
                          <p className="text-sm text-secondary mt-0.5">{finish.desc}</p>
                        </div>
                        <span className="text-sm font-semibold text-accent">×{finish.multiplier}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex justify-center gap-4">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ChevronLeft className="h-4 w-4" />
                  Atrás
                </Button>
                <Button size="lg" onClick={() => setStep(3)}>
                  Siguiente
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Extras */}
          {step === 3 && (
            <div className="animate-fade-in-up">
              <div className="text-center mb-8">
                <span className="inline-block rounded-full bg-primary-50 px-4 py-1 text-xs font-semibold text-primary mb-3">
                  Paso 3 de 4
                </span>
                <h3 className="text-2xl font-bold text-primary">Extras (opcional)</h3>
                <p className="mt-2 text-secondary">Selecciona servicios adicionales para tu proyecto</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 max-w-xl mx-auto">
                {extrasList.map((extra) => (
                  <button
                    key={extra.value}
                    onClick={() => toggleExtra(extra.value)}
                    className={cn(
                      "rounded-xl border-2 p-5 text-left transition-all",
                      form.extras.includes(extra.value)
                        ? "border-accent bg-accent-50 shadow-sm"
                        : "border-secondary-200 bg-white hover:border-secondary-300"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-semibold text-primary">{extra.label}</span>
                      <span className="text-sm font-medium text-accent">+{formatCurrency(extra.price)}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-8 flex justify-center gap-4">
                <Button variant="outline" onClick={() => setStep(2)}>
                  <ChevronLeft className="h-4 w-4" />
                  Atrás
                </Button>
                <Button size="lg" onClick={calc}>
                  <CalculatorIcon className="h-4 w-4" />
                  Calcular
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Result + contact form */}
          {step === 4 && result && (
            <div className="animate-fade-in-up">
              <div className="text-center mb-8">
                <span className="inline-block rounded-full bg-primary-50 px-4 py-1 text-xs font-semibold text-primary mb-3">
                  Paso 4 de 4
                </span>
                <h3 className="text-2xl font-bold text-primary">Tu costo estimado</h3>
                <p className="mt-2 text-secondary">
                  Déjanos tus datos y te enviaremos un presupuesto detallado
                </p>
              </div>

              <div className="grid gap-8 lg:grid-cols-2">
                <div className="space-y-6">
                  <div className="rounded-2xl border-2 border-accent bg-accent-50 p-8 text-center">
                    <p className="text-sm text-secondary font-medium">Costo estimado</p>
                    <p className="mt-2 text-3xl font-bold text-primary">
                      {formatCurrency(result.minCost)}
                      <span className="text-lg text-secondary mx-2">–</span>
                      {formatCurrency(result.maxCost)}
                    </p>
                    <p className="mt-4 flex items-center justify-center gap-2 text-sm text-secondary">
                      <Ruler className="h-4 w-4 text-accent" />
                      {form.squareMeters} m² · {form.finishLevel === "BASICO" ? "Básico" : form.finishLevel === "ESTANDAR" ? "Estándar" : "Premium"}
                    </p>
                    <p className="flex items-center justify-center gap-2 text-sm text-secondary mt-1">
                      <Package className="h-4 w-4 text-accent" />
                      Tiempo estimado: <strong className="text-primary">{result.estimatedTime}</strong>
                    </p>
                    {form.extras.length > 0 && (
                      <p className="mt-3 text-xs text-secondary-500">
                        Incluye extras: {form.extras.map((e) => extrasList.find((x) => x.value === e)?.label).join(", ")}
                      </p>
                    )}
                  </div>

                  <div className="rounded-xl border bg-muted p-5">
                    <h4 className="font-semibold text-primary mb-3">Desglose</h4>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-secondary">Costo base ({form.squareMeters} m²)</dt>
                        <dd className="font-medium text-primary">
                          {formatCurrency(form.squareMeters * (projectTypes.find((t) => t.value === form.projectType)?.basePrice || 0))}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-secondary">Factor de acabados</dt>
                        <dd className="font-medium text-primary">
                          ×{finishLevels.find((f) => f.value === form.finishLevel)?.multiplier}
                        </dd>
                      </div>
                      {form.extras.length > 0 && (
                        <div className="flex justify-between">
                          <dt className="text-secondary">Extras</dt>
                          <dd className="font-medium text-primary">
                            +{formatCurrency(form.extras.reduce((s, e) => s + (extrasList.find((x) => x.value === e)?.price || 0), 0))}
                          </dd>
                        </div>
                      )}
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <dt className="text-primary">Rango estimado</dt>
                        <dd className="text-accent">
                          {formatCurrency(result.minCost)} – {formatCurrency(result.maxCost)}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                <div className="rounded-xl border bg-white p-6">
                  <h4 className="font-semibold text-primary mb-4">Recibe tu cotización</h4>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="calc-name">Nombre completo</Label>
                      <Input
                        id="calc-name"
                        required
                        placeholder="Tu nombre"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="calc-phone">Teléfono</Label>
                        <Input
                          id="calc-phone"
                          type="tel"
                          required
                          placeholder="+507 6000-0000"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="calc-email">Email</Label>
                        <Input
                          id="calc-email"
                          type="email"
                          required
                          placeholder="correo@ejemplo.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="calc-message">Comentarios adicionales</Label>
                      <Textarea
                        id="calc-message"
                        rows={3}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Indica cualquier detalle adicional..."
                      />
                    </div>
                    <Button type="submit" size="lg" className="w-full" disabled={sending}>
                      {sending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Recibir Cotización
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
