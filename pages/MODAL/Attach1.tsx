import Modal from "./Modal";
import NewTag from "./NewTagView";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function Attach1() {
    const [tagText, setTagText] = useState<string>("");
    const [newTag, setNewTag] = useState<boolean>(false)
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            localStorage.setItem('userTagText', tagText);
            setTagText("")
            setNewTag(true)
        }
    };

    return (
        <>
            <div>
                <div className=" flex flex-row gap-3 bg-[#E9E9E9] rounded items-center py-3 px-2 mt-2">
                    <span><CiSearch className=" text-[#BDBDBD] text-[24px]" /></span>
                    <input type="text" placeholder="تگ جدید" className=" outline-0 placeholder:text-[18px] placeholder:text-[#534D60]" value={tagText}
                        onChange={(e) => setTagText(e.target.value)} onKeyDown={handleKeyDown} />
                </div>
                <p className=" text-center mt-3 text-xl">برای ذخیره تگ جدید اینتر بزنید</p>
            </div>
            <Modal isOpen={newTag} onClose={() => setNewTag(false)} title="">
                <NewTag />
            </Modal>
        </>
    )
}