const Alimento = require('../models/alimentos.model');

exports.ver_alimentos = (request, response, next) => {
    Alimento.fetchAll()
    .then(([rows, fieldData]) => {
        response.render('alimentos/alimentos', {
            alimentos: rows,
            isLoggedIn: request.session.isLoggedIn || false,
            nombre: request.session.nombre_usuario || '',
            rol: request.session.rol,
        });
    })
    .catch(error => console.log(error));
}