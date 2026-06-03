import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ProjectForm } from "@/components/admin/project-form"

export default function NuevoProyectoPage() {
  return (
    <div className="min-h-screen bg-muted">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href="/admin/proyectos"
          className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a proyectos
        </Link>
        <h1 className="text-2xl font-bold text-primary">Nuevo Proyecto</h1>
        <p className="text-secondary mt-1 mb-8">Agrega un nuevo proyecto al portafolio</p>
        <div className="rounded-xl border bg-white p-6 sm:p-8">
          <ProjectForm />
        </div>
      </div>
    </div>
  )
}
