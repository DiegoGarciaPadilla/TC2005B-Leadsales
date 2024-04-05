const express = require('express');

const router = express.Router();

const rolController = require('../controllers/rol.controller');

router.get('/roles', rolController.getRoles);

module.exports = router;