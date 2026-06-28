import { useTheme } from "@/pages/contexts/ThemeContext";
import VerifyBtn from "../atoms/verify";
import { DarkBtn } from "@/pages/components/atoms/DarkBtn";
interface SelectThemeProps {
  onColorSelect?: (color: string) => void;
}

export default function SelectTheme({ onColorSelect }: SelectThemeProps) {
  const { primaryColor, setPrimaryColor } = useTheme();

  const colors = [
    '#B8230D', '#1D2180', '#0CDC2A', '#BF6CE9',
    '#DBEE82', '#F4CC9C', '#F6ADDA', '#176571',
    '#D9A69F', '#F650BD', '#8DF688', '#41D2EF', '#R42308'
  ];

  const handleColorClick = (color: string) => {
    setPrimaryColor(color);
    if (onColorSelect) {
      onColorSelect(color);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-10 mt-24 mr-20">
        <p className="text-[31px] font-[700]"> تنظیمات</p>
        <div className=" flex flex-col gap-2">
          <p>انتخاب تم</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {colors.map((color) => (
              <div key={color} onClick={() => handleColorClick(color)}
                className={` w-5 h-5 rounded-full cursor-pointer transition-all duration-200 flex items-center justify-center ${primaryColor === color ? 'scale-125 ring-2 ring-white ring-offset-2' : ''} `}
                style={{ backgroundColor: color }} >
                {primaryColor === color && (
                  <div className="w-2 h-2 rounded-full bg-white shadow-sm"></div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
           <DarkBtn/>
        </div>
        <div className="mt-6">
          <VerifyBtn selectedColor={primaryColor} />
        </div>
      </div>
    </>
  )
}