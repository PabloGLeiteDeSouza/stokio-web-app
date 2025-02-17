import { HStack, Image, Heading, Box, Separator, Text, Grid, GridItem } from "@chakra-ui/react"
import NextImage from "next/image"
import { LinkButton } from "@/components/ui/link-button"
import Link from "next/link"
import { auth, signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import EcommerceNavItem from "./NavItem"
import { ColorModeButton } from "@/components/ui/color-mode"
import DashboardAccess from "@/components/dashboard-access"
import { AiOutlineProduct } from "react-icons/ai"
import { BsPersonPlusFill } from "react-icons/bs"
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa"

const EcommerceNavbar: React.FC = async () => {
    const session = await auth();
    return (
        <HStack suppressHydrationWarning _dark={{ bgColor: "gray.800" }} _light={{ bgColor: "gray.400" }} px="2.5" py="5" w="full" justifyContent="space-between">
            <HStack>
                <Image alt="Logo app" w="10" h="10" asChild>
                    <NextImage width={250} height={250} alt="Logo app" src="/icon.svg"/>
                </Image>
                <Heading>
                    {process.env.NEXTPUBLIC_ECOMMERCE_NAME}
                </Heading>
            </HStack>
            <HStack>
                <EcommerceNavItem variant="ghost" conteudo={
                    <>
                        <AiOutlineProduct />
                        Produtos
                    </>
                } href="/shop/produtos" >
                    <Grid templateColumns="repeat(3, 1fr)" gap="2.5">
                        <GridItem colSpan={1} gap="1.5" display="flex" flexDir="column" alignItems="center">
                            <Box w="full" display="flex" flexDir="column" gap="2" alignItems="center">
                                <Text userSelect="none">Tipos de Produtos</Text>
                                <Separator borderColor={{ _dark: "white", _light: "black" }} w="full" />
                            </Box>
                            <LinkButton w="full" variant="ghost" as={Link} href="/shop/produtos?tipo=roll-on">
                                Roll-on
                            </LinkButton>
                            <LinkButton w="full" variant="ghost" as={Link} href="/shop/produtos?tipo=desodorante-antitranspirante">
                                Desodorante Antitraspirante
                            </LinkButton>
                            <LinkButton w="full" variant="ghost" as={Link} href="/shop/produtos?tipo=shampoo">
                                Shampoo
                            </LinkButton>
                        </GridItem>
                        <GridItem colSpan={1} gap="1.5" display="flex" flexDir="column" alignItems="center">
                            <Box w="full" display="flex" flexDir="column" gap="2" alignItems="center">
                                <Text userSelect="none">Marcas</Text>
                                <Separator borderColor={{ _dark: "white", _light: "black" }} w="full" />
                            </Box>
                            <Separator />
                            <LinkButton w="full" variant="ghost" as={Link} href="/shop/produtos??empresa=natura&marca=nature">
                                Naturé
                            </LinkButton>
                            <LinkButton w="full" variant="ghost" as={Link} href="/shop/produtos??empresa=natura">
                                Kaiak
                            </LinkButton>
                            <LinkButton w="full" variant="ghost" as={Link} href="/shop/produtos??empresa=natura">
                                Ilia
                            </LinkButton>
                        </GridItem>
                        <GridItem colSpan={1} gap="1.5" display="flex" flexDir="column" alignItems="center">
                            <Box w="full" display="flex" flexDir="column" gap="2" alignItems="center">
                                <Text userSelect="none">Empresas</Text>
                                <Separator borderColor={{ _dark: "white", _light: "black" }} w="full" />
                            </Box>
                            <LinkButton w="full" variant="ghost" as={Link} href="/shop/produtos??empresa=natura">
                                Natura
                            </LinkButton>
                            <LinkButton w="full" variant="ghost" as={Link} href="/shop/produtos??empresa=avon">
                                Avon
                            </LinkButton>
                        </GridItem>
                    </Grid>
                </EcommerceNavItem>
                <EcommerceNavItem variant="ghost" href="/shop/marcas" conteudo="Marcas">
                    <Box>
                        <LinkButton>
                            
                        </LinkButton>
                    </Box>
                </EcommerceNavItem>
                <EcommerceNavItem variant="ghost" href="/shop/natura" conteudo="Natura">
                    <Box>
                        <LinkButton>
                            
                        </LinkButton>
                    </Box>
                </EcommerceNavItem>
                <EcommerceNavItem variant="ghost" href="/shop/avon" conteudo="Avon">
                    <Box>
                        <LinkButton>
                            
                        </LinkButton>
                    </Box>
                </EcommerceNavItem>
            </HStack>
            <HStack>
                <DashboardAccess session={session} />
                {session && session.user ? (
                    <Button
                        variant="ghost"
                        onClick={async () => {
                            "use server"
                            await signOut();
                        }}
                    >
                        <FaSignOutAlt />
                        Sign Out
                    </Button>
                ) : (
                    <>
                        <LinkButton as={Link} variant="ghost" href="/auth/sign-in">
                            <FaSignInAlt />
                            Sign-In
                        </LinkButton>
                        <LinkButton as={Link} variant="ghost" href="/auth/sign-up">
                            <BsPersonPlusFill />
                            Sign-Up
                        </LinkButton>
                    </>
                )}
                
                <ColorModeButton />
            </HStack>
        </HStack>
    )
}

export default EcommerceNavbar;