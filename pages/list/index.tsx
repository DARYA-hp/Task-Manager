import BoardItem from "../MainComponents/atoms/BoardItem";
import ListItems from "../MainComponents/atoms/ListItems";
import { useState } from "react"
interface FilterState {
    filterType: string;
    filterValue: string;
    operator: string;
}
export default function List(){
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
    return(
        <>
        <div className=" flex flex-row">
            <BoardItem onProjectSelect={setSelectedProjectName}/>
            <div className="">
              <ListItems projectName={selectedProjectName}  filters={filters}/>
            </div>
        </div>
        </>
    )
}