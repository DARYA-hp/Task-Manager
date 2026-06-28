import AccountName from "../atoms/accountName"
import EmailData from "../atoms/emailsData"
import VerifyBtn from "../atoms/verify"
import { useState, useEffect } from "react"
import { getStoredColor } from "../../color/colorUtils"

interface SelectThemeProps {
  onColorSelect?: (color: string) => void;
}

function AccountInfo({ onColorSelect }: SelectThemeProps) {
    const [userColor, setUserColor] = useState(getStoredColor)
    useEffect(() => {
        const storedColor = getStoredColor();
        setUserColor(storedColor);
        if (onColorSelect) {
            onColorSelect(storedColor);
        }
    }, [onColorSelect]);

    return (
        <>
            <div className="flex flex-col mt-24 mr-20">
                <div className="pb-6">
                    <AccountName />
                    <EmailData />
                </div>
            </div>
        </>
    )
}

export default AccountInfo