// Importamos express y creamos un router

const express = require("express");

const router = express.Router();

// Importamos el middleware isAuth (para verificar si el usuario está autenticado)

const { isAuth } = require("../util/privilegios/is-auth");

// Importamos modelo de usuario

const Usuario = require("../model/usuario.model");

// Importamos el controlador de rol

const {
    getRoles,
    getCrearRol,
    postCrearRol,
    getEditarRol,
    postEditarRol,
    postEliminarRol,
} = require("../controllers/rol.controller");

// Importamos el controlador de usuario

const {
    getUsuarios,
    getRegistrarUsuario,
    postRegistrarUsuario,
    postEliminarUsuario,
} = require("../controllers/usuario.controller");

const {
    consultaRol,
    modificaRol,
    eliminaRol,
    consultaUsuarios,
    registraCuenta,
    eliminaUsuario,
} = require("../util/privilegios/privilegios");

const {
    getCambiarContrasenia,
    postCambiarContrasenia,
} = require("../controllers/usuario.controller");

// Rutas

router.get("/roles", isAuth, consultaRol, getRoles);

router.get("/roles/crearRol", isAuth, getCrearRol);

router.post("/roles/crearRol", isAuth, postCrearRol);

router.get("/roles/editarRol/:IDRol", isAuth, modificaRol, getEditarRol);

router.post("/roles/editarRol/:IDRol", isAuth, modificaRol, postEditarRol);

router.post("/roles/eliminarRol", isAuth, eliminaRol, postEliminarRol);

router.get("/usuarios", isAuth, consultaUsuarios, getUsuarios);

router.get(
    "/usuarios/agregarUsuario",
    isAuth,
    registraCuenta,
    getRegistrarUsuario
);

router.post(
    "/usuarios/agregarUsuario",
    isAuth,
    registraCuenta,
    postRegistrarUsuario
);

router.post("/usuarios/eliminar", isAuth, eliminaUsuario, postEliminarUsuario);

router.get("/cambiarContrasenia", isAuth, getCambiarContrasenia);

router.post("/cambiarContrasenia", isAuth, postCambiarContrasenia);4

router.get('/', isAuth, (req, res) => {
    Usuario.fetchAllUsers()
        .then(([usuariosFetched]) => {
    res.render("ajustes", {
        csrfToken: req.csrfToken(),
        privilegios: req.session.Privilegios,
        correo: req.session.Correo,
        rol: req.session.Rol,
        nombre: req.session.Nombre,
        apellidoPaterno: req.session.ApellidoPaterno,
        apellidoMaterno: req.session.apellidoMaterno,
        usuarios: usuariosFetched,
        success: "",
        error: "",
    });
        
    }).catch((error) => {
        console.log(error);
    });

});

// Exportamos el router

module.exports = router;
