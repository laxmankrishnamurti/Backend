const express = require("express");
const URL = require("../../models/urlShortner.model");
const USER = require("../../models/user.model");
const {
  checkUserLoginStatus,
  restrictTo,
} = require("../../middlewares/checkUserLoginStatus.middleware");

const router = express.Router();

router.route("").get(checkUserLoginStatus, async (req, res) => {
  const loggedInUser = req.user;

  if (loggedInUser.role === "ADMIN") {
    return res.redirect("/admin");
  }

  const totalURL = await URL.find({ createdBy: loggedInUser.id });
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

router.route("/success").get((req, res) => {
  return res.render("success");
});

router
  .route("/admin")
  .get(checkUserLoginStatus, restrictTo(["ADMIN"]), async (req, res) => {
    const totalURL = await URL.find();
    const users = await USER.find();

    return res.render("adminPanel", { urls: totalURL, users: users });
  });

module.exports = router;
