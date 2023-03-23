const Dieta = require('../models/dietas.model');
const DietaFavorita = require('../models/dietas_favoritas.model');

exports.explorar_dietas = (request, response, next) => {
    Dieta.fetchAll()
    .then(([rows, fieldData]) => {
        response.render('dietas/dietas', {
            dietas: rows,
            isLoggedIn: request.session.isLoggedIn || false,
            nombre: request.session.nombre_usuario || '',
            rol: request.session.rol,
        });
    })
    .catch(error => console.log(error));
}

exports.explorar_dietas_favoritas = (request, response, next) => {
    DietaFavorita.fetchAll()
    .then((rows, fieldData) => {
        console.log(rows[0]); // Aquí le puse rows[0] (osea que solo estoy seleccionando el primer elemento del arreglo) porque se agregaba un elemento al arreglo todo raro. Hay que tener en cuenta eso para cuando tengamos mas de una dieta favorita, pero por el momento, dejaremos el rows[0]
        response.render('dietas/dietas_favoritas', {
            dietas: rows[0],
            isLoggedIn: request.session.isLoggedIn || false,
            nombre: request.session.nombre_usuario || '',
            rol: request.session.rol,
        });
    })
    .catch(error => console.log(error));
}

exports.get_nueva = (request, response, next) => {
    response.render('dietas/agregar_dietas')
}

exports.post_nueva = (request, response, next) => {
    const dieta = new Dieta({
        nombre: request.body.nombre_usuario_usuario,
        tipo_dieta: request.body.tipo_dieta,
        id_macro: request.body.id_macro,
        id_micro: request.body.id_micro
    });
    dieta.save()
}