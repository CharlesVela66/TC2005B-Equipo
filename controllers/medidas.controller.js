const Cliente = require("../models/clientes.model");
const Medida = require("../models/medidas.model");
const Registro = require("../models/cliente_medicion");

exports.medida = (request,response,next) =>{
    const mensaje = request.session.mensaje || '';
    if (request.session.mensaje) {
        request.session.mensaje  = '';
    }

    Medida.fetchAll()
    .then(([rows, fieldData]) => {
        response.render('medidas/medidas',{
            mensaje: mensaje,
            mediciones: rows,
            isLoggedIn: request.session.isLoggedIn || false,
            nombre: request.session.nombre_usuario || '',
            rol: request.session.rol,
        });
    })
    .catch((error) => {console.log(error)});

}

exports.registrar_medida = (request, response, next) => {
    Cliente.fetchOne(request.session.nombre_usuario)
    .then(([rows, fieldData]) => {
        Medida.fetchAll()
        .then(([medidasTotal, fieldData]) => {
            const savePromises = medidasTotal.map((medida) => {
                if (request.body[medida.tipo]){
                    const registro = new Registro({
                        id_cliente: rows[0].id_cliente,
                        id_medicion: medida.id_medicion,
                        medida: request.body[medida.tipo]
                    })
                    return registro.save();
                }
                return Promise.resolve(null);
            });
            Promise.all(savePromises)
            .then(() => {
                console.log('Todos los registros guardados');
                response.redirect('/home');
            })
            .catch((error) => {console.log(error)});
        })
        .catch((error) => {console.log(error)});
    })
    .catch((error) => {console.log(error)});
}
