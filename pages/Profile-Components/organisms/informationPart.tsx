import SelfData from "../molecules/selfData"
import EnterData from "../molecules/enterData"
function InformationPart(){
    return(
        <>
        <div className=" mt-24 mr-20">
            <SelfData/>
            <EnterData/>
        </div>
        </>
    )
}
export default InformationPart