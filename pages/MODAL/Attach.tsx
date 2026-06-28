import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import Modal from "./Modal";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Attach1 from "./Attach1";
import { Tag } from "../contexts/TaskContext";

const defaultTags: Tag[] = [
  { id: '1', name: 'درس', color: '#228BE6' },
  { id: '2', name: 'کار', color: '#BE4BDB' },
  { id: '3', name: 'پروژه', color: '#15AABF' },
];

interface AttachProps {
    onTagSelect: (tag: Tag) => void;
}

export default function Attach({ onTagSelect }: AttachProps) {
    const [attach1, setAttach1] = useState<boolean>(false);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredTags = defaultTags.filter(tag => 
        tag.name.includes(searchTerm)
    )

    return (
        <>
            <div>
                <div className=" bg-white rounded-lg px-2">
                    <div onClick={()=>setAttach1(true)} className=" flex bg-[#E9E9E9] rounded items-center gap-2 py-2 px-2 mt-2 justify-between w-full cursor-pointer">
                        <span><CiSearch className=" text-[#BDBDBD] text-[24px]" /></span>
                        <input   type="text"   placeholder="جستجو یا ساختن تگ"   className=" outline-0 placeholder:text-[18px] placeholder:text-[#534D60] w-full"  onChange={(e) => setSearchTerm(e.target.value)} />
                    </div>
                    <div className=" space-y-3 pt-5 pb-3 max-h-40 overflow-y-auto">
                        {filteredTags.map((tag) => (
                            <div key={tag.id} onClick={() => onTagSelect(tag)}
                                className=" flex justify-between items-center cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors">
                                <span  className=" font-[700] text-white rounded-[14px] px-2 py-1"  style={{ backgroundColor: tag.color }}>
                                    {tag.name}
                                </span>
                                <HiOutlineDotsHorizontal className=" text-[#BDBDBD] cursor-pointer" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Modal isOpen={attach1} onClose={()=>setAttach1(false)} title="">
                <Attach1 onTagSelect={(tag: Tag) => { onTagSelect(tag);  setAttach1(false)}} />
            </Modal>
        </>
    )
}