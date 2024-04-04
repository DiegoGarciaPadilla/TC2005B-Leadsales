const Usuario = require('../model/usuario.model');

const bcrypt = require('bcryptjs');

/* ======== CU. 01 AUTENTICA USUARIO | Andrea - Diego García  ============= */
exports.getLogin = (request, response, next) => {
    const err = request.session.error || '';
    request.session.error = '';
    response.render('login', {
        correo: request.session.correo || '',
        registro: false,
        error: err,
        privilegios: request.session.privilegios || [],
    });
};

exports.postLogin = (request, response, next) => {
    console.log(request.body);
    Usuario.fetchOne(request.body.email)
        .then(([usuarios, fieldData]) => {
            if (usuarios.length === 1) {
                const usuario = usuarios[0];
               console.log(usuario);
               if (usuarios.length === 1) {
                const usuario = usuarios[0];
                console.log(usuario);
                if (request.body.password === usuario.Password) {
                    Usuario.getPrivilegios(usuario.correo)
                        .then(([privilegios, fieldData]) => {
                            console.log(privilegios);
                            request.session.privilegios = privilegios;
                            request.session.correo = usuario.correo;
                            response.redirect('/');
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else {
                    console.log("error")
                }
            } else {
                console.log("error")
            }
            } else {
                request.session.error = 'Correo o contraseña incorrectos';
                response.redirect('/users/login');
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

/* ========================== FIN CU. 01 ==============================  */

/* ========== CU. 28 CONSULTA USUARIOS | Andrea Medina  =============== */


/* ========================== FIN CU. 28 ==============================  */