// Importamos express y creamos un router

const express = require("express");

const router = express.Router();

// Importamos el controlador de CSV

const { post_CSV } = require("../controllers/CSV.controller");
const graphController = require("../controllers/graph.controller");

// Importamos el middleware isAuth (para verificar si el usuario está autenticado)
const reporteController = require('../controllers/reporte.controller');

const Usuario = require("../model/usuario.model");

const { isAuth } = require("../util/privilegios/is-auth");

// Rutas

router.get("/FAQ", isAuth, (req, res) => {
    res.render("FAQ");
});

router.get('/reporte/:idGraph', isAuth, graphController.getReporte);

router.get('/reporte', isAuth, (req, response) => {
    response.render('reporte'), {
        csrfToken: req.csrfToken(),
        privilegios: req.session.Privilegios,
        correo: req.session.Correo,
        rol: req.session.Rol,
        nombre: req.session.Nombre,
        apellidoPaterno: req.session.ApellidoPaterno,
        apellidoMaterno: req.session.apellidoMaterno,
    }
});

router.post("/", isAuth, post_CSV); // ANTES de router,use("/")

router.get("/", isAuth,  (req, res) => {
    Usuario.fetchAllUsers()
        .then(([usuariosFetched]) => {
    res.render("inicio", {
        csrfToken: req.csrfToken(),
        privilegios: req.session.Privilegios,
        correo: req.session.Correo,
        rol: req.session.Rol,
        nombre: req.session.Nombre,
        apellidoPaterno: req.session.ApellidoPaterno,
        apellidoMaterno: req.session.apellidoMaterno,
        usuarios: usuariosFetched,
        msg: null,
    });
        
    }).catch((error) => {
        console.log(error);
    });
});

// Exportamos el router
module.exports = router;
