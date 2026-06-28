import { Logo } from "@/pages/components/atoms/Logo"
import Modal from "@/pages/MODAL/Modal"
import { useState } from "react";
import WorkspaceForm  from "@/pages/MODAL/WorkspaceForm";
import ProjectForm from "@/pages/MODAL/ProjectForm";
function SearchTask() {
     const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState<boolean>(false);
      const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);
    
    return (
        <>
            <div className=" pr-10 pt-4 border-l-2 border-[#AAAAAA] w-[330px] ">
                <Logo />
                <div>
                    <select name="" id="" className=" mt-6 w-[90%] items-center justify-center text-[18px] font-bold " >
                        <option value="" >ورک‌اسپیس‌ها</option>
                    </select>
                    <div className=" flex flex-row text-[#AAAAAA] py-2 rounded-sm bg-[#F6F7F9] w-[90%] mt-6 ">
                        <img src="/search.png" alt="" className=" pr-4" />
                        <search className=" pr-2">جستجو کنید</search>
                    </div>
                    <div onClick={() => setIsWorkspaceModalOpen(true)} className=" cursor-pointer flex flex-row py-2 justify-center gap-2 bg-[#D3D3D3] w-[90%] mt-6 rounded-md">
                        <img src="/blackadd.png" alt="" />
                        <p>ساختن ورک‌اسپیس جدید</p>
                    </div>
                    <ul className=" mt-6 flex flex-col gap-4 pr-6 font-[600]">
                        <li className=" flex flex-row gap-2 items-center"><div className=" w-6 h-6 rounded-md bg-[#40C057]"></div><p className=" text-[20px]">درس مدیریت پروژه</p> </li>
                        <li className=" flex flex-row gap-2 items-center"><div className=" w-6 h-6 rounded-md bg-[#FAB005]"></div><p className=" text-[20px]">کارهای شخصی</p> </li>
                        <ul className=" flex flex-col gap-4  pr-7 text-[18px]">
                            <li>پروژه اول</li>
                            <li>پروژه دوم</li>
                        </ul>
                        <li className=" flex flex-row gap-2 items-center"><div className=" w-6 h-6 rounded-md bg-[#FA5252]"></div><p className=" text-[20px]">درس کامپایلر</p> </li>
                    </ul>
                    <button className=" text-[#208D8E] mt-6 w-[90%] rounded-md py-1 border-2 border-[#208D8E]">ساختن پروژه جدید</button>
                    <ul className=" mt-6 flex flex-col gap-4 pr-6 font-[600]">
                        <li className=" flex flex-row gap-2 items-center"><div className=" w-6 h-6 rounded-md bg-[#228BE6]"></div><p className=" text-[20px]">درس طراحی الگوریتم</p> </li>

                    </ul>
                    <div id="user" className=" flex flex-row gap-3 mt-44 items-center">
                        <div className=" px-3 py-3 rounded-full text-[11px] text-[#4C6EF5] bg-[#DBE4FF]">NM</div>
                        <p className=" font-[600]">نیلوفر موجودی</p>
                    </div>
                    <div className=" flex flex-row gap-2 mr-3 pt-4">
                        <img src="/exit.png" alt="" />
                        <p className=" font-[600] text-[#818181]">خروج</p>
                    </div>
                </div>
            </div>
            <Modal isOpen={isWorkspaceModalOpen} onClose={() => setIsWorkspaceModalOpen(false)} title="">
                <WorkspaceForm />
            </Modal>

            <Modal isOpen={isProjectModalOpen} onClose={() => setIsProjectModalOpen(false)} title="">
                <ProjectForm />
            </Modal>
        </>
    )
}

export default SearchTask