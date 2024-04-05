const Rol = require('../model/rol.model');

/* ========== CU. 14 CONSULTA ROLES | Andrea Medina =============== */


/* ========================== FIN CU. 14 ==============================  */

/* ========== CU. 15 MODIFICA ROLES | Diego García =============== */

exports.getRoles = (request, response, next) => {
    
    // Obtiene el error de la sesion si existe y lo elimina
    const err = request.session.error || '';
    request.session.error = '';

    // Obtiene los roles de la base de datos
    Rol.fetchAll()
        .then(([rolesFetched, fieldData]) => {
            response.render('roles', {
                roles: rolesFetched,
                error: err
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

/* ========================== FIN CU. 15 ==============================  */