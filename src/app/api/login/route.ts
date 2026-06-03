import { NextRequest, NextResponse } from "next/server"
import { signIn } from "@/lib/auth"

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    const host = req.headers.get("host") || process.env.AUTH_URL || "amsestudio.com"
    const proto = req.headers.get("x-forwarded-proto") || "https"
    const baseUrl = `${proto}://${host}`

    return NextResponse.redirect(new URL("/panel", baseUrl), 303)
  } catch (e: any) {
    const host = req.headers.get("host") || process.env.AUTH_URL || "amsestudio.com"
    const proto = req.headers.get("x-forwarded-proto") || "https"
    const baseUrl = `${proto}://${host}`

    const isInvalid =
      e?.type === "CredentialsSignin" ||
      e?.code === "credentials" ||
      e?.message?.toLowerCase?.()?.includes?.("credential")

    return NextResponse.redirect(
      new URL(isInvalid ? "/login?error=CredentialsSignin" : "/login?error=Unknown", baseUrl),
      303,
    )
  }
}
