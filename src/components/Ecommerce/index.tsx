import { Box } from "@chakra-ui/react"
import EcommerceNavbar from "./Ecommerce-Navbar"

const Ecommerce: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Box suppressHydrationWarning>
            <EcommerceNavbar />
            <Box p="2">
                {children}
            </Box>
        </Box>
    )
}

export default Ecommerce;