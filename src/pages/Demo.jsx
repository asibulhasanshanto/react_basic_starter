import Layout from "../components/layouts/Layout";
import { SunIcon, MoonIcon, UserIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { BsBell } from "react-icons/bs";
import toast from "react-hot-toast";
const Demo = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="flex h-[92vh] w-full items-center justify-center">
        <div className="conainer">
          <div className="buttons flex flex-col space-x-0 space-y-5 p-5 md:flex-row md:space-x-5 md:space-y-0">
            {/* dark/light*/}
            <button
              onClick={toggleDarkMode}
              className="bg-primary group flex h-28 w-28 flex-col items-center justify-center rounded-lg  text-white transition-all duration-200  "
            >
              {darkMode ? (
                <SunIcon className="h-16 w-16 transition-all duration-150 group-hover:scale-105 " />
              ) : (
                <MoonIcon className="h-16 w-16 transition-all duration-150 group-hover:scale-105" />
              )}
              <p className="mt-1 text-xs font-bold">
                {darkMode ? "Light" : "Dark"}
              </p>
            </button>{" "}
            {/* login/logout*/}
            <button
              onClick={
                isAuthenticated
                  ? logout
                  : () => {
                      navigate("/login");
                    }
              }
              className="bg-primary group flex h-28 w-28 flex-col items-center justify-center rounded-lg  text-white transition-all duration-200  "
            >
              {isAuthenticated ? (
                <BiLogOutCircle className="h-16 w-16 transition-all duration-150 group-hover:scale-105 " />
              ) : (
                <BiLogInCircle className="h-16 w-16 transition-all duration-150 group-hover:scale-105" />
              )}
              <p className="mt-1 text-xs font-bold">
                {isAuthenticated ? "Log out" : "Login"}
              </p>
            </button>
            {/* show toast*/}
            <button
              onClick={() => {
                toast.success("Successfully toasted!");
              }}
              className="bg-primary group flex h-28 w-28 flex-col items-center justify-center rounded-lg  text-white transition-all duration-200  "
            >
              <BsBell className="h-16 w-16 transition-all duration-150 group-hover:scale-105 " />

              <p className="mt-1 text-xs font-bold">Notification</p>
            </button>
            {/* profile*/}
            <button
              onClick={() => {
                navigate("/profile");
              }}
              className="bg-primary group flex h-28 w-28 flex-col items-center justify-center rounded-lg  text-white transition-all duration-200  "
            >
              <UserIcon className="h-16 w-16 transition-all duration-150 group-hover:scale-105 " />

              <p className="mt-1 text-xs font-bold">profile</p>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Demo;
