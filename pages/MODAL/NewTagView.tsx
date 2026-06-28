import { CiSearch } from "react-icons/ci"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import Modal from "./Modal"
import TagOption from "./TagOption"
import { useState } from "react"
export default function NewTag() {
    const [tagOption , setTagOption]=useState<boolean>(false)
    return (
        <>
            <div>
                <div>
                    <button onClick={()=>setTagOption(true)} className=" cursor-pointer text-[#FD7E14] rounded-[35px] px-5 py-3 text-[19px] font-[500] bg-[#FFE8CC]">تگ جدید</button>
                </div>
                <div className=" bg-white rounded-lg px-2">
                    <div  className=" flex bg-[#E9E9E9] rounded items-center gap-2 py-2 px-2 mt-2 justify-between w-full">
                        <span><CiSearch className=" text-[#BDBDBD] text-[24px]" /></span>
                        <input type="text" placeholder="جستجو یا ساختن تگ" className="  outline-0 placeholder:text-[18px] placeholder:text-[#534D60]" />
                    </div>
                    <div className=" space-y-3 pt-5 pb-3">
                        <div className=" flex justify-between items-center">
                            <span className="  font-[700] text-[#228BE6] bg-[#D0EBFF] rounded-[14px] px-2 py-1">درس</span>
                            <HiOutlineDotsHorizontal onClick={()=>setTagOption(true)}  className=" text-[#BDBDBD] cursor-pointer" />
                        </div>
                        <div className=" flex justify-between items-center">
                            <span className=" font-[700]  text-[#BE4BDB] bg-[#F3D9FA] rounded-[14px] px-2 py-1">کار</span>
                            <HiOutlineDotsHorizontal onClick={()=>setTagOption(true)}  className=" text-[#BDBDBD] cursor-pointer" />
                        </div>
                        <div className=" flex justify-between items-center">
                            <span className=" font-[700] text-[#15AABF] bg-[#C5F6FA] rounded-[14px] px-2 py-1">پروژه</span>
                            <HiOutlineDotsHorizontal onClick={()=>setTagOption(true)}  className=" text-[#BDBDBD] cursor-pointer" />
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={tagOption} onClose={()=>setTagOption(false)} title="">
                <TagOption/>
            </Modal>
        </>
    )
}



