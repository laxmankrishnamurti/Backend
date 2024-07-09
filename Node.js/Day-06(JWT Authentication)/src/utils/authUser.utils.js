const jwt = require("jsonwebtoken");

function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
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

/**
 * Statefull sessionID
 */

// const sessingToUserMap = new Map()

// function setUser(id, user){
//     sessingToUserMap.set(id, user);
// }

// function getUser(id){
//     sessingToUserMap.get(id);
// }

// module.exports = { setUser, getUser }
