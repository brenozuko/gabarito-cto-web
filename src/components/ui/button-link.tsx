import * as React from "react";
import Link from "next/link";
import { Button, type ButtonProps } from "~/components/ui/button";

interface ButtonLinkProps extends Omit<ButtonProps, "asChild"> {
  href: string;
  children: React.ReactNode;
}

export function ButtonLink({ href, children, ...props }: ButtonLinkProps) {
  return (
    <Button asChild {...props}>
      <Link href={href}>{children}</Link>
    </Button>
  );
}

