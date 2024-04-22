const Usuario = require("../model/usuario.model");

const Rol = require("../model/rol.model");

const bcrypt = require('bcryptjs');

// const bcrypt = require('bcryptjs');

/* ======== CU. 01 AUTENTICA USUARIO | Andrea - Diego García  ============= */
exports.getLogin = (req, res) => {
    const err = req.session.error || "";
    req.session.error = "";
    res.render("login", {
        correo: req.session.correo || "",
        registro: false,
        csrfToken: req.csrfToken(),
        error: err,
        privilegios: req.session.privilegios || [],
    });
};

exports.postLogin = (req, res) => {
    // Imprimir en consola el cuerpo de la solicitud
    console.log(req.body);

    // Obtener el usuario del body
    const { email, password } = req.body;

    Usuario.fetchOne(email)
        .then(([usuarios]) => {
            // Si el usuario existe
            if (usuarios.length === 1) {
                // Obtener el usuario
                const usuario = usuarios[0];
                console.log(usuario);

                // Comparar la contraseña
                bcrypt.compare(password, usuario.Password)
                    .then((doMatch) => {
                        if (doMatch) {
                            // Registrar sesión
                            Usuario.login(usuario.IDUsuario)
                                .then(() => {
                                    // Guardar los privilegios en la sesion
                                    Usuario.getPrivilegios(usuario.Correo)
                                        .then(([privilegios]) => {
                                            Usuario.fetchRol(usuario.IDUsuario)
                                                .then(([rolFetched]) => {
                                                    const rol = rolFetched[0].IDRol;
                                                    console.log(privilegios);
                                                    req.session.Privilegios =
                                                        privilegios;
                                                    req.session.Correo = usuario.Correo;
                                                    req.session.Nombre = usuario.Nombre;
                                                    req.session.ApellidoPaterno = usuario.ApellidoPaterno;
                                                    req.session.ApellidoMaterno = usuario.ApellidoMaterno;
                                                    req.session.IDUsuario =
                                                        usuario.IDUsuario;
                                                    req.session.Rol = rol;
                                                    req.session.isLoggedIn = true;
                                                    console.log(req.session);
                                                    res.redirect("/");
                                                })
                                                .catch((error) => {
                                                    console.log(error);
                                                });
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        });
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        console.log("Contraseña incorrecta");
                    });
            } else {
                req.session.error = "Correo o contraseña incorrectos";
                res.redirect("/usuarios/login");
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

/* ========================== FIN CU. 01 ==============================  */

/* ========== CU. 28 CONSULTA USUARIOS | Andrea Medina  =============== */
exports.getUsuarios = (req, res) => {
    const err = req.session.error || "";
    req.session.error = "";

    const msg = req.flash("success") || "";

    Usuario.fetchAllUsers()
        .then(([usuariosFetched]) => {
            Usuario.fetchRoles()
                .then(([rolesFetched]) => {
                    res.render("usuarios", {
                        usuarios: usuariosFetched,
                        roles: rolesFetched,
                        error: err,
                        csrfToken: req.csrfToken(),
                        msg: msg,
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });
};

/* ========================== FIN CU. 28 ==============================  */

/* ====== CU. 11 REGISTRA USUARIO | Andrea Medina - Sebastián Colín  ======= */
exports.getRegistrarUsuario = (req, res) => {
    Rol.fetchAll()
        .then(([rolesFetched, fieldData]) => {
            res.render("registrarUsuario", {
                 csrfToken: req.csrfToken(),
                roles: rolesFetched,
             });
        })
        .catch((error) => {
            console.log(error);
        });
};

exports.postRegistrarUsuario = (req, res) => {
    const nuevoUsuario = new Usuario(
        req.body.nombre,
        req.body.apellidoPaterno,
        req.body.apellidoMaterno,
        req.body.correo,
        req.body.password,
        req.body.telefono,
        req.body.domicilio
    );

    console.log(req.body);
    console.log(nuevoUsuario);

    Usuario.fetchAllUsers()
        .then(([usuariosFetched, fieldData]) => {
            for (let i = 0; i < usuariosFetched.length; i++) {
                if (usuariosFetched[i].Correo === nuevoUsuario.Correo) {
                    if (usuariosFetched[i].FechaHoraEliminado === null) {
                        console.log("El correo ya está registrado");
                        req.session.error = "El correo ya está registrado";
                        res.redirect("/usuarios/agregarUsuario");
                    }
                }
            }
            nuevoUsuario.save(req.body.rol)
                .then(() => {
                    req.flash("success", "El usuario se ha registrado exitosamente.");
                    res.redirect("/ajustes/usuarios");
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch();
};

/* ========================== FIN CU. 11 ==============================  */

/* ====== CU. 12 ELIMINA USUARIO | Andrea Medina - Diego Lira  ======= */
exports.postEliminarUsuario = (req, res) => {

    const { IDUsuario } = req.body;
    console.log("IDUsuario controller: ",   IDUsuario);

    Usuario.eliminar(IDUsuario)
        .then(() => {
            res.status(200).json({ success: true });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: "Error al eliminar el usuario" });
        });
}

/* ========================== FIN CU. 12 ==============================  */

/* ========== CU. 29 CERRAR SESIÓN | Andrea Medina  =============== */
exports.getLogout = (req, res) => {
    console.log(req.session);
    Usuario.logout(req.session.IDUsuario)
        .then(() => {
            req.session.destroy(() => {
                res.redirect("/usuarios/login");
            });
        })
        .catch((error) => {
            console.log(error);
        });
};

/* ========================== FIN CU. 29 ==============================  */

module.exports = exports;
