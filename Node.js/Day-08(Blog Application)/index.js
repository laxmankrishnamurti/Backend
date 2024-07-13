const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDatabase = require("./src/database/connectDatabase");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

//Establishing database connection
connectDatabase();

//form configuration
app.use(express.urlencoded({ extended: false }));

//view engine configuration
app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));

//importing routes
const staticRouter = require("./src/routes/static/static.routes");
const userRouter = require("./src/routes/user.route");

//routes configuration
app.use("/", staticRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
