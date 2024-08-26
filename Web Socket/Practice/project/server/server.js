const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

let players = [];

io.on("connection", (socket) => {
  socket.on("score", (scores) => {
    if (scores.name) {
      players.push(scores);
    }

    //Sending all players data
    socket.emit("players", players);

    setInterval(() => {
      socket.emit("players", players);
    }, 5000);
  });

  //Deleting an user-data
  socket.on("deleteData", (payload) => {
    console.log("Players : ", players);
    let userIndex = players.findIndex((player) => player._id === payload);
    console.log("userIndex", userIndex);
    players.splice(userIndex, 1);
  });
});

httpServer.listen(3000, () => {
  console.log(`Server is listening on http://localhost:3000`);
});
