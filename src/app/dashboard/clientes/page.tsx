import BreadCumb from "@/components/Breadcump";
import Dashboard from "@/components/dashboard";
import TableClientes from "@/components/Tables/Clientes/Geral";
import { Box } from "@chakra-ui/react";

export default function Clientes() {
    return (
        <Dashboard>
            <Box h="full">
                <BreadCumb />
                <TableClientes />
            </Box>
        </Dashboard>
    )
}