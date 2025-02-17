"use client";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValueText } from "@/components/ui/select";
import { Box, createListCollection, Grid, Input, VStack } from "@chakra-ui/react";
import { $Enums } from "@prisma/client";
import { Formik } from "formik";
import { withMask } from "use-mask-input";

const FormCadastrarFornecedores: React.FC = () => {
    const tipos_de_empresas = createListCollection({
        items: [
            { label:"Produtos de Higiene Pessoal",  value: $Enums.RamoEmpresa.PRODUTOS_DE_HIGIENE_PESSOAL_E_COSMETICOS }
        ]
    })
    const tipo_fornecedor = createListCollection({
        items: [
            { label: "Pessoa Jurídica", value: "PJ" },
            { label: "Pessoa Física", value: "PF" },
        ]
    })
    return (
        <Formik
            initialValues={{
                nome: "",
                tipo_pessoa: "" as "PJ" | "PF",
                tipo_fornecedor: "",
                cpf: "",
                cnpj: "",
            }} 
            onSubmit={async (values) => {

            }}>
            {({ setFieldValue, handleChange, handleSubmit, values }) => {
                return (
                    <VStack w="full" asChild>
                        <form onSubmit={handleSubmit}>
                            <Grid w="full" templateColumns="repeat(2, 1fr)" gap="6">
                                <Field label="Nome" helperText="This is a helper text">
                                    <Input onChange={handleChange("nome")} type="text" placeholder="dsasdasdasdas" />
                                </Field>
                                <SelectRoot onValueChange={(details) => setFieldValue("tipo_pessoa", details.value[0])} collection={tipo_fornecedor}>
                                    <SelectLabel>Tipo de pessoa</SelectLabel>
                                        <SelectTrigger>
                                    <SelectValueText placeholder="Selecione o tipo da empresa" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {tipo_fornecedor.items.map((item) => (
                                            <SelectItem item={item} key={item.value}>
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </SelectRoot>
                                {values.tipo_pessoa == "PJ" && (
                                    <Field label="Cnpj" helperText="This is a helper text">
                                        <Input onChange={handleChange("cnpj")} ref={withMask("cnpj")} placeholder="2343423324232342" />
                                    </Field>
                                )}
                                {values.tipo_pessoa === "PF" && (
                                    <Field label="Cpf" helperText="This is a helper text">
                                        <Input onChange={handleChange("cpf")} ref={withMask("cpf")} placeholder="123.123.123-12" />
                                    </Field>
                                )}
                                
                                <SelectRoot onValueChange={(details) => setFieldValue("tipo_fornecedor", details.value[0])} collection={tipos_de_empresas}>
                                    <SelectLabel>Tipos de Fornecedor</SelectLabel>
                                        <SelectTrigger>
                                    <SelectValueText placeholder="Selecione o tipo da empresa" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {tipos_de_empresas.items.map((item) => (
                                            <SelectItem item={item} key={item.value}>
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </SelectRoot>
                            </Grid>
                            {values.nome !== "" && values.tipo_fornecedor !== "" && values.tipo_pessoa === "PF" || values.tipo_pessoa === "PJ" && values.cnpj !== "" || values.cpf !== "" ? (
                                <Box w="full">
                                    <Button w="full" type="submit">
                                        Cadastrar
                                    </Button>
                                </Box>
                            ) : (
                                <></>
                            )}
                        </form>
                    </VStack>
                );
            }}
        </Formik>
    )
}

export default FormCadastrarFornecedores;