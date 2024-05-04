const express = require("express");
const connectDb = require("./db/db");

const cacheDataEndpoint = require("./cachedEndpoints/cacheData");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const sessionRoutes = require("./routes/sessionRoutes");

const app = express();
const PORT = 3010;

app.use(express.json());

app.use("/api/cache", cacheDataEndpoint);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/session", sessionRoutes);

// Iniciar la conexión a la base de datos
connectDb();

// Iniciar el servidor
app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto: " + PORT);
});

