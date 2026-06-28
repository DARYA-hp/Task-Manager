import { HeaderNav } from "../molecules/HeaderNav";
import { useTheme } from "@/pages/contexts/ThemeContext";
interface AuthLayoutSimpleProps {
  children: React.ReactNode;
  linkText: string;
  linkHref: string;
  buttonText: string;
  buttonHref: string;
}

export function AuthLayoutSimple({ children, linkText, linkHref, buttonText, buttonHref }: AuthLayoutSimpleProps) {
  const {primaryColor} = useTheme()
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-gray-50">
      <div className="absolute inset-0 mt-44">
        <div
          className="w-full h-[450px] mt-32"
         style={{
            background: `linear-gradient(135deg, #54BEE8, ${primaryColor})`,
            clipPath: 'polygon(0 44%, 100% 0, 100% 100%, 0 100%)'
          }} />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center px-4">
        <HeaderNav linkText={linkText} linkHref={linkHref} buttonText={buttonText} buttonHref={buttonHref}/>
        {children}
      </div>
    </div>
  )
}