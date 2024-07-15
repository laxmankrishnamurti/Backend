const mongoose = require("mongoose");

async function connectDatabase() {
  await mongoose
    .connect("mongodb://127.0.0.1:27017/blogApplication")
    .then(() => console.log("Database connected successfully"))
    .catch((err) =>
      console.error("Database connection failed :: msg :: ", err)
    );
}

module.exports = connectDatabase;
