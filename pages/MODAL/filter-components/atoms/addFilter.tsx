import { useTheme } from "@/pages/contexts/ThemeContext"
export default function AddFilter(){
    const {primaryColor}=useTheme()
    return(
        <>
        <p className=" cursor-pointer" style={{color : primaryColor , fontWeight: "700px" , paddingTop: "30px"}}>افزودن فیلتر جدید</p>
        </>
    )
}