import { Link } from "react-router-dom";
import not_found from "../assets/not_found.svg";
import not_found_dark from "../assets/not_found_dark.svg";
import { useTheme } from "../context/ThemeContext";
const NotFound = () => {
  const { darkMode } = useTheme();
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center bg-bg dark:bg-bg_dark">
      <img src={darkMode ? not_found_dark : not_found} alt="" />
      <Link to={"/"} className="mt-5 animate-bounce font-bold text-primary">
        go to home?{" "}
      </Link>
    </div>
  );
};

export default NotFound;
