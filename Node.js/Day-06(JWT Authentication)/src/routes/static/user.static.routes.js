const express = require("express");
const URL = require("../../models/urlShortner.model");
const checkUserLoginStatus = require("../../middlewares/checkUserLoginStatus.middleware");

const router = express.Router();

router.route("").get(checkUserLoginStatus, async (req, res) => {
  const loggedInUser = req.user;

  const totalURL = await URL.find({ createdBy: loggedInUser._id });
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
