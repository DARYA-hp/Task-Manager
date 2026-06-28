import NewBoardItem from "../MainComponents/atoms/NewBoardItem"
import NewBoardHeader from "../MainComponents/atoms/newBoardHeader";
import NewButtonList from "../MainComponents/atoms/newbtnList";
import { useWorkspace } from "../contexts/useWorkspace";

function NewBoardList() {
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
                    <NewButtonList />
                </div>
            </div>
        </>
    )
}
export default NewBoardList