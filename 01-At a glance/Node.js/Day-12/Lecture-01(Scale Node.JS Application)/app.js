const express = require("express");
const cluster = require("node:cluster");
const os = require("os");

const totalThreads = os.cpus().length;

if (cluster.isPrimary) {
  for (let i = 0; i < totalThreads; i++) {
    cluster.fork();
  }
} else {
  const app = express();
  const PORT = 4000;
  app.get("/", (req, res) => {
    return res.json({
      msg: `Hello from express server ${process.pid}`,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
  });
}
