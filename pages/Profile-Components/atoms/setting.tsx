import { IoSettingsOutline } from "react-icons/io5";
function Setting() {
    return (
        <>
            <button className=" w-52 flex flex-row items-center gap-2">
                 <IoSettingsOutline className=" text-2xl"/>
                <p>تنظیمات</p>
            </button>
        </>
    )
}
export default Setting