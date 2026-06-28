import { useState } from "react";
import { GoLink } from "react-icons/go";
import { IoFlagOutline } from "react-icons/io5";
import Modal from "./Modal";
import { PiCalendarDots } from "react-icons/pi";
import { TbTags, TbUserPlus } from "react-icons/tb";
import { useTheme } from "../contexts/ThemeContext";
import Attach from "./Attach";
import Flag from "./Flag";
import CalenderDate from "./CalenderDate";
import { useTasks } from "../contexts/TaskContext";
import { Tag } from "../contexts/TaskContext"; // اینترفیس تگ را ایمپورت کنید

interface NewTaskProps {
    projectName: string;
    onClose: () => void;
    defaultStatus: 'open' | 'pending' | 'progress' | 'done';
}

export default function NewTask({ projectName, onClose, defaultStatus }: NewTaskProps) {
    const { primaryColor } = useTheme();
    const { addTask, selectedPriority, setSelectedPriority, selectedStartDate, setSelectedStartDate, selectedEndDate, setSelectedEndDate, selectedTags, setSelectedTags } = useTasks();

    const [attach, setIsAttach] = useState<boolean>(false);
    const [flag, setFlag] = useState<boolean>(false);
    const [dateModalOpen, setDateModalOpen] = useState<boolean>(false);

    const [tempDate, setTempDate] = useState<string>("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleDateSelectFromModal = (date: string) => {
        setTempDate(date);
        setDateModalOpen(false);
    };

    const handleSave = () => {
        if (!title) return alert("عنوان را وارد کنید");

        let finalStartDate = selectedStartDate;
        let finalEndDate = selectedEndDate;
        if (tempDate) {
            if (!selectedStartDate) {
                finalStartDate = tempDate;
            } else {
                finalEndDate = tempDate;
            }
        }

        addTask({
            title,
            description,
            priority: selectedPriority,
            startDate: finalStartDate || "بدون تاریخ شروع",
            endDate: finalEndDate || "بدون تاریخ پایان",
            tags: selectedTags,
            projectName: projectName,
            status: defaultStatus
        });

        onClose();
    }
    const handleTagSelect = (newTag: Tag) => {
        const isTagExists = selectedTags.some(tag => tag.id === newTag.id);
        if (!isTagExists) {
            setSelectedTags([...selectedTags, newTag]);
        }
        setIsAttach(false)
    }

    return (
        <>
            <div className="w-[900px]">
                <div className=" flex justify-between pt-8 items-center">
                    <div className=" flex gap-2 items-center">
                        <div className=" w-4 h-4 bg-[#D9D9D9]"></div>
                        <h2 className=" text-[#1E1E1E] font-medium text-2xl">عنوان تسک</h2>
                    </div>
                </div>
                <div className=" flex mt-8 gap-2 items-center">
                    <p className=" font-medium text-[#1E1E1E] text-base">در<span className=" border border-[#E9EBF0] rounded-md mx-2 px-5 py-1">{projectName}</span>برای</p>
                    <TbUserPlus className=" text-[#C1C1C1] border border-[#C1C1C1] border-dashed rounded-full text-3xl p-1" />
                </div>
                <div className="mt-4">
                    <input type="text" placeholder="عنوان تسک..."
                     className=" resize-none outline-0 w-full p-3 border border-[#E2E2E2] rounded-xl placeholder:text-[#AEAEAE] text-base font-medium"
                        value={title} onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div>
                    <textarea  placeholder="توضیحاتی برای این تسک بنویسید"  className=" resize-none outline-0 w-full p-5 mt-4 h-32 border border-[#E2E2E2] rounded-xl placeholder:text-[#AEAEAE] text-base font-medium"
                        value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div className=" flex mt-8 gap-3 items-center">
                    <p className=" text-[#1E1E1E] font-medium text-base">افزودن پیوست</p>
                    <button style={{ border: `2px solid ${primaryColor}` }} className=" cursor-pointer flex rounded items-center gap-2 px-3 py-1">
                        <GoLink style={{ color: primaryColor }} /><span className=" text-[#1E1E1E] font-medium text-base cursor-pointer">آپلود فایل</span>
                    </button>
                </div>
                <div className=" flex gap-3 items-center mt-8">
                    <p className=" text-[#1E1E1E] font-medium text-base">افزودن کاور</p>
                    <button style={{ border: `2px solid ${primaryColor}` }} className=" flex rounded items-center gap-2 px-3 py-1">
                        <GoLink style={{ color: primaryColor }} /><span className=" text-[#1E1E1E] font-medium text-base cursor-pointer">آپلود فایل</span>
                    </button>
                </div>

                <div className=" flex justify-between items-center">
                    <div className=" flex items-center gap-6 my-10">
                        <IoFlagOutline onClick={() => setFlag(true)}
                            className={` text-[#BDC0C6] border border-dashed border-[#BDC0C6] rounded-full text-5xl cursor-pointer p-2 ${selectedPriority ? 'text-red-500 border-red-500' : ''}`}/>
                        <PiCalendarDots onClick={() => setDateModalOpen(true)}
                            className={` text-[#BDC0C6] border border-dashed border-[#BDC0C6] rounded-full text-5xl cursor-pointer p-2 ${tempDate || selectedStartDate ? 'text-blue-500 border-blue-500' : ''}`} title="انتخاب تاریخ"/>
                        <TbTags onClick={() => setIsAttach(true)}
                            className={` cursor-pointer text-[#BDC0C6] border border-dashed border-[#BDC0C6] rounded-full text-5xl cursor-pointer p-2 ${selectedTags.length > 0 ? 'text-purple-500 border-purple-500' : ''}`}/>
                    </div>
                    <button  style={{ backgroundColor: primaryColor }}  onClick={handleSave}  className=" text-white rounded px-8 py-2  font-normal cursor-pointer" >
                        ساختن تسک
                    </button>
                </div>
            </div>

            <Modal isOpen={attach} onClose={() => setIsAttach(false)} title="">
                <Attach onTagSelect={handleTagSelect} />
            </Modal>
            <Modal isOpen={flag} onClose={() => setFlag(false)} title="">
                <Flag />
            </Modal>
            <Modal isOpen={dateModalOpen} onClose={() => setDateModalOpen(false)} title="">
                <CalenderDate
                    onDateSelect={handleDateSelectFromModal}
                    initialDate={tempDate}
                />
            </Modal>
        </>
    )
}