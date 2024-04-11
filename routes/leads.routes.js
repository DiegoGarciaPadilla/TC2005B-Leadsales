const express = require('express');
const router = express.Router();
const isAuth = require('../util/privilegios/is-auth');
const leadsController = require('../controllers/leads.controller');

router.get('/:leadId', leadsController.getLeadDetails);

router.get('/', isAuth, leadsController.getLeads);

router.post('/crearLead', isAuth, leadsController.postCrearLead);

module.exports = router;    
