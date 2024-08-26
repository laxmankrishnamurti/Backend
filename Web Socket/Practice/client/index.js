//Address of the server
const socket = io("http://localhost:3000");

// socket.on("connect", (response) => {
//   console.log("Response : ", response);
// });

socket.on("connect", () => {});

//Reveving the server message
socket.on("message", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Message from the server : ", data);
  }

  //Sending data from Client to Server
  socket.emit("cmsg", "Hello there! I'm Laxman");
});
