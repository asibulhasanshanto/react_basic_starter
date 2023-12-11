// =========================================================
// use this context if you need to connect to the socket when someone loggs in and stay connected the whole time.

// if you need to connect to the socket in a specific part of the app, then use the useSocket hook in the hooks section

// ==========================================================

/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import socketio from "socket.io-client";
import { LocalStorage } from "../utils";

const getSocket = () => {
  const token = LocalStorage.get("token"); // Retrieve jwt token from local storage or cookie

  return socketio(import.meta.env.VITE_SOCKET_URI, {
    withCredentials: true,
    auth: { token },
  });
};

const SocketContext = createContext({
  socket: null,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(getSocket());
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
