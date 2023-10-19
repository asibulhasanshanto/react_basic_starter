import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const Layout = ({ children }) => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <div className=" w-full bg-bg dark:bg-bg_dark ">
      <div className="navbar flex h-20 bg-bg_secondary dark:bg-bg_dark_secondary">
        <div className="text-secondary container flex items-center justify-end">
          {isAuthenticated && (
            <div className="flex items-center space-x-3">
              <img src={user.avatar} className="h-8 w-8 rounded-full" alt="" />
              <p>Hello {user.username}</p>
              <button
                onClick={logout}
                className="rounded-md bg-bg px-3 py-2 dark:bg-bg_dark"
              >
                Log out
              </button>
            </div>
          )}
          {!isAuthenticated && (
            <Link
              to={"/login"}
              className="rounded-md bg-bg px-4 py-2  dark:bg-bg_dark"
            >
              Login
            </Link>
          )}
        </div>
      </div>
      <div className="">{children}</div>
    </div>
  );
};

export default Layout;
