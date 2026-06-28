import { Logo } from "../atoms/Logo";
import { ButtonNav } from "../atoms/ButtonNav";
import { Link } from "../atoms/Link";

interface HeaderNavProps {
  linkText: string;
  linkHref: string;
  buttonText: string;
  buttonHref: string;
}

export function HeaderNav({ linkText, linkHref, buttonText, buttonHref }: HeaderNavProps) {
  return (
    <>
      <div className="w-full flex justify-between items-center pt-8 px-12">
        <Logo />
        <div className="flex justify-center items-center gap-2">
          <Link href={linkHref} className="hover:underline text-gray-700 text-[18px] font-medium">
            {linkText}
          </Link>
          <ButtonNav href={buttonHref}>{buttonText}</ButtonNav>
        </div>
      </div>
    </>
  );
}