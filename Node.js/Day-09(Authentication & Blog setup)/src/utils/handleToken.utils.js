const jsonWebToken = require("jsonwebtoken");

function setToken(user) {
  return jsonWebToken.sign(
    {
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      profileImageUrl: user.profileImageUrl,
    },
    process.env.JSONWEBTOKEN_SECRET_KEY
  );
}

function getUser(token) {
  return jsonWebToken.verify(token, process.env.JSONWEBTOKEN_SECRET_KEY);
}

module.exports = {
  setToken,
  getUser,
};
