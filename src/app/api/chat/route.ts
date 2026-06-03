import { NextRequest, NextResponse } from "next/server"
import { getChatResponse } from "@/lib/chat-faq"

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json({ error: "Mensaje requerido" }, { status: 400 })
    }

    const response = getChatResponse(message)
    return NextResponse.json(response)
  } catch {
    return NextResponse.json(
      { text: "Lo siento, ocurrió un error. ¿Puedes intentar de nuevo?" },
      { status: 200 },
    )
  }
}
