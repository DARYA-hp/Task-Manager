import WorkSpacesPage from "../MainComponents/atoms/WorkSpacePage"
import { useState } from "react";
export default function WorkSpaces() {
  const [selectedProjectName, setSelectedProjectName] = useState<string | null>(null);
  return (
    <>
      <WorkSpacesPage selectedProjectName={selectedProjectName}
        onSelectProject={setSelectedProjectName} />
    </>
  )
}