import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Tag {
  id: string;
  name: string;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: string | null;
  startDate: string;
  endDate: string;
  tags: Tag[];
  projectName: string;
  status: 'open' | 'pending' | 'progress' | 'done';
  members?: string[];
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (updatedTask: Task) => void;
  selectedPriority: string | null;
  setSelectedPriority: (val: string | null) => void;
  selectedStartDate: string;
  setSelectedStartDate: (val: string) => void;
  selectedEndDate: string;
  setSelectedEndDate: (val: string) => void;
  selectedTags: Tag[];
  setSelectedTags: (tags: Tag[]) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('myAppTasks');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error("Error parsing tasks", e);
          return [];
        }
      }
    }
    return [];
  })

  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [selectedStartDate, setSelectedStartDate] = useState<string>("");
  const [selectedEndDate, setSelectedEndDate] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('myAppTasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (newTaskData: Omit<Task, 'id'>) => {
    const taskWithId: Task = {
      ...newTaskData,
      id: Math.random().toString(36).substr(2, 9),
      status: newTaskData.status || 'pending',
    }
    setTasks((prev) => [...prev, taskWithId]);
    setSelectedPriority(null);
    setSelectedStartDate("");
    setSelectedEndDate("");
    setSelectedTags([]);
  }

  const updateTask = (updatedTask: Task) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    )
  }

  return (
    <>
      <TaskContext.Provider value={{
        tasks, addTask, updateTask, selectedPriority, setSelectedPriority, selectedStartDate,
        setSelectedStartDate, selectedEndDate, setSelectedEndDate, selectedTags, setSelectedTags
      }}>
        {children}
      </TaskContext.Provider>
    </>
  )
}

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within TaskProvider");
  return context;
};