exports.isAuth = (req, res, next) => {

    // Si el usuario no está autenticado, redirigimos a la página de login
    if (
        req.session.isLoggedIn === undefined ||
        req.session.isLoggedIn === false
    ) {
        return res.redirect("/usuarios/login");
    }

    // Si el usuario está autenticado, continuamos con la petición
    next();
};

module.exports = exports;
