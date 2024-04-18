// Importamos express y creamos un router

const express = require("express");

const router = express.Router();

// Importamos el middleware isAuth (para verificar si el usuario está autenticado)

const { isAuth } = require("../util/privilegios/is-auth");

// Importamos el controlador de reporte

const { getReporte, postReporte } = require('../controllers/reporte.controller');

// Rutas

router.get('/', isAuth, getReporte);

router.post('/', isAuth, postReporte);

// Exportamos el router

module.exports = router;