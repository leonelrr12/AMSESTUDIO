"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Building2, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/presupuesto", label: "Calculadora" },
  { href: "/blog", label: "Blog" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#contacto", label: "Contacto" },
]

const PHONE = "50760000000"
const PHONE_DISPLAY = "+507 6000-0000"

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <Building2 className="h-6 w-6 text-accent" />
          <span>Ams<span className="text-accent">Estudio</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-secondary-600 hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href={`tel:${PHONE}`} className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-accent transition-colors">
            <Phone className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
          <Button size="sm" variant="accent" asChild>
            <a href="/#contacto">Solicitar Cotización</a>
          </Button>
        </div>

        <button
          className="md:hidden p-2 text-secondary-600 hover:text-primary"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div className={cn(
        "fixed inset-0 top-16 z-40 bg-white md:hidden transition-all duration-300",
        open ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      )}>
        <nav className="flex flex-col p-6 gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-lg font-medium py-2 text-secondary-600 hover:text-primary border-b border-secondary-100"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 space-y-3">
            <Button variant="primary" className="w-full" asChild>
              <a href="/#contacto">Solicitar Cotización</a>
            </Button>
            <a href={`tel:${PHONE}`} className="flex items-center justify-center gap-2 text-sm font-medium text-primary py-2">
              <Phone className="h-4 w-4" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
