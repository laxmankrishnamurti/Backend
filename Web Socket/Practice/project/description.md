# Multiplayer game dashboard

- Frontend :: React

  - Initialize a react project
  - Add Socket.io Client Library

  ```bash
    $ npm install socket.io-client
  ```

  - Start the React-app

  ```bash
    $ npm run dev
  ```

```js
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
```

    - Make components and make UI for the project
    - Send player info and it's corresponding data

- Server
  - Set-up the basic configuration for making a socket connection
  - Whitelist the Domain name
  - After that import the socket.io and make a connection between the server from the client side

```js
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
```

- Receive the data
