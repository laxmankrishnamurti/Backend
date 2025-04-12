const jwt = require("jsonwebtoken");

function setUser(user) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET_KEY
  );
}

function getUser(token) {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
}

module.exports = {
  setUser,
  getUser,
};
