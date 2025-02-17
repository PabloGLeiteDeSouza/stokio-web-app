import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
    // Obtenha o token JWT a partir do request
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    
    if (!token) {
        return NextResponse.json(
            { error: "Você não pode acessar essa página" },
            { status: 401 }
        );
    }
    const email = req.nextUrl.searchParams.get("email");
    if (!email) {
        return new NextResponse("Invalid request, email is required", { status: 400 });
    }
    // Faça a requisição para o servidor de autenticação
    const user = await prisma.user.findUnique({ where: { email } })
    .catch(() => null);
    if (!user) {
        return new NextResponse("Invalid request, user not found", { status: 404 });
    }
    if (user.role === "USER" && user.id !== token.sub) {
        return new NextResponse("Unauthorized request", { status: 404 });
    }
    return new NextResponse(JSON.stringify({ user }), { status: 200 });
}

export const POST = () => {
    
}