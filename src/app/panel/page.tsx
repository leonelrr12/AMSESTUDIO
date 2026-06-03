import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { FolderKanban, ChevronRight, Calendar, HardHat } from "lucide-react"

export default async function PanelPage() {
  const session = await auth()
  if (!session?.user) redirect("/login")

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    include: {
      projects: {
        include: { project: true },
        orderBy: { updatedAt: "desc" },
      },
    },
  })

  if (!user) redirect("/login")

  const isAdmin = user.role === "ADMIN"

  return (
    <div className="min-h-screen bg-muted">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-primary">
              Bienvenido, {user.name.split(" ")[0]}
            </h1>
            <p className="text-secondary mt-1">
              {isAdmin ? "Panel de administración" : "Tus proyectos y avances de obra"}
            </p>
          </div>
          <div className="flex gap-3">
            {isAdmin && (
              <Link
                href="/admin/proyectos"
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-600 transition-colors"
              >
                Admin Proyectos
              </Link>
            )}
            <Link
              href="/api/auth/signout"
              className="inline-flex items-center gap-1.5 rounded-lg border border-secondary-200 px-4 py-2 text-sm font-medium text-secondary hover:text-primary transition-colors"
            >
              Cerrar Sesión
            </Link>
          </div>
        </div>

        {isAdmin && (
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border bg-white p-5">
              <div className="text-2xl font-bold text-primary">
                {await prisma.project.count()}
              </div>
              <div className="text-sm text-secondary">Proyectos totales</div>
            </div>
            <div className="rounded-xl border bg-white p-5">
              <div className="text-2xl font-bold text-primary">
                {await prisma.clientProject.count()}
              </div>
              <div className="text-sm text-secondary">Clientes asignados</div>
            </div>
            <div className="rounded-xl border bg-white p-5">
              <div className="text-2xl font-bold text-primary">
                {await prisma.estimate.count()}
              </div>
              <div className="text-sm text-secondary">Cotizaciones recibidas</div>
            </div>
          </div>
        )}

        {user.projects.length === 0 ? (
          <div className="rounded-xl border bg-white p-12 text-center">
            <FolderKanban className="mx-auto h-12 w-12 text-secondary-300" />
            <h3 className="mt-4 text-lg font-semibold text-primary">
              No tienes proyectos asignados
            </h3>
            <p className="mt-2 text-secondary">
              {isAdmin
                ? "Asigna proyectos a los clientes desde la sección de usuarios."
                : "Pronto recibirás acceso a tus proyectos."}
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {user.projects.map((cp) => (
              <Link
                key={cp.id}
                href={`/panel/proyectos/${cp.id}`}
                className="group rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-primary group-hover:text-accent transition-colors">
                        {cp.project.title}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          cp.project.status === "COMPLETADO"
                            ? "bg-green-100 text-green-700"
                            : cp.project.status === "EN_PROCESO"
                              ? "bg-accent-100 text-accent-700"
                              : "bg-secondary-100 text-secondary-700"
                        }`}
                      >
                        {cp.project.status === "COMPLETADO"
                          ? "Completado"
                          : cp.project.status === "EN_PROCESO"
                            ? "En Proceso"
                            : "Planificado"}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-secondary line-clamp-1">
                      {cp.project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-4 text-xs text-secondary-500">
                      {cp.project.area && (
                        <span className="flex items-center gap-1">
                          <HardHat className="h-3.5 w-3.5" />
                          {cp.project.area.toLocaleString()} m²
                        </span>
                      )}
                      {cp.project.location && (
                        <span className="flex items-center gap-1">
                          {cp.project.location}
                        </span>
                      )}
                      {cp.updatedAt && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          Última actualización: {new Date(cp.updatedAt).toLocaleDateString("es-PA")}
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-secondary-300 group-hover:text-accent transition-colors shrink-0" />
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-secondary mb-1.5">
                    <span>Avance de obra</span>
                    <span className="font-semibold text-primary">{cp.progress}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-secondary-100">
                    <div
                      className="h-full rounded-full bg-accent transition-all duration-500"
                      style={{ width: `${cp.progress}%` }}
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
