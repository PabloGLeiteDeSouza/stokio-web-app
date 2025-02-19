"use client";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValueText } from "@/components/ui/select";
import { toaster, Toaster } from "@/components/ui/toaster";
import { Box, createListCollection, For, Grid, GridItem, HStack, IconButton, Input, VStack } from "@chakra-ui/react";
import { $Enums } from "@prisma/client";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { FaMinus, FaPlus } from "react-icons/fa6";
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
    const navigation = useRouter()

    return (
        <Formik
            initialValues={{
                nome: "",
                tipo_pessoa: "" as "PJ" | "PF",
                ramo: "",
                cpf: "",
                cnpj: "",
                emails: [{ email: "" }],
            }} 
            onSubmit={async ({ nome, cnpj, cpf, ramo, emails }) => {
                try {
                    const res = await fetch("/api/fornecedores", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ nome, cnpj, cpf, ramo, emails }),
                    });
                    console.log("resp", res);
                    const data = await res.json();
                    console.log("data", data);
                    if (res.status !== 201) {
                        throw new Error(data.error);
                    }
                    if (!data) {
                        throw new Error("Erro ao cadastrar fornecedor");
                    }
                    toaster.create({ 
                        title: "Fornecedor cadastrado com sucesso!", 
                        description: "Fornecedor cadastrado com sucesso!", 
                        type: "success" ,
                        async onStatusChange(details) {
                            if (details.status === "unmounted") {
                                navigation.push("/dashboard/fornecedores");
                            }
                        },
                        duration: 2000
                    });
                } catch (error) {
                    toaster.create({
                        title: "Erro ao cadastrar fornecedor",
                        description: (error as Error).message,
                        type: "error" 
                    });
                }
            }}>
            {({ setFieldValue, handleChange, handleSubmit, values, errors }) => {
                return (
                    <VStack suppressHydrationWarning w="full" asChild>
                        <form onSubmit={handleSubmit}>
                            <Grid suppressHydrationWarning w="full" templateColumns="repeat(2, 1fr)" gap="6">
                                <Field label="Nome" helperText="This is a helper text">
                                    <Input onChange={handleChange("nome")} type="text" placeholder="ex Natura" />
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
                                
                                <SelectRoot onValueChange={(details) => setFieldValue("ramo", details.value[0])} collection={tipos_de_empresas}>
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
                                <For each={values.emails}>
                                    {(item, i) => {
                                        if (i + 1 == values.emails.length) {
                                            return (
                                                <HStack key={i}>
                                                    <IconButton colorPalette="green" onClick={() => setFieldValue("emails", [...values.emails, { email: "" }])}>
                                                        <FaPlus />
                                                    </IconButton>
                                                    <Field label={`E-mail-${i + 1}`} helperText="Informe um email válido">
                                                        <Input value={item.email} type="email" onChange={handleChange(`emails[${i}].email`)} />
                                                    </Field>
                                                    <IconButton disabled={i == 0 && true} colorPalette="red" onClick={() => {
                                                        if (values.emails.length > 1) {
                                                            setFieldValue("emails", [...values.emails.slice(0, -1)])
                                                        } else {
                                                            toaster.create({
                                                                title: "Atenção",
                                                                description: "Não é possível remover o último e-mail",
                                                                type: "warning",
                                                                duration: 1500,
                                                            })
                                                        }
                                                    }} >
                                                        <FaMinus />
                                                    </IconButton>
                                                </HStack>
                                            )
                                        }
                                        return (
                                            <Field key={i} label={`E-mail-${i + 1}`} helperText="Informe um email válido">
                                                <Input value={item.email} type="email" onChange={handleChange(`emails[${i}].email`)} />
                                            </Field>
                                        )
                                    }}
                                </For>
                            </Grid>
                            {values.nome !== "" && values.ramo !== "" && values.tipo_pessoa === "PF" || values.tipo_pessoa === "PJ" && values.cnpj !== "" || values.cpf !== "" ? (
                                <Box w="full">
                                    <Button w="full" type="submit">
                                        Cadastrar
                                    </Button>
                                </Box>
                            ) : (
                                <></>
                            )}
                        <Toaster />
                        </form>
                    </VStack>
                );
            }}
        </Formik>
    )
}

export default FormCadastrarFornecedores;