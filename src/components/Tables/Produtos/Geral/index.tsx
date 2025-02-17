"use client";
import {
  Box,
  For,
  Heading,
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

const TableProdutosGeral: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);
  const [produtos, setProdutos] = React.useState<
    {
      id: number;
      name: string;
      category: string;
      price: number;
    }[]
  >([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [startRange, setStartRange] = React.useState((page - 1) * pageSize);
  const [endRange, setEndRange] = React.useState(page * pageSize);
  const [visibleProducts, setVisibleProducts] = React.useState<
    {
      id: number;
      name: string;
      category: string;
      price: number;
    }[]
  >([]);

  const getProducts = React.useCallback(async () => {
    try {
      const teste = [
        { id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
        { id: 2, name: "Coffee Maker", category: "Home Appliances", price: 49.99 },
        { id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
        { id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
        { id: 5, name: "Over-Ear Headphones", category: "Accessories", price: 199.99 },
        { id: 6, name: "In-Ear Headphones", category: "Accessories", price: 69.99 },
        { id: 7, name: "Noise-Cancelling Headphones", category: "Accessories", price: 299.99 },
        { id: 8, name: "Wireless Earbuds", category: "Accessories", price: 129.99 },
        { id: 9, name: "Laptop Stand", category: "Accessories", price: 29.99 },
        { id: 10, name: "Bluetooth Speaker", category: "Accessories", price: 99.99 },
        { id: 11, name: "External Hard Drive", category: "Electronics", price: 89.99 },
        { id: 12, name: "Smart TV", category: "Electronics", price: 999.99 },
        { id: 13, name: "Gaming Console", category: "Electronics", price: 499.99 },
        { id: 14, name: "Refrigerator", category: "Home Appliances", price: 1200.0 },
        { id: 15, name: "Microwave Oven", category: "Home Appliances", price: 129.99 },
        { id: 16, name: "Dining Table", category: "Furniture", price: 400.0 },
        { id: 17, name: "Office Desk", category: "Furniture", price: 250.0 },
        { id: 18, name: "Bookcase", category: "Furniture", price: 180.0 },
        { id: 19, name: "Washing Machine", category: "Home Appliances", price: 700.0 },
        { id: 20, name: "Portable Charger", category: "Accessories", price: 39.99 },
      ];
      setProdutos(teste);
      const visible = teste.slice(startRange, endRange);
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
    setVisibleProducts(produtos.slice(startRange, endRange));
  }, [produtos, startRange, endRange]);

  React.useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <Skeleton suppressHydrationWarning asChild loading={isLoading}>
      <Stack py="2.5">
        <HStack justifyContent="space-between">
          <Box>
            <LinkButton colorPalette="cyan" variant="solid" asChild>
              <Link href="/dashboard/produtos/cadastrar">
                <FaPlus /> Criar Produto
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
                    Produto
                    <VStack p="0">
                      <IconButton
                        onClick={() => {
                          const sortedAsc = [...visibleProducts].sort((a, b) =>
                            a.name.localeCompare(b.name)
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
                            b.name.localeCompare(a.name)
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
                    Categoria
                    <VStack p="0">
                      <IconButton
                        onClick={() => {
                          const sortedAsc = [...visibleProducts].sort((a, b) =>
                            a.category.localeCompare(b.category)
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
                            b.category.localeCompare(a.category)
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

                {/* Coluna Valor */}
                <Table.ColumnHeader>
                  <HStack gap="5">
                    Valor
                    <VStack p="0">
                      <IconButton
                        onClick={() => {
                          const sortedAsc = [...visibleProducts].sort(
                            (a, b) => a.price - b.price
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
                          const sortedDesc = [...visibleProducts].sort(
                            (a, b) => b.price - a.price
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
                  <Table.Row key={`${item.id}-product`}>
                    <Table.Cell>{item.name}</Table.Cell>
                    <Table.Cell>{item.category}</Table.Cell>
                    <Table.Cell>{item.price}</Table.Cell>
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
            count={produtos.length}
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

export default TableProdutosGeral;
