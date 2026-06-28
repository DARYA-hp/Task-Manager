import { useState } from 'react';

interface FilterValues {
    filterType: string; 
    filterValue: string; 
    operator: string; 
}

interface FilteringProps {
    onValuesChange: (values: FilterValues) => void;
}

export default function Filtering({ onValuesChange }: FilteringProps) {
    const [filterType, setFilterType] = useState<string>("");
    const [filterValue, setFilterValue] = useState<string>("");
    const [operator, setOperator] = useState<string>("");

    const handleChange = () => {
        onValuesChange({ filterType, filterValue, operator
        })
    }

    return (
        <div>
            <div className="flex flex-row gap-3 items-center">
                <span>تسک‌هایی که</span>
                <span>
                    <select  className="border-2 rounded-md text-[#959595] border-[#959595] w-[170px] p-1" value={filterType}
                        onChange={(e) => {
                            setFilterType(e.target.value);
                            setFilterValue("");
                            handleChange();
                        }}>
                        <option value="">جستجو بین فیلتر‌ها</option>
                        <option value="tag">تگ</option>
                        <option value="priority">اولویت</option>
                    </select>
                </span>
                <span>آن‌ها</span>
                <select  className="border-2 rounded-md text-[#959595] border-[#959595] w-[150px] p-1" value={filterValue}
                    onChange={(e) => {
                        setFilterValue(e.target.value);
                        handleChange();
                    }}>
                    <option value="">انتخاب کنید</option>
                    <option value="درس">درس</option>
                    <option value="کار">کار</option>
                    <option value="پروژه">پروژه</option>
                </select>
                <select  className="border-2 rounded-md text-[#959595] border-[#959595] w-[100px] p-1" value={operator}
                    onChange={(e) => {
                        setOperator(e.target.value);
                        handleChange();
                    }}>
                    <option value="">است</option>
                    <option value="نیست">نیست</option>
                </select>
            </div>
        </div>
    );
}