import { useEffect } from "react";
import { useTheme } from "./context/ThemeContext";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import Router from "./routes";

function App() {
  const { darkMode } = useTheme();
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
        <Toaster
          position="top-right"
          reverseOrder={false}
          toastOptions={{ duration: 2000 }}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
