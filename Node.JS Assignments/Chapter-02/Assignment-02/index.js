const http = require("http");

let PORT_1 = 3001;
let PORT_2 = 3002;

const serverOne = http.createServer((req, res) => {
  res.end("<h1>Hello from first server</h1>");
});

const serverTwo = http.createServer((req, res) => {
  res.end("<h1>Hello from second server</h1>");
});

serverOne.listen(PORT_1, () => {
  console.log(`serverOne is listening on http://localhost:${PORT_1}`);
});

serverTwo.listen(PORT_2, () => {
  console.log(`serverTwo is listening on http://localhost:${PORT_2}`);
});
