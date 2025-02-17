"use client";
import { Button, ButtonProps, Heading, HStack, StackProps, useDisclosure, VStack } from "@chakra-ui/react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import { FaBagShopping, FaBars, FaBoxesPacking, FaHandshake, FaHouse, FaPerson } from "react-icons/fa6";
import { LinkButton, LinkButtonProps } from "../ui/link-button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineStickyNote2 } from "react-icons/md";

const Sidebar: React.FC = () => {
    const { open, onToggle } = useDisclosure();
    const Body = HStack as ForwardRefExoticComponent<StackProps & RefAttributes<HTMLDivElement> & { open?: boolean }>;
    const BtnToggle = Button as ForwardRefExoticComponent<ButtonProps & RefAttributes<HTMLButtonElement> & { open?: boolean }>;
    const LinkBtn = LinkButton as ForwardRefExoticComponent<LinkButtonProps & RefAttributes<HTMLAnchorElement> & { open?: boolean }>;
    const path = usePathname();
    console.log(path)
    return (
        <Body visibility="hidden" display="none" lg={{ visibility: "visible", display: "flex" }} px="2.5" py="2.5" alignItems="start" _light={{ bgColor: "gray.200" }} _dark={{ bgColor: "gray.800" }} open={open} w="fit-content" h="full" _open={{ w: "20rem" }}>
            <VStack w="full">
                <HStack w="full">
                    <BtnToggle open={open} w="full" _open={{ w: "auto" }} variant="ghost" onClick={onToggle}><FaBars /></BtnToggle>
                    <Heading>{open && `${process.env.NEXT_PUBLIC_APP_NAME}`}</Heading>
                </HStack>
                <VStack suppressHydrationWarning w="full">
                    <LinkBtn w="full" data-active={path !== "/dashboard" && undefined} _active={{ _dark: { bgColor: "gray.900" }, _light: { bgColor: "gray.100" } }} open={open} _open={{ justifyContent: "start" }} variant="ghost" asChild>
                        <Link href="/dashboard">
                            <FaHouse />
                            {open && "Home"}
                        </Link>
                    </LinkBtn>
                    <LinkBtn w="full" data-active={!path.includes("/dashboard/clientes") && undefined} _active={{ _dark: { bgColor: "gray.900" }, _light: { bgColor: "gray.100" } }} open={open} _open={{ justifyContent: "start" }} variant="ghost" asChild>
                        <Link href="/dashboard/clientes">
                            <FaPerson />
                            {open && "Cliente"}
                        </Link>
                    </LinkBtn>
                    <LinkBtn w="full" data-active={!path.includes("/dashboard/produtos") && undefined} _active={{ _dark: { bgColor: "gray.900" }, _light: { bgColor: "gray.100" } }} open={open} _open={{ justifyContent: "start" }} variant="ghost"  asChild>
                        <Link href="/dashboard/produtos">
                            <FaBoxesPacking />
                            {open && "Produtos"}
                        </Link>
                    </LinkBtn>
                    <LinkBtn w="full" data-active={!path.includes("/fornecedores") && undefined} _active={{ _dark: { bgColor: "gray.900" }, _light: { bgColor: "gray.100" } }} open={open} _open={{ justifyContent: "start" }} variant="ghost" asChild>
                        <Link href="/dashboard/fornecedores">
                            <FaHandshake />
                            {open && "Fornecedores"}
                        </Link>
                    </LinkBtn>
                    <LinkBtn w="full" data-active={!path.includes("/dashboard/pedidos") && undefined} _active={{ _dark: { bgColor: "gray.900" }, _light: { bgColor: "gray.100" } }} open={open} _open={{ justifyContent: "start" }} variant="ghost" asChild>
                        <Link href="/dashboard/pedidos">
                            <MdOutlineStickyNote2 />
                            {open && "Pedidos"}
                        </Link>
                    </LinkBtn>
                    <LinkBtn w="full" data-active={!path.includes("/dashboard/compras") && undefined} _active={{ _dark: { bgColor: "gray.900" }, _light: { bgColor: "gray.100" } }} open={open} _open={{ justifyContent: "start" }} variant="ghost" asChild>
                        <Link href="/dashboard/compras">
                            <FaBagShopping />
                            {open && "Compras"}
                        </Link>
                    </LinkBtn>
                </VStack>
            </VStack>
            <VStack>
                
            </VStack>
        </Body>
    );
}

export default Sidebar;