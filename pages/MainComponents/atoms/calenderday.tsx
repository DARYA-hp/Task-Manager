import { useState } from "react";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import faIR from "date-fns/locale/fa-IR";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Modal from "@/pages/MODAL/Modal";
import CalenderTask from "@/pages/MODAL/CalenderTask";
registerLocale("fa", faIR);
setDefaultLocale("fa");
const daysOfWeek = ["شنبه", "یکشنبه", "دوشنبه", "سشنبه", "چهارشنبه", "پنج شنبه", "جمعه"];
const toJalaliString = (date: Date): string => {
  if (!date) return "";
  return date.toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const getJalaliMonthName = (date: Date): string => {
  if (!date) return "";
  return date.toLocaleDateString("fa-IR", { month: "long", year: "numeric" });
}

const toPersianDigits = (num: number): string => {
  return num.toLocaleString('fa-IR');
}

export default function CalendarDay() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isCalenderTask, setIsCalenderTask] = useState<boolean>(false);
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startDayOfWeek = firstDayOfMonth.getDay();
    const emptyCells = (startDayOfWeek + 1) % 7;
    const days = [];
    for (let i = 0; i < emptyCells; i++) {
      days.push({ type: "empty" as const, id: `empty-${i}` });
    }
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const dayDate = new Date(year, month, i);
      days.push({
        type: "day" as const,
        date: dayDate,
        id: `day-${i}`,
        dayNumber: i,
      });
    }
    return days;
  }
  const daysArray = getDaysInMonth(currentDate);

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentDate(newDate);
  }
  const isCurrentMonth = new Date().getMonth() === currentDate.getMonth() &&
    new Date().getFullYear() === currentDate.getFullYear();
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsCalenderTask(true);
  }

  return (
    <>
      <div className="w-full   p-8 flex justify-center items-center min-h-screen">
        <div className=" dark:bg-black p-8 w-full max-w-8xl border border-gray-100">
          <div className="flex flex-row justify-around  items-center mb-8 ">
            <div className=" mr-14 flex flex-row gap-3">
              <button onClick={() => changeMonth(1)}  >
                <FaChevronRight size={20} />
              </button>
              <button onClick={() => changeMonth(-1)} >
                <FaChevronLeft size={20} />
              </button>
            </div>

            <h2 className="text-2xl ml-20 font-bold text-gray-800">
              {isCurrentMonth && "امروز  "}
              {getJalaliMonthName(currentDate)}
            </h2>

          </div>

          <div className="border-2 border-[#d6d4d4] ">
            <div className="grid grid-cols-7  border-b-2 border-[#d6d4d4]">
              {daysOfWeek.map((day, index) => (
                <div key={index} className="py-16 text-center text-sm font-bold text-gray-700">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 ">
              {daysArray.map((item) => {
                if (item.type === "empty") {
                  return (
                    <div key={item.id} className="h-32 bg-white"></div>
                  )
                }

                const isToday = new Date().toDateString() === item.date.toDateString();
                const isSelected = selectedDate?.toDateString() === item.date.toDateString();

                return (
                  <div key={item.id} onClick={() => handleDateClick(item.date)}
                    className={` h-32 border-r border-b border-[#d6d4d4] p-3 cursor-pointer transition-all relative flex flex-col justify-start items-start
                      ${isSelected ? '' : 'bg-white hover:bg-gray-50'} `}>
                    <span className={` z- text-lg font-bold mr-18 mt-18  flex items-center justify-center  ${isToday ? ' border-2 border-teal-600   px-5 py-3  shadow-md' : 'text-gray-700'}
                        ${isSelected && !isToday ? ' text-white' : ''} `} >
                      {toPersianDigits(item.dayNumber)}
                    </span>
                    {isSelected && (
                      <div className="mt-auto mb-2 text-xs text-gray-500">
                        <p>{toJalaliString(item.date)}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <Modal isOpen={isCalenderTask} onClose={() => setIsCalenderTask(false)} title="تسک جدید">
          <CalenderTask selectedDate={selectedDate} />
        </Modal>
      </div>
    </>
  )
}