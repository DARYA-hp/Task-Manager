import { SlFlag } from "react-icons/sl";
import { useTheme } from "../contexts/ThemeContext";
import Modal from "./Modal";
import NewTask from "./NewTask";
import { useState } from "react";
interface CalenderTaskProps {
  selectedDate: Date | null;
}

export default function CalenderTask({ selectedDate }: CalenderTaskProps) {
  const { primaryColor } = useTheme();
  const [newTask , setNewTask]=useState<boolean>(false)
  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  return (
    <>
      <div className="p-4">
        <p className="mb-4 text-gray-700 dark:text-gray-200">نام تسک را وارد کنید</p>

        <div className="flex flex-row justify-between items-center bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <SlFlag className="text-gray-500" size={20} />
            <p id="date" className="text-gray-800 dark:text-gray-100 font-medium">
              {formattedDate}
            </p>
          </div>

          <button onClick={()=>setNewTask(true)} style={{ backgroundColor: primaryColor }} className="text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity">
            ساختن تسک
          </button>
        </div>
      </div>
      <Modal isOpen={newTask} onClose={() => setNewTask(false)} title="">
        <NewTask />
      </Modal>
    </>
  )
}