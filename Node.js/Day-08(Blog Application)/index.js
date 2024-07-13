const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

//form configuration
app.use(express.urlencoded({ extended: false }));

//view engine configuration
app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));

//importing routes
const staticRouter = require("./src/routes/static/static.routes");

//routes configuration
app.use("/", staticRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
