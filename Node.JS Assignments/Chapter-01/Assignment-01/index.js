const http = require("http");

const PORT = 3000;

const arguments = process.argv;
console.log("arguments :: ", arguments);

let argNum = 1;
for (let i = 2; i < arguments.length; i++) {
  console.log(`${argNum} argument is ${arguments[i]}`);
  argNum++;
}

/*
arguments ::  [
    '/usr/local/nodejs/bin/node',       //Node Executer
    '/home/laxmankrishnamurti/Desktop/Backend/Backend/Node.JS Assignments/Chapter-01/Assignment-01/index.js',   //Executable file path
    'laxman',   //first arguments
    'kawya'     //Second arguments
  ]
*/

const server = http.createServer((req, res) => {
  res.end("Server is listening on PORT : 3000");
});

server.listen(PORT, () => {
  console.log(`server is listening on http://localhost:${PORT}`);
});
