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

exports.editar = (request,response,next) => {
    Cliente.fetchOne(request.session.nombre_usuario)
    .then(([rows, fieldData]) => {
            // Se crea un nuevo registro de bitacora
            const medida = parseInt(request.body.id_medicion);
            const medidaFloat = parseFloat(request.body.edit_medida);

            const registro = new ClienteMedidas({
                id_cliente: rows[0].id_cliente,
                fecha: request.body.edit_fecha,
                id_medicion: medida,
                medida: medidaFloat
            });
            console.log(request.body.fecha_ant);
            console.log(registro);
            // Se actualiza en la base de datos
            registro.update(request.body.fecha_ant)
            .then(([rows, fieldData]) => {
                //Redericciona al usuario a la bitacora
                response.redirect('/progreso');
            })
            .catch((error) => {console.log(error)}); 
    })
    .catch((error) => {console.log(error)});
}

exports.eliminar = (request, response, next) => {
    Cliente.fetchOne(request.session.nombre_usuario)
    .then(([rows, fieldData]) => {
            // Se elimina de la base de datos
            const medida = parseInt(request.body.delete_id_medicion);

            const originalFecha = request.body.delete_fecha;
            const date = new Date(originalFecha);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            const fecha = `${year}-${month}-${day}`;
            console.log(medida);
            console.log(fecha);
            ClienteMedidas.delete(rows[0].id_cliente, fecha, medida)
            .then(([rows, fieldData]) => {
                //Redericciona al usuario a la bitacora
                response.redirect('/progreso');
            })
            .catch((error) => {console.log(error)});
        
    })
    .catch((error) => {console.log(error)});
}