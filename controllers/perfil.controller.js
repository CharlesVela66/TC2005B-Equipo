const Dieta = require('../models/dietas_favoritas.model');
const Rutina = require('../models/rutinas_favoritas.model')
const Cliente= require('../models/clientes.model');


exports.verCliente = async (req, res, next) => {
    try {
      const cliente = await Cliente.verCliente(req.params.id);
      res.render('perfil/ver_informacion', { cliente: cliente[0] });
    } catch (err) {
      console.log(err);
      res.redirect('/');
    }
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