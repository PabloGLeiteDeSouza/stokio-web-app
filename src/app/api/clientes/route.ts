import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // Conversões necessárias:
    // - numero deve ser Int
    // - saldo, se for Decimal, convém converter para número ou Prisma.Decimal
    const numeroInt = parseInt(data.numero, 10) || 0;
    const saldoDecimal = parseFloat(data.saldo) || 0;

    // Create the new client with nested relations
    const resp = await prisma.clientes.create({
      data: {
        Endereco: {
          create: {
            cep: data.cep,
            logradouro: data.logradouro,
            numero: numeroInt,
            complemento: data.complemento || "",
            bairro: data.bairro,
            cidade: data.cidade,
            uf: data.uf || "SP",
          },
        },
        nome: data.nome,
        data_nascimento: new Date(data.data_nascimento),
        cpf: data.cpf,
        cnpj: data.cnpj ?? null, // Se não houver cnpj no form, usar null
        fixo: data.fixo || null,
        celular: data.celular || null,
        saldo: saldoDecimal, // ou new Prisma.Decimal(saldoDecimal)
        email: {
          create: {
            email: data.email,
          },
        },
      },
    }).catch(() => {
      return null;
    });

    if (!resp) {
      throw new Error("Erro ao criar cliente", { cause: "409" });
    }

    return NextResponse.json(resp, { status: 201 });
  } catch (error) {
    if (error instanceof Error && !isNaN(Number(error.cause))) {
      return NextResponse.json(
        { message: error.message },
        {
          status: Number(error.cause),
        }
      );
    }
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

// ==================================
// GET - Lista todos ou apenas 1 cliente
// ==================================
export async function GET(req: NextRequest) {
  try {
    // Lê query params da URL
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const nome = searchParams.get("nome");
    const cpf = searchParams.get("cpf");

    // Se for passado "id", busca só o cliente específico
    if (id) {
      const cliente = await prisma.clientes.findUnique({
        where: { id },
        include: {
          Endereco: true,
          email: true,
        },
      });

      if (!cliente) {
        return NextResponse.json(
          { message: "Cliente não encontrado" },
          { status: 404 }
        );
      }

      return NextResponse.json(cliente, { status: 200 });
    } else if (nome) {
      // Se for passado "nome", busca por nome
      const cliente = await prisma.clientes.findFirst({
        where: { nome },
        include: {
          Endereco: true,
          email: true,
        },
      });

      if (!cliente) {
        return NextResponse.json(
          { message: "Cliente não encontrado" },
          { status: 404 }
        );
      }

      return NextResponse.json(cliente, { status: 200 });
    } else if (cpf) {
      // Se for passado "cpf", busca por cpf
      const cliente = await prisma.clientes.findFirst({
        where: { cpf },
        include: {
          Endereco: true,
          email: true,
        },
      });
      if (!cliente) {
        return NextResponse.json(
          { message: "Cliente não encontrado" },
          { status: 404 }
        );
      }
      return NextResponse.json(cliente, { status: 200 });
    }

    // Se não tiver "id", busca todos
    const todosClientes = await prisma.clientes.findMany({
      include: {
        Endereco: true,
        email: true,
      },
    });
    return NextResponse.json(todosClientes, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ==================================
// PUT - Atualiza cliente pelo "id" (via query param)
// ==================================
export async function PUT(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { message: "ID é obrigatório para atualizar" },
        { status: 400 }
      );
    }

    const data = await req.json();
    const numeroInt = parseInt(data.numero, 10) || 0;
    const saldoDecimal = parseFloat(data.saldo) || 0;

    // Atualiza dados principais do cliente
    // e dados do Endereco e Email via nested writes
    const clienteAtualizado = await prisma.clientes.update({
      where: { id },
      data: {
        nome: data.nome,
        data_nascimento: new Date(data.data_nascimento),
        cpf: data.cpf,
        cnpj: data.cnpj ?? null,
        fixo: data.fixo ?? null,
        celular: data.celular ?? null,
        saldo: saldoDecimal,
        Endereco: {
          update: {
            cep: data.cep,
            logradouro: data.logradouro,
            numero: numeroInt,
            complemento: data.complemento ?? "",
            bairro: data.bairro,
            cidade: data.cidade,
            uf: data.uf || "SP",
          },
        },
        // Se houver apenas 1 e-mail vinculado, podemos usar updateMany ou
        // upsert. Exemplo de upsert, assumindo que só existe 1:
        email: {
          upsert: {
            // Precisamos de uma forma de localizar o registro de email.
            // Se este for o único e-mail, podemos localizá-lo pelo campo "id_cliente"
            where: {
              // Como "email" em si é unique, podemos usar o valor antigo,
              // mas aqui depende de como você quer tratar. Exemplo:
              email: data.oldEmail || data.email,
            },
            create: { email: data.email },
            update: { email: data.email },
          },
        },
      },
      include: { Endereco: true, email: true },
    });

    return NextResponse.json(clienteAtualizado, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ==================================
// DELETE - Remove cliente pelo "id" (via query param)
// ==================================
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { message: "ID é obrigatório para deletar" },
        { status: 400 }
      );
    }

    // Deleta o cliente (se o onDelete do Prisma não for "CASCADE",
    // pode ser necessário deletar registros filhos antes ou ajustar
    // a política de deleção no schema).
    const clienteDeletado = await prisma.clientes.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Cliente deletado com sucesso", clienteDeletado },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
