// Importamos express y creamos un router

const express = require("express");

const router = express.Router();

// Importamos el controlador de CSV

const { post_CSV } = require("../controllers/CSV.controller");

const {
    getReporte,
    getReporteJSON,
    postPDF,
} = require("../controllers/graph.controller");

// Importamos el middleware isAuth (para verificar si el usuario está autenticado)
const reporteController = require("../controllers/reporte.controller");

const Usuario = require("../model/usuario.model");

const Lead = require("../model/leads.model");

const { isAuth } = require("../util/privilegios/is-auth");

const { generaReporte } = require("../util/privilegios/privilegios");

// Rutas

router.get("/FAQ", isAuth, (req, res) => {
    res.render("FAQ");
});

router.get("/reporte/json", isAuth, getReporteJSON, generaReporte);

router.get("/reporte", isAuth, getReporte, generaReporte);

router.post("/reporte/save", isAuth, postPDF, generaReporte);

router.post("/", isAuth, post_CSV); // ANTES de router,use("/")

router.get("/", isAuth, (req, res) => {
    const success = req.flash("success") || "4";
    console.log("success", success, "type", typeof success);
    const error = req.flash("falla") || "4";
    console.log(req.flash("error"));

    // Obtiene datos de la sesion
    const {
        Nombre,
        ApellidoPaterno,
        ApellidoMaterno,
        Correo,
        Privilegios,
        Rol,
    } = req.session;

    Usuario.fetchAllUsers()
        .then(([usuariosFetched]) => {
            Lead.fetchEmbudos()
                .then(([embudosFetched, fieldData]) => {
                    res.render("inicio", {
                        embudos: embudosFetched,
                        csrfToken: req.csrfToken(),
                        privilegios: Privilegios,
                        correo: Correo,
                        rol: Rol,
                        nombre: Nombre,
                        apellidoPaterno: ApellidoPaterno,
                        apellidoMaterno: ApellidoMaterno,
                        usuarios: usuariosFetched,
                        success: "",
                        error: error,
                    });
                })
                .catch();
        })
        .catch((error) => {
            console.log(error);
        });
});

// Exportamos el router
module.exports = router;
