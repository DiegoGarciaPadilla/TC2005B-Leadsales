// --- 17. Cambia contraseña de usuario. ---

exports.modifica_contrasenia = (request, response, next) => {
    
    // Inicializa la variable de privilegio
    let puedeCambiarContra = false;

    // Obtiene los privilegios del usuario
    const { Privilegios } = request.session;
    console.log("Privilegios: ", Privilegios);

    // Verifica si el usuario tiene el privilegio
    if (Privilegios.some (Privilegios => Privilegios.Descripcion === 'Cambia contraseña de usuario.')) {
        puedeCambiarContra = true;
    }

    // Si no tiene el privilegio, redirige a la pagina de inicio
    else {
        response.redirect('/');
        console.log('Accion no permitida');
    }

    next();
}