const express = require('express');

const router = express.Router();

const rolController = require('../controllers/rol.controller');
const privilegios = require('../util/privilegios/privilegios');

router.get('/roles', privilegios.ver_roles, rolController.getRoles);
router.get('/roles/editarRol/:IDRol', privilegios.modifica_rol, rolController.getEditarRol);
router.post('/roles/editarRol/:IDRol', privilegios.modifica_rol, rolController.postEditarRol);

module.exports = router;