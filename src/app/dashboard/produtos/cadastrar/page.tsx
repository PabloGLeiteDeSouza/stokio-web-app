import BreadCumb from "@/components/Breadcump";
import Dashboard from "@/components/dashboard";
import FormCadastrarProdutos from "@/components/Forms/produtos/cadastrar";
import { Box } from "@chakra-ui/react";

export default function CadastrarProdutos(){
    return (
        <Dashboard>
            <Box py="2.5" px="2.5">
                <Box mb="5">
                    <BreadCumb />
                </Box>
                <Box suppressHydrationWarning px="5">
                    <FormCadastrarProdutos />
                </Box>
            </Box>
        </Dashboard>
    )
}