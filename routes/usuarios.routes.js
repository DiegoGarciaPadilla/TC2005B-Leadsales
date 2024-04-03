const express = require('express');

const router = express.Router();

const usuariosController = require('../controllers/usuario.controller');

router.get('/login', usuariosController.getLogin);
router.post('/login', usuariosController.postLogin);

module.exports = router;