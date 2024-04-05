const Rol = require('../model/rol.model');

/* ========== CU. 14 CONSULTA ROLES | Andrea Medina =============== */


/* ========================== FIN CU. 14 ==============================  */

/* ========== CU. 15 MODIFICA ROLES | Diego García =============== */

exports.getModificaRol = (request, response, next) => {
    
    // Obtiene el error de la sesion si existe y lo elimina
    const err = request.session.error || '';
    request.session.error = '';

    // Obtiene los roles de la base de datos
    Rol.fetchAll()
        .then(([rolesFetched, fieldData]) => {
            response.render('modificaRol', {
                roles: rolesFetched,
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

exports.postModificaRol = (request, response, next) => {
    const { idrol, nombre, descripcionRol } = request.body;
    Rol.updateById(idrol, nombre, descripcionRol)
        .then(() => {
            response.redirect('/roles/modificarRol');
        })
        .catch((error) => {
            console.log(error);
        });
}

/* ========================== FIN CU. 15 ==============================  */