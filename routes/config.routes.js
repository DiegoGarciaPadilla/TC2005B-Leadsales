const express = require('express');

const router = express.Router();

const isAuth = require('../util/privilegios/is-auth');

const rolController = require('../controllers/rol.controller');
const privilegios = require('../util/privilegios/privilegios');

router.get('/roles', isAuth, privilegios.ver_roles, rolController.getRoles);
router.get('/roles/editarRol/:IDRol', isAuth, privilegios.modifica_rol, rolController.getEditarRol);
router.post('/roles/editarRol/:IDRol', isAuth, privilegios.modifica_rol, rolController.postEditarRol);

module.exports = router;