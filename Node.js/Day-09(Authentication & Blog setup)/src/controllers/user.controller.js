const { setToken } = require("../utils/handleToken.utils");
const USER = require("../models/user.model");

async function handleUserSignUp(req, res) {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.render("signup", {
      status: "missing",
      msg: "All fields are required",
    });
  }

  const newUser = await USER.create({
    fullName: fullName,
    email: email,
    password: password,
  });

  if (newUser) {
    return res.redirect("/");
  }
}

async function handleUserSignIn(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render("signin", {
      status: "missing",
      msg: "All fields are required",
    });
  }

  try {
    const user = await USER.matchPassword(email, password);
    res.cookie("loginToken", setToken(user));
    return res.redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "user dosen't exist",
    });
  }
}

module.exports = { handleUserSignUp, handleUserSignIn };
