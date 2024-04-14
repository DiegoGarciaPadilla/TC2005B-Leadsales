// --- 02. Genera reporte. ---

exports.generaReporte = (req, res, next) => {
    // Obtiene los privilegios del usuario
    const { Privilegios } = req.session;

    // Verifica si el usuario tiene el privilegio
    if (
        Privilegios.some(
            (priv) => priv.Descripcion === "Genera reporte todos."
        ) ||
        ((priv) => priv.Descripcion === "Genera reporte propios.")
    ) {
        next();
    }

    // Si el usuario no tiene el privilegio, redirige a la pagina de inicio
    else {
        res.redirect("/");
    }
};

// --- 03. Exporta el reporte. ---

exports.exportaReporte = (req, res, next) => {
    // Obtiene los privilegios del usuario
    const { Privilegios } = req.session;

    // Verifica si el usuario tiene el privilegio
    if (
        Privilegios.some((priv) => priv.Descripcion === "Exporta el reporte.")
    ) {
        next();
    }

    // Si el usuario no tiene el privilegio, redirige a la pagina de inicio
    else {
        res.redirect("/");
    }
};

// --- 04. Recupera contraseña. ---

exports.recuperaContrasenia = (req, res, next) => {
    // Obtiene los privilegios del usuario
    const { Privilegios } = req.session;

    // Verifica si el usuario tiene el privilegio
    if (
        Privilegios.some((priv) => priv.Descripcion === "Recupera contraseña.")
    ) {
        next();
    }

    // Si el usuario no tiene el privilegio, redirige a la pagina de inicio
    else {
        res.redirect("/");
    }
};

// --- 05. Crea lead. ---

exports.creaLead = (req, res, next) => {
    // Obtiene los privilegios del usuario
    const { Privilegios } = req.session;

    // Verifica si el usuario tiene el privilegio
    if (
        Privilegios.some((priv) => priv.Descripcion === "Crea lead todos.") ||
        ((priv) => priv.Descripcion === "Crea lead propios.")
    ) {
        next();
    }

    // Si el usuario no tiene el privilegio, redirige a la pagina de inicio
    else {
        res.redirect("/");
    }
};

// --- 06. Consulta lead. ---

exports.consultaLead = (req, res, next) => {
    // Obtiene los privilegios del usuario
    const { Privilegios } = req.session;

    // Verifica si el usuario tiene el privilegio
    if (Privilegios.some((priv) => priv.Descripcion === "Consulta lead.")) {
        next();
    }

    // Si el usuario no tiene el privilegio, redirige a la pagina de inicio
    else {
        res.redirect("/");
    }
};

// --- 07. Modifica lead. ---

exports.modificaLead = (req, res, next) => {
    // Obtiene los privilegios del usuario
    const { Privilegios } = req.session;

    // Verifica si el usuario tiene el privilegio
    if (Privilegios.some((priv) => priv.Descripcion === "Modifica lead.")) {
        next();
    }

    // Si el usuario no tiene el privilegio, redirige a la pagina de inicio
    else {
        res.redirect("/");
    }
};

// --- 08. Elimina lead. ---

exports.eliminaLead = (req, res, next) => {
    // Obtiene los privilegios del usuario
    const { Privilegios } = req.session;

    // Verifica si el usuario tiene el privilegio
    if (Privilegios.some((priv) => priv.Descripcion === "Elimina lead.")) {
        next();
    }

    // Si el usuario no tiene el privilegio, redirige a la pagina de inicio
    else {
        res.redirect("/");
    }
};

// --- 09. Consulta FAQ. ---

exports.consultaFAQ = (req, res, next) => {
    // Obtiene los privilegios del usuario
    const { Privilegios } = req.session;

    // Verifica si el usuario tiene el privilegio
    if (Privilegios.some((priv) => priv.Descripcion === "Consulta FAQ.")) {
        next();
    }

    // Si el usuario no tiene el privilegio, redirige a la pagina de inicio
    else {
        res.redirect("/");
    }
};

// --- 10. Consulta directorio. ---

exports.consultaDirectorio = (req, res, next) => {
    // Obtiene los privilegios del usuario
    const { Privilegios } = req.session;

    // Verifica si el usuario tiene el privilegio
    if (
        Privilegios.some(
            (priv) => priv.Descripcion === "Consulta directorio todos."
        ) ||
        ((priv) => priv.Descripcion === "Consulta directorio propios.")
    ) {
        next();
    }

    // Si el usuario no tiene el privilegio, redirige a la pagina de inicio
    else {
        res.redirect("/");
    }
};

// --- 11. Registra cuenta de usuario. ---

exports.registraCuenta = (req, res, next) => {
    // Obtiene los privilegios del usuario
    const { Privilegios } = req.session;

    // Verifica si el usuario tiene el privilegio
    if (
        Privilegios.some(
            (priv) => priv.Descripcion === "Registra cuenta de usuario."
        )
    ) {
        next();
    }

    // Si el usuario no tiene el privilegio, redirige a la pagina de inicio
    else {
        res.redirect("/");
    }
};

// --- 12. Elimina cuenta de usuario. ---

exports.eliminaUsuario = (req, res, next) => {
    // Obtiene los privilegios del usuario
    const { Privilegios } = req.session;

    // Verifica si el usuario tiene el privilegio
    if (
        Privilegios.some(
            (priv) => priv.Descripcion === "Elimina cuenta de usuario."
        )
    ) {
        next();
    }

    // Si el usuario no tiene el privilegio, redirige a la pagina de inicio
    else {
        res.redirect("/");
    }
};

