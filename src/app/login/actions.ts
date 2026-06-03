"use server"

import { signIn } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
  } catch (e: any) {
    if (e?.type === "CredentialsSignin" || e?.code === "credentials" || e?.message?.includes("credentials")) {
      redirect("/login?error=CredentialsSignin")
    }
    console.error("Login error:", e?.message || e)
    redirect("/login?error=Unknown")
  }

  redirect("/panel")
}
