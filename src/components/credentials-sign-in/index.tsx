"use client";

import React, { useEffect, useState } from "react";
import { Box, Input } from "@chakra-ui/react";
import { Formik } from "formik";
import { Field } from "../ui/field";
import { PasswordInput } from "../ui/password-input";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { toaster, Toaster } from "../ui/toaster";

const CredentialsSignIn: React.FC = () => {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [formIsLoading, setFormIsLoading] = useState(false);

  useEffect(() => {
    // Adicionamos um delay mínimo para garantir que a hidratação já ocorreu
    const timeoutId = setTimeout(() => {
      const entries = Array.from(searchParams.entries());
      console.log("Search params:", entries);
      const errorCode = searchParams.get("code");
      console.log("Código de erro detectado:", errorCode);

      if (errorCode) {
        const errorMessages: Record<
          string,
          { title: string; description: string; type: "error" | "info" | "success" }
        > = {
          invalid_password: {
            title: "Invalid Password",
            description: "Please try again with a valid password",
            type: "error",
          },
          login_is_required: {
            title: "Login is Required",
            description: "Please login to continue",
            type: "error",
          },
          user_not_found: {
            title: "User Not Found",
            description: "Usuário não foi encontrado",
            type: "error",
          },
          invalid_method: {
            title: "Invalid Method",
            description: "Método inválido, por favor acesse sua conta e adicione uma senha para acessar usando esse metodo",
            type: "error",
          }
        };

        const toasterProps = errorMessages[errorCode];
        if (toasterProps) {
          console.log("Exibindo toaster para código:", errorCode);
          toaster.create(toasterProps);
        } else {
          console.log("Código de erro não mapeado:", errorCode);
        }
      }
      setIsLoading(false);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [searchParams]);

  return (
    <Skeleton suppressHydrationWarning loading={isLoading}>
      <Box suppressHydrationWarning>
        <Formik
          initialValues={{
            login: "",
            password: "",
          }}
          onSubmit={async (values) => {
            setFormIsLoading(true)
            // Efetua o login e redireciona para a página inicial
            await signIn("credentials", { ...values, callbackUrl: "/" });
            setFormIsLoading(false)
          }}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <Box
              as="form"
              display="flex"
              flexDir="column"
              gap="2.5"
              asChild
              suppressHydrationWarning
            >
                <form suppressHydrationWarning onSubmit={handleSubmit}>
                    <Field
                        label="Login"
                        helperText="Informe seu login que é seu email ou usuário"
                        invalid={!!errors.login}
                        errorText={errors.login}
                    >
                        <Input name="login" value={values.login} onChange={handleChange} />
                    </Field>
                    <Field
                        label="Password"
                        helperText="Informe sua senha"
                        invalid={!!errors.password}
                        errorText={errors.password}
                    >
                        <PasswordInput
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        />
                    </Field>
                    <Button loading={formIsLoading} type="submit" colorScheme="blue" size="lg">
                        Sign In
                    </Button>
                </form>
            </Box>
          )}
        </Formik>
      </Box>
      <Toaster />
    </Skeleton>
  );
};

export default CredentialsSignIn;
