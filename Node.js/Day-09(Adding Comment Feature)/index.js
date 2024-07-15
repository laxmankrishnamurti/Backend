const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDatabase = require("./src/database/connectDatabase");
const cookieparser = require("cookie-parser");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

//Establishing database connection
connectDatabase();

//form configuration
app.use(cookieparser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve("./src/public")));

//view engine configuration
app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));

//importing global middleware
const watchToken = require("./src/middlewares/watchToken.middleware");

//Global middleware configuration
app.use(watchToken);

//importing routes
const staticRouter = require("./src/routes/static/static.routes");
const userRouter = require("./src/routes/user.routes");
const blogRouter = require("./src/routes/blog.routes");

//routes configuration
app.use("/", staticRouter);
app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
