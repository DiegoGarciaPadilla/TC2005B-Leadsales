// Importamos el router de express y creamos un router

const express = require("express");

const router = express.Router();

// Importamos el middleware isAuth (para verificar si el usuario está autenticado)

const { isAuth } = require("../util/privilegios/is-auth");

// Importamos el controlador de leads

const {
    getLeadDetails,
    getLeads,
    postCrearLead,
    postEliminarLead,
    postDescargarLeads
} = require("../controllers/leads.controller");

// Importamos el middleware de privilegios

const { consultaDirectorio, creaLead , eliminaLead, exportaLead } = require("../util/privilegios/privilegios");

// Rutas

router.get("/:leadId", getLeadDetails);

router.get("/", isAuth, consultaDirectorio, getLeads);

router.post("/crearLead", isAuth, creaLead, postCrearLead);

router.post("/eliminarLeads", isAuth, eliminaLead, postEliminarLead);

router.post("/descargarLeads", isAuth, exportaLead, postDescargarLeads);

// Exportamos el router

module.exports = router;
