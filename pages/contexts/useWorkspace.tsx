import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
interface Lesson {
  id: string;
  name: string;
  color: string;
  projects: string[];
}
interface Workspace {
  id: string;
  name: string;
  color: string;
  lessons: Lesson[];
}
interface WorkspaceContextType {
  workspaces: Workspace[];
  currentWorkspace: Workspace | null;
  createWorkspace: (name: string, color: string) => void;
  updateWorkspace: (data: Partial<Workspace>) => void;
  loadWorkspaces: () => void;
}

const WorkspaceContext = createContext<WorkspaceContextType | undefined>(undefined);

const defaultLessons: Lesson[] = [
  { id: "1", name: "درس مدیریت پروژه", color: "#40C057", projects: ["پروژه اول"] },
  { id: "2", name: "کارهای شخصی", color: "#FAB005", projects: [] },
]

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [currentWorkspace, setCurrentWorkspace] = useState<Workspace | null>(null);

  useEffect(() => {
    loadWorkspaces();
  }, [])

  const loadWorkspaces = () => {
    const savedData = localStorage.getItem('taskManagerWorkspaces');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setWorkspaces(parsed);
      if (parsed.length > 0) {
        setCurrentWorkspace(parsed[0]);
      }
    } else {
      const initialWorkspace: Workspace = {
        id: Date.now().toString(),
        name: "ورک‌اسپیس ",
        color: "#4C6EF5",
        lessons: defaultLessons
      }
      setWorkspaces([initialWorkspace]);
      setCurrentWorkspace(initialWorkspace);
      localStorage.setItem('taskManagerWorkspaces', JSON.stringify([initialWorkspace]));
    }
  }
  const updateWorkspace = (data: Partial<Workspace>) => {
    if (currentWorkspace) {
      const updatedWorkspace = { ...currentWorkspace, ...data };
      setCurrentWorkspace(updatedWorkspace);
      const updatedWorkspaces = workspaces.map(ws => 
        ws.id === currentWorkspace.id ? updatedWorkspace : ws
      );
      setWorkspaces(updatedWorkspaces);
      localStorage.setItem('taskManagerWorkspaces', JSON.stringify(updatedWorkspaces));
    }
  }

  const createWorkspace = (name: string, color: string) => {
    const newWorkspace: Workspace = {
      id: Date.now().toString(),
      name: name,
      color: color,
      lessons: defaultLessons
    }
    const updatedWorkspaces = [...workspaces, newWorkspace];
    setWorkspaces(updatedWorkspaces);
    localStorage.setItem('taskManagerWorkspaces', JSON.stringify(updatedWorkspaces));
    setCurrentWorkspace(newWorkspace);
  }

  return (
    <WorkspaceContext.Provider value={{ workspaces, currentWorkspace, createWorkspace, updateWorkspace, loadWorkspaces }}>
      {children}
    </WorkspaceContext.Provider>
  )
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context
}