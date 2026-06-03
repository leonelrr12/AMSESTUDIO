"use client"

import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DeleteProjectButton({ id, title }: { id: string; title: string }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm(`¿Eliminar "${title}"? Esta acción no se puede deshacer.`)) return

    const res = await fetch(`/api/admin/proyectos?id=${id}`, { method: "DELETE" })
    if (res.ok) {
      router.refresh()
    } else {
      alert("Error al eliminar el proyecto")
    }
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleDelete} className="text-red-500 hover:text-red-700 hover:bg-red-50">
      <Trash2 className="h-4 w-4" />
    </Button>
  )
}
