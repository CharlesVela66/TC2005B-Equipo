const ClienteMedidas = require("../models/cliente_medicion.model");
const Cliente = require("../models/clientes.model");


exports.get_progreso = (request,response,next) => {
    console.log("Progeso :3")
    const mensaje = request.session.mensaje || '';
    if (request.session.mensaje) {
        request.session.mensaje  = '';
    }
    ClienteMedidas.fetchAll(request.session.nombre_usuario)
    .then((rows, fieldData) => {
        // 
        response.render('progreso/progreso', {
            registros: rows[0],
            isLoggedIn: request.session.isLoggedIn || false,
            nombre: request.session.nombre_usuario || '',
            rol: request.session.rol,
            mensaje: mensaje
        })
    }) 
    .catch((error) => {console.log(error)});

    
}

exports.post_progreso = (request,response,next) => {
    // 
    Cliente.fetchOne(request.session.nombre_usuario)
    .then(([rows, fieldData]) => {
        
        const registro = new Medidas({
            descrip_medida: request.body.descrip_medida
        });
        
        
    })
    .catch((error) => {console.log(error)});

}