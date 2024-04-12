// --- 10. Consulta directorio. ---

exports.consulta_directorio = (request, response, next) => {
    
    // Inicializa la variable de privilegio
    let puedeVerDirectorio = false;

    // Obtiene los privilegios del usuario
    const {Privilegios}  = request.session;
    console.log("Privilegios: ", Privilegios);

    // Verifica si el usuario tiene el privilegio
    if (Privilegios.some(Privilegios => Privilegios.Descripcion === 'Consulta directorio todos.') || (Privilegios => Privilegios.Descripcion ===('Consulta directorio propios.'))) {
        puedeVerDirectorio = true;
    }

    // Si el usuario no tiene el privilegio, redirige a la pagina de inicio
    else {
        response.redirect('/');
        console.log('Accion no permitida');
    }

    next();
}