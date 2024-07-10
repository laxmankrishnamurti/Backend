const USER = require("../models/user.model");
const { setUser } = require("../utils/authJWT.utils");
// const { v4: uuidv4 } = require("uuid");

async function handleUserRegistration(req, res) {
  const userPayload = req.body;

  if (!userPayload.name || !userPayload.email || !userPayload.password) {
    return res.render("userRegistration", {
      status: "missing",
      msg: "All fields are required",
    });
  }

  const existUser = await USER.findOne({ email: userPayload.email });

  if (existUser) {
    res.render("userRegistration", {
      status: "exist",
      msg: "user already exist, Please login",
    });
  }

  const createUserAccount = await USER.create({
    name: userPayload.name,
    email: userPayload.email,
    password: userPayload.password,
  });

  if (createUserAccount) {
    const loginToken = setUser(createUserAccount);
    res.cookie("loginToken", loginToken);

    res.redirect("/url");
  } else {
    res.render("userRegistration", {
      msg: "Internal server error, please try after some time",
    });
  }
}

async function handleUserLogin(req, res) {
  const { name, password } = req.body;

  if (!name || !password) {
    res.render("login", {
      status: "missing",
      msg: "All fields are required",
    });
  }

  //   const sessionId = uuidv4();  //too old
  const loginUser = await USER.findOne({ name, password });

  if (!loginUser) {
    return res.status(400).render("login", {
      status: "nouser",
      msg: "user dosen't exist, please signup",
    });
  }

  const loginToken = setUser(loginUser);

  res.cookie("loginToken", loginToken);

  if (loginUser) {
    return res.redirect("/");
  }
}

module.exports = { handleUserRegistration, handleUserLogin };
