import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Input } from "./components/index.components";
import "./App.css";

function App() {
  const [playerInfo, setPlayerInfo] = useState({});
  const [allPlayers, setAllPlayers] = useState([]);

  const socket = io("localhost:3000");

  function connectSocket() {
    socket.on("connection", (socket) => {
      console.log("Socket Instance", socket);
    });
  }

  useEffect(() => {
    connectSocket();
    socket.on("players", (data) => {
      console.log(data);
      setAllPlayers(data);
    });
  });

  function handleEvent(event) {
    let { name, value } = event.target;
    let currentObj = { [name]: value };
    setPlayerInfo((prev) => ({ ...prev, ...currentObj }));
  }

  function sendScore() {
    socket.emit("score", playerInfo);

    socket.on("players", (data) => {
      setAllPlayers(data);
    });
  }

  return (
    <>
      <h1 className="mb-4 bg-yellow-100 p-4 rounded-sm text-2xl">
        Multiplayer Game Dashboard
      </h1>
      <div>
        <Input
          name="name"
          placeholder="Enter your name"
          handleEvent={handleEvent}
        />
        <Input
          name="score"
          placeholder="Enter your score"
          handleEvent={handleEvent}
        />

        <button
          className="bg-green-400 px-3 py-2 rounded-md"
          onClick={sendScore}
        >
          Publish Score
        </button>
      </div>
      <div className="w-full flex justify-center mt-10">
        {allPlayers.length > 0 ? (
          <table className="border-2 border-red-300 p-4">
            <thead className="text-white">
              <tr>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            {allPlayers.map((player) => (
              <tbody key={player?.name}>
                <tr>
                  <td>{player?.name}</td>
                  <td>{player?.score}</td>
                </tr>
              </tbody>
            ))}
          </table>
        ) : null}
      </div>
    </>
  );
}

export default App;
