module.exports = (request, response, next) => {
    if (!(request.session.rol.indexOf('Administrador') >= 0)) {
        return response.redirect('/home');
    }
    next();
}