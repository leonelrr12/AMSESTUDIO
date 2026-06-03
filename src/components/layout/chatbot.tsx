"use client"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Loader2, Bot, User, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Message } from "@/lib/chat-faq"

const quickReplies = [
  "¿Qué servicios ofrecen?",
  "¿Cuánto cuesta construir?",
  "¿Cuánto tiempo toma?",
  "Ver proyectos",
  "Solicitar cotización",
  "Contacto",
]

export function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "👋 ¡Hola! Soy el asistente virtual de AmsEstudio. ¿En qué puedo ayudarte hoy?",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  async function sendMessage(text: string) {
    const userMsg = text.trim()
    if (!userMsg) return

    setMessages((prev) => [...prev, { role: "user", text: userMsg }])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      })
      const data = await res.json()
      const botMsg: Message = { role: "bot", text: data.text || "..." }

      setMessages((prev) => [...prev, botMsg])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Lo siento, ocurrió un error. ¿Puedes intentar de nuevo?",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleQuickReply(text: string) {
    if (text === "Ver proyectos") {
      window.location.href = "/proyectos"
      return
    }
    if (text === "Solicitar cotización") {
      window.location.href = "/presupuesto"
      return
    }
    if (text === "Contacto") {
      window.location.href = "/#contacto"
      return
    }
    sendMessage(text)
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl active:scale-95"
          aria-label="Abrir chat"
        >
          <MessageCircle className="h-7 w-7" />
        </button>
      )}

      <div
        className={cn(
          "fixed bottom-6 left-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] rounded-2xl border bg-white shadow-2xl transition-all duration-300 flex flex-col",
          open
            ? "opacity-100 visible scale-100"
            : "opacity-0 invisible scale-95 pointer-events-none",
        )}
        style={{ maxHeight: "min(600px, calc(100vh - 120px))" }}
      >
        {open && (
          <>
            <div className="flex items-center justify-between rounded-t-2xl bg-primary p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Asistente AmsEstudio</div>
                  <div className="text-xs text-primary-200">Respuesta inmediata</div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 hover:bg-white/10 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-start gap-2.5 max-w-[85%] animate-fade-in-up",
                    msg.role === "user" ? "ml-auto flex-row-reverse" : "",
                  )}
                  style={{ animationDuration: "0.3s" }}
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                      msg.role === "user" ? "bg-accent text-white" : "bg-primary-100 text-primary",
                    )}
                  >
                    {msg.role === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      msg.role === "user"
                        ? "bg-accent text-white rounded-tr-md"
                        : "bg-white border rounded-tl-md shadow-sm text-secondary",
                    )}
                  >
                    {msg.text.split("\n").map((line, j) => (
                      <p key={j} className={j > 0 ? "mt-2" : ""}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex items-start gap-2.5 animate-fade-in-up">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="rounded-2xl rounded-tl-md border bg-white px-4 py-3 shadow-sm">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-secondary-400 mb-2">Preguntas frecuentes:</p>
                <div className="flex flex-wrap gap-1.5">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleQuickReply(reply)}
                      className="rounded-full border border-secondary-200 bg-white px-3 py-1.5 text-xs font-medium text-secondary-600 hover:border-accent hover:text-accent transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  sendMessage(input)
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 rounded-full border border-secondary-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-primary-300 focus:bg-white transition-colors"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-colors hover:bg-accent-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  )
}
