import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST - Cria um novo fornecedor.
 */
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    // Validação: campos obrigatórios
    if (!data.nome || !data.ramo) {
      return NextResponse.json(
        { error: "Os campos 'nome' e 'ramo' são obrigatórios." },
        { status: 400 }
      );
    }

    const novoFornecedor = await prisma.fornecedor.create({
      data: {
        nome: data.nome,
        cpf: data.cpf ? data.cpf.replace(/\D/g, "") : null,
        cnpj: data.cnpj ? data.cnpj.replace(/\D/g, "") : null,
        ramo: data.ramo, // Campo obrigatório conforme o schema do Prisma
        Email: {
          createMany: {
            // Espera-se que data.emails seja um array de objetos, por exemplo: [{ email: "exemplo@dominio.com" }]
            data: data.emails,
          },
        },
      },
      include: { Email: true },
    });

    return NextResponse.json(novoFornecedor, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * GET - Retorna um fornecedor específico (por id, nome ou cpf) ou todos os fornecedores.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const nome = searchParams.get("nome");
    const cpf = searchParams.get("cpf");

    let fornecedor;

    if (id) {
      fornecedor = await prisma.fornecedor.findUnique({
        where: { id },
        include: { Email: true },
      });
      if (!fornecedor) {
        return NextResponse.json(
          { message: "Fornecedor não encontrado." },
          { status: 404 }
        );
      }
      return NextResponse.json(fornecedor, { status: 200 });
    } else if (nome) {
      fornecedor = await prisma.fornecedor.findFirst({
        where: { nome },
        include: { Email: true },
      });
      if (!fornecedor) {
        return NextResponse.json(
          { message: "Fornecedor não encontrado." },
          { status: 404 }
        );
      }
      return NextResponse.json(fornecedor, { status: 200 });
    } else if (cpf) {
      fornecedor = await prisma.fornecedor.findFirst({
        where: { cpf },
        include: { Email: true },
      });
      if (!fornecedor) {
        return NextResponse.json(
          { message: "Fornecedor não encontrado." },
          { status: 404 }
        );
      }
      return NextResponse.json(fornecedor, { status: 200 });
    }

    // Se nenhum filtro for fornecido, retorna todos os fornecedores
    const todosFornecedores = await prisma.fornecedor.findMany({
      include: { Email: true },
    });
    return NextResponse.json(todosFornecedores, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * PUT - Atualiza um fornecedor existente (é necessário passar o "id" na query string).
 */
export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "O ID é obrigatório para atualizar um fornecedor." },
        { status: 400 }
      );
    }

    const data = await req.json();

    // Validação dos campos obrigatórios
    if (!data.nome || !data.ramo) {
      return NextResponse.json(
        { error: "Os campos 'nome' e 'ramo' são obrigatórios." },
        { status: 400 }
      );
    }

    const fornecedorAtualizado = await prisma.fornecedor.update({
      where: { id },
      data: {
        nome: data.nome,
        cpf: data.cpf ? data.cpf.replace(/\D/g, "") : null,
        cnpj: data.cnpj ? data.cnpj.replace(/\D/g, "") : null,
        ramo: data.ramo,
        // Para atualização dos emails, como exemplo, excluímos os existentes e criamos os novos.
        // Ajuste conforme a lógica de negócio desejada.
        Email: {
          deleteMany: {},
          createMany: {
            data: data.emails,
          },
        },
      },
      include: { Email: true },
    });

    return NextResponse.json(fornecedorAtualizado, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

/**
 * DELETE - Remove um fornecedor (é necessário passar o "id" na query string).
 */
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { error: "O ID é obrigatório para deletar um fornecedor." },
        { status: 400 }
      );
    }

    const fornecedorDeletado = await prisma.fornecedor.delete({
      where: { id },
    });

    return NextResponse.json(
      {
        message: "Fornecedor deletado com sucesso.",
        fornecedorDeletado,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
