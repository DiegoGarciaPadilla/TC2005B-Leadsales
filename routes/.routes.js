// Importamos express y creamos un router

const express = require("express");

const router = express.Router();

// Importamos el controlador de CSV

const { post_CSV } = require("../controllers/CSV.controller");

// Importamos el middleware isAuth (para verificar si el usuario está autenticado)
const reporteController = require('../controllers/reporte.controller');

const { isAuth } = require("../util/privilegios/is-auth");

// Rutas

router.get("/FAQ", isAuth, (req, res) => {
    res.render("FAQ");
});

router.post('/reporte', isAuth, reporteController.postReporte);

router.get('/reporte', isAuth, (request, response) => {
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

router.get("/", isAuth, (req, res) => {
    res.render("inicio", {
        csrfToken: req.csrfToken(),
        privilegios: req.session.Privilegios,
        correo: req.session.Correo,
        rol: req.session.Rol,
        nombre: req.session.Nombre,
        apellidoPaterno: req.session.ApellidoPaterno,
        apellidoMaterno: req.session.apellidoMaterno,
    });
});

// Exportamos el router

module.exports = router;
