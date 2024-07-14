const { getUser } = require("../utils/handleToken.utils");

function watchToken(req, res, next) {
  const token = req.cookies.loginToken;
  console.log("token :: ", token);

  if (!token) {
    return next();
  } else {
    req.user = getUser(token);
  }
  return next();
}

module.exports = watchToken;
