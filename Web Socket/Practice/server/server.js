const { createServer } = require("http");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 3000;

const httpServer = createServer();
const socket = new Server(httpServer, {
  cors: {
    origin: "http://127.0.0.1:5500",
  },
});

socket.on("connection", (socket) => {
  let allKeys = Object.getOwnPropertyNames(socket);
  // console.log("All Keys : ", allKeys);

  //Sending message from server to the client
  socket.emit("message", "Welcome to WebSocket!");

  //Receving the client data
  socket.on("cmsg", (err, data) => {
    if (!err) {
      console.log("Client Message : ", data);
    } else {
      console.log(err);
    }
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
