"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const projectTypes = [
  { value: "VIVIENDA", label: "Vivienda" },
  { value: "URBANIZACION", label: "Urbanización" },
  { value: "INFRAESTRUCTURA", label: "Infraestructura" },
]

const projectStatuses = [
  { value: "COMPLETADO", label: "Completado" },
  { value: "EN_PROCESO", label: "En Proceso" },
  { value: "PLANIFICADO", label: "Planificado" },
]

export function ProjectForm({ project }: { project?: any }) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: project?.title || "",
    slug: project?.slug || "",
    description: project?.description || "",
    type: project?.type || "VIVIENDA",
    area: project?.area?.toString() || "",
    executionTime: project?.executionTime || "",
    status: project?.status || "COMPLETADO",
    featured: project?.featured || false,
    images: project?.images?.join("\n") || "",
    videoUrl: project?.videoUrl || "",
    clientName: project?.clientName || "",
    location: project?.location || "",
    year: project?.year?.toString() || "",
    projectOrder: project?.projectOrder?.toString() || "0",
  })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true)

    const payload = {
      ...form,
      area: form.area ? Number(form.area) : null,
      year: form.year ? Number(form.year) : null,
      projectOrder: Number(form.projectOrder),
      images: form.images.split("\n").map((s: string) => s.trim()).filter(Boolean),
    }

    const url = project
      ? `/api/admin/proyectos?id=${project.id}`
      : "/api/admin/proyectos"

    const res = await fetch(url, {
      method: project ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      router.push("/admin/proyectos")
      router.refresh()
    } else {
      alert("Error al guardar el proyecto")
    }
    setSaving(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Título</Label>
          <Input id="title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug (URL)</Label>
          <Input id="slug" required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Tipo</Label>
          <select
            id="type"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="flex h-11 w-full rounded-lg border border-secondary-200 bg-white px-4 py-2 text-sm"
          >
            {projectTypes.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Estado</Label>
          <select
            id="status"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="flex h-11 w-full rounded-lg border border-secondary-200 bg-white px-4 py-2 text-sm"
          >
            {projectStatuses.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="area">Área (m²)</Label>
          <Input id="area" type="number" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="executionTime">Tiempo de ejecución</Label>
          <Input id="executionTime" value={form.executionTime} onChange={(e) => setForm({ ...form, executionTime: e.target.value })} placeholder="ej: 8 meses" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="clientName">Cliente</Label>
          <Input id="clientName" value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Ubicación</Label>
          <Input id="location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="year">Año</Label>
          <Input id="year" type="number" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="projectOrder">Orden</Label>
          <Input id="projectOrder" type="number" value={form.projectOrder} onChange={(e) => setForm({ ...form, projectOrder: e.target.value })} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="videoUrl">Video URL (YouTube embed)</Label>
          <Input id="videoUrl" value={form.videoUrl} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })} />
        </div>
        <div className="flex items-end pb-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="h-4 w-4 rounded border-secondary-300 text-primary focus:ring-primary"
            />
            <span className="text-sm font-medium">Proyecto destacado</span>
          </label>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descripción</Label>
        <Textarea id="description" required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="images">Imágenes (URLs, una por línea)</Label>
        <Textarea id="images" value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} rows={4} placeholder="https://ejemplo.com/imagen1.jpg" />
      </div>
      <div className="flex gap-3">
        <Button type="submit" disabled={saving}>
          {saving ? "Guardando..." : project ? "Actualizar Proyecto" : "Crear Proyecto"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/proyectos")}>
          Cancelar
        </Button>
      </div>
    </form>
  )
}
