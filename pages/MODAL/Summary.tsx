import { useRouter } from "next/router";
import { useTheme } from "../contexts/ThemeContext";
import { useWorkspace } from "../contexts/useWorkspace";

interface NewColorProps {
    selectedColor: string;
}

function Summary({ selectedColor }: NewColorProps) {
    const router = useRouter();
    const { currentWorkspace, createWorkspace } = useWorkspace();
    const { primaryColor } = useTheme();

    function NewBoard() {
        const finalName = currentWorkspace?.name || "ورک‌اسپیس ";
        const finalColor = currentWorkspace?.color || selectedColor;
        createWorkspace(finalName, finalColor);
        router.push('/NewBoard');
    }

    return (
        <>
            <div className="flex flex-col gap-4 w-full">
                <p className="mb-6 text-center text-[20px] font-[600]">مرور اطلاعات</p>
                <div className="font-[600] border-2 rounded-md border-[#AAAAAA] p-2 flex flex-col gap-5">
                    <div className="w-full flex flex-row justify-between">
                        <p>نام ورک‌اسپیس</p>
                        <p>{currentWorkspace?.name || "نام ورک‌اسپیس"}</p>
                    </div>
                    <div className="w-full flex flex-row justify-between">
                        <p>رنگ ورک‌اسپیس</p>
                        <div className="h-[20px] rounded-md w-[20px]" style={{ backgroundColor: currentWorkspace?.color || selectedColor }}></div>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p>اعضا</p>
                        <img src="/girl.jpg" alt="" className="rounded-full h-[30px] w-[30px]" />
                    </div>
                </div>
                <button style={{ backgroundColor: primaryColor }} onClick={NewBoard} className="text-white py-1 rounded-md">
                    ساختن ورک‌اسپیس
                </button>
            </div>
        </>
    );
}
export default Summary;