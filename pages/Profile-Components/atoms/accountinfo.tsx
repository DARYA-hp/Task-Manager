import { TbUserCheck } from "react-icons/tb";

function Account() {
    return (
        <>
            <button className=" w-52 flex flex-row items-center gap-2">
                <TbUserCheck className=" text-2xl"/>
                <p>اطلاعات حساب</p>
            </button>
        </>
    )
}
export default Account