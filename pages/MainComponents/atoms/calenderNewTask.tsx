import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const daysOfWeek = ["شنبه", "یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه"];

const toPersianDigits = (num: number): string => {
    return num.toLocaleString('fa-IR');
}

const toJalaliString = (date: Date): string => {
    if (!date) return "";
    return date.toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })
}

const getJalaliDateString = (date: Date): string => {
    if (!date) return "";
    return date.toLocaleDateString("fa-IR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    })
}


const getJalaliMonthName = (date: Date): string => {
    if (!date) return "";
    return date.toLocaleDateString("fa-IR", { month: "long", year: "numeric" });
}

export default function CalenderNewTask() {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [isCalenderTask, setIsCalenderTask] = useState<boolean>(false);
    const todayString = getJalaliDateString(new Date());

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
            })
        }
        return days
    }

    const daysArray = getDaysInMonth(currentDate);

    const changeMonth = (offset: number) => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + offset);
        setCurrentDate(newDate);
    }

    const handleDateClick = (date: Date) => {
        setSelectedDate(date);
        setIsCalenderTask(true);
    }

    return (
        <>
            <div className="w-[550px] flex justify-center items-center">
                <div className="dark:bg-black w-full max-w-8xl border border-gray-100 rounded-lg shadow-sm">
                    <div className="flex flex-row justify-between items-center p-4 border-b border-gray-100">
                        <div className="flex flex-row gap-3">
                            <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-gray-100 rounded">
                                <FaChevronRight size={16} />
                            </button>
                            <button onClick={() => changeMonth(1)} className="p-1 hover:bg-gray-100 rounded">
                                <FaChevronLeft size={16} />
                            </button>
                        </div>
                        <h2 className="font-bold text-gray-800">
                            {getJalaliMonthName(currentDate)}
                        </h2>
                    </div>

                    <div className="p-2">
                        <div className="grid grid-cols-7 border-b border-[#d6d4d4]">
                            {daysOfWeek.map((day, index) => (
                                <div key={index} className="text-center py-2 text-sm font-bold text-gray-600">
                                    {day}
                                </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-7">
                            {daysArray.map((item) => {
                                if (item.type === "empty") {
                                    return (
                                        <div key={item.id} className="h-16 bg-gray-50"></div>
                                    )
                                }
                                const itemDateString = getJalaliDateString(item.date);
                                const isToday = itemDateString === todayString;
                                const isSelected = selectedDate ? getJalaliDateString(selectedDate) === itemDateString : false;

                                return (
                                    <div key={item.id} onClick={() => handleDateClick(item.date)}
                                        className={`h-16 border-r border-b border-[#d6d4d4] p-1 cursor-pointer transition-all relative flex flex-col justify-start items-start
                                            ${isSelected ? 'bg-teal-600' : 'bg-white hover:bg-gray-50'} `}>
                                        <span className={`  w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold
                                                ${isToday && !isSelected ? 'border-2 border-teal-600 text-teal-600' : ''}
                                                ${isSelected ? 'text-white' : 'text-gray-700'} `}>
                                            {toPersianDigits(item.dayNumber)}
                                        </span>

                                        {isSelected && (
                                            <div className="mt-1 text-[10px] text-white opacity-90">
                                                <p>{toJalaliString(item.date)}</p>
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}