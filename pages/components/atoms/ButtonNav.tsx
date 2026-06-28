import Link from "next/link";
import { useTheme } from "@/pages/contexts/ThemeContext";
interface ButtonNavProps {
  href: string;
  children: React.ReactNode;
}

export function ButtonNav({ href, children }: ButtonNavProps) {
  const { primaryColor } = useTheme();

  return (
    <Link href={href}>
      <button  className="text-white hover:bg-white/30  border border-white/40 px-6 py-1 rounded-md font-semibold transition backdrop-blur-sm"
        style={{ backgroundColor: primaryColor }}>
        {children}
      </button>
    </Link>
  )
}