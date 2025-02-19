"use client";
import {
  Box,
  For,
  HStack,
  IconButton,
  Stack,
  Table,
  VStack,
} from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";
import SelectQuantidadePaginas from "@/components/Select/QuantidadePaginas";
import { Button } from "@/components/ui/button";
import {
  FaChevronDown,
  FaChevronUp,
  FaPencil,
  FaPlus,
  FaTrash,
} from "react-icons/fa6";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { LinkButton } from "@/components/ui/link-button";
import Link from "next/link";

const TableFornecedoresGeral: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [fornecedores, setFornecedores] = React.useState<
    {
      id: string;
      nome: string;
      ramo: string;
    }[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [startRange, setStartRange] = React.useState((page - 1) * pageSize);
  const [endRange, setEndRange] = React.useState(page * pageSize);
  const [visibleProducts, setVisibleProducts] = React.useState<
    {
      id: string;
      nome: string,
      ramo: string,
    }[]
  >([]);

  const getProducts = React.useCallback(async () => {
    try {
      const resp = await fetch("/api/fornecedores");
      const data = await resp.json();
      setFornecedores(data);
      const visible = (data as Array<{ id: string; nome: string; ramo: string; }>).slice(startRange, endRange);
      setVisibleProducts(visible);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [endRange, startRange]);

  // Atualiza os limites da página sempre que 'page' ou 'pageSize' mudarem
  React.useEffect(() => {
    setStartRange((page - 1) * pageSize);
    setEndRange(page * pageSize);
  }, [page, pageSize]);

  // Atualiza os produtos visíveis sempre que os limites ou a lista de produtos mudarem
  React.useEffect(() => {
    setVisibleProducts(fornecedores.slice(startRange, endRange));
  }, [fornecedores, startRange, endRange]);

  React.useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <Skeleton suppressHydrationWarning asChild loading={isLoading}>
      <Stack suppressHydrationWarning py="2.5">
        <HStack justifyContent="space-between">
          <Box>
            <LinkButton colorPalette="cyan" variant="solid" asChild>
              <Link href="/dashboard/fornecedores/cadastrar">
                <FaPlus /> Cadastrar Fornecedor
              </Link>
            </LinkButton>
          </Box>
          <Box>
            <SelectQuantidadePaginas
              value={`${pageSize}`}
              onChange={(size) => {
                setPageSize(Number(size));
                setStartRange((page - 1) * Number(size));
                setEndRange(page * Number(size));
              }}
            />
          </Box>
        </HStack>
        <Table.ScrollArea borderWidth="1px" rounded="md" maxHeight="md">
          <Table.Root size="sm" stickyHeader>
            <Table.Header>
              <Table.Row bg="bg.subtle">
                {/* Coluna Produto */}
                <Table.ColumnHeader>
                  <HStack gap="5">
                    Nome
                    <VStack p="0">
                      <IconButton
                        onClick={() => {
                          const sortedAsc = [...visibleProducts].sort((a, b) =>
                            a.nome.localeCompare(b.nome)
                          );
                          setVisibleProducts(sortedAsc);
                        }}
                        size="2xs"
                        variant="outline"
                      >
                        <FaChevronUp />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          const sortedDesc = [...visibleProducts].sort((a, b) =>
                            b.nome.localeCompare(a.nome)
                          );
                          setVisibleProducts(sortedDesc);
                        }}
                        size="2xs"
                        variant="outline"
                      >
                        <FaChevronDown />
                      </IconButton>
                    </VStack>
                  </HStack>
                </Table.ColumnHeader>

                {/* Coluna Categoria */}
                <Table.ColumnHeader>
                  <HStack gap="5">
                    Ramo
                    <VStack p="0">
                      <IconButton
                        onClick={() => {
                          const sortedAsc = [...visibleProducts].sort((a, b) =>
                            a.ramo.localeCompare(b.ramo)
                          );
                          setVisibleProducts(sortedAsc);
                        }}
                        size="2xs"
                        variant="outline"
                      >
                        <FaChevronUp />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          const sortedDesc = [...visibleProducts].sort((a, b) =>
                            b.ramo.localeCompare(a.ramo)
                          );
                          setVisibleProducts(sortedDesc);
                        }}
                        size="2xs"
                        variant="outline"
                      >
                        <FaChevronDown />
                      </IconButton>
                    </VStack>
                  </HStack>
                </Table.ColumnHeader>

                <Table.ColumnHeader>Editar</Table.ColumnHeader>
                <Table.ColumnHeader>Excluir</Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <For each={visibleProducts}>
                {(item) => (
                  <Table.Row key={`${item.id}-fornecedor`}>
                    <Table.Cell>{item.nome}</Table.Cell>
                    <Table.Cell>{item.ramo}</Table.Cell>
                    <Table.Cell>
                      <Button colorPalette="blue">
                        <FaPencil />
                      </Button>
                    </Table.Cell>
                    <Table.Cell>
                      <Button colorPalette="red">
                        <FaTrash />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                )}
              </For>
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
        <HStack justifyContent="center">
          <PaginationRoot
            count={fornecedores.length}
            pageSize={pageSize}
            page={page}
            onPageChange={(e) => setPage(e.page)}
          >
            <HStack>
              <PaginationPrevTrigger />
              <PaginationItems />
              <PaginationNextTrigger />
            </HStack>
          </PaginationRoot>
        </HStack>
      </Stack>
    </Skeleton>
  );
};

export default TableFornecedoresGeral;
