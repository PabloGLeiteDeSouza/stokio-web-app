"use client";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import {
  createListCollection,
  Grid,
  GridItem,
  HStack,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { withMask } from "use-mask-input";
import { NumberInputField, NumberInputRoot } from "@/components/ui/number-input"
import { Toaster, toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";
import convertCurrencyBrlToNumber from "@/utils/convert-currency-brl";

const FormCadastrarClientes: React.FC = () => {
  const router = useRouter();
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
  return (
    <Formik
      initialValues={{
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
      }}
      onSubmit={async (values) => {
        try {
          const res = await fetch("/api/clientes", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log("resp", res);
          const data = await res.json();
          console.log("data", data);
          if (res.status !== 201) {
            throw new Error(data.error);
          }
          if (!data) {
            throw new Error("Erro ao cadastrar cliente");
          }
          toaster.create({
            title: "Cliente cadastrado com sucesso!",
            type: "success",
            onStatusChange: (details) => {
              if (details.status === "dismissing") {
                router.push("/clientes");
              }
            },
            duration: 1500,
          });
        } catch (error) {
          console.error(error)
          toaster.create({
            title: "Erro ao cadastrar cliente",
            description: (error as Error).message,
            type: "error",
          });
        }
      }}
    >
      {({ handleChange, setFieldValue, handleSubmit, handleBlur, values, errors }) => {
        const buscarCep = async (cep: string) => {
          try {
            const res = await fetch(
              `https://viacep.com.br/ws/${cep.replace(/\D/g, "")}/json/`,
              {
                method: "GET",
              }
            );
            const data = await res.json();
            console.log(data);
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
          <form suppressHydrationWarning onSubmit={handleSubmit}>
            <Grid
              suppressHydrationWarning
              templateColumns="repeat(2, 1fr)"
              gap="6"
            >
              <Field
                required
                label="Nome"
                helperText="Informe seu nome completo"
                invalid={!errors.nome && undefined}
              >
                <Input
                  placeholder="Nome Completo"
                  onChange={handleChange("nome")}
                />
              </Field>
              <Field
                required
                label="Data de nascimento"
                helperText="This is a helper text"
              >
                <Input type="date" onChange={handleChange("data_nascimento")} />
              </Field>
              <Field
                required
                label="Cpf"
                helperText="Informe um Cpf"
                invalid={!errors.cpf && undefined}
                errorText={errors.cpf}
              >
                <Input
                  ref={withMask("cpf")}
                  placeholder="999.999.999-99"
                  onChange={handleChange("cpf")}
                />
              </Field>
              <Field
                required
                label="Email"
                helperText="Informe um email"
                invalid={!errors.email && undefined}
                errorText={errors.email}
              >
                <Input
                  ref={withMask("email")}
                  type="email"
                  onChange={handleChange("email")}
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
                required
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
                required
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
                  label="Estados"
                  required
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
                required
                label="Saldo"
                helperText="Informe o saldo do cliente"
                invalid={!!errors.saldo}
                errorText={errors.saldo}
              >
                <NumberInputRoot
                  w="full"
                  value={values.saldo}
                  formatOptions={{
                    style: "currency",
                    currency: "BRL",
                    currencyDisplay: "symbol",
                    currencySign: "accounting",
                  }}
                  onValueChange={({ value }) => setFieldValue('saldo', value)}
                >
                  <NumberInputField onBlur={handleBlur("saldo")} />
                </NumberInputRoot>
              </Field>
              </GridItem>
              <GridItem colSpan={2}>
                <HStack justifyContent="center" w="full">
                  <Button
                    onClick={() => {
                      console.log(values);
                    }}
                    type="submit"
                    colorPalette="blue"
                    variant="solid"
                  >
                    Cadastrar
                  </Button>
                </HStack>
              </GridItem>
            </Grid>
            <Toaster />
          </form>
        );
      }}
    </Formik>
  );
};

export default FormCadastrarClientes;
