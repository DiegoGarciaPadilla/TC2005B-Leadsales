const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

const CSVController = require('../controllers/CSV.controller');
const reporteController = require('../controllers/reporte.controller');

const isAuth = require('../util/privilegios/is-auth');

// Rutas

router.get("/FAQ", isAuth, (req, res) => {
    res.render("FAQ");
});

router.post('/reporte', isAuth, reporteController.postReporte);

router.post("/", isAuth, CSVController.post_CSV);   // ANTES de router,use("/")

router.get("/", isAuth, (req, res) => {
    res.render("inicio", {
        csrfToken: req.csrfToken(),
        privilegios: req.session.Privilegios,
        correo: req.session.Correo,
        rol: req.session.Rol,
    });
});

module.exports = router;
