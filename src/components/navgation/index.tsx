"use client"
import { Box, Heading, HStack, Input, Kbd, VStack } from "@chakra-ui/react"
import { InputGroup } from "../ui/input-group";
import { LuSearch } from "react-icons/lu";
import { ColorModeButton } from "../ui/color-mode";
import { DrawerBackdrop, DrawerBody, DrawerCloseTrigger, DrawerContent, DrawerRoot, DrawerTrigger } from "../ui/drawer";
import { Button } from "../ui/button";
import { FaBagShopping, FaBars, FaBoxesPacking, FaHandshake, FaHouse, FaMoneyBill1Wave, FaPerson } from "react-icons/fa6";
import { LinkButton } from "../ui/link-button";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
    const path = usePathname();
    return (
        <HStack px="2.5" py="2.5" _light={{ bgColor: "gray.200" }} _dark={{ bgColor: "gray.800" }} justifyContent="space-between" w="full">
            <Box>
                <DrawerRoot placement="start">
                    <DrawerBackdrop />
                    <DrawerTrigger asChild>
                        <Button lg={{ visibility: "hidden", display: "none" }} variant="outline" size="sm">
                            <FaBars />
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent>
                        <VStack suppressHydrationWarning w="full" px="5" py="5" overflowY="auto">
                            <HStack w="full">
                                <Heading>{`${process.env.NEXT_PUBLIC_APP_NAME}`}</Heading>
                            </HStack>
                            <VStack w="full">
                                <LinkButton w="full" justifyContent="start" data-active={path !== "/" && undefined} _active={{ _dark: { bgColor: "gray.900" }, _light: { bgColor: "gray.100" } }} variant="ghost" asChild>
                                    <Link href="/">
                                        <FaHouse />
                                        Home
                                    </Link>
                                </LinkButton>
                                <LinkButton w="full" justifyContent="start" data-active={!path.includes("/clientes") && undefined} _active={{ _dark: { bgColor: "gray.900" }, _light: { bgColor: "gray.100" } }}  variant="ghost" asChild>
                                    <Link href="/clientes">
                                        <FaPerson />
                                        cliente
                                    </Link>
                                </LinkButton>
                                <LinkButton w="full" justifyContent="start" data-active={!path.includes("/produtos") && undefined} _active={{ _dark: { bgColor: "gray.900" }, _light: { bgColor: "gray.100" } }}  variant="ghost"  asChild>
                                    <Link href="/produtos">
                                        <FaBoxesPacking />
                                        Produtos
                                    </Link>
                                </LinkButton>
                                <LinkButton w="full" justifyContent="start" data-active={!path.includes("/fornecedores") && undefined} _active={{ _dark: { bgColor: "gray.900" }, _light: { bgColor: "gray.100" } }}  variant="ghost" asChild>
                                    <Link href="/fornecedores">
                                        <FaHandshake />
                                        Fornecedores
                                    </Link>
                                </LinkButton>
                                <LinkButton w="full" justifyContent="start" data-active={!path.includes("/vendas") && undefined} _active={{ _dark: { bgColor: "gray.900" }, _light: { bgColor: "gray.100" } }}  variant="ghost" asChild>
                                    <Link href="/vendas">
                                        <FaMoneyBill1Wave />
                                       Vendas
                                    </Link>
                                </LinkButton>
                                <LinkButton w="full" justifyContent="start" data-active={!path.includes("/compras") && undefined} _active={{ _dark: { bgColor: "gray.900" }, _light: { bgColor: "gray.100" } }}  variant="ghost" asChild>
                                    <Link href="/compras">
                                        <FaBagShopping />
                                        Compras
                                    </Link>
                                </LinkButton>
                            </VStack>
                        </VStack>
                        <DrawerCloseTrigger />
                    </DrawerContent>
                </DrawerRoot>
            </Box>
            <HStack lg={{ gap: "5" }}>
                <InputGroup
                    flex="1"
                    startElement={<LuSearch />}
                    endElement={<Kbd>⌘K</Kbd>}
                >
                    <Input size="sm" placeholder="Search contacts" />
                </InputGroup>
                <ColorModeButton />
            </HStack>
        </HStack>
    )
}

export default Navbar;