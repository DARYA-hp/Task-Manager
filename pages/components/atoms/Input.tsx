import { InputHTMLAttributes } from "react";
import { useTheme } from "@/pages/contexts/ThemeContext";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id: string;
}

export function Input({ id, className = "", ...props }: InputProps) {
  const { primaryColor } = useTheme();

  return (
    <>
      <input 
        id={id}
        className={`px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent ${className}`}
        style={{ '--primary-color': primaryColor } as React.CSSProperties}
        {...props} 
      />
    </>
  )
}