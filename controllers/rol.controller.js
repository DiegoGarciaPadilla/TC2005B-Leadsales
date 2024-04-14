const Rol = require("../model/rol.model");

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
            res.render("editarRol", {
                rol: rolFetched[0],
                error: err,
                csrfToken: req.csrfToken(),
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

module.exports = exports;
