import { useTheme } from "@/pages/contexts/ThemeContext";
import { CiSquarePlus } from "react-icons/ci";
import NewTask from "@/pages/MODAL/NewTask";
import Modal from "@/pages/MODAL/Modal";
import { useState } from "react";
import { ImParagraphRight } from "react-icons/im";
import { IoFlagOutline } from "react-icons/io5";
import { CiSquareCheck } from "react-icons/ci";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useTasks } from "@/pages/contexts/TaskContext";
import { Tag } from "@/pages/contexts/TaskContext";
import { useSelector } from "react-redux";
import { RootState } from "@/pages/store";
interface DoneProps {
    projectName: string;
    filters: {
        filterType: string;
        filterValue: string;
        operator: string;
    }
}

export default function Done({ projectName, filters }: DoneProps) {
    const user = useSelector((state: RootState) => state.profile.user);
    const displayName = user?.name || "user ";
    const { primaryColor } = useTheme();
    const [newTask, setNewTask] = useState<boolean>(false);
    const { tasks } = useTasks();
    let projectTasks = tasks.filter(t => t.projectName === projectName && t.status === 'done');

    if (filters.filterType && filters.filterValue && filters.operator) {
        projectTasks = projectTasks.filter(task => {
            let match = false;
            if (filters.filterType === 'tag') {
                const hasTag = task.tags.some(tag => tag.name === filters.filterValue);
                match = filters.operator === 'است' ? hasTag : !hasTag;
            }
            else if (filters.filterType === 'priority') {
                const hasPriority = task.priority === filters.filterValue;
                match = filters.operator === 'است' ? hasPriority : !hasPriority;
            }
            return match;
        });
    }
    console.log(`Done Column - Tasks Count: ${projectTasks.length}`, projectTasks);

    return (
        <>
            <div id="done" className=" flex flex-col gap-y-4 w-[240px]" >
                <div className=" rounded-3xl shadow shadow-amber-700 py-2 flex flex-row justify-between px-3">
                    <p>Done</p>
                    <button>+...</button>
                </div>
                {projectTasks.map((task) => (
                    <div key={task.id} className=" flex flex-col rounded-2xl mt-3 shadow-md shadow-[#bbbab8] bg-white">
                        <div>
                            <div id="user" className=" flex flex-row justify-between px-3 pt-2 items-center">
                                <p className=" text-[14px] font-[600] text-[#a1a1a3] pr-3">{task.projectName}</p>
                                <div className=" px-2 py-2 rounded-full text-[8px] text-[#FAB005] bg-[#FFF3BF]">{displayName}</div>
                            </div>
                        </div>
                        <div className=" flex flex-row gap-3 align-middle items-center">
                            <p className=" text-[14px] pt-2 pr-3 font-bold">{task.title}</p>
                            <ImParagraphRight className=" text-gray-400" />
                        </div>
                        <div className=" flex flex-row items-center gap-3 pt-3 px-3">
                            <div className=" flex flex-row items-center gap-1">
                                {task.priority && (
                                    <IoFlagOutline className={task.priority === 'فوری' ? " text-red-600" : "text-gray-400"} />
                                )}
                                <p className="text-xs">{task.startDate}</p>
                            </div>
                            <div className=" flex flex-row items-center">
                                <CiSquareCheck className=" text-xl text-[#BDC0C6]" />
                                <p className="text-[#BDC0C6]">۰ / ۰</p>
                            </div>
                        </div>
                        <div className=" flex flex-row gap-3 pt-3 px-3 flex-wrap">
                            {task.tags.map((tag: Tag, idx: number) => (
                                <span key={idx} className="px-2 py-1 rounded-lg text-xs font-bold text-white" style={{ backgroundColor: tag.color }} >
                                    {tag.name}
                                </span>
                            ))}

                            {task.priority && (
                                <span className="bg-red-100 text-red-600 px-2 py-1 rounded-lg text-xs font-bold">
                                    {task.priority}
                                </span>
                            )}
                        </div>
                        <div className=" flex flex-row border-t-[1px] border-[#dcdedf] justify-between mb-4 pt-3 px-3 items-center mt-4">
                            <IoMdCheckmarkCircleOutline className=" text-2xl" />
                            <button>...</button>
                        </div>
                    </div>
                ))}

                <button onClick={() => setNewTask(true)} style={{ border: `2px solid ${primaryColor}`, color: primaryColor }} className="flex flex-row items-center justify-center gap-2 py-2 rounded-2xl w-[240px]">
                    <CiSquarePlus className=" text-2xl" />
                    <p>ساختن تسک جدید</p>
                </button>
            </div>

            <Modal isOpen={newTask} onClose={() => setNewTask(false)} title="">
                <NewTask projectName={projectName} onClose={() => setNewTask(false)} defaultStatus="done" />
            </Modal>
        </>
    );
}