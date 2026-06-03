import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { projectOrder: "asc" },
  })
  return NextResponse.json(projects)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const project = await prisma.project.create({ data: body })
    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Error al crear el proyecto" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    if (!id) return NextResponse.json({ error: "ID requerido" }, { status: 400 })

    const body = await req.json()
    const project = await prisma.project.update({
      where: { id },
      data: body,
    })
    return NextResponse.json(project)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Error al actualizar el proyecto" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    if (!id) return NextResponse.json({ error: "ID requerido" }, { status: 400 })

    await prisma.project.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Error al eliminar el proyecto" }, { status: 500 })
  }
}
