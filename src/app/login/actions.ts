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
    const isInvalid =
      e?.type === "CredentialsSignin" ||
      e?.code === "credentials" ||
      e?.message?.toLowerCase?.()?.includes?.("credential")
    redirect(isInvalid ? "/login?error=CredentialsSignin" : "/login?error=Unknown")
  }

  redirect("/panel")
}
