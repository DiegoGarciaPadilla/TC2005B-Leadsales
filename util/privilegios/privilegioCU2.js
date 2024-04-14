// --- 02. Genera reporte. ---

exports.genera_reporte = (request, response, next) => {
    
    // Inicializa la variable de privilegio
    let puedeGenerarReporte = false;

    // Obtiene los privilegios del usuario
    const {Privilegios}  = request.session;
    console.log("Privilegios: ", Privilegios);

    // Verifica si el usuario tiene el privilegio
    if (Privilegios.some(Privilegios => Privilegios.Descripcion === 'Genera reporte todos.') || (Privilegios => Privilegios.Descripcion ===('Genera reporte propios.'))) {
        puedeGenerarReporte = true;
    }

    // Si el usuario no tiene el privilegio, redirige a la pagina de inicio
    else {
        response.redirect('/');
        console.log('Accion no permitida');
    }

    next();
}