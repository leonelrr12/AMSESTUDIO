import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default async function middleware(req: NextRequest) {
  const session = await auth()
  const { pathname } = req.nextUrl

  const protectedPaths = ["/panel", "/admin"]
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p))

  if (isProtected && !session?.user) {
    const loginUrl = new URL("/login", req.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (pathname.startsWith("/admin") && (session?.user as any)?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/panel", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/panel/:path*", "/admin/:path*"],
}
