const { createServer } = require("http");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 3000;

const httpServer = createServer();
const socket = new Server(httpServer, {});

socket.on("connection", (socket) => {
  console.log(socket);
});

httpServer.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
