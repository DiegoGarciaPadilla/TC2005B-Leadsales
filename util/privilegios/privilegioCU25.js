// --- 25. Consulta reporte en el historial. ---

exports.ver_reporte = (request, response, next) => {
    
    // Inicializa la variable de privilegio
    let puedeVerReporte = false;

    // Obtiene los privilegios del usuario
    const {Privilegios}  = request.session;
    console.log("Privilegios: ", Privilegios);

    // Verifica si el usuario tiene el privilegio
    if (Privilegios.some(Privilegios => Privilegios.Descripcion === 'Consulta reporte en el historial.')) {
        puedeVerReporte = true;
    }

    // Si el usuario no tiene el privilegio, redirige a la pagina de inicio
    else {
        response.redirect('/');
        console.log('Accion no permitida');
    }

    next();
}