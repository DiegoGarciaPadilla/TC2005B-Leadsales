const express = require('express');

const router = express.Router();

const leadsController = require('../controllers/leads.controller');

router.get('/', leadsController.getLeads);

module.exports = router;