import { useState, useEffect } from 'react';
import { PiSunDim } from "react-icons/pi";
import { IoMoonOutline } from "react-icons/io5";
export function DarkBtn() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div  onClick={toggleDarkMode}
      className="py-1 w-[50px] rounded-md  bg-[#F1F3F5] cursor-pointer" 
      id='darkmode'>
      {isDark ? (
        <IoMoonOutline className="w-4 h-4 text-black" />
      ) : (
        <PiSunDim className="w-4 h-4 text-black" />
      )}
    </div>
  )
}