import { IoFlagOutline } from "react-icons/io5";
import { useTasks } from "../contexts/TaskContext";

export default function Flag(){
    const { selectedPriority, setSelectedPriority } = useTasks();

    const priorities = [
        { name: "فوری", color: "text-[#FB0606]" },
        { name: "بالا", color: "text-[#FFE605]" },
        { name: "متوسط", color: "text-[#09DBCE]" },
        { name: "پایین", color: "text-[#B2ACAC]" },
    ];

    return (
        <div className=" w-[180px]">
            <ul className=" flex flex-col gap-3 ">
                {priorities.map((p) => (
                    <li  key={p.name}  onClick={() => setSelectedPriority(p.name)}
                        className={` cursor-pointer flex flex-row items-center gap-3 ${selectedPriority === p.name ? 'bg-gray-100 rounded' : ''}`}>
                        <IoFlagOutline className={`${p.color} text-[24px]`}/> 
                        <span>{p.name}</span>
                    </li>
                ))}
            </ul>
            <div className=" cursor-pointer mt-4 gap-2  flex flex-row items-center">
                <button onClick={() => setSelectedPriority(null)} className=" text-[22px] text-[#FB0606]"> ×</button>
                <p className=" text-gray-500">حذف اولویت</p>
            </div>
        </div>
    )
}