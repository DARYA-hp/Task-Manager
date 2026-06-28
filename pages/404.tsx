import { useTheme } from "./contexts/ThemeContext"
function NotFound(){
    const {primaryColor}=useTheme()
    return(
        <>
        <div style={{backgroundColor: primaryColor}} className=" text-center pt-52 w-full h-screen justify-center items-center text-[35px] text-red-700 text-amber-50">
            not founf
        </div>
        
        </>
    )
}
export default NotFound