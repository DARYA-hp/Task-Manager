import { useRouter } from "next/router"
import Modal from "@/pages/MODAL/Modal"
import { useState } from "react"
import ShareProject from "@/pages/MODAL/ShareProject"
import { useTheme } from "@/pages/contexts/ThemeContext"
import { FaListCheck } from "react-icons/fa6";
import { BsReverseListColumnsReverse } from "react-icons/bs";
import { LuCalendarDays } from "react-icons/lu";
import { FiShare2 } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import { IoFilterSharp } from "react-icons/io5";
import { SlRefresh } from "react-icons/sl";
import FilterPart from '@/pages/MODAL/filter-components/molecules/FilterPart';

interface BoardHeaderProps {
    viewMode: 'board' | 'list';
    onViewModeChange: (mode: 'board' | 'list') => void;
    onApplyFilters: (filters: any) => void
}

function BoardHeader({ viewMode, onViewModeChange, onApplyFilters }: BoardHeaderProps) {
  const router = useRouter()
  const [sharePro, setSharePro] = useState<boolean>(false)
  const [filter , setFilter]=useState<boolean>(false)
  const { primaryColor } = useTheme()
  
  return (
    <>
      <div>
        <div className="flex flex-row items-center gap-4 mt-14 mr-6">
          <p className="border-l-2 border-gray-500 text-xl font-bold pl-4">پروژه اول</p>
          <ul className="flex flex-row gap-4">
            <li onClick={() => onViewModeChange('list')}
              className={`cursor-pointer border-l-2 flex flex-row gap-2 items-center pl-4 text-xl transition-all duration-200 ${viewMode === 'list' ? 'border-[primaryColor] text-[primaryColor]' : ''}`}
              style={{ 
                borderColor: viewMode === 'list' ? primaryColor : 'gray',  
                color: viewMode === 'list' ? primaryColor : 'inherit',  
                borderBottom: viewMode === 'list' ? `2px solid ${primaryColor}` : 'none',
              }}
              onMouseEnter={(e) => {
                if (viewMode !== 'list') {
                    e.currentTarget.style.borderColor = primaryColor;
                    e.currentTarget.style.color = primaryColor;
                    e.currentTarget.style.borderBottom = `2px solid ${primaryColor}`;
                }
              }}
              onMouseLeave={(e) => {
                if (viewMode !== 'list') {
                    e.currentTarget.style.borderColor = 'gray';
                    e.currentTarget.style.color = 'inherit';
                    e.currentTarget.style.borderBottom = 'none';
                }
              }} >
              <FaListCheck/>
              <p>نمایش لیستی</p>
            </li>
            <li onClick={() => onViewModeChange('board')}
              className={`cursor-pointer border-l-2 flex flex-row gap-2 items-center pl-4 text-xl transition-all duration-200 ${viewMode === 'board' ? 'border-[primaryColor] text-[primaryColor]' : ''}`}
              style={{ 
                borderColor: viewMode === 'board' ? primaryColor : 'gray',  
                color: viewMode === 'board' ? primaryColor : 'inherit',  
                borderBottom: viewMode === 'board' ? `2px solid ${primaryColor}` : 'none',
              }}
              onMouseEnter={(e) => {
                if (viewMode !== 'board') {
                    e.currentTarget.style.borderColor = primaryColor;
                    e.currentTarget.style.color = primaryColor;
                    e.currentTarget.style.borderBottom = `2px solid ${primaryColor}`;
                }
              }}
              onMouseLeave={(e) => {
                if (viewMode !== 'board') {
                    e.currentTarget.style.borderColor = 'gray';
                    e.currentTarget.style.color = 'inherit';
                    e.currentTarget.style.borderBottom = 'none';
                }
              }} >
              <BsReverseListColumnsReverse/>
              <p>نمایش ستونی</p>
            </li>
            <li onClick={()=>router.push("/calender")} className="cursor-pointer border-l-2 flex flex-row gap-2 items-center pl-4 text-xl transition-all duration-200"
              style={{ borderColor: 'gray', color: 'inherit', borderBottom: 'none',}}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = primaryColor;
                e.currentTarget.style.color = primaryColor;
                e.currentTarget.style.borderBottom = `2px solid ${primaryColor}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'gray';
                e.currentTarget.style.color = 'inherit';
                e.currentTarget.style.borderBottom = 'none';
              }}>
              <LuCalendarDays/>
              <p>تقویم</p>
            </li>
          </ul>
          <button onClick={() => setSharePro(true)} className="flex cursor-pointer flex-row gap-2 items-center text-xl font-semibold pr-[390px]">
            <FiShare2/>
            <p>اشتراک‌گذاری</p>
          </button>
        </div>
        <div className="flex flex-row pr-4 mt-3 border-y-2 py-6 border-[#AAAAAA] mr-4">
          <div className="flex flex-row gap-1 items-center border-l-2 pl-20 text-[#AAAAAA]">
            <CiSearch className=" w-6 h-6"/>
            <p>جستجو بین تسک‌ها</p>
          </div>
          <div onClick={()=>setFilter(true)} className="flex cursor-pointer flex-row items-center gap-2 pr-6">
            <IoFilterSharp/>
            <p>فیلترها</p>
          </div>
          <div className="mr-10 px-4 rounded-md py-1 bg-[#D0EBFF]">
            <p className="text-[#228BE6]">دسته‌بندی‌شده با: وضعیت</p>
          </div>
          <button style={{ border: `2px solid ${primaryColor}` }} className="mr-[300px] px-3 flex flex-row gap-2 items-center rounded-md border-2 border-[#208D8E]">
            <SlRefresh/>
            <p>بازگردانی تسک‌های آرشیو شده</p>
          </button>
        </div>
      </div>
      <Modal isOpen={sharePro} onClose={() => setSharePro(false)} title="">
        <ShareProject />
      </Modal>
        <Modal isOpen={filter} onClose={()=> setFilter(false)} title=''>
            <FilterPart onApplyFilters={onApplyFilters} />
      </Modal>
    </>
  )
}
export default BoardHeader