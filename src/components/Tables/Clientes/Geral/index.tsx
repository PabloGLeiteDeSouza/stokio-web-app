"use client";
import React from "react";
import {
  Box,
  HStack,
  Stack,
  Table as ChakraTable,
  Skeleton,
  EmptyState,
  VStack,
  ButtonGroup,
} from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import SelectQuantidadePaginas from "@/components/Select/QuantidadePaginas";
import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/link-button";
import Link from "next/link";
import { FaPencil, FaPerson, FaPlus, FaTrash } from "react-icons/fa6";
import { Cliente } from "@/app/api/clientes/types";
import { DialogActionTrigger, DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toaster, Toaster } from "@/components/ui/toaster";

const TableClientes: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [clientes, setClientes] = React.useState<Cliente[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  

  const getClientes = React.useCallback(async () => {
    try {
      // Simulando requisição
      // Caso esteja de fato consumindo API, basta substituir por fetch/axios
      const listaClientes = await new Promise<Array<Cliente>>(async (resolve, reject) => {
        const data = await fetch("/api/clientes", { method: "GET" });
        const response: Array<Cliente> = await data.json();
        if (data.status !== 200) {
          reject(new Error("Erro ao buscar clientes"));
        }
        resolve(response);
      }); // simula 1s de atraso

      // const listaClientes = [
      //   { id: 1, name: "Laptop", cpf: "Eletronics", saldo: 999.99 },
      //   { id: 2, name: "Coffee Maker", cpf: "Home Appliances", saldo: 49.99 },
      //   { id: 3, name: "Desk Chair", cpf: "Furniture", saldo: 150.0 },
      //   { id: 4, name: "Smartphone", cpf: "Electronics", saldo: 799.99 },
      //   { id: 5, name: "Over-Ear Headphones", cpf: "Accessories", saldo: 199.99 },
      //   { id: 6, name: "In-Ear Headphones", cpf: "Accessories", saldo: 69.99 },
      //   { id: 7, name: "Noise-Cancelling Headphones", cpf: "Accessories", saldo: 299.99 },
      //   { id: 8, name: "Wireless Earbuds", cpf: "Accessories", saldo: 129.99 },
      //   { id: 9, name: "Laptop Stand", cpf: "Accessories", saldo: 29.99 },
      //   { id: 10, name: "Bluetooth Speaker", cpf: "Accessories", saldo: 99.99 },
      //   { id: 11, name: "External Hard Drive", cpf: "Electronics", saldo: 89.99 },
      //   { id: 12, name: "Smart TV", cpf: "Electronics", saldo: 999.99 },
      //   { id: 13, name: "Gaming Console", cpf: "Electronics", saldo: 499.99 },
      //   { id: 14, name: "Refrigerator", cpf: "Home Appliances", saldo: 1200.0 },
      //   { id: 15, name: "Microwave Oven", cpf: "Home Appliances", saldo: 129.99 },
      //   { id: 16, name: "Dining Table", cpf: "Furniture", saldo: 400.0 },
      //   { id: 17, name: "Office Desk", cpf: "Furniture", saldo: 250.0 },
      //   { id: 18, name: "Bookcase", cpf: "Furniture", saldo: 180.0 },
      //   { id: 19, name: "Washing Machine", cpf: "Home Appliances", saldo: 700.0 },
      //   { id: 20, name: "Portable Charger", cpf: "Accessories", saldo: 39.99 },
      // ];

      setClientes(listaClientes);
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const deleteCliente = async (id: string) => {
    try {
      const res = await fetch(`/api/clientes?id=${id}`, {
        method: "DELETE",
      });
      if (res.status !== 200) {
        throw new Error("Erro ao deletar cliente");
      }
      toaster.create({
        title: "Cliente deletado com sucesso",
        type: "success",
        onStatusChange: (d) => {
          if (d.status === "dismissing") {
            getClientes();
          }
        }
      })
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
      toaster.create({
        title: "Erro ao deletar cliente",
        type: "error",
      })
    }
  }
  React.useEffect(() => {
    getClientes();
  }, [getClientes]);

  // Paginação
  const startRange = (page - 1) * pageSize;
  const endRange = startRange + pageSize;
  const visibleClients = clientes.slice(startRange, endRange);

  return (
    <Stack suppressHydrationWarning h="calc(100% - 20px)" py="2.5">
      {/* Cabeçalho com botão Criar e Seleção de página */}
      {clientes.length > 0 && (
        <HStack justifyContent="space-between">
          <Box>
            <LinkButton colorPalette="cyan" variant="solid" asChild>
              <Link href="/dashboard/clientes/cadastrar">
                <FaPlus /> Criar Cliente
              </Link>
            </LinkButton>
          </Box>
          
            <Box>
              <SelectQuantidadePaginas
                value={`${pageSize}`}
                onChange={(value) => setPageSize(Number(value))}
              />
            </Box>
        </HStack>
      )}
      {/* Tabela com Skeleton de carregamento */}
      {clientes.length > 0 ? (
        <>
          <ChakraTable.ScrollArea suppressHydrationWarning borderWidth="1px" rounded="md" maxHeight="md">
            <ChakraTable.Root size="sm" stickyHeader>
              <ChakraTable.Header>
                <ChakraTable.Row bg="bg.subtle">
                  <ChakraTable.ColumnHeader>Nome</ChakraTable.ColumnHeader>
                  <ChakraTable.ColumnHeader>CPF</ChakraTable.ColumnHeader>
                  <ChakraTable.ColumnHeader>Saldo</ChakraTable.ColumnHeader>
                  <ChakraTable.ColumnHeader>Editar</ChakraTable.ColumnHeader>
                  <ChakraTable.ColumnHeader>Excluir</ChakraTable.ColumnHeader>
                </ChakraTable.Row>
              </ChakraTable.Header>

              <ChakraTable.Body>
                {isLoading ? (
                  // Exibe Skeletons durante o carregamento
                  Array.from({ length: pageSize }).map((_, index) => (
                    <ChakraTable.Row key={index}>
                      <ChakraTable.Cell>
                        <Skeleton height="20px" />
                      </ChakraTable.Cell>
                      <ChakraTable.Cell>
                        <Skeleton height="20px" />
                      </ChakraTable.Cell>
                      <ChakraTable.Cell>
                        <Skeleton height="20px" />
                      </ChakraTable.Cell>
                      <ChakraTable.Cell>
                        <Skeleton height="20px" />
                      </ChakraTable.Cell>
                      <ChakraTable.Cell>
                        <Skeleton height="20px" />
                      </ChakraTable.Cell>
                    </ChakraTable.Row>
                  ))
                ) : (
                  // Exibe dados carregados
                  visibleClients.map((cliente) => (
                    <ChakraTable.Row key={cliente.id}>
                      <ChakraTable.Cell>{cliente.nome}</ChakraTable.Cell>
                      <ChakraTable.Cell>{cliente.cpf}</ChakraTable.Cell>
                      <ChakraTable.Cell>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(cliente.saldo))}</ChakraTable.Cell>
                      <ChakraTable.Cell>
                        <LinkButton colorPalette="blue" asChild>
                          <Link href={`/clientes/editar/${cliente.id}`}>
                            <FaPencil />
                          </Link>
                        </LinkButton>
                      </ChakraTable.Cell>
                      <ChakraTable.Cell>
                      <DialogRoot size={"md"}>
                        <DialogTrigger asChild>
                          <Button colorPalette="red">
                            <FaTrash />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Dialog Title</DialogTitle>
                          </DialogHeader>
                          <DialogBody>
                            <p>
                            Você tem certeza que deseja excluir o cliente {cliente.nome}?
                            </p>
                          </DialogBody>
                          <DialogFooter>
                            <DialogActionTrigger asChild>
                              <Button colorPalette="blue">Cancel</Button>
                            </DialogActionTrigger>
                            <Button onClick={async () => await deleteCliente(cliente.id as string)} colorPalette="red">
                              Confirm
                            </Button>
                          </DialogFooter>
                          <DialogCloseTrigger />
                        </DialogContent>
                      </DialogRoot>
                      </ChakraTable.Cell>
                    </ChakraTable.Row>
                  ))
                )}
              </ChakraTable.Body>
            </ChakraTable.Root>
          </ChakraTable.ScrollArea>

          {/* Paginação */}
          <HStack justifyContent="center">
            <PaginationRoot
              count={clientes.length}
              pageSize={pageSize}
              page={page}
              onPageChange={(event) => setPage(event.page)}
            >
              <HStack>
                <PaginationPrevTrigger />
                <PaginationItems />
                <PaginationNextTrigger />
              </HStack>
            </PaginationRoot>
          </HStack>
        </>
      ) : (
        <EmptyState.Root h="full">
          <EmptyState.Content h="full" w="full">
            <EmptyState.Indicator>
              <FaPerson />
            </EmptyState.Indicator>
            <VStack textAlign="center">
              <EmptyState.Title>Não há mais clientes</EmptyState.Title>
              <EmptyState.Description>
                Adicione mais clientes
              </EmptyState.Description>
            </VStack>
            <ButtonGroup>
              <LinkButton as={Link} href="/dashboard/clientes/cadastrar" variant="outline">
                <FaPlus />
                Cadastrar Clientes
              </LinkButton>
            </ButtonGroup>
          </EmptyState.Content>
        </EmptyState.Root>
      )}
      <Toaster />
    </Stack>
  );
};

export default TableClientes;
