import BreadCumb from "@/components/Breadcump";
import Dashboard from "@/components/dashboard";
import TableProdutos from "@/components/Tables/Produtos/Geral";
import { Box, HStack } from "@chakra-ui/react";
import React from "react";

export default function Produtos() {
  return (
    <Dashboard>
      <Box>
        <HStack justifyContent="space-between">
          <BreadCumb />
        </HStack>
        <Box>
          <TableProdutos />
        </Box>
      </Box>
    </Dashboard>
  );
}
