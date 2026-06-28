import { getStoredColor, saveColor } from "@/pages/color/colorUtils";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
interface SelectThemeProps {
    onColorSelect?: (color: string) => void;
}

function EditPic({ onColorSelect }: SelectThemeProps) {
    const [userColor, setUserColor] = useState(getStoredColor)
    useEffect(() => {
        saveColor(userColor);
        if (onColorSelect) {
            onColorSelect(userColor);
        }
    }, [userColor, onColorSelect]);

    const user = useSelector((state: RootState) => state.profile.user);
    const displayName = user?.name || "user ";

    const getInitials = (name: string | undefined) => {
        if (!name) return "user";
        const parts = name.split(' ');
        if (parts.length < 2) return parts[0].substring(0, 2).toUpperCase();
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    const displayInitials = getInitials(displayName);

    return (
        <>
            <div className=" mt-10 flex flex-row gap-4  ">
                <div className="px-5 py-5 rounded-full font-[600] text-[22px] text-[#f5f24c] bg-[#f7ffdb]">{displayInitials}</div>
                <div className=" flex flex-col gap-2">
                    <button style={{ border: `2px solid ${userColor}`, color: userColor }} className=" border-2 px-3 py-2 rounded-md font-[600] text-[20px]">ویرایش تصویر پروفایل</button>
                    <p className=" text-[#8A8989] text-[13px]">این تصویر برای عموم قابل نمایش است.</p>
                </div>

            </div>
        </>
    )
}
export default EditPic