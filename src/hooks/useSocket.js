import { useState, useEffect } from "react";
import Socket from "../utils/Socket";
import { useAuth } from "../context/AuthContext";
function useSocket() {
  const [socket, setSocket] = useState(null);
  const { token } = useAuth();

    useEffect(() => {
      const newSocket = new Socket(token);
      setSocket(newSocket.socket);
      return () => newSocket.close();
    }, []);

  return socket;
}

export default useSocket;
