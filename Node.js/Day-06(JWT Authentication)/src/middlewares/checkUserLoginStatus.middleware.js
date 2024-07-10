const { getUser } = require("../utils/authJWT.utils");

function checkUserLoginStatus(req, res, next) {
  const token = req.cookies?.loginToken;

  if (!token) {
    return res.redirect("/login");
  }

  const loggedInUserInfo = getUser(token);

  next();
}

module.exports = checkUserLoginStatus;
