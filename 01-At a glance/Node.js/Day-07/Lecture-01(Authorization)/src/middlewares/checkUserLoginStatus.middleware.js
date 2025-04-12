const { getUser } = require("../utils/authJWT.utils");

function checkUserLoginStatus(req, res, next) {
  const token = req.cookies?.loginToken;

  if (!token) {
    return res.redirect("/login");
  }

  const loggedInUserInfo = getUser(token);
  req.user = loggedInUserInfo;

  return next();
}

function restrictTo(roles = []) {
  return function (req, res, next) {
    if (!req.user) {
      return res.redirect("/login");
    }

    if (!roles.includes(req.user.role)) {
      return res.end("UnAuthorized");
    }

    return next();
  };
}

module.exports = { checkUserLoginStatus, restrictTo };
