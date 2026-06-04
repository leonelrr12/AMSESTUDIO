import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { Calendar, MapPin, HardHat, Ruler, User, ChevronLeft, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

async function getProject(slug: string) {
  return prisma.project.findUnique({ where: { slug } })
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) return {}

  const typeLabels: Record<string, string> = {
    VIVIENDA: "Vivienda",
    URBANIZACION: "Urbanización",
    INFRAESTRUCTURA: "Infraestructura",
  }

  const baseUrl = "https://amsestudio.com"

  return {
    title: project.title,
    description: project.description.slice(0, 160),
    alternates: {
      canonical: `${baseUrl}/proyectos/${slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.description.slice(0, 160),
      url: `${baseUrl}/proyectos/${slug}`,
      type: "article",
      images: project.images[0] ? [{ url: project.images[0] }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description.slice(0, 160),
      images: project.images[0] ? [project.images[0]] : [],
    },
  }
}

export default async function ProyectoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) notFound()

  const typeLabels: Record<string, string> = {
    VIVIENDA: "Vivienda",
    URBANIZACION: "Urbanización",
    INFRAESTRUCTURA: "Infraestructura",
  }

  const statusLabels: Record<string, string> = {
    COMPLETADO: "Completado",
    EN_PROCESO: "En Proceso",
    PLANIFICADO: "Planificado",
  }

  const statusColors: Record<string, string> = {
    COMPLETADO: "bg-green-100 text-green-700",
    EN_PROCESO: "bg-accent-100 text-accent-700",
    PLANIFICADO: "bg-secondary-100 text-secondary-700",
  }

  return (
    <div className="min-h-screen">
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src={project.images[0] || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/proyectos"
              className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              Todos los proyectos
            </Link>
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{project.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[project.status]}`}>
                {statusLabels[project.status]}
              </span>
              <span className="text-sm text-white/70">{typeLabels[project.type]}</span>
              {project.year && <span className="text-sm text-white/70">{project.year}</span>}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-primary">Descripción del Proyecto</h2>
                <p className="mt-4 text-secondary leading-relaxed">{project.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {project.area && (
                  <div className="rounded-xl border bg-muted p-4 text-center">
                    <Ruler className="mx-auto h-5 w-5 text-accent" />
                    <div className="mt-2 text-lg font-bold text-primary">{project.area.toLocaleString()}</div>
                    <div className="text-xs text-secondary">m² construidos</div>
                  </div>
                )}
                {project.executionTime && (
                  <div className="rounded-xl border bg-muted p-4 text-center">
                    <Calendar className="mx-auto h-5 w-5 text-accent" />
                    <div className="mt-2 text-lg font-bold text-primary">{project.executionTime}</div>
                    <div className="text-xs text-secondary">tiempo de ejecución</div>
                  </div>
                )}
                {project.clientName && (
                  <div className="rounded-xl border bg-muted p-4 text-center">
                    <User className="mx-auto h-5 w-5 text-accent" />
                    <div className="mt-2 text-lg font-bold text-primary truncate max-w-[120px] mx-auto">
                      {project.clientName}
                    </div>
                    <div className="text-xs text-secondary">cliente</div>
                  </div>
                )}
              </div>

              {project.images.length > 1 && (
                <div>
                  <h3 className="text-xl font-bold text-primary mb-4">Galería</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {project.images.slice(1).map((image, i) => (
                      <div key={i} className="relative aspect-[16/10] overflow-hidden rounded-xl">
                        <Image
                          src={image}
                          alt={`${project.title} - Foto ${i + 2}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="rounded-xl border bg-muted p-6">
                <h3 className="font-semibold text-primary mb-4">Detalles del Proyecto</h3>
                <dl className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-secondary">Tipo</dt>
                    <dd className="font-medium text-primary">{typeLabels[project.type]}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-secondary">Estado</dt>
                    <dd className="font-medium text-primary">{statusLabels[project.status]}</dd>
                  </div>
                  {project.area && (
                    <div className="flex justify-between">
                      <dt className="text-secondary">Área</dt>
                      <dd className="font-medium text-primary">{project.area.toLocaleString()} m²</dd>
                    </div>
                  )}
                  {project.executionTime && (
                    <div className="flex justify-between">
                      <dt className="text-secondary">Duración</dt>
                      <dd className="font-medium text-primary">{project.executionTime}</dd>
                    </div>
                  )}
                  {project.clientName && (
                    <div className="flex justify-between">
                      <dt className="text-secondary">Cliente</dt>
                      <dd className="font-medium text-primary text-right max-w-[180px]">{project.clientName}</dd>
                    </div>
                  )}
                  {project.location && (
                    <div className="flex justify-between">
                      <dt className="text-secondary">Ubicación</dt>
                      <dd className="font-medium text-primary text-right max-w-[180px]">{project.location}</dd>
                    </div>
                  )}
                  {project.year && (
                    <div className="flex justify-between">
                      <dt className="text-secondary">Año</dt>
                      <dd className="font-medium text-primary">{project.year}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {project.videoUrl && (
                <div className="rounded-xl border overflow-hidden">
                  <iframe
                    src={project.videoUrl}
                    title="Video del proyecto"
                    className="w-full aspect-video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              <div className="rounded-xl border bg-primary p-6 text-center">
                <h3 className="font-semibold text-white">¿Quieres un proyecto similar?</h3>
                <p className="mt-2 text-sm text-primary-200">
                  Contáctanos y te asesoramos sin compromiso.
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  <Button variant="accent" className="w-full" asChild>
                    <Link href="/#contacto">Solicitar Cotización</Link>
                  </Button>
                  <Button
                    variant="white"
                    className="w-full"
                    asChild
                  >
                    <a
                      href={`https://wa.me/50760000000?text=${encodeURIComponent(`Hola, me gustaría información sobre el proyecto "${project.title}".`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Consultar por WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
