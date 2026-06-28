import { TbEdit } from "react-icons/tb";
import { VscSymbolColor } from "react-icons/vsc";
import Modal from "./Modal";
import { useState } from "react";
import Color from "./Color";
export default function TagOption() {
    const [color , setColor]=useState<boolean>(false)
    return (
        <>
            <div className=" flex flex-col gap-4">
                <div className=" cursor-pointer mt-4 gap-2  flex flex-row items-center">
                    <button> ×</button>
                    <p>حذف </p>
                </div>
                <div className=" cursor-pointer flex flex-row items-center gap-2">
                    <TbEdit className=" text-[#BDBDBD]"/>
                    <p>ویرایش تگ</p>
                </div>
                <div  onClick={()=>setColor(true)} className=" cursor-pointer flex flex-row items-center gap-2">
                    <VscSymbolColor className=" text-[#BDBDBD]"/>
                    <p>ویرایش رنگ</p>
                </div>
            </div>
            <Modal isOpen={color} onClose={()=>setColor(false)} title="">
                <Color/>
            </Modal>
        </>
    )
}
