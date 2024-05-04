const mongoose = require("mongoose");
const bcryptService = require("../services/bcryptService");

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  edad: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contrasenia: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("contrasenia")) {
    return next();
  }
  bcryptService
    .hashPassword(this.contrasenia)
    .then((hashedPassword) => {
      this.contrasenia = hashedPassword;
      next();
    })
    .catch((error) => {
      console.error(error);
      next(error);
    });
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.contrasenia) {
    try {
      const hashedPassword = await bcryptService.hashPassword(update.contrasenia);
      update.contrasenia = hashedPassword;
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
