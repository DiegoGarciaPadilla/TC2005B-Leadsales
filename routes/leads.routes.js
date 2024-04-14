const express = require('express');
const router = express.Router();
const isAuth = require('../util/privilegios/is-auth');
const privilegioCU10 = require('../util/privilegios/privilegioCU10');
const leadsController = require('../controllers/leads.controller');

router.get('/:leadId', leadsController.getLeadDetails);

router.get('/', isAuth, privilegioCU10.consulta_directorio, leadsController.getLeads);

router.post('/crearLead', isAuth, leadsController.postCrearLead);

module.exports = router;    
