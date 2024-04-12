// --- 14. Consulta rol. ---

exports.ver_roles = (request, response, next) => {
    // Inicializa la variable de privilegio
    let puedeVerRoles = false;

    // Obtiene los privilegios del usuario
    const { Privilegios } = request.session;
    console.log("Privilegios: ", Privilegios);

    // Verifica si el usuario tiene el privilegio de ver roles
    if (Privilegios.some (Privilegios => Privilegios.Descripcion === 'Consulta roles.')) {
            puedeVerRoles = true;
        }

    // Si el usuario no tiene el privilegio de ver roles, redirige a la pagina de inicio
    else {
        response.redirect('/');
        console.log('Accion no permitida');
    }

    next();
}

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

    // Si el usuario no tiene el privilegio de modificar roles, redirige a la pagina de inicio
    else {
        response.redirect('/ajustes/roles');
        console.log('Accion no permitida');
    }

    next();
}