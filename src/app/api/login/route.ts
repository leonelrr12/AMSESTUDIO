import { NextRequest, NextResponse } from "next/server"
import { signIn } from "@/lib/auth"

function getBaseUrl(req: NextRequest): string {
  const host = req.headers.get("host") || process.env.AUTH_URL || "amsestudio.com"
  const forwardedProto = req.headers.get("x-forwarded-proto")
  const proto = forwardedProto ? `${forwardedProto}:` : req.nextUrl.protocol
  return `${proto}//${host}`
}

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const baseUrl = getBaseUrl(req)

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
      new URL(isInvalid ? "/login?error=CredentialsSignin" : "/login?error=Unknown", baseUrl),
    )
  }

  return NextResponse.redirect(new URL("/panel", baseUrl))
}
