const mongoose = require("mongoose");

const mongoDBURL =
  "mongodb+srv://marisabelnunez:Vg75MC89WDKevdsv@cluster0.qyd15cm.mongodb.net/proyect";

function connectDB() {
  return new Promise((res, rej) => {
    mongoose
      .connect(mongoDBURL)
      .then(() => {
        console.log("Conexion a la DB establecida correctamente");
        res();
      })
      .catch((err) => {
        console.error("Error al conectar a la DB ", err);
        rej(err);
      });
  });
}
module.exports = connectDB;
