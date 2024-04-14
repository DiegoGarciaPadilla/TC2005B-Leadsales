// --- 26. Importa datos de leads. ---

exports.importa_csv = (request, response, next) => {
    
    // Inicializa la variable de privilegio
    let puedeImportarCSV = false;

    // Obtiene los privilegios del usuario
    const {Privilegios}  = request.session;
    console.log("Privilegios: ", Privilegios);

    // Verifica si el usuario tiene el privilegio
    if (Privilegios.some(Privilegios => Privilegios.Descripcion === 'Importa datos de leads.')) {
        puedeImportarCSV = true;
    }

    // Si el usuario no tiene el privilegio, redirige a la pagina de inicio
    else {
        response.redirect('/');
        console.log('Accion no permitida');
    }

    next();
}