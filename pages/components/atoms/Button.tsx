import Link from "next/link";
import { useTheme } from "@/pages/contexts/ThemeContext";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({ children, href, type = "button", className = "", onClick, disabled }: ButtonProps) {
  const { primaryColor } = useTheme();
  const baseStyles = "text-white py-1 rounded-lg font-semibold text-lg shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";
  const style = {
    backgroundColor: primaryColor,
  }

  if (href) {
    return (
      <Link href={href}>
        <button   type={type}   className={`${baseStyles} ${className}`}   style={style} disabled={disabled}>
          {children}
        </button>
      </Link>
    )
  }
  return (
    <button  type={type}  onClick={onClick}  className={`${baseStyles} ${className}`}  style={style} disabled={disabled}>
      {children}
    </button>
  )
}