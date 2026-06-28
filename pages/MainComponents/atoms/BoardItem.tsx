import { useState, useEffect } from 'react';
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
import { CiSearch } from "react-icons/ci";
import { CiSquarePlus } from "react-icons/ci";

interface BoardItemProps {
  onProjectSelect: (projectName: string) => void;
}

interface LessonData {
  id: string;
  name: string;
  color: string;
  projects: string[];
}

const initialLessons: LessonData[] = [
  { id: "lesson-1", name: "درس مدیریت پروژه", color: "#EC849A", projects: [] },
  { id: "lesson-2", name: "کارهای شخصی", color: "#83B366", projects: [] },
  { id: "lesson-3", name: "درس کامپایلر", color: "#FF5F2D", projects: [] },
  { id: "lesson-4", name: "درس طراحی الگوریتم", color: "#3EBCB3", projects: [] },
  { id: "lesson-5", name: "کارهای گروهی", color: "#BB6C43", projects: [] },
  { id: "lesson-6", name: "کارهای فرهنگی", color: "#F650BD", projects: [] }
]

function BoardItem({ onProjectSelect }: BoardItemProps) {
  const [lessons, setLessons] = useState<LessonData[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('taskManagerLessons');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Error parsing lessons", e);
          return initialLessons;
        }
      }
    }
    return initialLessons;
  })

  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState<boolean>(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);
  const [lesson, setLesson] = useState<boolean>(false);
  const [project, setProject] = useState<boolean>(false);

  const user = useSelector((state: RootState) => state.profile.user);
  const displayName = user?.name || "user ";

  const getInitials = (name: string | undefined) => {
    if (!name) return "user";
    const parts = name.split(' ');
    if (parts.length < 2) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  const displayInitials = getInitials(displayName);
  const [openProjects, setOpenProjects] = useState<string[]>([]);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const router = useRouter();
  const { primaryColor } = useTheme();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('taskManagerLessons', JSON.stringify(lessons));
    }
  }, [lessons]);

  const toggleProjectList = (id: string) => {
    setOpenProjects((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    })
  }

  const handleCreateProject = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setIsProjectModalOpen(true);
  }

  const handleProjectCreated = (projectName: string) => {
    if (!selectedLessonId) return;
    setLessons((prevLessons) =>
      prevLessons.map((lesson) => {
        if (lesson.id === selectedLessonId) {
          return { ...lesson, projects: [...lesson.projects, projectName] };
        }
        return lesson;
      })
    )
    setIsProjectModalOpen(false);
  }

  const handleProjectClick = (projectName: string) => {
    onProjectSelect(projectName)
  }

  return (
    <>
      <div className="pr-10 pt-4 border-l-2 border-[#AAAAAA] w-[330px]">
        <Logo />
        <div>
          <select onClick={() => router.push('/WorkSpaces')} name="" className="mt-6 w-[90%] items-center justify-center text-[18px] font-bold">
            <option value="">ورک‌اسپیس‌ها</option>
          </select>
          <div className="flex flex-row items-center text-[#AAAAAA] py-2 rounded-sm bg-[#F6F7F9] w-[90%] mt-6">
            <CiSearch className=' text-2xl' />
            <span className="pr-2">جستجو کنید</span>
          </div>
          <div onClick={() => setIsWorkspaceModalOpen(true)} className='bg-[#D3D3D3] cursor-pointer py-1 rounded-md w-[90%] flex flex-row gap-2 mt-3'>
            <button className=' flex flex-row items-center pr-3 gap-2 '>
              <CiSquarePlus className=' text-2xl' />
              <p>ساختن اسپیس جدید</p>
            </button>
          </div>

          <ul className="mt-6 flex flex-col gap-4 font-[600]">
            {lessons.map((item) => {
              const isOpen = openProjects.includes(item.id);
              return (
                <li key={item.id} className="flex flex-col gap-2">
                  <div className="flex flex-row gap-2 justify-between cursor-pointer" onClick={() => toggleProjectList(item.id)}>
                    <div className=' flex flex-row justify-between '>
                      <div className={`w-6 h-6 rounded-md`} style={{ backgroundColor: item.color }}></div>
                      <p className="text-[18px]">{item.name}</p>
                    </div>
                    <p className='cursor-pointer ml-6'>...</p>
                  </div>

                  {isOpen && (
                    <ul className="pl-8 mt-1 flex flex-col gap-2">
                      {item.projects.length > 0 ? (
                        item.projects.map((projName, index) => (
                          <li key={index} className="hover:bg-[#cde8f7] pr-3 rounded-md cursor-pointer transition-colors"
                            onClick={() => handleProjectClick(projName)}>
                            {projName}
                          </li>
                        ))
                      ) : (
                        <li className="">
                          <button style={{ border: `2px solid ${primaryColor}`, color: primaryColor }} className='cursor-pointer py-1 rounded-md w-[100%]'
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCreateProject(item.id);
                            }}>
                            ساختن پروژه جدید
                          </button>
                        </li>
                      )}
                    </ul>
                  )}
                </li>
              )
            })}
          </ul>

          <div onClick={() => router.push('/profile')} id="user" className="flex flex-row cursor-pointer gap-3 pt-20 items-center">
            <div className="px-3 py-3 rounded-full text-[11px] text-[#4C6EF5] bg-[#DBE4FF]">
              {displayInitials}
            </div>
            <p className="font-[600]">{displayName}</p>
          </div>
          <div className="flex flex-row gap-10 items-center pt-4">
            <div onClick={() => router.push('/')} className="flex flex-row items-center gap-2 mr-3 cursor-pointer">
              <img src="/exit.png" alt="" />
              <p className="font-[600] text-[#818181]">خروج</p>
            </div>
            <div className=' mr-4'>
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
  )
}
export default BoardItem;