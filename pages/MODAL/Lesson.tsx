import { useState } from "react"
import Modal from "./Modal"
import ShareWorkSpace from "./ShareWorkSpace"
function Lesson(){
    const [shareWorkSpace , setShareWorkSpace]=useState<boolean>(false)
    return(
        <>
        <div className=" flex flex-col gap-3 w-[50%]">
            <div className=" flex flex-row gap-3">
                <img src="/PLUSADD.png" alt="" />
                <p>ساختن پروژه جدید</p>
            </div>
            <div className=" flex flex-row gap-3 ">
                <img src="/Edit.png" alt="" />
                <p>ویرایش نام ورک‌اسپیس</p>
            </div>
            <div className=" flex flex-row gap-3 ">
                <img src="/pallet.png" alt="" />
                <p>ویرایش رنگ</p>
            </div>
            <div className=" flex flex-row gap-3 ">
                <img src="/rrr.png" alt="" />
                <p>کپی لینک</p>
            </div>
            <div className=" flex flex-row gap-3 ">
                <img src="/Trash, Delete, Bin.png" alt="" />
                <p className=" text-[#FA5252]">حذف</p>
            </div>
            <button onClick={()=>setShareWorkSpace(true)}  className=" w-44 flex items-center pr-3 py-2 rounded-md  flex-row gap-2 bg-[#208D8E]">
            <img src="/W-share.png" alt="" />
            <p className=" text-white">اشتراک‌گذاری</p>
          </button>
        </div>
        <Modal isOpen ={shareWorkSpace} onClose={()=>setShareWorkSpace(false)} title="">
           <ShareWorkSpace/>
        </Modal>
        </>
    )
}
export default Lesson