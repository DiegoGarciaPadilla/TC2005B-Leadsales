const Rol = require("../model/rol.model");
const Privilegio = require("../model/privilegios.model");

/* ========== CU. 14 CONSULTA ROLES | Diego García =============== */

exports.getRoles = (req, res) => {
    // Obtiene el error de la sesion si existe y lo elimina
    const err = req.session.error || "";
    req.session.error = "";

    // Obtiene los roles de la base de datos
    Rol.fetchAll()
        .then(([rolesFetched]) => {
            console.log(rolesFetched);
            res.render("roles", {
                roles: rolesFetched,
                error: err,
                csrfToken: req.csrfToken(),
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

    // Obtiene el rol de la base de datos
    Rol.fetchRolById(IDRol)
        .then(([rolFetched]) => {
            // Obtiene todos los privilegios de la base de datos
            Privilegio.fetchAll()
                .then(([privilegiosFetched]) => {
                    // Obtiene los privilegios del rol
                    Privilegio.fetchPrivilegioByIDRol(IDRol)
                        .then(([privilegiosRolFetched]) => {
                            console.log(privilegiosRolFetched);
                            res.render("editarRol", {
                                rol: rolFetched[0],
                                privilegios: privilegiosFetched,
                                privilegiosRol: privilegiosRolFetched,
                                error: err,
                                csrfToken: req.csrfToken(),
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

exports.postEditarRol = (req, res) => {
    // Obtiene el id del rol
    const { IDRol } = req.params;
    console.log(IDRol);

    // Obtiene los datos del formulario
    const { Nombre, DescripcionRol } = req.body;
    console.log(Nombre, DescripcionRol);

    // Actualiza el rol en la base de datos
    Rol.updateRolById(IDRol, Nombre, DescripcionRol)
        .then(() => {
            res.redirect("/ajustes/roles");
        })
        .catch((error) => {
            console.log(error);
        });
};

/* ========================== FIN CU. 15 ==============================  */

/* ========== CU. 16 ELIMINA ROLES | Gabriela Chimali =============== */

exports.postEliminarRol = (req, res, next) => {
    const { IDRol } = req.body;
    console.log(IDRol);
    Rol.deleteRolById(IDRol)
        .then(() => {
            res.status(200).json({ success: true });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "Error al eliminar el rol" });
        });
};

/* ========================== FIN CU. 16 ==============================  */

module.exports = exports;
