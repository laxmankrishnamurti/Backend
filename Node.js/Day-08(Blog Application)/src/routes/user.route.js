const express = require("express");
const {
  handleUserSignUp,
  handleUserSignIn,
} = require("../controllers/user.controller");

const router = express.Router();

router.route("/signup").post(handleUserSignUp);

router.route("/signin").post(handleUserSignIn);

module.exports = router;
