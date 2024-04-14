// --- 09. Consulta FAQ. ---

exports.consulta_faq = (request, response, next) => {
    
    // Inicializa la variable de privilegio
    let puedeVerFAQ = false;

    // Obtiene los privilegios del usuario
    const {Privilegios}  = request.session;
    console.log("Privilegios: ", Privilegios);

    // Verifica si el usuario tiene el privilegio
    if (Privilegios.some(Privilegios => Privilegios.Descripcion === 'Consulta FAQ.')) {
        puedeVerFAQ = true;
    }

    // Si el usuario no tiene el privilegio, redirige a la pagina de inicio
    else {
        response.redirect('/');
        console.log('Accion no permitida');
    }

    next();
}