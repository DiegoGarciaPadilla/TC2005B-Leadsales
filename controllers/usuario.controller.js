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
    // Imprimir en consola el cuerpo de la solicitud
    console.log(request.body);

    // Obtener el usuario del body
    const { email, password } = request.body;

    Usuario.fetchOne(email)
        .then(([usuarios, fieldData]) => {

            // Si el usuario existe
            if (usuarios.length === 1) {
                // Obtener el usuario
                const usuario = usuarios[0];
                console.log(usuario);

                // Comparar la contraseña
                if (request.body.password === usuario.Password) {

                    // Guardar los privilegios en la sesion
                    Usuario.getPrivilegios(usuario.Correo)
                        .then(([privilegios, fieldData]) => {
                            console.log(privilegios);
                            request.session.Privilegios = privilegios;
                            request.session.Correo = usuario.Correo;
                            response.redirect('/');
                        })
                        .catch((error) => {
                            console.log(error);
                        });
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