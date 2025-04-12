const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Default configuration
app.use(express.urlencoded({ extended: false }));

//Configuring views file for server-side-rendering
app.set("view engine", "ejs");
app.set("views", path.resolve("src/views"));

//importing router
const homeRouter = require("./src/routes/home.routes");

//Route configuration
app.use("/", homeRouter);

app.listen(PORT, () => {
  console.log(`server is listening in http://localhost:${PORT}`);
});
