import Title from "../atoms/Title"
import Filtering from "../atoms/filtering"
import Delete from "../atoms/delete"
import AddFilter from "../atoms/addFilter"
import { useState } from 'react';
interface FilterValues {
    filterType: string;
    filterValue: string;
    operator: string;
}

interface FilterPartProps {
    onApplyFilters: (filters: FilterValues) => void;
}

export default function FilterPart({ onApplyFilters }: FilterPartProps) {
    const [currentFilters, setCurrentFilters] = useState<FilterValues>({
        filterType: '',
        filterValue: '',
        operator: ''
    })
    const handleValuesChange = (values: FilterValues) => {
        setCurrentFilters(values);
    }
    const handleShow = () => {
        const finalFilters = {
            ...currentFilters,
            operator: currentFilters.operator === '' ? 'است' : currentFilters.operator
        }

        console.log("Submitting Filters:", finalFilters)
        onApplyFilters(finalFilters);
    };

    return (
        <>
            <div>
                <div className=" w-[900px]">
                    <Title />
                    <div className=" flex flex-row  items-center justify-between  mt-6">
                        <Filtering onValuesChange={handleValuesChange} />
                        <Delete/>
                    </div>
                    <AddFilter/>
                    <button  onClick={handleShow}  className=" cursor-pointer bg-[#aceca9] px-2 py-1 rounded-md " >
                        نمایش
                    </button>
                </div>
            </div>
        </>
    )
}