const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  return new Promise((resolve, reject) => {
    const token = req.headers.authorization;

    if (!token) {
      reject({
        status: 401,
        message: "Token de autenticacion no proporcionado",
      });
    }

    jwt.verify(
      token.split(" ")[1],
      "a47bfaee4bfdc8c8f126be5f2d52df5f21550d5d057df49de29d8f62732fcd50",
      (error, decodedToken) => {
        if (error) {
          reject({ status: 401, message: "Token de autenticacion no valido" });
        } else {
          req.userId = decodedToken.userId;
          resolve();
        }
      }
    );
  })
    .then(() => next())
    .catch((error) =>
      res.status(error.status || 500).json({ message: error.message })
    );
}

module.exports = verifyToken;
