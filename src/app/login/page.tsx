"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Lock, Mail, Loader2, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const [csrfToken, setCsrfToken] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [email, setEmail] = useState("admin@amsestudio.com")
  const [password, setPassword] = useState("admin123")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get("error") === "CredentialsSignin") {
      setError("Credenciales inválidas. Verifica tu email y contraseña.")
    } else if (params.get("error")) {
      setError(`Error: ${params.get("error")}`)
    }
    fetch("/api/auth/csrf")
      .then((r) => r.json())
      .then((d) => setCsrfToken(d.csrfToken))
      .catch(() => {})
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const formData = new URLSearchParams()
      formData.append("csrfToken", csrfToken)
      formData.append("callbackUrl", "/panel")
      formData.append("email", email)
      formData.append("password", password)

      const res = await fetch("/api/auth/callback/credentials", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
        redirect: "manual",
        credentials: "include",
      })

      if (res.type === "opaqueredirect" || res.status === 302) {
        const location = res.headers.get("Location") || "/panel"
        window.location.href = location
      } else if (res.status === 200) {
        window.location.href = "/panel"
      } else if (res.status === 401) {
        setError("Credenciales inválidas. Verifica tu email y contraseña.")
        setLoading(false)
      } else {
        setError("Error al iniciar sesión. Recarga la página e intenta de nuevo.")
        setLoading(false)
      }
    } catch {
      setError("Error de conexión. Intenta de nuevo.")
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white">
            <Building2 className="h-7 w-7" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-primary">Área de Clientes</h1>
          <p className="mt-1 text-secondary">Accede a tus proyectos y avances de obra</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-xl border bg-white p-8 shadow-sm">
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
                <Input
                  id="email"
                  type="email"
                  required
                  className="pl-10"
                  placeholder="correo@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
                <Input
                  id="password"
                  type="password"
                  required
                  className="pl-10"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Button type="submit" size="lg" className="mt-6 w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Iniciando sesión...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
