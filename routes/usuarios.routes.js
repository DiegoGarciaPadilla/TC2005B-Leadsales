// Importamos express y creamos un router

const express = require("express");

const router = express.Router();

// Importamos el controlador de usuarios

const {
    getLogin,
    postLogin,
    getLogout,
} = require("../controllers/usuario.controller");

// Rutas

router.get("/login", getLogin);

router.post("/login", postLogin);

router.get("/logout", getLogout);

// Exportamos el router

module.exports = router;