// --- 13. Crea rol. ---

exports.creaRol = (req, res, next) => {
    // Obtiene los privilegios del usuario
    const { Privilegios } = req.session;

    // Verifica si el usuario tiene el privilegio
    if (Privilegios.some((priv) => priv.Descripcion === "Crea rol.")) {
        next();
    }

    // Si el usuario no tiene el privilegio, redirige a la pagina de inicio
    else {
        res.redirect("/");
    }
};

// --- 14. Consulta rol. ---

exports.consultaRol = (req, res, next) => {
    // Obtiene los privilegios del usuario
    const { Privilegios } = req.session;

    // Verifica si el usuario tiene el privilegio
    if (Privilegios.some((priv) => priv.Descripcion === "Consulta roles.")) {
        next();
    }

    // Si el usuario no tiene el privilegio, redirige a la pagina de inicio
    else {
        res.redirect("/");
    }
};

// --- 15. Modifica rol. ---

exports.modificaRol = (req, res, next) => {
    // Obtiene los privilegios del usuario
    const { Privilegios } = req.session;

    // Verifica si el usuario tiene el privilegio de modificar roles
    if (Privilegios.some((priv) => priv.Descripcion === "Modifica rol.")) {
        next();
    }

    // Si no tiene el privilegio, redirige a la pagina de inicio
    else {
        res.redirect("/");
    }
};

// --- 16. Elimina rol. ---

exports.eliminaRol = (req, res, next) => {
    // Obtiene los privilegios del usuario
    const { Privilegios } = req.session;

    // Verifica si el usuario tiene el privilegio
    if (Privilegios.some((priv) => priv.Descripcion === "Elimina rol.")) {
        next();
    }

    // Si el usuario no tiene el privilegio, redirige a la pagina de inicio
    else {
        res.redirect("/");
    }
};

// --- 17. Cambia contraseña de usuario. ---

exports.cambiaContrasena = (req, res, next) => {
    // Obtiene los privilegios del usuario
    const { Privilegios } = req.session;

    // Verifica si el usuario tiene el privilegio
    if (
        Privilegios.some(
            (priv) => priv.Descripcion === "Cambia contraseña de usuario."
        )
    ) {
        next();
    }

    // Si no tiene el privilegio, redirige a la pagina de inicio
    else {
        res.redirect("/");
    }
};

// --- 18. Registra asignación de rol a usuario. ---

exports.asignaRol = (req, res, next) => {
    // Obtiene los privilegios del usuario
    const { Privilegios } = req.session;

    // Verifica si el usuario tiene el privilegio
    if (
        Privilegios.some(
            (priv) =>
                priv.Descripcion === "Registra asignación de rol a usuario."
        )
    ) {
        next();
    }

    // Si el usuario no tiene el privilegio, redirige a la pagina de inicio
    else {
        res.redirect("/");
    }
};

// --- 19. Registra asignación de permiso a rol. ---

exports.asignaPermiso = (req, res, next) => {
    // Obtiene los privilegios del usuario
    const { Privilegios } = req.session;

    // Verifica si el usuario tiene el privilegio
    if (
        Privilegios.some(
            (priv) =>
                priv.Descripcion === "Registra asignación de permiso a rol."
        )
    ) {
        next();
    }

    // Si el usuario no tiene el privilegio, redirige a la pagina de inicio
    else {
        res.redirect("/");
    }
};

// --- 24. Consulta historial. ---

exports.consultaHistorial = (req, res, next) => {
    // Obtiene los privilegios del usuario
    const { Privilegios } = req.session;

    // Verifica si el usuario tiene el privilegio
    if (
        Privilegios.some(
            (priv) => priv.Descripcion === "Consulta historial todos."
        ) ||
        ((priv) => priv.Descripcion === "Consulta historial propios.")
    ) {
        next();
    }

    // Si el usuario no tiene el privilegio, redirige a la pagina de inicio
    else {
        res.redirect("/");
    }
};

// --- 25. Consulta reporte en el historial. ---

exports.consultaReporte = (req, res, next) => {
    // Obtiene los privilegios del usuario
    const { Privilegios } = req.session;

    // Verifica si el usuario tiene el privilegio
    if (
        Privilegios.some(
            (priv) => priv.Descripcion === "Consulta reporte en el historial."
        )
    ) {
        next();
    }

    // Si el usuario no tiene el privilegio, redirige a la pagina de inicio
    else {
        res.redirect("/");
    }
};

// --- 27. Exporta datos de leads. ---

exports.exportaLead = (req, res, next) => {
    // Obtiene los privilegios del usuario
    const { Privilegios } = req.session;

    // Verifica si el usuario tiene el privilegio
    if (
        Privilegios.some(
            (priv) => priv.Descripcion === "Exporta datos de leads."
        )
    ) {
        next();
    }

    // Si el usuario no tiene el privilegio, redirige a la pagina de inicio
    else {
        res.redirect("/");
    }
};

// --- 28. Consulta usuarios. ---

exports.consultaUsuarios = (req, res, next) => {
    // Obtiene los privilegios del usuario
    const { Privilegios } = req.session;

    // Verifica si el usuario tiene el privilegio
    if (Privilegios.some((priv) => priv.Descripcion === "Consulta usuarios.")) {
        next();
    }

    // Si el usuario no tiene el privilegio, redirige a la pagina de inicio
    else {
        res.redirect("/");
    }
};

// Exporta el módulo

module.exports = exports;
