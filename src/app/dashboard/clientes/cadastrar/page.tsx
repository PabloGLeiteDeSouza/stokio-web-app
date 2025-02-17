import BreadCumb from "@/components/Breadcump";
import Dashboard from "@/components/dashboard";
import FormCadastrarClientes from "@/components/Forms/clientes/cadastrar";
import { Box, Heading, Stack } from "@chakra-ui/react";

export default function CadastrarClientes() {
    return (
        <Dashboard>
            <Stack suppressHydrationWarning px="2.5" py="2.5" gap="2.5">
                <Box>
                    <BreadCumb />
                </Box>
                <Box suppressHydrationWarning px="2.5">
                    <FormCadastrarClientes />
                </Box>
            </Stack>
        </Dashboard>
    )
}