const Alimento = require('../models/alimentos.model');

exports.get_alimentos = (request, response, next) => {
    Alimento.fetchAll()
    .then(([rows, fieldData]) => {
        response.render('alimentos/agregar_alimentos', {
            alimentos: rows,
            isLoggedIn: request.session.isLoggedIn || false,
            nombre: request.session.nombre_usuario || '',
            rol: request.session.rol,
        });
    })
    .catch(error => console.log(error));
}

exports.post_alimentos = (request, response, next) => {

    const alimento = new Alimento({
        nombre: request.body.nombre,
        medida: request.body.medida,
    });

    alimento.save()
    .then(([rows, fieldData]) => {

        request.session.mensaje = "El alimento fue registrado exitosamente.";

        response.redirect('/alimentos/');

    })
    .catch((error) => {console.log(error)});

};

exports.ver_alimentos = (request, response, next) => {
    
    let mensaje = '';

    if (request.session.mensaje) {
        mensaje = request.session.mensaje;
        request.session.mensaje = '';
    }

    Alimento.fetchAll()
    .then(([rows, fieldData]) => {
        response.render('alimentos/alimentos', {
            alimentos: rows,
            isLoggedIn: request.session.isLoggedIn || false,
            nombre: request.session.nombre_usuario || '',
            rol: request.session.rol,
            mensaje: mensaje
        });
        
    })
    .catch(error => console.log(error));
}
