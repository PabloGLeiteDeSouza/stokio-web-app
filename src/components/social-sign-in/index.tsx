import { VStack } from "@chakra-ui/react"
import { Button } from "../ui/button";
import { FaFacebook, FaGoogle } from "react-icons/fa6";
import { signIn } from "@/auth";

const SocialSignIn: React.FC = () => {
    return (
        <VStack>
            <Button  onClick={async () => {
                // TO DO: implement Google sign in
                "use server"
                await signIn('facebook', { redirectTo: "/" })
            }}>
                <FaFacebook />
                Sign in with Facebook
            </Button>
            <Button w="full" onClick={async () => {
                // TO DO: implement Google sign in
                "use server"
                await signIn('google', { redirectTo: "/" })
            }}>
                <FaGoogle />
                Sign in with Google
            </Button>
        </VStack>
    )
};
export default SocialSignIn;