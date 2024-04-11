// --- 14. Consulta rol. ---

exports.ver_roles = (request, response, next) => {
    // Inicializa la variable de privilegio
    let puedeVerRoles = false;

    // Obtiene los privilegios del usuario
    const { Privilegios } = request.session;
    console.log("Privilegios: ", Privilegios);

    // Verifica si el usuario tiene el privilegio de ver roles
    for (let i = 0; i < Privilegios.length; i++) {
        if (Privilegios[i].Descripcion === 'Consulta rol.') {
            puedeVerRoles = true;
            break;
        }
    }

    // Si el usuario tiene el privilegio de ver roles, permite continuar con la operacion
    if (puedeVerRoles) {
        next();
    }

    // Si el usuario no tiene el privilegio de ver roles, redirige a la pagina de inicio
    else {
        response.redirect('/');
        console.log('No tiene el privilegio de ver roles');
    }

}

// --- 15. Modifica rol. ---

exports.modifica_rol = (request, response, next) => {
    // Inicializa la variable de privilegio
    let puedeModificarRoles = false;

    // Obtiene los privilegios del usuario
    const { Privilegios } = request.session;
    console.log("Privilegios: ", Privilegios);

    // Verifica si el usuario tiene el privilegio de modificar roles
    for (let i = 0; i < Privilegios.length; i++) {
        if (Privilegios[i].Descripcion === 'Modifica rol.') {
            puedeModificarRoles = true;
            break;
        }
    }

    // Si el usuario tiene el privilegio de modificar roles, permite continuar con la operacion
    if (puedeModificarRoles) {
        next();
    }

    // Si el usuario no tiene el privilegio de modificar roles, redirige a la pagina de inicio
    else {
        response.redirect('/');
        console.log('No tiene el privilegio de modificar roles');
    }

}

// --- 24. Consulta historial. ---

exports.ver_historial = (request, response, next) => {
    
    // Inicializa la variable de privilegio
    let puedeVerHistorial = false;

    // Obtiene los privilegios del usuario
    const { Privilegios } = request.session;
    console.log("Privilegios: ", Privilegios);

    // Verifica si el usuario tiene el privilegio de ver historial
    for (let i = 0; i < Privilegios.length; i++) {
        if (Privilegios[i].Descripcion === 'Consulta historial.') {
            puedeVerHistorial = true;
            break;
        }
    }

    // Si el usuario tiene el privilegio de ver roles, permite continuar con la operacion
    if (puedeVerHistorial) {
        next();
    }

    // Si el usuario no tiene el privilegio de ver roles, redirige a la pagina de inicio
    else {
        response.redirect('/');
        console.log('No tiene el privilegio de modificar roles');
    }

}