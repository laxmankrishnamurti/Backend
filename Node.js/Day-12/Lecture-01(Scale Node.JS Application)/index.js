const express = require("express");
const app = express();

const PORT = 4000;

app.get("/", (req, res) => {
  return res.end(`server process id : ${process.pid}`);
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
console.log("Process is : ", process.pid);
