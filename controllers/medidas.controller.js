const Cliente = require("../models/clientes.model");
const Medida = require("../models/medidas.model");

exports.medida = (request,response,next) =>{
    response.render('medidas/medidas',{
        isLoggedIn: request.session.isLoggedIn || false,
        nombre: request.session.nombre_usuario || '',
        rol: request.session.rol,
    });
}

exports.registrar_medida = (request, response, next) => {
    Cliente.fetchOne(request.session.nombre_usuario)
    .then(([rows, fieldData]) => {
        Medida.fetchAll()
        .then(([medidasTotal, fieldData]) => {
            medidasTotal.forEach((medida) => {
                if (request.body[medida.tipo]){
                    const registro = new Medida({
                        id_cliente: rows[0].id_cliente,
                        id_medicion: medida.id_medicion,
                        medida: request.body[medida.tipo]
                    })
                    registro.save()
                    .then(([rows, fieldData]) => {
                        console.log('Registro guardado');
                        response.redirect('/home');
                    }).catch((error) => {console.log(error)});
                }
            });
        })
        .catch((error) => {console.log(error)});
    })
    .catch((error) => {console.log(error)});
}
