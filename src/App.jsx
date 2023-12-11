import { useEffect } from "react";
import { useTheme } from "./context/ThemeContext";
import { Toaster } from "react-hot-toast";
import Router from "./routes";

function App() {
  const { darkMode } = useTheme();
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);
  return (
    <>
      <Router />
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
    </>
  );
}

export default App;
