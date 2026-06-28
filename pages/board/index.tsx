import BoardItem from "../MainComponents/atoms/BoardItem"
import WorkProject from "../MainComponents/atoms/WorkProject"
import ListItems from "../MainComponents/atoms/ListItems"
import BoardHeader from "../MainComponents/atoms/boardHedaer"
import { useState } from 'react';

interface FilterState {
    filterType: string;
    filterValue: string;
    operator: string;
}

function Board() {
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
            <div className=" flex flex-row">
                <BoardItem onProjectSelect={setSelectedProjectName} />
                <div className="w-full">
                    <BoardHeader  viewMode={viewMode}   onViewModeChange={setViewMode}   onApplyFilters={handleApplyFilters} />
                    
                    <div className=" flex flex-row justify-around mt-4">
                        {selectedProjectName ? (
                            viewMode === 'board' ? (
                                <WorkProject   projectName={selectedProjectName}   filters={filters}  />
                            ) : (
                                <ListItems   projectName={selectedProjectName}  filters={filters} />
                            )
                        ) : (
                           <div className="flex justify-center items-center h-[500px] text-gray-500">
                               لطفاً یک پروژه را انتخاب کنید.
                           </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Board