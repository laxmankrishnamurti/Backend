const express = require("express");
const {
  handleUserSignUp,
  handleUserSignIn,
  handleLogout,
} = require("../controllers/user.controller");

const router = express.Router();

router.route("/signup").post(handleUserSignUp);

router.route("/signin").post(handleUserSignIn);

router.route("/logout").get(handleLogout);

module.exports = router;
