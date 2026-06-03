"use client"

import { useActionState } from "react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { loginAction } from "./actions"
import { Lock, Mail, Loader2, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const [state, action, pending] = useActionState(loginAction, null)

  useEffect(() => {
    if (state && !state.error) {
      router.push("/panel")
      router.refresh()
    }
  }, [state, router])

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

        <form action={action} className="rounded-xl border bg-white p-8 shadow-sm">
          {state?.error && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 text-center">
              {state.error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="pl-10"
                  placeholder="correo@ejemplo.com"
                  defaultValue="admin@amsestudio.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-400" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="pl-10"
                  placeholder="••••••••"
                  defaultValue="admin123"
                />
              </div>
            </div>
          </div>

          <Button type="submit" size="lg" className="mt-6 w-full" disabled={pending}>
            {pending ? (
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
