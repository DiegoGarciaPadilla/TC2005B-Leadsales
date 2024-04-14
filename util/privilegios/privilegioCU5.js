// --- 05. Crea lead. ---

exports.crea_lead = (request, response, next) => {
    
    // Inicializa la variable de privilegio
    let puedeCrearLead = false;

    // Obtiene los privilegios del usuario
    const {Privilegios}  = request.session;
    console.log("Privilegios: ", Privilegios);

    // Verifica si el usuario tiene el privilegio
    if (Privilegios.some(Privilegios => Privilegios.Descripcion === 'Crea lead todos.') || (Privilegios => Privilegios.Descripcion ===('Crea lead propios.'))) {
        puedeCrearLead = true;
    }

    // Si el usuario no tiene el privilegio, redirige a la pagina de inicio
    else {
        response.redirect('/');
        console.log('Accion no permitida');
    }

    next();
}