import React from "react";
import { LinkButton } from "../ui/link-button";
import { Session } from "next-auth";
import Link from "next/link";
import { FaGauge } from "react-icons/fa6";

const DashboardAccess: React.FC<{ session: Session | null }> = ({ session }) => {
    
    if (!session || !session.user || session?.user?.role == "USER") {
        return null;
    }
    return (
        <LinkButton variant="ghost" as={Link} href="/dashboard">
            <FaGauge />
            Dashboard
        </LinkButton>
    )
}

export default DashboardAccess;