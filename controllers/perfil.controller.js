const Dieta = require('../models/dietas_favoritas.model');
const Rutina = require('../models/rutinas_favoritas.model')
//const Perfil =require('../models/perfil.model');
const Usuario= require('../models/usuario.model');

exports.get_editar = (request, response, next) => {
    Usuario.fetchOne(request.params.id)
    .then(([rows, fieldData]) => {
        if (rows.length == 1) {
            const usuario = rows[0];
            response.render('editar', {
                usuario: usuario,
                isLoggedIn: request.session.isLoggedIn || false,
                nombre: request.session.nombre_usuario || '',
                rol: request.session.rol,
            });
        } else {
            response.redirect('/perfil/');
        }
    })
    .catch(error => console.log(error));
};

exports.ver_informacion = (request, response, next) => {
    request.session.id_usuario = request.params.id;
    Usuario.fetchOne(request.params.id)
    .then(([usuario, fieldData]) => {
        //console.log(usuario),
        response.render('ver_informacion', {
            usuario: usuario,
            isLoggedIn: req.session.isLoggedIn || false,
            nombre: req.session.nombre_usuario || '',
            rol: req.session.rol,
        });
    })
    .catch(err => console.log(err));
};
  

exports.post_editar = (request, response, next) => {
    console.log("Datos para editar");
    console.log(request.body);

};

exports.ver_perfil = (request, response, next) => {
    let dietasRows = new Array;
    let rutinasRows = new Array;
    Dieta.fetchAll()
    .then(([rows, fieldData]) => {
        dietasRows.push(rows[0]);
        Rutina.fetchAll()
        .then(([rows, fieldData]) => {
            rutinasRows.push(rows[0]);
            response.render('perfil/perfil', {
                dieta: dietasRows[0], rutina: rutinasRows[0],
                isLoggedIn: request.session.isLoggedIn || false,
                nombre: request.session.nombre_usuario || '',
                rol: request.session.rol,
            })
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
}

/*exports.actualizarPerfil = (request, response, next) => {
    Usuario.fetchById()
    .then(([rows, fieldData]) => {
        usuariosRows.push(rows[0]);
        response.render('perfil/editar_perfil', {
            usuario: usuariosRows[0],
            isLoggedIn: request.session.isLoggedIn[0] || false,
            nombre: request.session.nombre_usuario || '',
            rol: request.session.rol,
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
}*/