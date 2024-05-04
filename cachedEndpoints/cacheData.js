const express = require("express");
const router = express.Router();

const cachedData = {
  message: "¡Hola desde el endpoint cacheado!",
  timestamp: new Date(),
};

// Middleware para la caché
const cacheMiddleware = (req, res, next) => {
  // Establecer el tiempo de vida de la caché en segundos
  const cacheTimeSeconds = 60; // 1 minuto

  // Establecer la cabecera de la caché
  res.set("Cache-Control", `public, max-age=${cacheTimeSeconds}`);

  next();
};

// Ruta para el endpoint cacheado
router.get("/", cacheMiddleware, (req, res) => {
  res.json(cachedData);
});

module.exports = router;
