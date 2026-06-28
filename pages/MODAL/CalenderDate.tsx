import { BsCalendar2Event } from "react-icons/bs";
import { useTheme } from "../contexts/ThemeContext";
import CalenderNewTask from "../MainComponents/atoms/calenderNewTask"; 

interface CalenderDateProps {
    onDateSelect: (date: string) => void;
    initialDate?: string;
}

const getJalaliShortDate = (date: Date): string => {
    return date.toLocaleDateString("fa-IR", {
        month: "short",
        day: "numeric",
    });
}

const calculateRelativeDates = () => {
    const today = new Date();
    const dates = [
        { label: "امروز", date: new Date(today) },
        { label: "فردا", date: new Date(today.getTime() + 24 * 60 * 60 * 1000) },
        { label: "پس‌فردا", date: new Date(today.getTime() + 2 * 24 * 60 * 60 * 1000) },
        { label: "این آخر هفته", date: (() => {
            const d = new Date(today);
            const daysUntilSaturday = (6 - d.getDay() + 7) % 7;
            d.setDate(d.getDate() + daysUntilSaturday);
            return d;
        })() },
        { label: "هفته‌ی آینده", date: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000) },
    ];
    return dates;
}

export default function CalenderDate({ onDateSelect, initialDate }: CalenderDateProps) {
    const relativeDates = calculateRelativeDates();
    const { primaryColor } = useTheme();

    const handleDateClick = (date: Date) => {
        const dateStr = date.toLocaleDateString("fa-IR", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        onDateSelect(dateStr); 
    };

    return (
        <div className="flex flex-col w-full max-w-4xl mx-auto">
            <div className="flex flex-row items-center py-6 px-10">
                <div className="w-full flex flex-row  py-6">
                    <div className="w-full flex flex-row  py-6">
                    <div className="cursor-pointer flex flex-row items-center gap-3">
                        <BsCalendar2Event className="text-2xl text-[#BDBDBD]" />
                        <p className="text-[24px] font-[500]"> شروع تاریخ</p>
                    </div>
                    <div className="cursor-pointer flex flex-row items-center mr-[300px] gap-3">
                        <BsCalendar2Event className="text-2xl text-[#BDBDBD]" />
                        <p className="text-[24px] font-[500]"> پایان تاریخ</p>
                    </div>
                </div>
                </div>
            </div>
            
            <div className="flex flex-row gap-8 px-4">
                <div className=" bg-[#ebf0f0]">
                    <div className="grid grid-cols-1  gap-1 mt-6">
                        {relativeDates.map((item, index) => (
                            <div   key={index}   onClick={() => handleDateClick(item.date)}
                                className="flex flex-row justify-between gap-4 items-center cursor-pointer transition-colors p-2 rounded hover:bg-gray-50" >
                                <span className="text-[18px] font-[500]">{item.label}</span>
                                <span className="text-[#868E96] font-[500]">
                                    {getJalaliShortDate(item.date)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="">
                    <CalenderNewTask onDateSelect={handleDateClick} />
                </div>
            </div>
            
            <div className="flex justify-end mt-4 px-4">
                <button  style={{ backgroundColor: primaryColor }}  className="cursor-pointer px-12 py-2 text-white rounded-xl"
                    onClick={() => onDateSelect(initialDate || "")}>
                    بستن
                </button>
            </div>
        </div>
    )
}