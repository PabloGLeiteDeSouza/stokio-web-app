import BreadCumb from "@/components/Breadcump";
import Dashboard from "@/components/dashboard";
import FormCadastrarFornecedores from "@/components/Forms/fornecedores/cadastrar";
import { Box } from "@chakra-ui/react";

export default async function CadastrarFornecedores() {
    return (
        <Dashboard>
            <Box py="2.5" px="2.5">
                <Box mb="5">
                    <BreadCumb />
                </Box>
                <Box suppressHydrationWarning px="5">
                    <FormCadastrarFornecedores />
                </Box>
            </Box>
        </Dashboard>
    )
}