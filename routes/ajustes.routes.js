const express = require('express');

const router = express.Router();

const isAuth = require('../util/privilegios/is-auth');

const rolController = require('../controllers/rol.controller');
const usuarioController = require('../controllers/usuario.controller');
const privilegio14 = require('../util/privilegios/privilegioCU14');
const privilegio15 = require('../util/privilegios/privilegioCU15');

router.get('/roles', isAuth, privilegio14.ver_roles, rolController.getRoles);
router.get('/roles/editarRol/:IDRol', isAuth, privilegio15.modifica_rol, rolController.getEditarRol);
router.post('/roles/editarRol/:IDRol', isAuth, privilegio15.modifica_rol, rolController.postEditarRol);

router.get('/usuarios', isAuth, usuarioController.getUsuarios);

module.exports = router;