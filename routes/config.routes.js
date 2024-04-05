const express = require('express');

const router = express.Router();

const rolController = require('../controllers/rol.controller');

router.get('/modificaRol', rolController.getModificaRol);
router.post('/modificaRol', rolController.postModificaRol);

module.exports = router;