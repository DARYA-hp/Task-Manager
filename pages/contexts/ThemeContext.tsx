import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
  primaryColor: '#208D8E',
  setPrimaryColor: () => {},
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#208D8E');
  useEffect(() => {
    const storedColor = localStorage.getItem('userSelectedColor');
    if (storedColor) {
      setPrimaryColor(storedColor);
    }
  }, [])

  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    localStorage.setItem('userSelectedColor', primaryColor);
  }, [primaryColor])

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, primaryColor, setPrimaryColor }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext);