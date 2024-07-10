const express = require("express");
const URL = require("../../models/urlShortner.model");
const checkUserLoginStatus = require("../../middlewares/checkUserLoginStatus.middleware");

const router = express.Router();

router.route("").get(async (req, res) => {
  const loginToken = req.cookies.loginToken;

  if (!loginToken) {
    return res.redirect("/login");
  }

  const totalURL = await URL.find({});
  return res.render("home", { urls: totalURL });
});

router.route("/user").get((req, res) => {
  res.render("userRegistration");
});

router.route("/login").get((req, res) => {
  res.render("login");
});

router.route("/url").get(checkUserLoginStatus, (req, res) => {
  return res.render("generateShortID");
});

module.exports = router;
