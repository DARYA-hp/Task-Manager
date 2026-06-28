import Pending from "./pending"
import Progress from "./progress"
import Done from "./done";
import Open from "./open";

interface FilterState {
    filterType: string;
    filterValue: string;
    operator: string;
}

interface WorkProjectProps {
    projectName: string;
    filters: FilterState;
}

export default function WorkProject({ projectName, filters }: WorkProjectProps) {
    return (
        <>
            <div className=" flex flex-row gap-10 ">
                <Open projectName={projectName} filters={filters} />
                <Pending projectName={projectName} filters={filters}/>
                <Done projectName={projectName} filters={filters}/>
                <Progress projectName={projectName} filters={filters}/>
            </div>
        </>
    )
}