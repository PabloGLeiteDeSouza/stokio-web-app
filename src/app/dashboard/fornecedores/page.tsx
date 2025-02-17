import BreadCumb from "@/components/Breadcump";
import Dashboard from "@/components/dashboard";
import TableFornecedoresGeral from "@/components/Tables/Fornecedores/Geral";
import { Box, HStack } from "@chakra-ui/react";

export default function Fornecedores() {
    return (
        <Dashboard>
            <Box>
                <HStack justifyContent="space-between">
                    <BreadCumb />
                </HStack>
            <Box>
                <TableFornecedoresGeral />
            </Box>
        </Box>
        </Dashboard>
    )
}