import { useTheme } from "@/pages/contexts/ThemeContext"
interface ReturnBTNProps {
  onClick: () => void;
}

export default function ReturnBTN({ onClick }: ReturnBTNProps) {
    const { primaryColor } = useTheme();
    
    return (
        <>
            <button 
                onClick={onClick}
                style={{ backgroundColor: primaryColor }} 
                className="cursor-pointer flex flex-row items-center gap-2 w-[67%] pr-1 py-1 rounded-md mb-8 text-white hover:opacity-90 transition-opacity"
            >
                <img src="/return.png" alt="بازگشت" className="w-5 h-5" />
                <p className=" text-xl">بازگشت</p>
            </button>
        </>
    )
}