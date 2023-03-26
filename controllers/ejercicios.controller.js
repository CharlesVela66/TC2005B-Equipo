const Ejercicio = require('../models/ejercicios.model');

exports.ver_ejercicios = (request, response, next) => {
    Ejercicio.fetchAll()
    .then(([rows, fieldData]) => {
        response.render('ejercicios/ejercicios', {
            ejercicios: rows,
            isLoggedIn: request.session.isLoggedIn || false,
            nombre: request.session.nombre_usuario || '',
            rol: request.session.rol,
        });
    })
    .catch(error => console.log(error));
}