"use client"

import { useState, type FormEvent } from "react"
import { Send, Loader2, Phone, Mail, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const PHONE = "+507 6000-0000"
const EMAIL = "info@amsestudio.com"
const ADDRESS = "Vía España, Panamá, República de Panamá"

const projectTypes = [
  "Construcción Residencial",
  "Urbanización",
  "Infraestructura",
  "Remodelación",
  "Diseño Arquitectónico",
  "Otro",
]

export function Contact() {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    projectType: "",
    message: "",
  })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSending(true)
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        setSent(true)
        setForm({ name: "", phone: "", email: "", projectType: "", message: "" })
      }
    } catch {
      // falla silenciosa
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contacto" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-primary-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
            Contacto
          </span>
          <h2 className="text-3xl font-bold text-primary sm:text-4xl">
            Solicita tu cotización
          </h2>
          <p className="mt-4 text-lg text-secondary">
            Cuéntanos sobre tu proyecto y te responderemos en menos de 24 horas.
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div>
            {sent ? (
              <div className="flex flex-col items-center justify-center rounded-xl border bg-accent-50 p-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-white">
                  <Send className="h-7 w-7" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-primary">¡Mensaje enviado!</h3>
                <p className="mt-2 text-secondary">
                  Gracias por contactarnos. Te responderemos a la brevedad.
                </p>
                <Button variant="outline" className="mt-6" onClick={() => setSent(false)}>
                  Enviar otro mensaje
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input
                      id="name"
                      placeholder="Tu nombre"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+507 6000-0000"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectType">Tipo de proyecto</Label>
                  <select
                    id="projectType"
                    required
                    value={form.projectType}
                    onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                    className="flex h-11 w-full rounded-lg border border-secondary-200 bg-white px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
                  >
                    <option value="">Selecciona un tipo</option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea
                    id="message"
                    placeholder="Describe tu proyecto, metros cuadrados, ubicación, etc."
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
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
                      Enviar Cotización
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>

          <div className="space-y-8">
            <div className="rounded-xl border bg-muted p-8">
              <h3 className="text-lg font-semibold text-primary mb-6">
                Información de Contacto
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-accent shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-primary">Dirección</div>
                    <div className="text-sm text-secondary">{ADDRESS}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-accent shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-primary">Teléfono</div>
                    <a href={`tel:${PHONE}`} className="text-sm text-secondary hover:text-accent transition-colors">
                      {PHONE}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-accent shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-primary">Email</div>
                    <a href={`mailto:${EMAIL}`} className="text-sm text-secondary hover:text-accent transition-colors">
                      {EMAIL}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 text-accent shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-primary">Horario</div>
                    <div className="text-sm text-secondary">Lunes a Viernes: 8:00 AM – 5:00 PM</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-muted p-8">
              <h3 className="text-lg font-semibold text-primary mb-4">
                ¿Por qué elegirnos?
              </h3>
              <ul className="space-y-3">
                {[
                  "Más de 15 años de experiencia en Panamá",
                  "Proyectos entregados a tiempo y dentro del presupuesto",
                  "Materiales de primera calidad y acabados superiores",
                  "Atención personalizada durante todo el proceso",
                  "Garantía en todas nuestras obras",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-secondary">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="overflow-hidden rounded-xl border">
              <div className="aspect-[16/9] bg-secondary-100 flex items-center justify-center text-secondary text-sm">
                <MapPin className="h-8 w-8 mr-2" />
                Mapa de ubicación — Vía España, Panamá
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
