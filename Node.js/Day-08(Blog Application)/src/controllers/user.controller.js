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

  const user = await USER.matchPassword(email, password);

  console.log("logged in user info :: ", user);

  return res.redirect("/");
}

module.exports = { handleUserSignUp, handleUserSignIn };
