const ClienteMedidas = require("../models/cliente_medicion.model");
const Cliente = require("../models/clientes.model");
const Medidas = require('../models/medidas.model');

exports.get_progreso = (request,response,next) => {
    const mensaje = request.session.mensaje || '';
    if (request.session.mensaje) {
        request.session.mensaje  = '';
    }
    ClienteMedidas.fetchAll(request.session.nombre_usuario)
    .then((rows, fieldData) => {
        // 
        Medidas.fetchAll()
        .then(([medida, fieldData]) => {
            response.render('progreso/progreso', {
            registros: rows[0],
            medidas: medida,
            isLoggedIn: request.session.isLoggedIn || false,
            nombre: request.session.nombre_usuario || '',
            rol: request.session.rol,
            mensaje: mensaje
        })
        })
    }) 
    .catch((error) => {console.log(error)});

    
}