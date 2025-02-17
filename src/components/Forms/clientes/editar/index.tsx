"use client";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import {
    Box,
  createListCollection,
  Grid,
  GridItem,
  HStack,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { withMask } from "use-mask-input";
import {
  NumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const FormEditarClientes: React.FC<{ id?: string;  }> = ({ id }) => {
  const router = useRouter();
  const [cliente, setCliente] = React.useState<{
    id: string;
    nome: string;
    data_nascimento: string;
    cpf: string;
    email: string;
    fixo: string;
    celular: string;
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
    saldo: string;
  }>({
    id: "",
    nome: "",
    data_nascimento: "",
    cpf: "",
    email: "",
    fixo: "",
    celular: "",
    cep: "",
    logradouro: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
    saldo: "",
  });
  const [loading, setLoading] = React.useState(true);
  const estados = createListCollection({
    items: [
      { label: "Acre", value: "AC" },
      { label: "Alagoas", value: "AL" },
      { label: "Amapá", value: "AP" },
      { label: "Amazonas", value: "AM" },
      { label: "Bahia", value: "BA" },
      { label: "Ceará", value: "CE" },
      { label: "Distrito Federal", value: "DF" },
      { label: "Espírito Santo", value: "ES" },
      { label: "Goiás", value: "GO" },
      { label: "Maranhão", value: "MA" },
      { label: "Mato Grosso", value: "MT" },
      { label: "Mato Grosso do Sul", value: "MS" },
      { label: "Minas Gerais", value: "MG" },
      { label: "Pará", value: "PA" },
      { label: "Paraíba", value: "PB" },
      { label: "Paraná", value: "PR" },
      { label: "Pernambuco", value: "PE" },
      { label: "Piauí", value: "PI" },
      { label: "Rio de Janeiro", value: "RJ" },
      { label: "Rio Grande do Norte", value: "RN" },
      { label: "Rio Grande do Sul", value: "RS" },
      { label: "Rondônia", value: "RO" },
      { label: "Roraima", value: "RR" },
      { label: "Santa Catarina", value: "SC" },
      { label: "São Paulo", value: "SP" },
      { label: "Sergipe", value: "SE" },
      { label: "Tocantins", value: "TO" },
    ],
  });

    const StartForm = React.useCallback(async () => {
        try {
            const res = await fetch(`/api/clientes?id=${id}`, {
                method: "GET",
            });
            const data = await res.json();
            if (res.status !== 200) {
                throw new Error(data.error);
            }
            if (!data) {
                router.push("/clientes");
                throw new Error("Erro ao buscar cliente");
            }
            const data_nascimento = new Date(data.data_nascimento);
            const day = data_nascimento.getDate()+1 < 10 ? `0${data_nascimento.getDate()+1}` : data_nascimento.getDate()+1;
            const month = data_nascimento.getMonth()+1 < 10 ? `0${data_nascimento.getMonth()+1}` : data_nascimento.getMonth()+1;
            const year = data_nascimento.getFullYear();
            const dados = {
                id: data.id as string,
                nome: data.nome as string,
                data_nascimento: `${year}-${month}-${day}` as string,
                cpf: data.cpf as string,
                email: data.email[0].email as string,
                fixo: data.fixo ? data.fixo : "" as string,
                celular: data.celular ? data.celular : "" as string,
                saldo: data.saldo as string,
                cep: data.Endereco.cep as string,
                logradouro: data.Endereco.logradouro as string,
                numero: data.Endereco.numero as string,
                complemento: data.Endereco.complemento as string,
                bairro: data.Endereco.bairro as string,
                cidade: data.Endereco.cidade as string,
                uf: data.Endereco.uf as string,
            }
            setCliente(dados);
            setLoading(false);
        } catch (error) {
            toaster.create({
                title: "Erro ao buscar cliente",
                description: (error as Error).message,
                type: "error",
            });
            setLoading(false);
        }
    }, [id, router]);

  React.useEffect(() => {
    StartForm();
  }, [StartForm])

  return (
    <Skeleton loading={loading}>
        <Box>
            {!loading && (
            <Formik
                initialValues={cliente}
                onSubmit={async ({ id, ...values}) => {
                    try {
                    const res = await fetch(`/api/clientes?id=${id}`, {
                        method: "PUT",
                        body: JSON.stringify(values),
                        headers: {
                        "Content-Type": "application/json",
                        },
                    });
                    const data = await res.json();
                    if (res.status !== 200) {
                        throw new Error(data.error);
                    }
                    if (!data) {
                        throw new Error("Erro ao Editar o cliente");
                    }
                    toaster.create({
                        title: "Cliente Atualizado com sucesso!",
                        type: "success",
                        onStatusChange: (details) => {
                        if (details.status === "dismissing") {
                            router.push("/clientes");
                        }
                        },
                        duration: 1500,
                    });
                    } catch (error) {
                    toaster.create({
                        title: "Erro ao cadastrar cliente",
                        description: (error as Error).message,
                        type: "error",
                    });
                    }
                }}
                >
                {({ handleChange, setFieldValue, handleSubmit, values, errors }) => {
                    const buscarCep = async (cep: string) => {
                    try {
                        const res = await fetch(
                        `https://viacep.com.br/ws/${cep.replace(/\D/g, "")}/json/`,
                        {
                            method: "GET",
                        }
                        );
                        const data = await res.json();
                        setFieldValue("logradouro", data.logradouro);
                        setFieldValue("bairro", data.bairro);
                        setFieldValue("cidade", data.localidade);
                        setFieldValue("uf", data.uf);
                        setFieldValue("numero", data.numero);
                        setFieldValue("complemento", data.complemento);
                        setFieldValue("uf", data.uf);
                    } catch (error) {
                        toaster.create({
                        title: "Erro ao buscar CEP",
                        description: (error as Error).message,
                        type: "error",
                        });
                    }
                    };
                    return (
                    <form onSubmit={handleSubmit}>
                        <Grid
                        suppressHydrationWarning
                        templateColumns="repeat(2, 1fr)"
                        gap="6"
                        >
                        <Field
                            label="Nome"
                            helperText="Informe seu nome completo"
                            invalid={!errors.nome && undefined}
                        >
                            <Input
                                placeholder="Nome Completo"
                                onChange={handleChange("nome")}
                                value={values.nome}
                            />
                        </Field>
                        <Field
                            label="Data de nascimento"
                            helperText="This is a helper text"
                        >
                            <Input type="date" onChange={handleChange("data_nascimento")} value={values.data_nascimento} />
                        </Field>
                        <Field
                            label="Cpf"
                            helperText="Informe um Cpf"
                            invalid={!errors.cpf && undefined}
                            errorText={errors.cpf}
                        >
                            <Input
                                ref={withMask("cpf")}
                                placeholder="999.999.999-99"
                                onChange={handleChange("cpf")}
                                value={values.cpf}
                            />
                        </Field>
                        <Field
                            label="Email"
                            helperText="Informe um email"
                            invalid={!errors.email && undefined}
                            errorText={errors.email}
                        >
                            <Input
                                ref={withMask("email")}
                                type="email"
                                onChange={handleChange("email")}
                                value={values.email}
                            />
                        </Field>
                        <Field
                            label="Telefone Fixo"
                            helperText="Informe um telefone fixo"
                            invalid={!errors.fixo && undefined}
                            errorText={errors.fixo}
                        >
                            <Input
                                ref={withMask("(99) 9999-9999")}
                                type="tel"
                                onChange={handleChange("fixo")}
                                value={values.fixo}
                            />
                        </Field>
                        <Field
                            label="Telefone Celular"
                            helperText="Informe um telefone celular"
                            invalid={!errors.celular && undefined}
                            errorText={errors.celular}
                        >
                            <Input
                                ref={withMask("(99) 99999-9999")}
                                type="tel"
                                onChange={handleChange("celular")}
                                value={values.celular}
                            />
                        </Field>
                        <Field
                            required
                            label="Cep"
                            helperText="Informe um Cep"
                            invalid={!errors.cep && undefined}
                            errorText={errors.cep}
                        >
                            <Input
                                ref={withMask("99.999-999")}
                                placeholder="99.999-99"
                                onChange={handleChange("cep")}
                                onBlur={async (e) => await buscarCep(e.target.value)}
                                value={values.cep}
                            />
                        </Field>
                        <Field
                            required
                            label="Logradouro"
                            helperText="This is a helper text"
                            invalid={!errors.logradouro && undefined}
                            errorText={errors.logradouro}
                        >
                            <Input
                                onChange={handleChange("logradouro")}
                                placeholder="Rua Odair Malagoli"
                                value={values.logradouro}
                            />
                        </Field>
                        <Field
                            required
                            label="Número"
                            helperText="This is a helper text"
                            invalid={!errors.numero && undefined}
                            errorText={errors.numero}
                        >
                            <NumberInputRoot
                                w="full"
                                size="md"
                                defaultValue={values.numero}
                                value={values.numero}
                                onValueChange={(d) => setFieldValue("numero", d.value)}
                                onChange={handleChange("numero")}
                            >
                            <NumberInputField />
                            </NumberInputRoot>
                        </Field>
                        <Field label="Complemento" helperText="Informe o complemento.">
                            <Textarea
                                placeholder="Informe o complemento do seu endereço..."
                                variant="subtle"
                                value={values.complemento}
                                onChange={handleChange("complemento")}
                            />
                        </Field>
                        <Field
                            label="Bairro"
                            helperText="This is a helper text"
                            invalid={!errors.bairro && undefined}
                            errorText={errors.bairro}
                        >
                            <Input
                                value={values.bairro}
                                onChange={handleChange("bairro")}
                                placeholder="Bairro"
                            />
                        </Field>
                        <Field
                            label="Cidade"
                            helperText="Informe sua cidade"
                            invalid={!errors.cep && undefined}
                            errorText={errors.cep}
                        >
                            <Input
                                value={values.cidade}
                                onChange={handleChange("cidade")}
                                placeholder="Aracatuba"
                            />
                        </Field>
                        <GridItem colSpan={1}>
                            <Field
                            invalid={!errors.uf && undefined}
                            errorText={errors.uf}
                            helperText="Informe um estado"
                            >
                            <SelectRoot
                                size="md"
                                defaultValue={[values.uf]}
                                value={[values.uf]}
                                collection={estados}
                                onValueChange={(v) => setFieldValue("uf", v.value[0])}
                            >
                                <SelectLabel>Estado</SelectLabel>
                                <SelectTrigger>
                                <SelectValueText placeholder="Selecione um estado:" />
                                </SelectTrigger>
                                <SelectContent>
                                {estados.items.map((estado) => (
                                    <SelectItem item={estado} key={estado.value}>
                                    {estado.label}
                                    </SelectItem>
                                ))}
                                </SelectContent>
                            </SelectRoot>
                            </Field>
                        </GridItem>
                        <GridItem colSpan={1}>
                            <Field
                            label="Saldo"
                            helperText="Informe o saldo do cliente"
                            invalid={!errors.saldo && undefined}
                            errorText={errors.saldo}
                            >
                            <NumberInputRoot
                                w="full"
                                size="md"
                                defaultValue={values.saldo}
                                value={values.saldo}
                                onChange={handleChange("saldo")}
                                onValueChange={({ value }) => setFieldValue("saldo", value)}
                            >
                                <NumberInputField />
                            </NumberInputRoot>
                            </Field>
                        </GridItem>
                        <GridItem colSpan={2}>
                            <HStack justifyContent="center" w="full">
                            <Button
                                type="submit"
                                colorPalette="blue"
                                variant="solid"
                            >
                                Atualizar
                            </Button>
                            </HStack>
                        </GridItem>
                        </Grid>
                        <Toaster />
                    </form>
                    );
                }}
            </Formik>
            )}
        </Box>
    </Skeleton>
  );
};

export default FormEditarClientes;
