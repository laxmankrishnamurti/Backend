const express = require("express");
const connect = require("./src/db/connect");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//Configuration for data collections

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Establishing databse connection
connect();

//Configuring views file for server-side-rendering
app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));

//Importing routes
const staticRouter = require("./src/routes/static/user.static.routes");
const urlRouter = require("./src/routes/url.routes");
const userRouter = require("./src/routes/user.routes");
const adminRouter = require("./src/routes/admin.routes");

//Importing middlewares
const {
  checkUserLoginStatus,
  restrictTo,
} = require("./src/middlewares/checkUserLoginStatus.middleware");

//Configuring routes with handlers
app.use("/", staticRouter);
app.use(
  "/url",
  checkUserLoginStatus,
  restrictTo(["NORMAL", "ADMIN"]),
  urlRouter
);
app.use("/user", userRouter);
app.use("/admin", adminRouter);

app.listen(PORT, (err) => {
  if (err) {
    console.error("Error while listening on PORT" + PORT);
  } else {
    console.log(`Server is listening on http://localhost:${PORT}`);
  }
});

//Authentication and Authorization of the application has been completed
