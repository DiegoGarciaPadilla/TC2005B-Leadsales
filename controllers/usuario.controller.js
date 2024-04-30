const bcrypt = require("bcryptjs");

const Usuario = require("../model/usuario.model");

const Rol = require("../model/rol.model");

// const bcrypt = require('bcryptjs');

/* ======== CU. 01 AUTENTICA USUARIO | Andrea - Diego García  ============= */
exports.getLogin = (req, res) => {
    const err = req.session.error || "";
    req.session.error = "";
    const error = req.flash("error") || "";
    
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
                bcrypt
                    .compare(password, usuario.Password)
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
                                                    const rol =
                                                        rolFetched[0].IDRol;
                                                    console.log(privilegios);
                                                    req.session.Privilegios =
                                                        privilegios;
                                                    req.session.Correo =
                                                        usuario.Correo;
                                                    req.session.Nombre =
                                                        usuario.Nombre;
                                                    req.session.ApellidoPaterno =
                                                        usuario.ApellidoPaterno;
                                                    req.session.ApellidoMaterno =
                                                        usuario.ApellidoMaterno;
                                                    req.session.IDUsuario =
                                                        usuario.IDUsuario;
                                                    req.session.Rol = rol;
                                                    req.session.isLoggedIn = true;
                                                    req.session.NombreCompleto = 
                                                        usuario.Nombre + " " + usuario.ApellidoPaterno;
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
                        } else {
                            req.session.error = "Correo o contraseña incorrectos";
                            req.flash("falla", "Correo o contraseña incorrectos");
                            res.redirect("/usuarios/login");
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        req.flash("falla", "Error de conexión. Intenta más tarde.");
                        res.redirect("/usuarios/login");
                    });
            } else {
                req.session.error = "Correo o contraseña incorrectos";
                req.flash("falla", "Correo o contraseña incorrectos");
                res.redirect("/usuarios/login");
            }
        })
        .catch((error) => {
            console.log(error);
            req.flash("falla", "Error de conexión. Intenta más tarde.");
            res.redirect("/usuarios/login");
        });
};

/* ========================== FIN CU. 01 ==============================  */

/* ========== CU. 28 CONSULTA USUARIOS | Andrea Medina  =============== */

