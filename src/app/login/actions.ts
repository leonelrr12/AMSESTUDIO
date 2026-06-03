"use server"

import { signIn } from "@/lib/auth"

export async function loginAction(_prev: { error: string } | null, data: FormData) {
  const email = data.get("email") as string
  const password = data.get("password") as string

  if (!email || !password) {
    return { error: "Completa todos los campos" }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
    return { error: "" }
  } catch (e: any) {
    if (e?.type === "CredentialsSignin" || e?.code === "credentials") {
      return { error: "Credenciales inválidas" }
    }
    console.error("Login error:", e)
    return { error: "Error al iniciar sesión. Intenta de nuevo." }
  }
}
