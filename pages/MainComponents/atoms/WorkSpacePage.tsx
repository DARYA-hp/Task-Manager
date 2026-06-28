import BoardItem from "./BoardItem";
import { useState, useEffect } from "react";
import { useTheme } from "@/pages/contexts/ThemeContext";
import Modal from "@/pages/MODAL/Modal";
import ProjectForm from "@/pages/MODAL/ProjectForm";
import WorkProject from "./WorkProject";
interface WorkSpacesProps {
  selectedProjectName: string | null;
  onSelectProject: (name: string) => void;
}

interface Lesson {
  id: string;
  name: string;
  color: string;
  projects: string[];
}

const initialData: Lesson[] = [
 { id: "lesson-1", name: "درس مدیریت پروژه", color: "#EC849A", projects: [] },
  { id: "lesson-2", name: "کارهای شخصی", color: "#83B366", projects: [] },
  { id: "lesson-3", name: "درس کامپایلر", color: "#FF5F2D", projects: [] },
  { id: "lesson-4", name: "درس طراحی الگوریتم", color: "#3EBCB3", projects: [] },
  { id: "lesson-5", name: "کارهای گروهی", color: "#BB6C43", projects: [] },
  { id: "lesson-6", name: "کارهای فرهنگی", color: "#F650BD", projects: [] }
];

export default function WorkSpacesPage({ selectedProjectName, onSelectProject }: WorkSpacesProps) {
  const { primaryColor } = useTheme();
  
  const [lessons, setLessons] = useState<Lesson[]>(() => {
    const savedData = localStorage.getItem('taskManagerLessons');
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch (error) {
        console.error("Error parsing data", error);
        return initialData;
      }
    }
    return initialData;
  })

  const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [openProjects, setOpenProjects] = useState<string[]>([]);

  useEffect(() => {
    localStorage.setItem('taskManagerLessons', JSON.stringify(lessons));
  }, [lessons]);

  const handleCreateProject = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setIsProjectModalOpen(true);
  }

  const toggleProjectList = (id: string) => {
    setOpenProjects((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id);
      }
      return [...prev, id];
    })
  }

  const handleProjectClick = (projectName: string) => {
    onSelectProject(projectName);
  }

  return (
    <>
      <div className="flex flex-row">
      
        <BoardItem onProjectSelect={onSelectProject} />
        <div className="w-full">
          {!selectedProjectName && (
            <div className="mt-4">
              {lessons.map((item) => {
                const isOpen = openProjects.includes(item.id);
                return (
                  <li key={item.id} className="flex flex-col gap-4 mt-14 mr-10">
                    <li   className="flex flex-row gap-2 justify-between cursor-pointer"   onClick={() => toggleProjectList(item.id)}>
                      <div className="flex flex-row gap-2 items-center">
                        <div  className="w-6 h-6 rounded-full"  style={{ backgroundColor: item.color }}></div>
                        <p className="font-[500] text-[23px]">{item.name}</p>
                      </div>
                    </li>
                    <ul className="pl-8 flex flex-row flex-wrap gap-4">
                      {item.projects.length > 0 ? (
                        item.projects.map((projName, index) => (
                          <li   key={index}   style={{ backgroundColor: item.color }}  
                            className="text-white px-4 py-2 rounded-md cursor-pointer transition-colors shadow-sm hover:opacity-90" onClick={() => handleProjectClick(projName)} >
                            {projName}
                          </li>
                        ))
                      ) : (
                        <></>
                      )}
                      <li>
                        <button  style={{ border: `2px solid ${primaryColor}`, color: primaryColor }} className="cursor-pointer py-1 px-4 rounded-md hover:bg-opacity-10 hover:bg-gray-200 transition-all"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCreateProject(item.id);
                          }}>
                          ساختن پروژه جدید
                        </button>
                      </li>
                    </ul>
                  </li>
                )
              })}
            </div>
          )}
          {selectedProjectName && (
             <div className="mt-8 mr-10 p-4 border-t border-gray-200">
                <h2 className="text-xl font-bold mb-4">اسم پروژه: {selectedProjectName}</h2>
                <WorkProject projectName={selectedProjectName} />
             </div>
          )}
        </div>
      </div>
      
      <Modal isOpen={isProjectModalOpen} onClose={() => setIsProjectModalOpen(false)} title="">
        <ProjectForm  lessonId={selectedLessonId} 
          onProjectCreated={(projectName) => {
            if (selectedLessonId) {
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
          }}
        />
      </Modal>
    </>
  )
}