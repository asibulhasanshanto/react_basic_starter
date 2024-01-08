import { createContext, useContext, useEffect, useReducer } from "react";
import { loginUser } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();
const initialState = {
  user: null,
  isAuthenticated: false,
  token: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case "LOGOUT":
      localStorage.removeItem("user");
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        token: null,
      };

    default:
      return state;
  }
}
// eslint-disable-next-line react/prop-types
function AuthProvider({ children }) {
  const [{ user, isAuthenticated, token }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user) {
      dispatch({
        type: "LOGIN",
        payload: { user: JSON.parse(user), token },
      });
    }
  }, []);
  async function login(email, password) {
    const data = await loginUser(email, password);
    const user = {
      username: data.result.name,
      email: data.result.email,
      avatar:
        data.result.photo
          // eslint-disable-next-line no-undef
          ? `${process.env.REACT_APP_API_URL}/images/users/${data.result.photo}`:"https://i.pravatar.cc/150?img=2",
      role: data.result.role,
    };
    const token = data.result.token;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    dispatch({
      type: "LOGIN",
      payload: {
        user: user,
        token: token,
      },
    });
  }

  function logout() {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  }
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
