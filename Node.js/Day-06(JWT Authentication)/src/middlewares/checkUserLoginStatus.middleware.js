const { getUser } = require("../utils/authJWT.utils");

function checkUserLoginStatus(req, res, next) {
  const token = req.cookies?.loginToken;

  if (!token) {
    return res.redirect("/login");
  }

  getUser(token);

  next();
}

module.exports = checkUserLoginStatus;
