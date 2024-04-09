module.exports = (request, response, next) => {
    if (request.session.isLoggedIn === undefined || request.session.isLoggedIn === false) {
        return response.redirect('/users/login');
    }
    next();
}