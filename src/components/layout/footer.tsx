import Link from "next/link"
import { Building2, MapPin, Phone, Mail, Clock } from "lucide-react"

const PHONE = "+507 6000-0000"
const EMAIL = "info@amsestudio.com"
const ADDRESS = "Vía España, Panamá, República de Panamá"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-100">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
              <Building2 className="h-6 w-6 text-accent" />
              <span>Ams<span className="text-accent">Estudio</span></span>
            </Link>
            <p className="text-sm text-primary-200 leading-relaxed">
              Empresa panameña de arquitectura y construcción. Desarrollamos hogares,
              comunidades y ciudades para el futuro con calidad, seguridad e innovación.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Servicios</h3>
            <ul className="space-y-2.5">
              {[
                "Construcción Residencial",
                "Urbanizaciones",
                "Infraestructura",
                "Remodelaciones",
                "Diseño Arquitectónico",
              ].map((item) => (
                <li key={item}>
                  <Link href="/#servicios" className="text-sm text-primary-200 hover:text-accent transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Enlaces</h3>
            <ul className="space-y-2.5">
              {[
                { href: "/", label: "Inicio" },
                { href: "/#nosotros", label: "Nosotros" },
                { href: "/#proyectos", label: "Proyectos" },
                { href: "/#contacto", label: "Contacto" },
                { href: "/blog", label: "Blog" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-primary-200 hover:text-accent transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 text-accent shrink-0" />
                <span className="text-sm text-primary-200">{ADDRESS}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-accent shrink-0" />
                <a href={`tel:${PHONE}`} className="text-sm text-primary-200 hover:text-accent transition-colors">
                  {PHONE}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-accent shrink-0" />
                <a href={`mailto:${EMAIL}`} className="text-sm text-primary-200 hover:text-accent transition-colors">
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 text-accent shrink-0" />
                <span className="text-sm text-primary-200">Lun–Vie: 8:00 AM – 5:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-700 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-300">
            &copy; {new Date().getFullYear()} AmsEstudio. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-primary-300">
            <Link href="/privacidad" className="hover:text-accent transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/terminos" className="hover:text-accent transition-colors">
              Términos y Condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
