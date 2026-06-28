import { Link } from "../atoms/Link";
import { useTheme } from "@/pages/contexts/ThemeContext";
interface AuthLinksProps {
  text: string;
  linkText: string;
  linkHref: string;
}

function AuthLinks({ text, linkText, linkHref }: AuthLinksProps) {
  const { primaryColor} = useTheme()
  return (
    <>
      <div style={{color :primaryColor }} className="text-center mt-2 text-gray-600">
        {text} <Link href={linkHref} className="font-bold  hover:underline">{linkText}</Link>
      </div>
    </>
  )
}
export default AuthLinks