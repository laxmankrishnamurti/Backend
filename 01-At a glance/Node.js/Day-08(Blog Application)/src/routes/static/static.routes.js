const express = require("express");

const router = express.Router();

router.route("").get((req, res) => {
  return res.render("home");
});

router.route("/user/signup").get((req, res) => {
  return res.render("signup");
});

router.route("/user/signin").get((req, res) => {
  return res.render("signin");
});

module.exports = router;
