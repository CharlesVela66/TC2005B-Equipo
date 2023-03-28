const Rutina = require('../models/rutinas.model');
const RutinaFavorita = require('../models/rutinas_favoritas.model');
const RutinaEjercicio = require('../models/rutina_ejercicio.model');

exports.explorar_rutinas = (request, response, next) => {
    Rutina.fetchAll()
    .then(([rows, fieldData]) => {
        response.render('rutinas/rutinas', {
            rutinas: rows,
            isLoggedIn: request.session.isLoggedIn || false,
            nombre: request.session.nombre_usuario || '',
            rol: request.session.rol,
        });
    })
    .catch(error => console.log(error));
}

exports.get_nuevaRutina=(request, response, next) =>{
    Rutina.fetchAll()
    .then(([rows, fieldData]) => {
        response.render('rutina/nueva', {
            rutinas: rows,
            isLoggedIn: request.session.isLoggedIn || false,
            nombre: request.session.nombre_usuario || '',
            rol: request.session.rol,
        });
    }).catch(error => console.log(error));
};

exports.post_nuevaRutina=(request, response, next) => {
    console.log(request.file);

    const rutina_ejercicio = new RutinaEjercicio({
        nombre: request.body.nombre,
        tiporutina: request.body.rutina,
        descripcion //Hacer en insert en la tabla de rutina y después hacer el insert en la tabla de la relación
    })
}

exports.explorar_rutinas_favoritas = (request, response, next) => {
    RutinaFavorita.fetchAll()
    .then((rows, fieldData) => {
        console.log(rows[0]); // Aquí le puse rows[0] (osea que solo estoy seleccionando el primer elemento del arreglo) porque se agregaba un elemento al arreglo todo raro. Hay que tener en cuenta eso para cuando tengamos mas de una rutina favorita, pero por el momento, dejaremos el rows[0]
        response.render('rutinas/rutinas_favoritas', {
            rutinas: rows[0],
            isLoggedIn: request.session.isLoggedIn || false,
            nombre: request.session.nombre_usuario || '',
            rol: request.session.rol,
        });
    })
    .catch(error => console.log(error));
}