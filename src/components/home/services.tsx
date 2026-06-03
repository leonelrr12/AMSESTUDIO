import Link from "next/link"
import { Home, Building2, Road, Paintbrush, Compass } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  {
    icon: Home,
    title: "Construcción Residencial",
    description: "Casas unifamiliares, villas y edificios de apartamentos con acabados de primera calidad.",
    items: ["Casas unifamiliares", "Villas", "Edificios de apartamentos"],
  },
  {
    icon: Building2,
    title: "Urbanizaciones",
    description: "Diseño urbano integral con calles, aceras, drenajes y áreas verdes.",
    items: ["Diseño urbano", "Calles y aceras", "Drenajes"],
  },
  {
    icon: Road,
    title: "Infraestructura",
    description: "Vías, puentes y obras civiles para el desarrollo de ciudades.",
    items: ["Vías", "Puentes", "Obras civiles"],
  },
  {
    icon: Paintbrush,
    title: "Remodelaciones",
    description: "Transformamos espacios existentes en lugares modernos y funcionales.",
    items: ["Viviendas", "Oficinas", "Locales comerciales"],
  },
  {
    icon: Compass,
    title: "Diseño Arquitectónico",
    description: "Planos, renderizados 3D y diseño interior para tu proyecto ideal.",
    items: ["Planos", "Renderizados 3D", "Diseño interior"],
  },
]

export function Services() {
  return (
    <section id="servicios" className="bg-muted py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-primary-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-4">
            Servicios
          </span>
          <h2 className="text-3xl font-bold text-primary sm:text-4xl">
            Todo lo que necesitas para tu proyecto
          </h2>
          <p className="mt-4 text-lg text-secondary">
            Ofrecemos soluciones integrales de arquitectura y construcción.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-xl border bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-50 text-primary transition-colors group-hover:bg-accent group-hover:text-white">
                <service.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-primary">{service.title}</h3>
              <p className="mt-2 text-sm text-secondary leading-relaxed">{service.description}</p>
              <ul className="mt-4 space-y-1.5">
                {service.items.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-secondary-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" variant="primary" asChild>
            <Link href="/#contacto">Solicitar Cotización</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
