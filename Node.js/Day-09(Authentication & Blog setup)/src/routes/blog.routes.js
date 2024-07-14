const express = require("express");
const {
  handleGetAddNewBlog,
  handleAddNewBlog,
} = require("../controllers/blog.controller");
const upload = require("../utils/upload.utils");

const router = express.Router();

router
  .route("/add-new-blog")
  .get(handleGetAddNewBlog)
  .post(upload.single("blogCoverImage"), handleAddNewBlog);

module.exports = router;
