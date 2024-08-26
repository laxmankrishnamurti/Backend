const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const socket = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

socket.on("connection", (socket) => {
  if (socket) {
    console.log("Connection established from client to the server");
  }
});

httpServer.listen(3000, () => {
  console.log(`Server is listening on http://localhost:3000`);
});
