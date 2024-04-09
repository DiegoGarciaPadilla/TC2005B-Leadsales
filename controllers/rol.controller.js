const Rol = require('../model/rol.model');

/* ========== CU. 14 CONSULTA ROLES | Diego García =============== */

exports.getRoles = (request, response, next) => {
    
    // Obtiene el error de la sesion si existe y lo elimina
    const err = request.session.error || '';
    request.session.error = '';

    // Obtiene los roles de la base de datos
    Rol.fetchAll()
        .then(([rolesFetched, fieldData]) => {
            console.log(rolesFetched);
            response.render('roles', {
                roles: rolesFetched,
                error: err,
                csrfToken: request.csrfToken(),
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

/* ========================== FIN CU. 14 ==============================  */

/* ========== CU. 15 MODIFICA ROLES | Diego García =============== */

exports.getEditarRol = (request, response, next) => {
    
    // Obtiene el error de la sesion si existe y lo elimina
    const err = request.session.error || '';
    request.session.error = '';

    // Obtiene el id del rol
    const { IDRol } = request.params;

    // Obtiene el rol de la base de datos
    Rol.fetchRolById(IDRol)
        .then(([rolFetched, fieldData]) => {
            response.render('editarRol', {
                rol: rolFetched[0],
                error: err,
                csrfToken: request.csrfToken(),
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

exports.postEditarRol = (request, response, next) => {
    
    // Obtiene el id del rol
    const { IDRol } = request.params;
    console.log(IDRol);

    // Obtiene los datos del formulario
    const { Nombre, DescripcionRol } = request.body;
    console.log(Nombre, DescripcionRol);

    // Actualiza el rol en la base de datos
    Rol.updateRolById(IDRol, Nombre, DescripcionRol)
        .then(() => {
            response.redirect('/config/roles');
        })
        .catch((error) => {
            console.log(error);
        });
}

/* ========================== FIN CU. 15 ==============================  */