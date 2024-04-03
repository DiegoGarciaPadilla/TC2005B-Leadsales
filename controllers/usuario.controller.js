const Usuario = require('../model/usuario.model');

const bcrypt = require('bcryptjs');

/* ======== CU. 01 AUTENTICA USUARIO | Andrea - Diego García  ============= */
exports.getLogin = (request, response, next) => {
    const err = request.session.error || '';
    request.session.error = '';
    response.render('login', {
        correo: request.session.correo,
        registro: false,
        error: err,
        privilegios: request.session.privilegios || [],
    });
};

exports.postLogin = (request, response, next) => {
    Usuario.fetchOne(request.body.correo)
        .then(([usuarios, fieldData]) => {
            if (usuarios.length === 1) {
                const usuario = usuarios[0];
               
                bcrypt.compare(request.body.password, usuario.password)
                    .then((doMatch) => {
                        if (doMatch) {
                            Usuario.getPrivilegios(usuario.correo)
                                .then(([privilegios, fieldData]) => {
                                    console.log(privilegios);
                                    request.session.privilegios = privilegios;
                                    request.session.correo = usuario.correo;
                                    response.redirect('/inicio');
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        } else {
                            request.session.error = 'Correo o contraseña incorrectos';
                            response.redirect('/users/login')
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
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