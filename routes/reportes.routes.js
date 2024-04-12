const express = require('express');

const router = express.Router();

const isAuth = require('../util/privilegios/is-auth');
const reporteController = require('../controllers/reporte.controller');
const privilegio24 = require('../util/privilegios/privilegioCU24');

router.get('/', isAuth, privilegio24.consulta_historial, reporteController.getReportes);

module.exports = router;