import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Logo } from "@/pages/components/atoms/Logo"
import Modal from '@/pages/MODAL/Modal';
import WorkspaceForm from '@/pages/MODAL/WorkspaceForm';
import ProjectForm from '@/pages/MODAL/ProjectForm';
import Lesson from '@/pages/MODAL/Lesson';
import Project from '@/pages/MODAL/Project';
import { useRouter } from 'next/router';
import { useTheme } from '@/pages/contexts/ThemeContext';
import { RootState } from '@/pages/store';
import { DarkBtn } from '@/pages/components/atoms/DarkBtn';
import { useWorkspace } from '@/pages/contexts/useWorkspace';

interface NewBoardItemProps {
    selectedColor: string;
}
interface ProjectData {
  id: string;
  name: string[];
}

const projectData: ProjectData[] = [
  { id: "درس مدیریت پروژه", name: ["پروژه اول"] },
  { id: "کارهای شخصی", name: ["پروژه اول", "پروژه دوم"] },
  { id: "درس کامپایلر", name: [] },
  { id: "درس طراحی الگوریتم", name: ["پروژه اول", "پروژه دوم", "پروژه سوم", "پروژه چهارم"] }
]
const NewBoardItem: React.FC<NewBoardItemProps> = ({ selectedColor }) => {
    const router = useRouter();
    const { currentWorkspace } = useWorkspace();
    const { primaryColor } = useTheme();
    const user = useSelector((state: RootState) => state.profile.user);
    const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState<boolean>(false);
    const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);
    const [lesson, setLesson] = useState<boolean>(false);
    const [project, setProject] = useState<boolean>(false);
    const [openProjects, setOpenProjects] = useState<string[]>([]);
    const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

    const getInitials = (name: string | undefined) => {
        if (!name) return "user";
        const parts = name.split(' ');
        if (parts.length < 2) return parts[0].substring(0, 2).toUpperCase();
        return (parts[0][0] + parts[1][0]).toUpperCase();
    };

    const displayName = user?.name || " user";
    const displayInitials = getInitials(displayName);

    const toggleProjectList = (id: string) => {
        setOpenProjects((prev) => {
            if (prev.includes(id)) {
                return prev.filter((item) => item !== id);
            }
            return [...prev, id];
        });
    };

    const handleProjectCreated = () => {
        console.log("Project created successfully");
        setIsProjectModalOpen(false);
    };
    const workspaceColor = currentWorkspace?.color || selectedColor;
    const workspaceName = currentWorkspace?.name || " ورک‌اسپیس";

    return (
        <>
            <div className="pr-10 pt-4 border-l-2 border-[#AAAAAA] w-[330px]">
                <Logo />
                <div>
                    <select onClick={()=>router.push('/WorkSpaces')} name="" className="mt-6 w-[90%] items-center justify-center text-[18px] font-bold">
                        <option value="">ورک‌اسپیس‌ها</option>
                    </select>
                    <div className="flex flex-row text-[#AAAAAA] py-2 rounded-sm bg-[#F6F7F9] w-[90%] mt-6">
                        <img src="/search.png" alt="" className="pr-4" />
                        <span className="pr-2">جستجو کنید</span>
                    </div>
                    <div onClick={() => setIsWorkspaceModalOpen(true)} className='bg-[#D3D3D3] cursor-pointer py-1 rounded-md w-[90%] flex flex-row gap-2 mt-3'>
                        <button className=' flex flex-row gap-2 '>
                            <img src="/blackadd.png" alt="" className=' pr-2' />
                            <p>ساختن اسپیس جدید</p>
                        </button>
                    </div>
                    <ul className="mt-6 flex flex-col gap-4 font-[600]">
                        {projectData.map((item) => {
                            let colorClass = "bg-gray-400";
                            if (item.id === "درس مدیریت پروژه") colorClass = "bg-[#40C057]";
                            else if (item.id === "کارهای شخصی") colorClass = "bg-[#FAB005]";
                            else if (item.id === "درس کامپایلر") colorClass = "bg-[#FA5252]";
                            else if (item.id === "درس طراحی الگوریتم") colorClass = "bg-[#228BE6]";
                            
                            const isLessonEmpty = item.name.length === 0;
                            const isOpen = isLessonEmpty || openProjects.includes(item.id);
                            
                            return (
                                <li key={item.id} className="flex flex-col gap-2">
                                    <li className="flex flex-row gap-2 justify-between  cursor-pointer" onClick={() => toggleProjectList(item.id)}>
                                        <div className=' flex flex-row gap-2'>
                                            <div className={`w-6 h-6 rounded-md ${colorClass}`}></div>
                                            <p className="text-[19px]">{item.id}</p>
                                        </div>
                                    </li>
                                    {isOpen && (
                                        <ul className="pl-8 mt-1 flex flex-col gap-2">
                                            {item.name.length > 0 ? (
                                                item.name.map((projName, index) => (
                                                    <li key={index} className="hover:text-black cursor-pointer transition-colors text-sm text-gray-600">
                                                        {projName}
                                                    </li>
                                                ))
                                            ) : (
                                                <>
                                                </>
                                            )}
                                        </ul>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                    
                    <li className=''>
                        <div className=" w-6 h-6 rounded-md" style={{ backgroundColor: workspaceColor }}></div>
                        <p className='newboard text-sm text-gray-700'>
                            {workspaceName}
                        </p>
                    </li>

                    <div onClick={() => router.push('/profile')} id="user" className="flex flex-row cursor-pointer gap-3 mt-[400px] items-center">
                        <div className="px-3 py-3 rounded-full text-[11px] text-[#4C6EF5] bg-[#DBE4FF]">
                            {displayInitials}
                        </div>
                        <p className="font-[600]">{displayName}</p>
                    </div>
                    <div className="flex flex-row gap-10 items-center pt-4">
                        <div onClick={()=>router.push('/')} className="flex flex-row items-center gap-2 mr-3 cursor-pointer">
                            <img src="/exit.png" alt="" />
                            <p className="font-[600] text-[#818181]">خروج</p>
                        </div>
                        <div>
                            <DarkBtn />
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={isWorkspaceModalOpen} onClose={() => setIsWorkspaceModalOpen(false)} title="">
                <WorkspaceForm />
            </Modal>
            
            <Modal isOpen={isProjectModalOpen} onClose={() => setIsProjectModalOpen(false)} title="">
                <ProjectForm lessonId={selectedLessonId} onProjectCreated={handleProjectCreated} />
            </Modal>
            
            <Modal isOpen={lesson} onClose={() => setLesson(false)} title="">
                <Lesson />
            </Modal>
            <Modal isOpen={project} onClose={() => setProject(false)} title="">
                <Project />
            </Modal>
        </>
    );
}



export default NewBoardItem;