const Ejercicio = require('../models/ejercicios.model');

exports.ver_ejercicios = (request, response, next) => {
   
    const mensaje = request.session.mensaje || '';
    if (request.session.mensaje) {
    request.session.mensaje  = '';
    }
   
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

exports.get_ejercicios = (request, response, next) => {
    Ejercicio.fetchAll()
    .then(([rows, fieldData]) => {
        response.render('ejercicios/agregar_ejercicios', {
            ejercicios: rows,
            isLoggedIn: request.session.isLoggedIn || false,
            nombre: request.session.nombre_usuario || '',
            rol: request.session.rol,
        });
    })
    .catch(error => console.log(error));

}

exports.post_ejercicios = (request, response, next) => {


    const ejercicio = new Ejercicio({
        descripcion: request.body.descripcion,
        video_ejercicio: request.body.video_ejercicio,
    });

    ejercicio.save()
    .then(([rows, fieldData]) => {

        request.session.mensaje = "El ejercicio fue registrado exitosamente.";

        request.session.ultimo_ejercicio = ejercicio.descripcion;

        response.redirect('/ejercicios/');
    })
    .catch((error) => {console.log(error)});

};