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
      players.push({ ...scores, id: socket.id });
    }
    //Sending all players data
    socket.emit("players", players);

    setInterval(() => {
      socket.emit("players", players);
    }, 5000);
  });
});

httpServer.listen(3000, () => {
  console.log(`Server is listening on http://localhost:3000`);
});
