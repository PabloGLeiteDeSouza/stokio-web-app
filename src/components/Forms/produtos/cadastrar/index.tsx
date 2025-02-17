"use client";
import { Field } from "@/components/ui/field";
import { FileUploadDropzone, FileUploadList, FileUploadRoot } from "@/components/ui/file-upload";
import { Box, Grid, Input, Stack, VStack } from "@chakra-ui/react";
import { Formik } from "formik";

const FormCadastrarProdutos: React.FC = () => {
    return (
        <Formik
            initialValues={{
                nome: "",
                description: "",
                preco: "",
                imagem: "",
            }} 
            onSubmit={async (values) => {

            }}        >
            {() => {
                return (
                    <VStack w="full">
                        <Box w="full">
                            <Field label="Foto de perfil" helperText="Selecione a foto de perfil do produto">
                                <FileUploadRoot accept={["image/png", "image/jpeg"]} maxFileSize={5000000} alignItems="stretch" maxFiles={10}>
                                    <FileUploadDropzone
                                        label="Drag and drop here to upload"
                                        description=".png, .jpg up to 5MB"
                                    />
                                    <FileUploadList />
                                </FileUploadRoot>
                            </Field>
                        </Box>
                        <Grid w="full" templateColumns="repeat(2, 1fr)" gap="6">
                            <Field label="Email" helperText="This is a helper text">
                                <Input placeholder="me@example.com" />
                            </Field>
                            <Field label="Email" helperText="This is a helper text">
                                <Input placeholder="me@example.com" />
                            </Field>
                            <Field label="Email" helperText="This is a helper text">
                                <Input placeholder="me@example.com" />
                            </Field>
                            <Field label="Email" helperText="This is a helper text">
                                <Input placeholder="me@example.com" />
                            </Field>
                            <Field label="Email" helperText="This is a helper text">
                                <Input placeholder="me@example.com" />
                            </Field>
                            <Field label="Email" helperText="This is a helper text">
                                <Input placeholder="me@example.com" />
                            </Field>
                            <Field label="Email" helperText="This is a helper text">
                                <Input placeholder="me@example.com" />
                            </Field>
                            <Field label="Email" helperText="This is a helper text">
                                <Input placeholder="me@example.com" />
                            </Field>
                            <Field label="Email" helperText="This is a helper text">
                                <Input placeholder="me@example.com" />
                            </Field>
                        </Grid>
                    </VStack>
                );
            }}
        </Formik>
    )
}

export default FormCadastrarProdutos;