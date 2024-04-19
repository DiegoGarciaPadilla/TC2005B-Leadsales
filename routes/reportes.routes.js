// Importamos el router de express y creamos un router

const express = require("express");

const router = express.Router();

// Importamos el middleware isAuth (para verificar si el usuario está autenticado)

const { isAuth } = require("../util/privilegios/is-auth");

// Importamos el controlador de reporte

const { getReportes } = require("../controllers/reporte.controller");

// Importamos el middleware de privilegios

const { consultaHistorial } = require("../util/privilegios/privilegios");

// Rutas

router.get("/", isAuth, consultaHistorial, getReportes);

// Exportamos el router

module.exports = router;
