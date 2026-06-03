import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Calendar,
  HardHat,
  MapPin,
  FileText,
  Image as ImageIcon,
  Clock,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function ClientProjectPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const session = await auth()
  if (!session?.user) redirect("/login")

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
  })
  if (!user) redirect("/login")

  const cp = await prisma.clientProject.findUnique({
    where: { id },
    include: { project: true },
  })

  if (!cp) notFound()

  if (user.role !== "ADMIN" && cp.clientId !== user.id) {
    redirect("/panel")
  }

  return (
    <div className="min-h-screen bg-muted">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/panel"
          className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al panel
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-primary">{cp.project.title}</h1>
              <p className="mt-2 text-secondary leading-relaxed">{cp.project.description}</p>
            </div>

            {cp.photos.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-primary mb-4">
                  <ImageIcon className="h-5 w-5 text-accent" />
                  Fotos de la obra
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  {cp.photos.map((photo, i) => (
                    <div
                      key={i}
                      className="relative aspect-[16/10] overflow-hidden rounded-xl bg-secondary-100"
                      style={{
                        backgroundImage: `url(${photo})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {cp.documents.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-primary mb-4">
                  <FileText className="h-5 w-5 text-accent" />
                  Documentos
                </h3>
                <div className="grid gap-3">
                  {cp.documents.map((doc, i) => (
                    <a
                      key={i}
                      href={doc}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border bg-white p-4 hover:bg-muted transition-colors"
                    >
                      <FileText className="h-5 w-5 text-accent" />
                      <span className="text-sm font-medium text-primary">
                        Documento {i + 1}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {cp.timeline && (
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold text-primary mb-4">
                  <Calendar className="h-5 w-5 text-accent" />
                  Cronograma
                </h3>
                <div className="rounded-xl border bg-white p-6">
                  <pre className="text-sm text-secondary whitespace-pre-wrap font-sans">
                    {cp.timeline}
                  </pre>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-xl border bg-white p-6">
              <h3 className="font-semibold text-primary mb-4">Avance de Obra</h3>
              <div className="text-center">
                <div className="relative mx-auto flex h-28 w-28 items-center justify-center">
                  <svg className="h-28 w-28 -rotate-90" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="8"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="#F97316"
                      strokeWidth="8"
                      strokeDasharray={`${(cp.progress / 100) * 339.292} 339.292`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-2xl font-bold text-primary">
                    {cp.progress}%
                  </span>
                </div>
                <p className="mt-3 text-sm text-secondary">completado</p>
              </div>

              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-secondary">Estado</span>
                  <span
                    className={`font-medium ${
                      cp.project.status === "COMPLETADO"
                        ? "text-green-600"
                        : cp.project.status === "EN_PROCESO"
                          ? "text-accent"
                          : "text-secondary"
                    }`}
                  >
                    {cp.project.status === "COMPLETADO"
                      ? "Completado"
                      : cp.project.status === "EN_PROCESO"
                        ? "En Proceso"
                        : "Planificado"}
                  </span>
                </div>
                {cp.project.area && (
                  <div className="flex justify-between">
                    <span className="text-secondary">Área</span>
                    <span className="font-medium text-primary">
                      {cp.project.area.toLocaleString()} m²
                    </span>
                  </div>
                )}
                {cp.project.executionTime && (
                  <div className="flex justify-between">
                    <span className="text-secondary">Duración</span>
                    <span className="font-medium text-primary">
                      {cp.project.executionTime}
                    </span>
                  </div>
                )}
                {cp.project.location && (
                  <div className="flex justify-between">
                    <span className="text-secondary">Ubicación</span>
                    <span className="font-medium text-primary text-right max-w-[160px]">
                      {cp.project.location}
                    </span>
                  </div>
                )}
                {cp.startDate && (
                  <div className="flex justify-between">
                    <span className="text-secondary">Inicio</span>
                    <span className="font-medium text-primary">
                      {new Date(cp.startDate).toLocaleDateString("es-PA")}
                    </span>
                  </div>
                )}
                {cp.endDate && (
                  <div className="flex justify-between">
                    <span className="text-secondary">Fin estimado</span>
                    <span className="font-medium text-primary">
                      {new Date(cp.endDate).toLocaleDateString("es-PA")}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-xl border bg-primary p-6 text-center">
              <h3 className="font-semibold text-white">¿Tienes dudas?</h3>
              <p className="mt-2 text-sm text-primary-200">
                Contáctanos directamente por WhatsApp
              </p>
              <Button variant="accent" className="mt-4 w-full" asChild>
                <a
                  href={`https://wa.me/50760000000?text=${encodeURIComponent(`Hola, soy cliente y tengo una consulta sobre el proyecto "${cp.project.title}".`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
