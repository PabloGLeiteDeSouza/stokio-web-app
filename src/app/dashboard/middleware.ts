// middleware.ts
import { NextRequest, NextResponse } from "next/server"
import NextAuth from "next-auth"
import authConfig from "@/auth.config"

const { auth } = NextAuth(authConfig)

interface NextAuthRequest extends NextRequest {
  auth?: unknown;
}

export default auth(async function middleware(req: NextAuthRequest) {
  // Se a rota já estiver excluída pelo matcher, essa função nem é chamada.
  // Então, se cair aqui, é pq é rota protegida.
  const auth = req.auth;
  if (!auth && !req.nextUrl.pathname.includes('/auth')) {
    return NextResponse.redirect(new URL("/auth/sign-in", req.url))
  }
  if (req.nextUrl.pathname.includes('/auth') && auth) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }
  // Caso contrário, segue para a rota solicitada
  return NextResponse.next()
})

// Configuração do matcher para:
// - Ignorar /api/auth (rotas de autenticação do NextAuth/Auth.js)
// - Ignorar /auth (onde fica sua página de login/registro/etc.)
// - Ignorar _next (arquivos internos do Next.js)
// - Ignorar arquivos estáticos (.*)
export const config = {
  matcher: [
    "/((?!api/auth|auth|_next|.*\\..*).*)",
  ],
}