exports.getUsuarios = (req, res) => {
    const err = req.session.error || "";
    req.session.error = "";

    const {Privilegios} = req.session;

    const msg = req.flash("success") || "";

    Usuario.fetchAllUsers()
        .then(([usuariosFetched]) => {
            Usuario.fetchRoles()
                .then(([rolesFetched]) => {
                    Rol.fetchAll()
                        .then(([rolesFetchedAll]) => {
                            console.log("Roles todos:", rolesFetchedAll);
                            res.render("usuarios", {
                                usuarios: usuariosFetched,
                                roles: rolesFetched,
                                rolesTodos: rolesFetchedAll,
                                error: "",
                                csrfToken: req.csrfToken(),
                                success: msg,
                                Privilegios: Privilegios,
                                correo: req.session.Correo,
                                rol: req.session.Rol,
                                nombre: req.session.Nombre,
                                apellidoPaterno: req.session.ApellidoPaterno,
                                apellidoMaterno: req.session.apellidoMaterno,
                                mostrarBoton: null,
                            });
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
};

/* ========================== FIN CU. 28 ==============================  */

/* ====== CU. 11 REGISTRA USUARIO | Andrea Medina - Sebastián Colín  ======= */

exports.getRegistrarUsuario = (req, res) => {
    const { privilegios } = req.session;
    Rol.fetchAll()
        .then(([rolesFetched]) => {
            res.render("registrarUsuario", {
                csrfToken: req.csrfToken(),
                roles: rolesFetched,
                privilegios: privilegios,
                correo: req.session.Correo,
                rol: req.session.Rol,
                nombre: req.session.Nombre,
                apellidoPaterno: req.session.ApellidoPaterno,
                apellidoMaterno: req.session.apellidoMaterno,
                mostrarBoton: null,
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
        .then(([usuariosFetched]) => {
            for (let i = 0; i < usuariosFetched.length; i += 1) {
                if (usuariosFetched[i].Correo === nuevoUsuario.Correo) {
                    if (usuariosFetched[i].FechaHoraEliminado === null) {
                        console.log("El correo ya está registrado");
                        req.session.error = "El correo ya está registrado";
                        res.redirect("/usuarios/agregarUsuario");
                    }
                }
            }
            nuevoUsuario
                .save(req.body.rol)
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
    console.log("IDUsuario controller: ", IDUsuario);

    Usuario.eliminar(IDUsuario)
        .then(() => {
            res.status(200).json({ success: "El usuario ha sido eliminado correctamente" });
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: "Error al eliminar el usuario" });
        });
};

/* ========================== FIN CU. 12 ==============================  */

/* ====== CU. 18 ASIGNA ROL A USUARIO | Chimali Nava ======= */

exports.postAsignarRol = (req, res) => {
    const { IDUsuario, idRolSeleccionado } = req.body;
    console.log("Datos controller: ", IDUsuario, idRolSeleccionado);

    Usuario.asignarRol(IDUsuario, idRolSeleccionado)
        .then(([nuevoRol]) => {
            console.log("Rol asignado: ", nuevoRol[0].Nombre);
            res.status(200).json({ success: true, nuevoRol: nuevoRol[0].Nombre});
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: "Error al asignar el rol" });
        });
};

/* ========================== FIN CU. 18 ==============================  */

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

/* ========== CU. 17 CAMBIAR CONTRASEÑA | Diego García  =============== */

exports.getCambiarContrasenia = (req, res) => {
    const err = req.session.error || "";
    req.session.error = "";

    const scs = req.session.success || "";
    req.session.success = "";

    const {Privilegios} = req.session;

    res.render("cambiarContrasenia", {
        correo: req.session.Correo,
        csrfToken: req.csrfToken(),
        error: err,
        success: scs,
        rol: req.session.Rol,
        nombre: req.session.Nombre,
        apellidoPaterno: req.session.ApellidoPaterno,
        apellidoMaterno: req.session.apellidoMaterno,
        privilegios: Privilegios,
        mostrarBoton: null,
    });
};

exports.postCambiarContrasenia = (req, res) => {
    // Obtener correo del usuario
    const { Correo } = req.session;

    // Obtener los datos del formulario
    const { ContraseniaActual, NuevaContrasenia, ConfirmarNuevaContrasenia } =
        req.body;

    // Verifica que la nueva contraseña sea válidq
    if (
        NuevaContrasenia.length < 8 ||
        !/[a-z]/.test(NuevaContrasenia) ||
        !/[A-Z]/.test(NuevaContrasenia) ||
        !/[0-9]/.test(NuevaContrasenia) ||
        !/[^a-zA-Z0-9]/.test(NuevaContrasenia)
    ) {
        res.render("cambiarContrasenia", {
            correo: req.session.Correo,
            csrfToken: req.csrfToken(),
            error: "La contraseña no cumple con los requisitos",
            success: "",
        });
        return;
    }

    // Verificar que la nueva contraseña y la confirmación sean iguales
    if (NuevaContrasenia !== ConfirmarNuevaContrasenia) {
        res.render("cambiarContrasenia", {
            correo: req.session.Correo,
            csrfToken: req.csrfToken(),
            error: "Las contraseñas no coinciden",
            success: "",
        });
        return;
    }

    // Verificar que la contraseña actual sea correcta
    Usuario.fetchOne(Correo).then(([usuariosFetched]) => {
        const usuario = usuariosFetched[0];
        bcrypt
            .compare(ContraseniaActual, usuario.Password)
            .then((doMatch) => {
                if (doMatch) {
                    // Verificar que la nueva contraseña y la anterior no sean iguales
                    bcrypt
                        .compare(NuevaContrasenia, usuario.Password)
                        .then((doMatch2) => {
                            if (doMatch2) {
                                res.render("cambiarContrasenia", {
                                    correo: req.session.Correo,
                                    csrfToken: req.csrfToken(),
                                    error: "La nueva contraseña no puede ser igual a la anterior",
                                    success: "",
                                });
                            } else {
                                // Cambiar la contraseña
                                Usuario.cambiarContrasenia(
                                    Correo,
                                    NuevaContrasenia
                                )
                                    .then(() => {
                                        res.render("cambiarContrasenia", {
                                            correo: req.session.Correo,
                                            csrfToken: req.csrfToken(),
                                            error: "",
                                            success:
                                                "Contraseña cambiada exitosamente",
                                        });
                                    })
                                    .catch((error) => {
                                        console.log(error);
                                    });
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                } else {
                    res.render("cambiarContrasenia", {
                        correo: req.session.Correo,
                        csrfToken: req.csrfToken(),
                        error: "Contraseña actual incorrecta",
                        success: "",
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    });
};

/* ========================== FIN CU. 17 ==============================  */

module.exports = exports;
