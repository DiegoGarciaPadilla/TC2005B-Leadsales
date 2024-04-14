// --- 19. Registra asignación de permiso a rol. ---

exports.asigna_permiso = (request, response, next) => {
    
    // Inicializa la variable de privilegio
    let puedeAsignarPermiso = false;

    // Obtiene los privilegios del usuario
    const {Privilegios}  = request.session;
    console.log("Privilegios: ", Privilegios);

    // Verifica si el usuario tiene el privilegio
    if (Privilegios.some(Privilegios => Privilegios.Descripcion === 'Registra asignación de permiso a rol.')) {
        puedeAsignarPermiso = true;
    }

    // Si el usuario no tiene el privilegio, redirige a la pagina de inicio
    else {
        response.redirect('/');
        console.log('Accion no permitida');
    }

    next();
}