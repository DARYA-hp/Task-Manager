import { useState, useEffect } from "react";
import { useTheme } from "@/pages/contexts/ThemeContext";
import { useTasks } from "@/pages/contexts/TaskContext";
import Modal from "@/pages/MODAL/Modal";
import TagOption from "@/pages/MODAL/TagOption";
interface FilterState {
    filterType: string;
    filterValue: string;
    operator: string;
}
function ListItems({ projectName, filters }: { projectName: string; filters: FilterState }) {
  const { primaryColor } = useTheme();
  const { tasks, updateTask } = useTasks();
  
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    open: true,
    pending: true,
    progress: true,
    done: true,
  })

  const [savedColor, setSavedColor] = useState(() => {
    return localStorage.getItem('userSelectedColor') || '#6C757D';
  })

  const [savedTagText, setSavedTagText] = useState(() => {
    return localStorage.getItem('userTagText') || '';
  })

  useEffect(() => {
    if (!localStorage.getItem('userSelectedColor')) {
      localStorage.setItem('userSelectedColor', '#6C757D');
      setSavedColor('#6C757D');
    }
  }, [])

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTag, setEditingTag] = useState<any>(null);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);

  const sectionsConfig = [
    { id: "open", label: "باز", labelEn: "Open" },
    { id: "pending", label: "در انتظار", labelEn: "Pending" },
    { id: "progress", label: "در حال انجام", labelEn: "In progress" },
    { id: "done", label: "انجام شده", labelEn: "Done" },
  ]

  const getTasksForSection = (status: string) => {
    let sectionTasks = tasks.filter(t => t.projectName === projectName && t.status === status);
    if (filters.filterType && filters.filterValue && filters.operator) {
        sectionTasks = sectionTasks.filter(task => {
            let match = false;

            if (filters.filterType === 'tag') {
                const hasTag = task.tags.some(tag => tag.name === filters.filterValue);
                match = filters.operator === 'است' ? hasTag : !hasTag;
            } 
            return match
        })
    }
    return sectionTasks;
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  const renderArrowIcon = (isExpanded: boolean) => (
    <img src="/down.png" alt="toggle" className={`w-6 h-6 cursor-pointer transition-transform duration-300 ${isExpanded ? "rotate-180" : "rotate-0"}`} />
  )

  const renderPriorityIcon = (priority: string | null) => {
    const isHigh = priority === 'فوری' || priority === 'high';
    return (
      <img src={isHigh ? "/red flag.png" : "/gray flag.png"} alt="priority" className="w-4 h-4" style={{ filter: isHigh ? 'none' : 'grayscale(100%) opacity(0.5)' }}/>
    )
  }

  const handleEditTag = (task: any, tagIndex: number) => {
    if (task.tags && task.tags.length > 0) {
        setEditingTaskId(task.id);
        setEditingTag(task.tags[tagIndex]);
        setIsTagModalOpen(true);
    }
  }

  const handleUpdateTag = (updatedTag: any) => {
    if (!editingTaskId) return;
    const taskToUpdate = tasks.find(t => t.id === editingTaskId);
    if (!taskToUpdate) return;
    
    const newTags = [...taskToUpdate.tags];
    newTags[0] = updatedTag; 
    
    updateTask({
        ...taskToUpdate,
        tags: newTags
    });
    setIsTagModalOpen(false);
  }
  const toPersianNumber = (num: number) => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num.toString().replace(/\d/g, (d) => persianDigits[parseInt(d)]);
}

  return (
    <>
      <div>
        <div className="flex flex-row items-center gap-2 mr-3 mt-4">
            <img src="/down.png" alt="" className="w-6 h-6" />
            <p className="text-[20px] font-extrabold">{projectName}</p>
        </div>
        <div className="flex flex-col mt-4">
          {sectionsConfig.map((section) => {
            const sectionTasks = getTasksForSection(section.id);
            let displayColor = savedColor; 
            let displayTagName = section.labelEn; 
            
            return (
              <div key={section.id} className="mt-10 mr-10">
                <div className="flex flex-row items-center">
                  <div className="flex flex-row items-center gap-2">
                    <div onClick={() => toggleSection(section.id)} className="cursor-pointer">
                      {renderArrowIcon(expandedSections[section.id])}
                    </div>
                    
                    <button  className="text-white px-3 py-1 rounded-md transition-opacity hover:opacity-90" style={{ backgroundColor: displayColor }} >
                        {displayTagName}
                    </button>
                    <p>{toPersianNumber(sectionTasks.length)} تسک</p>
                  </div>
                  
                  <div className="mr-auto w-[600px]">
                    <ul className="flex flex-row justify-between font-semibold">
                      <li className="w-[120px] text-center">اعضا</li>
                      <li className="w-[100px] text-center">ددلاین</li>
                      <li className="w-[100px] text-center">اولویت</li>
                      <li className="w-[100px] text-center">توضیحات</li>
                    </ul>
                    {/* {savedTagText && (
                      <div className="mt-2 text-sm text-gray-600 border-t border-gray-200 pt-2">
                        <span className="font-bold">تگ: </span>
                        {savedTagText}
                      </div>
                    )} */}
                  </div>
                </div>
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    expandedSections[section.id]
                      ? "max-h-[1000px] opacity-100 mt-6"
                      : "max-h-0 opacity-0 mt-0"
                  }`}>
                  {sectionTasks.length > 0 ? (
                    sectionTasks.map((task) => (
                      <div key={task.id} className="flex flex-row items-center mt-6 border-b border-gray-100 pb-2">
                        <div className="flex flex-row gap-3 items-center w-[400px]">
                          {task.tags && task.tags.length > 0 && (
                             <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: task.tags[0].color }} ></div>
                          )}
                          <p className="truncate font-medium">{task.title}</p>
                          {/* {task.tags && task.tags.length > 0 && (
                             <button  onClick={() => handleEditTag(task, 0)} className="text-gray-400 hover:text-gray-600 ml-2" title="ویرایش تگ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                             </button>
                          )} */}
                        </div>
                        <div className="flex flex-row justify-between items-center w-[600px] mr-auto">
                          <div className="w-[120px] flex justify-center items-center">
                            <div className="relative w-[60px] h-10">
                              <img src="/boy.jpg" alt="member" className="w-10 h-10 rounded-full border-2 border-white absolute" style={{ left: 0, zIndex: 1 }}/>
                            </div>
                          </div>
                          <div className="w-[100px] text-center">
                            <p className="text-sm">{task.endDate !== "بدون تاریخ پایان" ? task.endDate : task.startDate}</p>
                          </div>
                          <div className="w-[100px] text-center flex justify-center">
                            {renderPriorityIcon(task.priority)}
                          </div>
                          <div className="w-[100px] text-center flex justify-center">
                            <img src="/justify-right.png" alt="" className="w-4 h-4 cursor-pointer hover:opacity-70" />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                    {/* <p className="text-gray-400 text-sm mt-2">هیچ تسکی در این وضعیت وجود ندارد.</p> */}
                    </>
                  )}
                </div>
              </div>
            )
          })}
        </div>
        
        <Modal isOpen={isTagModalOpen} onClose={() => setIsTagModalOpen(false)} title="تنظیمات تگ">
            {editingTag && (
                <TagOption />
            )}
        </Modal>
        
        <div style={{ backgroundColor: primaryColor }} className=" w-[10%] flex flex-row mr-[1000px] justify-center rounded-md py-2 mt-[100px] cursor-pointer hover:opacity-90 transition-opacity"
         onClick={() => alert("تسک جدید")}>
          <img src="/add.png" alt="" className=" w-6 h-6" />
          <button className=" text-white">تسک جدید</button>
        </div>
      </div>
    </>
  )
}



export default ListItems