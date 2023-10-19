import { createContext, useContext, useState, useEffect } from "react";

const themeContext = createContext();

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(true);

  // console.log("darkMode", darkMode);
  useEffect(() => {
    const isDark = localStorage.getItem("dark") !== "false";
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const isDark = !darkMode;
    localStorage.setItem("dark", JSON.stringify(isDark));
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
