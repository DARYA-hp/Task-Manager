import { useState } from "react"
import Modal from "./Modal"
import NewColor from "./NewColor"
import { useTheme } from "../contexts/ThemeContext"
import { useWorkspace } from "../contexts/useWorkspace"
function SelectColor() {
    const [selectedColor, setSelectedColor] = useState('#7D828C')
    const [newColor, setNewColor] = useState<boolean>(false)
    const { primaryColor } = useTheme()
    const { updateWorkspace } = useWorkspace()

    return (
        <>
            <div className="flex flex-col gap-4 items-center">
                <p className="text-[25px] text-center font-[700]">انتخاب رنگ ورک‌اسپیس</p>
                <div className="mt-4 flex flex-row justify-center">
                    <div style={{ backgroundColor: selectedColor }} className="flex flex-row gap-2 items-center rounded-2xl justify-center w-20 h-20 p-2">
                        <p className="text-white font-[600] text-[20px]">ت</p>
                        <p className="text-white font-[600] text-[20px]">ط</p>
                    </div>
                    <div className="px-3">
                        <p className=" pr-6">رنگ ورک‌اسپیس</p>
                        <div className="flex flex-row flex-wrap gap-4 px-6 pt-4 items-center cursor-pointer">
                            <div onClick={() => setSelectedColor('#4C6EF5')} className={`bg-[#4C6EF5] rounded-[40%] w-6 h-6 ${selectedColor === '#4C6EF5' ? 'w-8 h-8' : ''}`}></div>
                            <div onClick={() => setSelectedColor('#228BE6')} className={`bg-[#228BE6] rounded-[40%] w-6 h-6 ${selectedColor === '#228BE6' ? 'w-8 h-8' : ''}`}></div>
                            <div onClick={() => setSelectedColor('#15AABF')} className={`bg-[#15AABF] rounded-[40%] w-6 h-6 ${selectedColor === '#15AABF' ? 'w-8 h-8' : ''}`}></div>
                            <div onClick={() => setSelectedColor('#12B886')} className={`bg-[#12B886] rounded-[40%] w-6 h-6 ${selectedColor === '#12B886' ? 'w-8 h-8' : ''}`}></div>
                            <div onClick={() => setSelectedColor('#208D8E')} className={`bg-[#208D8E] rounded-[40%] w-6 h-6 ${selectedColor === '#208D8E' ? 'w-8 h-8' : ''}`}></div>
                            <div onClick={() => setSelectedColor('#40C057')} className={`bg-[#40C057] rounded-[40%] w-6 h-6 ${selectedColor === '#40C057' ? 'w-8 h-8' : ''}`}></div>
                            <div onClick={() => setSelectedColor('#82C91E')} className={`bg-[#82C91E] rounded-[40%] w-6 h-6 ${selectedColor === '#82C91E' ? 'w-8 h-8' : ''}`}></div>
                            <div onClick={() => setSelectedColor('#FAB005')} className={`bg-[#FAB005] rounded-[40%] w-6 h-6 ${selectedColor === '#FAB005' ? 'w-8 h-8' : ''}`}></div>
                            <div onClick={() => setSelectedColor('#FD7E14')} className={`bg-[#FD7E14] rounded-[40%] w-6 h-6 ${selectedColor === '#FD7E14' ? 'w-8 h-8' : ''}`}></div>
                            <div onClick={() => setSelectedColor('#FA5252')} className={`bg-[#FA5252] rounded-[40%] w-6 h-6 ${selectedColor === '#FA5252' ? 'w-8 h-8' : ''}`}></div>
                            <div onClick={() => setSelectedColor('#E64980')} className={`bg-[#E64980] rounded-[40%] w-6 h-6 ${selectedColor === '#E64980' ? 'w-8 h-8' : ''}`}></div>
                            <div onClick={() => setSelectedColor('#BE4BDB')} className={`bg-[#BE4BDB] rounded-[40%] w-6 h-6 ${selectedColor === '#BE4BDB' ? 'w-8 h-8' : ''}`}></div>
                            <div onClick={() => setSelectedColor('#7950F2')} className={`bg-[#7950F2] rounded-[40%] w-6 h-6 ${selectedColor === '#7950F2' ? 'w-8 h-8' : ''}`}></div>
                        </div>
                    </div>
                </div>
                <button style={{ backgroundColor: primaryColor }}
                    onClick={() => {
                        updateWorkspace({ color: selectedColor });
                        setNewColor(true);
                    }}
                    className=" font-bold text-white rounded-md w-full p-2 mt-12 mb-7 cursor-pointer">
                    ادامه
                </button>
            </div>
            <Modal isOpen={newColor} onClose={() => setNewColor(false)} title="">
                <NewColor selectedColor={selectedColor} />
            </Modal>
        </>
    )
}
export default SelectColor