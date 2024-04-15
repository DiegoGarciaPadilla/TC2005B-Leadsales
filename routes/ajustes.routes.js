// Importamos express y creamos un router

const express = require("express");

const router = express.Router();

// Importamos el middleware isAuth (para verificar si el usuario está autenticado)

const { isAuth } = require("../util/privilegios/is-auth");

// Importamos el controlador de rol

const {
    getRoles,
    getEditarRol,
    postEditarRol,
} = require("../controllers/rol.controller");

// Importamos el controlador de usuario

const { 
    getUsuarios, 
    getRegistrarUsuario, 
    postRegistrarUsuario
} = require("../controllers/usuario.controller");

const { consultaRol, modificaRol } = require("../util/privilegios/privilegios");

// Rutas

router.get("/roles", isAuth, consultaRol, getRoles);

router.get("/roles/editarRol/:IDRol", isAuth, modificaRol, getEditarRol);

router.post("/roles/editarRol/:IDRol", isAuth, modificaRol, postEditarRol);

router.get("/usuarios", isAuth, getUsuarios);

router.get("/usuarios/agregarUsuario", isAuth, getRegistrarUsuario);

router.post("/usuarios/agregarUsuario", isAuth, postRegistrarUsuario);

// Exportamos el router

module.exports = router;
