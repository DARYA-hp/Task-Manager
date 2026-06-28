import BoardHeader from "../MainComponents/atoms/boardHedaer"
import CalendarDay from "../MainComponents/atoms/calenderday"
import BoardItem from "../MainComponents/atoms/BoardItem"
import { useState } from "react"
interface FilterState {
    filterType: string;
    filterValue: string;
    operator: string;
}
export default function CalenderPage() {
     const [selectedProjectName, setSelectedProjectName] = useState<string | null>(null);
        const [viewMode, setViewMode] = useState<'board' | 'list'>('board');
        const [filters, setFilters] = useState<FilterState>({
            filterType: '',
            filterValue: '',
            operator: ''
        })
        const handleApplyFilters = (newFilters: FilterState) => {
            setFilters(newFilters);
        }
    return (
        <>
            <div className=" flex flex-row ">
                <BoardItem onProjectSelect={setSelectedProjectName}/>
                <div className=" flex flex-col">
                    <BoardHeader  viewMode={viewMode}   onViewModeChange={setViewMode}   onApplyFilters={handleApplyFilters} />
                    <CalendarDay />
                </div>
            </div>
        </>
    )
}