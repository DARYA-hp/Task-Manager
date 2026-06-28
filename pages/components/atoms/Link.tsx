import NextLink from "next/link";

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function Link({ href, children, className = "" }: LinkProps) {
  return (
    <>
      <NextLink href={href} className={className}>
        {children}
      </NextLink>
    </>
  )
}