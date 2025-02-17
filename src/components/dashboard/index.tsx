"use client";
import { Box, HStack, VStack } from "@chakra-ui/react";
import Sidebar from "../sidebar";
import Navbar from "../navgation";

const Dashboard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <HStack suppressHydrationWarning gap="0" w="full" h="vh">
            <Sidebar />
            <VStack suppressHydrationWarning gap={0} w="full" h="full">
                <Navbar />
                <Box suppressHydrationWarning w="full" h="full" px="2.5" py="2.5" overflowY="auto" scrollbarColor="red.100">
                    {children}
                </Box>
            </VStack>
        </HStack>
    )
};

export default Dashboard;