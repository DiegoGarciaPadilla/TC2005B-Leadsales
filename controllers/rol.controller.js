const Rol = require("../model/rol.model");
const Privilegio = require("../model/privilegios.model");

/* ========== CU. 13 CREAR ROL | Diego García ==================== */

exports.getCrearRol = (req, res) => {
    // Obtiene el error de la sesion si existe y lo elimina
    const err = req.session.error || "";
    req.session.error = "";

    // Obtiene todos los privilegios de la base de datos
    Privilegio.fetchAll()
        .then(([privilegiosFetched]) => {
            res.render("crearRol", {
                privilegios: privilegiosFetched,
                error: err,
                csrfToken: req.csrfToken(),
                success: "",
                error: "",
                rol: req.session.Rol,
                correo: req.session.Correo,
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

exports.postCrearRol = async (req, res) => {
    // Obtiene los datos del formulario
    const { Nombre, DescripcionRol, Privilegios } = req.body;

    // Parsear los privilegios a un array
    const PrivilegiosArray = Array.isArray(Privilegios)
        ? Privilegios
        : [Privilegios];

    console.log("Nombre: ", Nombre);
    console.log("Descripcion: ", DescripcionRol);
    console.log("Privilegios seleccionados: ", PrivilegiosArray);

    // Crea el rol (se usa async/await para esperar a que se cree el rol antes de asignarle los privilegios)
    await Rol.createRol(Nombre, DescripcionRol);

    // Obtiene el id del rol creado
    Rol.fetchRolByNombre(Nombre)
        .then(([rolFetched]) => {
            const { IDRol } = rolFetched[0];

            // Asigna los privilegios al rol
            Rol.updatePrivilegiosRolById(IDRol, PrivilegiosArray)
                .then(() => {
                    res.redirect("/ajustes/roles");
                })
                .catch((error) => {
                    console.log(error);
                });
        })
        .catch((error) => {
            console.log(error);
        });

};


/* ========== CU. 14 CONSULTA ROLES | Diego García =============== */

exports.getRoles = (req, res) => {
    // Obtiene el error de la sesion si existe y lo elimina
    const err = req.session.error || "";
    req.session.error = "";

    // Obtiene los privilegios de la sesion
    const { Privilegios } = req.session;

    // Obtiene todos los roles de la base de datos
    Rol.fetchAll()
        .then(([rolesFetched]) => {
            res.render("roles", {
                roles: rolesFetched,
                error: err,
                csrfToken: req.csrfToken(),
                privilegios: Privilegios,
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

/* ========================== FIN CU. 14 ==============================  */

/* ========== CU. 15 MODIFICA ROLES | Diego García =============== */

exports.getEditarRol = (req, res) => {
    // Obtiene el error de la sesion si existe y lo elimina
    const err = req.session.error || "";
    req.session.error = "";

    // Obtiene el id del rol
    const { IDRol } = req.params;

    // Si el rol es el Owner, no se puede editar
    if (IDRol === "1") {
        res.status(404).render("404");
    }

    // Obtiene el rol de la base de datos
    Rol.fetchRolById(IDRol)
        .then(([rolFetched]) => {
            // Obtiene todos los privilegios de la base de datos
            Privilegio.fetchAll()
                .then(([privilegiosFetched]) => {
                    // Obtiene los privilegios del rol
                    Privilegio.fetchPrivilegiosByIDRol(IDRol)
                        .then(([privilegiosRolFetched]) => {
                            console.log(privilegiosRolFetched);
                            console.log("Rol: ", rolFetched[0]);
                            res.render("editarRol", {
                                rol: rolFetched[0],
                                privilegios: privilegiosFetched,
                                privilegiosRol: privilegiosRolFetched,
                                success: "",
                                error: err,
                                csrfToken: req.csrfToken(),
                                correo: req.session.Correo,
                                rol: req.session.Rol,
                                nombre: req.session.Nombre,
                                apellidoPaterno: req.session.ApellidoPaterno,
                                apellidoMaterno: req.session.apellidoMaterno,
                                mostrarBoton: null,
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

exports.postEditarRol = async (req, res) => {
    try {
        // Obtiene el id del rol
        const { IDRol } = req.params;

        // Si el rol es el Owner, no se puede editar
        if (IDRol === "1") {
            res.status(404).render("404");
        }

        // Obtiene los datos del formulario
        const { Nombre, DescripcionRol, Privilegios } = req.body;

        // Parsear los privilegios a un array
        const PrivilegiosArray = Array.isArray(Privilegios)
            ? Privilegios
            : [Privilegios];

        // Elimina los privilegios del rol
        await Rol.deletePrivilegiosRolById(IDRol);

        // Actualiza los datos del rol
        await Rol.updateRolById(IDRol, Nombre, DescripcionRol);

        // Actualiza los privilegios del rol
        await Rol.updatePrivilegiosRolById(IDRol, PrivilegiosArray);

        res.redirect("/ajustes/roles");
    } catch (error) {
        console.log(error);
    }
};

/* ========================== FIN CU. 15 ==============================  */

/* ========== CU. 16 ELIMINA ROLES | Gabriela Chimali =============== */

exports.postEliminarRol = async (req, res) => {
    try {
        const { IDRol } = req.body;
        console.log("IDRol a eliminar: ", IDRol);
        await Rol.deleteRolById(IDRol);
        res.status(200).json({ success: true });
    } catch(error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar el rol" });
    }
};

/* ========================== FIN CU. 16 ==============================  */

module.exports = exports;
