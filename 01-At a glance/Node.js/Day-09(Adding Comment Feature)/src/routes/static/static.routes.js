const express = require("express");
const BLOG = require("../../models/blog.model");
const router = express.Router();

router.route("").get(async (req, res) => {
  if (req.user) {
    const allBlogs = await BLOG.find({ createdBy: req.user._id });

    return res.render("home", {
      user: req.user,
      blogs: allBlogs,
    });
  } else {
    return res.render("home");
  }
});

router.route("/user/signup").get((req, res) => {
  return res.render("signup");
});

router.route("/user/signin").get((req, res) => {
  return res.render("signin");
});

module.exports = router;
