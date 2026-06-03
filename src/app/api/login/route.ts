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
  } catch (e: any) {
    const isInvalid =
      e?.type === "CredentialsSignin" ||
      e?.code === "credentials" ||
      e?.message?.toLowerCase?.()?.includes?.("credential")
    return NextResponse.redirect(
      new URL(isInvalid ? "/login?error=CredentialsSignin" : "/login?error=Unknown", req.url),
    )
  }

  return NextResponse.redirect(new URL("/panel", req.url))
}
