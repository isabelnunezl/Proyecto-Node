const jwt = require("jsonwebtoken");

const JWT_SECRET =
  "a47bfaee4bfdc8c8f126be5f2d52df5f21550d5d057df49de29d8f62732fcd50";

function generateToken(user) {
  const playload = {
    userId: user._id,
    email: user.email,
  };

  const token = jwt.sign(playload, JWT_SECRET, { expiresIn: "1h" });
  return token;
}

module.exports = {
  generateToken,
};
