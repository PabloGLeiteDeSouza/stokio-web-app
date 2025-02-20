import Ecommerce from "@/components/Ecommerce";
import FormCadastrarClientes from "@/components/Forms/clientes/cadastrar";
import { Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <Ecommerce>
      <Box>
        <FormCadastrarClientes />
      </Box>
    </Ecommerce>
  );
}
