const authService = require("../services/authService");
const AuthToken = require("../models/AuthToken");
const bcryptService = require("../services/bcryptService");
const User = require("../models/User");

function login(req, res) {
  const { email, contrasenia } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "Credenciales Invalidas" });
      }

      bcryptService
        .comparePassword(contrasenia, user.contrasenia)
        .then((match) => {
          if (!match) {
            return res.status(401).json({ message: "Credenciales Invalidas" });
          }

          const token = authService.generateToken(user);

          AuthToken.create({ userId: user._id, token })
            .then(() => {
              res.json({ token });
            })
            .catch((error) => {
              console.error(error);
              res.status(500).json({ message: "Error al iniciar sesion" });
            });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ message: "Error al iniciar sesion" });
        });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error al iniciar sesion" });
    });
}

function logout(req, res) {
  const token = req.headers.authorization.split(" ")[1];

  AuthToken.findOneAndDelete({ token })
    .then(() => {
      res
        .status(200)
        .json({ message: "Sesion cerrada exitosamente", error: { token } });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Error al iniciar sesion" });
    });
}

module.exports = {
  login,
  logout,
};
