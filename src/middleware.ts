import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const protectedPaths = ["/panel", "/admin"]
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p))

  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    secureCookie: true,
    cookieName: "__Secure-authjs.session-token",
  })

  if (isProtected && !token) {
    const loginUrl = new URL("/login", req.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/panel", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/panel/:path*", "/admin/:path*"],
}
