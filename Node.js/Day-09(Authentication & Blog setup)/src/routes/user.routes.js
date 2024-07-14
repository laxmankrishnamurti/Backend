const express = require("express");
const {
  handleUserSignUp,
  handleUserSignIn,
  handleLogout,
} = require("../controllers/user.controller");
const upload = require("../utils/upload.utils");

const router = express.Router();

router.route("/signup").post(upload.single("profile"), handleUserSignUp);

router.route("/signin").post(handleUserSignIn);

router.route("/logout").get(handleLogout);

module.exports = router;
