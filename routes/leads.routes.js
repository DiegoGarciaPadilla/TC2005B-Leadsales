// Importamos el router de express y creamos un router

const express = require("express");

const router = express.Router();

// Importamos el middleware isAuth (para verificar si el usuario está autenticado)

const { isAuth } = require("../util/privilegios/is-auth");

// Importamos el controlador de leads

const {
    getLeadDetails,
    getLeadsByUser,
    postCrearLead,
    postEliminarLead,
    postDescargarLeads,
    getEditarLead,
    postEditarLead
} = require("../controllers/leads.controller");

// Importamos el middleware de privilegios

const { 
    consultaDirectorio, 
    creaLead , 
    eliminaLead, 
    exportaLead,
    modificaLead
} = require("../util/privilegios/privilegios");

// Rutas

router.get("/:leadId", getLeadDetails);

router.get("/", isAuth, consultaDirectorio, getLeadsByUser);

router.post("/crearLead", isAuth, creaLead, postCrearLead);

router.post("/eliminarLeads", isAuth, eliminaLead, postEliminarLead);

router.post("/descargarLeads", isAuth, exportaLead, postDescargarLeads);

router.get("/editarLead/:leadId", isAuth, modificaLead, getEditarLead);

router.post("/editarLead/:leadId", isAuth, modificaLead, postEditarLead);

// Exportamos el router

module.exports = router;
