import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

interface ProjectFormProps {
  lessonId?: string | null;
  onProjectCreated: (projectName: string) => void
}

export default function ProjectForm({ lessonId, onProjectCreated }: ProjectFormProps) {
  const { primaryColor } = useTheme()
  const [projectName, setProjectName] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (projectName.trim()) {
      onProjectCreated(projectName)
      setProjectName("")
    }
  }

  return (
    <>
      <div className="p-4">
        <p className="text-[25px] text-center mb-10 font-[700]">ساختن پروژه جدید</p>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3 mb-10">
            <label className="block text-sm font-bold text-[#707276] mb-2">
              نام پروژه
            </label>
            <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none focus:border-[#208D8E]"
              placeholder="نام پروژه را وارد کنید..." autoFocus />
          </div>

          <button type="submit" style={{ backgroundColor: primaryColor }} className="w-full text-white py-2 rounded-md transition-colors hover:opacity-90" disabled={!projectName.trim()} >
            ساخت پروژه
          </button>
        </form>
      </div>
    </>
  )
}