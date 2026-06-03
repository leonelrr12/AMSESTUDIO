import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { squareMeters, projectType, finishLevel, extras, estimatedCost, estimatedTime, name, phone, email, message } = body

    if (!squareMeters || !projectType || !finishLevel || !estimatedCost || !estimatedTime) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    const estimate = await prisma.estimate.create({
      data: {
        squareMeters,
        projectType,
        finishLevel,
        extras,
        estimatedCost,
        estimatedTime,
        name: name || null,
        phone: phone || null,
        email: email || null,
        message: message || null,
      },
    })

    console.log("Nueva estimación:", {
      id: estimate.id,
      projectType,
      squareMeters,
      estimatedCost,
      name: name || "Anónimo",
    })

    return NextResponse.json({ success: true, id: estimate.id })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}
