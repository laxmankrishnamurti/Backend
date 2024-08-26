import { useEffect } from "react";
import io from "socket.io-client";
import "./App.css";

function App() {
  const socket = io("localhost:3000");

  function connectSocket() {
    socket.on("connection", (socket) => {
      console.log("Socket Instance", socket);
    });
  }

  useEffect(() => {
    connectSocket();
  }, []);

  return (
    <>
      <h1>Multiplayer Game Dashboard</h1>
    </>
  );
}

export default App;
