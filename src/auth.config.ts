import Google from "next-auth/providers/google";
import { CredentialsSignin, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Libsodium from "./lib/libsodium";
import { PrismaClient } from "@prisma/client";

// Inicialização correta do PrismaClient para evitar múltiplas instâncias em desenvolvimento
const globalForPrisma = global as unknown as { prisma?: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Classes de erro personalizadas para autenticação
class InvalidPassword extends CredentialsSignin {
    code = "invalid_password";
}

class InvalidLogin extends CredentialsSignin {
    code = "login_is_required";
}

class UserNotFound extends CredentialsSignin {
    code = "user_not_found";
}

class InvalidMethod extends CredentialsSignin {
    code = "invalid_method";
}

// Configuração do NextAuth
export default {
    providers: [
        Google,
        Credentials({
            credentials: {
                login: { label: "login", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(credentials) {
                const { login, password } = credentials;

                if (!login) {
                    throw new InvalidLogin("O login é obrigatório");
                }

                let user;
                
                // Verifica se o login é um e-mail ou username
                if ((login as string).includes("@")) {
                    user = await prisma.user.findUnique({ where: { email: login as string } });
                } else {
                    user = await prisma.user.findUnique({ where: { username: login as string } });
                }

                if (!user) {
                    throw new UserNotFound("O usuário não foi encontrado");
                }

                const { password: encrypted_password, private_key, public_key } = user;

                if (!private_key || !public_key || !encrypted_password) {
                    throw new InvalidMethod("Não está vinculado a nenhuma conta");
                }

                const isValid = await new Libsodium().validate_password(
                    private_key,
                    public_key,
                    encrypted_password,
                    password as string
                );

                if (!isValid) {
                    throw new InvalidPassword();
                }

                // Retornar apenas os campos necessários do usuário
                return {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    role: user.role,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            // Adiciona os dados do usuário ao token JWT
            if (user) {
                token.id = user.id;
                token.username = user.username;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            // Inclui os dados do usuário na sessão
            if (token?.id) {
                session.user.id = token.id;
                session.user.username = token.username;
                session.user.role = token.role;
            }
            return session;
        },
    },
    pages: {
        signIn: "/auth/sign-in",
    },
} satisfies NextAuthConfig;
