import { createContext, useContext, useState, useEffect } from "react";
import { LocalStorage } from "../utils";
const themeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = LocalStorage.get("dark") !== false;
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const isDark = !darkMode;
    LocalStorage.set("dark", isDark);
    setDarkMode(isDark);
  };

  return (
    <themeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </themeContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  return useContext(themeContext);
}
