"use client";

import { usePathname } from "next/navigation";
import {
  BreadcrumbCurrentLink,
  BreadcrumbLink,
  BreadcrumbRoot,
} from "../ui/breadcrumb";
import Link from "next/link";

const BreadCumb: React.FC = () => {
  const path = usePathname();
  const links = path.slice(1).split("/");
  return (
    <BreadcrumbRoot suppressHydrationWarning>
      {links.map((link, i, dt) => {
        if (i + 1 === links.length) {
          const label = link.charAt(0).toUpperCase() + link.slice(1);
          return (
            <BreadcrumbCurrentLink fontSize="md" key={i} asChild>
              <Link href={path}>{label}</Link>
            </BreadcrumbCurrentLink>
          );
        } else {
          const href =
            "/" +
            dt
              .map((v, idx) => {
                if (idx <= i) {
                  return v;
                }
              })
              .join("/");
          const label = link.charAt(0).toUpperCase() + link.slice(1);
          return (
            <BreadcrumbLink fontSize="md" key={i} asChild>
              <Link href={href}>{label}</Link>
            </BreadcrumbLink>
          );
        }
      })}
    </BreadcrumbRoot>
  );
};

export default BreadCumb;
