const express = require('express');

const router = express.Router();

const reporteController = require('../controllers/reporte.controller');

const isAuth = require('../util/privilegios/is-auth');

router.get('/', isAuth, reporteController.getReportes);

module.exports = router;