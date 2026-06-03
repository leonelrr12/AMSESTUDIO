import Link from "next/link"
import Image from "next/image"
import { prisma } from "@/lib/prisma"
import { Building2, Home, Road } from "lucide-react"

const typeIcons = {
  VIVIENDA: Home,
  URBANIZACION: Building2,
  INFRAESTRUCTURA: Road,
}

const typeLabels = {
  VIVIENDA: "Viviendas",
  URBANIZACION: "Urbanizaciones",
  INFRAESTRUCTURA: "Infraestructura",
}

async function getProjects() {
  return prisma.project.findMany({
    orderBy: { projectOrder: "asc" },
  })
}

export default async function ProyectosPage() {
  const projects = await getProjects()
  const types = ["TODOS", ...new Set(projects.map((p) => p.type))] as const

  return (
    <div className="min-h-screen">
      <section className="bg-primary py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent mb-4">
            Portafolio
          </span>
          <h1 className="text-4xl font-bold text-white sm:text-5xl">Nuestros Proyectos</h1>
          <p className="mt-4 text-lg text-primary-200 max-w-2xl mx-auto">
            Conoce los proyectos que hemos desarrollado. Cada obra refleja nuestro compromiso
            con la calidad, la innovación y la satisfacción del cliente.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-10" role="tablist">
            {types.map((type) => {
              const label = type === "TODOS" ? "Todos" : typeLabels[type as keyof typeof typeLabels]
              const href = type === "TODOS" ? "/proyectos" : `/proyectos?tipo=${type.toLowerCase()}`
              const isActive = true
              return (
                <Link
                  key={type}
                  href={href}
                  className="rounded-full px-5 py-2 text-sm font-medium transition-colors bg-primary text-white"
                >
                  {label}
                </Link>
              )
            })}
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => {
              const Icon = typeIcons[project.type as keyof typeof typeIcons]
              return (
                <Link
                  key={project.id}
                  href={`/proyectos/${project.slug}`}
                  className="group rounded-xl border bg-white shadow-sm overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={project.images[0] || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
                      <Icon className="h-3.5 w-3.5" />
                      {typeLabels[project.type as keyof typeof typeLabels]}
                    </div>
                    {project.featured && (
                      <div className="absolute top-3 right-3 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                        Destacado
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-primary group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-secondary line-clamp-2">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-3 text-xs text-secondary-500">
                      {project.area && (
                        <span className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                          {project.area.toLocaleString()} m²
                        </span>
                      )}
                      {project.executionTime && (
                        <span className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                          {project.executionTime}
                        </span>
                      )}
                      {project.year && (
                        <span className="flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                          {project.year}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
