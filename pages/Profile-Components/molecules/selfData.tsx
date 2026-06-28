import Person from "../atoms/person"
import EditPic from "../atoms/editPhoto"
function SelfData(){
    return(
        <>
          <Person/>
          <div>
            <EditPic/>
          </div>
        </>
    )
}
export default SelfData