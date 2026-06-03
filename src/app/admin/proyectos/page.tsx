import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DeleteProjectButton } from "@/components/admin/delete-project-button"

async function getProjects() {
  return prisma.project.findMany({
    orderBy: { projectOrder: "asc" },
  })
}

export default async function AdminProyectosPage() {
  const projects = await getProjects()

  return (
    <div className="min-h-screen bg-muted">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-primary">Administrar Proyectos</h1>
            <p className="text-secondary mt-1">Gestiona los proyectos del portafolio</p>
          </div>
          <Button asChild>
            <Link href="/admin/proyectos/nuevo">
              <Plus className="h-4 w-4" />
              Nuevo Proyecto
            </Link>
          </Button>
        </div>

        <div className="rounded-xl border bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 font-medium text-primary">Orden</th>
                <th className="text-left p-4 font-medium text-primary">Título</th>
                <th className="text-left p-4 font-medium text-primary">Tipo</th>
                <th className="text-left p-4 font-medium text-primary">Estado</th>
                <th className="text-left p-4 font-medium text-primary">Año</th>
                <th className="text-right p-4 font-medium text-primary">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-muted/50">
                  <td className="p-4 text-secondary">{project.projectOrder}</td>
                  <td className="p-4 font-medium text-primary">{project.title}</td>
                  <td className="p-4 text-secondary">{project.type}</td>
                  <td className="p-4">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      project.status === "COMPLETADO" ? "bg-green-100 text-green-700" :
                      project.status === "EN_PROCESO" ? "bg-accent-100 text-accent-700" :
                      "bg-secondary-100 text-secondary-700"
                    }`}>
                      {project.status === "COMPLETADO" ? "Completado" :
                       project.status === "EN_PROCESO" ? "En Proceso" : "Planificado"}
                    </span>
                  </td>
                  <td className="p-4 text-secondary">{project.year || "-"}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/proyectos/${project.id}/editar`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <DeleteProjectButton id={project.id} title={project.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
