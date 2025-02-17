import Dashboard from "@/components/dashboard"
import FormEditarClientes from "@/components/Forms/clientes/editar"
import { Box } from "@chakra-ui/react"

export default async function EditarClientes({
    params,
}: {
    params: Promise<{ id: string }>
}){
    const { id } = await params
    return (
        <Dashboard>
            <Box>
                <FormEditarClientes id={id} />
            </Box>
        </Dashboard>
    )
}