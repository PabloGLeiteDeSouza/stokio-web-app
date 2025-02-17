"use client";
import { HoverCardArrow, HoverCardContent, HoverCardRoot, HoverCardTrigger } from "@/components/ui/hover-card"
import { LinkButton, LinkButtonProps } from "@/components/ui/link-button"
import { Box } from "@chakra-ui/react"
import Link from "next/link"
import React from "react";

interface EcommerceNavItem extends LinkButtonProps, React.RefAttributes<HTMLAnchorElement> {
    conteudo: React.ReactNode;
}

const EcommerceNavItem: React.FC<EcommerceNavItem> = ({ conteudo, children, ...props }) => {
    const [open, setOpen] = React.useState(false);
    return (
        <HoverCardRoot size="lg" open={open} onOpenChange={(e) => setOpen(e.open)}>
            <HoverCardTrigger asChild>
                <LinkButton {...props} as={Link}>
                    {conteudo}
                </LinkButton>
            </HoverCardTrigger>
            <HoverCardContent maxW="full" p="5" bgColor={{ _dark: "gray.950", _light: "gray.200" }}>
                {children}
            </HoverCardContent>
        </HoverCardRoot>
    )
};

export default EcommerceNavItem;