import socketio from "socket.io-client";
// create a singleton class named socket
class Socket {
  constructor(token) {
    if (!Socket.instance) {
      this.socket = socketio(import.meta.env.VITE_SOCKET_URI, {
        withCredentials: true,
        auth: { token },
      });
      Socket.instance = this;
    }
    return Socket.instance;
  }

  close() {
    this.socket.close();
    Socket.instance = null;
  }
}

export default Socket;
