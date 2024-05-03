// Importamos el router de express y creamos un router

const express = require("express");

const router = express.Router();

// Importamos el middleware isAuth (para verificar si el usuario está autenticado)

const { isAuth } = require("../util/privilegios/is-auth");

// Importamos el controlador de leads

const {
    getLeadDetails,
    getLeads,
    getLeadsJSON,
    postCrearLead,
    postEliminarLead,
    postDescargarLeads,
    getEditarLead,
    postEditarLead,
    getBusquedaLead,
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


router.get("/json", isAuth, consultaDirectorio, getLeadsJSON);

router.post("/crearLead", isAuth, creaLead, postCrearLead);

router.post("/eliminarLeads", isAuth, eliminaLead, postEliminarLead);

router.post("/descargarLeads", isAuth, exportaLead, postDescargarLeads);

router.get("/editarLead/:leadId", isAuth, modificaLead, getEditarLead);

router.post("/editarLead/:leadId", isAuth, modificaLead, postEditarLead);

router.get("/:leadId", isAuth, getLeadDetails);

router.get("/busqueda/:valorBusqueda", isAuth, consultaDirectorio, getBusquedaLead);

router.get("/", isAuth, consultaDirectorio, getLeads);

// Exportamos el router

module.exports = router;
