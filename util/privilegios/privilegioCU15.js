// --- 15. Modifica rol. ---

exports.modifica_rol = (request, response, next) => {
    
    // Inicializa la variable de privilegio
    let puedeModificarRoles = false;

    // Obtiene los privilegios del usuario
    const { Privilegios } = request.session;
    console.log("Privilegios: ", Privilegios);

    // Verifica si el usuario tiene el privilegio de modificar roles
    if (Privilegios.some (Privilegios => Privilegios.Descripcion === 'Modifica rol.')) {
        puedeModificarRoles = true;
    }

    // Si no tiene el privilegio, redirige a la pagina de inicio
    else {
        response.redirect('/');
        console.log('Accion no permitida');
    }

    next();
}