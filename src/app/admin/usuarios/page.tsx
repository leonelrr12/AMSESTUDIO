import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Plus, Pencil, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function AdminUsuariosPage() {
  const users = await prisma.user.findMany({
    include: { projects: { include: { project: true } } },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="min-h-screen bg-muted">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-primary">Administrar Usuarios</h1>
            <p className="text-secondary mt-1">Gestiona los clientes y sus proyectos asignados</p>
          </div>
          <Button asChild>
            <Link href="/admin/usuarios/nuevo">
              <UserPlus className="h-4 w-4" />
              Nuevo Usuario
            </Link>
          </Button>
        </div>

        <div className="rounded-xl border bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 font-medium text-primary">Nombre</th>
                <th className="text-left p-4 font-medium text-primary">Email</th>
                <th className="text-left p-4 font-medium text-primary">Rol</th>
                <th className="text-left p-4 font-medium text-primary">Proyectos</th>
                <th className="text-left p-4 font-medium text-primary">Creado</th>
                <th className="text-right p-4 font-medium text-primary">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-muted/50">
                  <td className="p-4 font-medium text-primary">{user.name}</td>
                  <td className="p-4 text-secondary">{user.email}</td>
                  <td className="p-4">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        user.role === "ADMIN"
                          ? "bg-primary-100 text-primary"
                          : "bg-secondary-100 text-secondary-700"
                      }`}
                    >
                      {user.role === "ADMIN" ? "Admin" : "Cliente"}
                    </span>
                  </td>
                  <td className="p-4 text-secondary">
                    {user.projects.length} proyecto{user.projects.length !== 1 ? "s" : ""}
                  </td>
                  <td className="p-4 text-secondary">
                    {new Date(user.createdAt).toLocaleDateString("es-PA")}
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/admin/usuarios/${user.id}/editar`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
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
