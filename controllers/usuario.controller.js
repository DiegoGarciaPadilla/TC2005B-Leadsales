const Usuario = require('../model/usuario.model');

const bcrypt = require('bcryptjs');

/* ======== CU. 01 AUTENTICA USUARIO | Andrea - Diego García  ============= */
exports.getLogin = (request, response, next) => {
    const err = request.session.error || '';
    request.session.error = '';
    response.render('login', {
        correo: request.session.correo || '',
        registro: false,
        csrfToken: request.csrfToken(),
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

                    // Registrar sesión
                    Usuario.login(usuario.IDUsuario)
                        .then(() => {
                            // Guardar los privilegios en la sesion
                            Usuario.getPrivilegios(usuario.Correo)
                                .then(([privilegios, fieldData]) => {
                                    console.log(privilegios);
                                    request.session.Privilegios = privilegios;
                                    request.session.Correo = usuario.Correo;
                                    request.session.IDUsuario = usuario.IDUsuario;
                                    request.session.isLoggedIn = true;
                                    response.redirect('/');
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        })
                        .catch((error) => {
                            console.log(error);
                        } );
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
exports.getUsuarios = (request, response, next) => {
    const err = request.session.error || '';
    request.session.error = '';
    
    Usuario.fetchAllUsers()
        .then(([usuariosFetched, fieldData]) => {
            Usuario.fetchRoles()
                .then(([rolesFetched, fieldData]) => {
                    response.render('usuarios', {
                        usuarios: usuariosFetched,
                        roles: rolesFetched,
                        error: err,
                        csrfToken: request.csrfToken(),
                    })
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });
}

/* ========================== FIN CU. 28 ==============================  */

/* ========== CU. 29 CERRAR SESIÓN | Andrea Medina  =============== */
exports.getLogout = (request, response, next) => {
    console.log(request.session)
    Usuario.logout(request.session.IDUsuario)
    .then(() => {
        request.session.destroy(() => {
            response.redirect('/users/login');
        });
    })
    .catch((error) => {
        console.log(error);
    });
};

/* ========================== FIN CU. 29 ==============================  */