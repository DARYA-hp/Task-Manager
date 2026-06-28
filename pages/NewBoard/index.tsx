import NewBoardItem from "../MainComponents/atoms/NewBoardItem"
import NewButton from "../MainComponents/atoms/NewButton"
import NewBoardHeader from "../MainComponents/atoms/newBoardHeader";
import { useWorkspace } from "../contexts/useWorkspace";


function NewBoard() {
    const { currentWorkspace } = useWorkspace();
    
    if (!currentWorkspace) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>در حال بارگذاری...</p>
            </div>
        );
    }

    return (
        <>
            <div className=" flex flex-row">
                <NewBoardItem selectedColor={currentWorkspace.color} />
                <div>
                    <NewBoardHeader />
                    <NewButton />
                </div>
            </div>
        </>
    )
}
export default NewBoard