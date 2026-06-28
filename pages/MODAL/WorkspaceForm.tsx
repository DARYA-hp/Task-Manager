import { useState } from "react"
import Modal from "./Modal"
import SelectColor from "./SelectColor"
import { useTheme } from "../contexts/ThemeContext"
import { useWorkspace } from "../contexts/useWorkspace"

export default function WorkspaceForm() {
  const { primaryColor } = useTheme()
  const { updateWorkspace } = useWorkspace()
  const [isContinueOn, setIsContinueOn] = useState<boolean>(false)
  const [workspaceName, setWorkspaceName] = useState<string>("")

  return (
    <>
      <div className=" flex flex-col gap-4 items-center">
        <div className="w-full mb-4 flex flex-col gap-4">
          <p className=" dark:text-black text-black text-[25px] text-center font-[700]">ساختن ورک‌اسپیس جدید‌</p>
          <label className="block text-sm font-bold text-[#8f959e] ">
            نام ورک‌اسپیس
          </label>
          <input type="text" className="border border-gray-300 rounded-md outline-none focus:border-[#208D8E] p-2"
            value={workspaceName} onChange={(e) => setWorkspaceName(e.target.value)}/>
        </div>
        <button
          style={{ backgroundColor: primaryColor }}
          onClick={() => {
            if (workspaceName.trim()) {
              updateWorkspace({ name: workspaceName })
              setIsContinueOn(true);
            }
          }}
          className="w-full text-white py-2 rounded-md transition-colors disabled:opacity-50"
          disabled={!workspaceName.trim()} >
          ادامه
        </button>
      </div>
      <Modal isOpen={isContinueOn} onClose={() => setIsContinueOn(false)} title="">
        <SelectColor />
      </Modal>
    </>
  )
}