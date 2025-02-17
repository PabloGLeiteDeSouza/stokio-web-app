import CredentialsSignIn from "@/components/credentials-sign-in";
import SocialSignIn from "@/components/social-sign-in";
import {  Box, Heading, HStack, Separator, Stack } from "@chakra-ui/react";

export default function SignIn() {
    return (
        <Stack h="vh" w="full" justifyContent="center" alignItems="center">
            <Box display="flex" flexDir="column" gap="5" p="20" rounded="xl" _light={{ bgColor: "gray.400" }} _dark={{ bgColor: "gray.900" }}>
                <Box>
                    <Heading textAlign="center">Escolha uma forma de se autenticar:</Heading>
                </Box>
                <HStack alignItems="start" gap="5">
                    <Box>
                        <CredentialsSignIn />
                    </Box>
                    <Separator height="full" orientation="vertical" />
                    <Box>
                        <SocialSignIn />
                    </Box>
                </HStack>
            </Box>
        </Stack>
    )
}