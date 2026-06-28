import { useState } from "react"
import Modal from "./Modal";
import Summary from "./Summary";
import { useTheme } from "../contexts/ThemeContext";
import { useWorkspace } from "../contexts/useWorkspace";
interface NewColorProps {
    selectedColor: string;
}
function NewColor({ selectedColor: initialColor }: NewColorProps) {
    const [summary, setSummary] = useState<boolean>(false)
    const [selectedColor, setSelectedColor] = useState(initialColor)
    const { primaryColor } = useTheme()
    const { updateWorkspace } = useWorkspace()

    return (
        <>
            <div className="flex flex-col gap-4 items-center">
                <p className="text-[25px] text-center font-[700]">انتخاب رنگ ورک‌اسپیس</p>
                <div className="mt-4 flex flex-row justify-center">
                    <div style={{ backgroundColor: selectedColor }} className="flex flex-row gap-2 items-center rounded-2xl justify-center w-2 h-2 p-8">
                        <p className="text-white font-[600] text-[20px]">ت</p>
                        <p className="text-white font-[600] text-[20px]">ط</p>
                    </div>
                    <div className="px-3">
                        <p className="pr-6">رنگ ورک‌اسپیس</p>
                        <div className="flex flex-row flex-wrap gap-4 px-6 pt-4 items-center cursor-pointer">
                            <div onClick={() => setSelectedColor('#7D828C')}>
                                <img className="w-6 h-6" src="/restrict.png" alt="" />
                            </div>
                            {[  '#4C6EF5', '#228BE6', '#15AABF', '#12B886',  '#208D8E', '#40C057', '#82C91E', '#FAB005',
                                '#FD7E14', '#FA5252', '#E64980', '#BE4BDB', '#7950F2'
                            ].map((color) => (
                                <div  key={color}  onClick={() => setSelectedColor(color)}
                                    className={` rounded-[40%] flex items-center justify-center transition-all duration-200 cursor-pointer ${selectedColor === color ? 'w-8 h-8' : 'w-6 h-6'}`}
                                    style={{ backgroundColor: color }}>
                                    {selectedColor === color && (
                                        <div className="w-3 h-3 rounded-full bg-white"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <button  style={{ backgroundColor: primaryColor }}
                    onClick={() => {
                        updateWorkspace({ color: selectedColor });
                        setSummary(true);
                    }}
                    className=" font-bold text-white rounded-md w-full p-2 mt-12 mb-7 cursor-pointer">
                    ادامه
                </button>
            </div>
            <Modal isOpen={summary} onClose={() => setSummary(false)} title="">
                <Summary selectedColor={selectedColor} />
            </Modal>
        </>
    )
}
export default NewColor