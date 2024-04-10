const express = require('express');

const router = express.Router();

const isAuth = require('../util/privilegios/is-auth');

const leadsController = require('../controllers/leads.controller');

router.get('/', isAuth, leadsController.getLeads);

module.exports = router;