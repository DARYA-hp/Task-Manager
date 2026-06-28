import InformationPart from "../Profile-Components/organisms/informationPart";
import ProfileSet from "../Profile-Components/organisms/profileSet";
export default function ProfileInformation() {
  return (
    <div className=" flex">
       <ProfileSet />
       <InformationPart/>
    </div>
  );
}