const { getUser } = require("../utils/handleToken.utils");

function watchToken(req, res, next) {
  const token = req.cookies.loginToken;

  if (!token) {
    return next();
  } else {
    req.user = getUser(token);
  }
  return next();
}

module.exports = watchToken;
