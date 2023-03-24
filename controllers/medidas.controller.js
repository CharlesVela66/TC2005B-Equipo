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
        if (request.body.cuello){
            const registro = new Medida({
                id_cliente: rows[0].id_cliente,
                id_medicion: 1,
                medida: request.body.cuello
            })
            console.log(registro);
            registro.save();
        }
        if (request.body.pecho){
            const registro = new Medida({
                id_cliente: rows[0].id_cliente,
                id_medicion: 2,
                medida: request.body.pecho
            })
            registro.save();
        }
        if (request.body.brazo_izq){
            const registro = new Medida({
                id_cliente: rows[0].id_cliente,
                id_medicion: 3,
                medida: request.body.brazo_izq
            })
            registro.save();
        }
        if (request.body.brazo_der){
            const registro = new Medida({
                id_cliente: rows[0].id_cliente,
                id_medicion: 4,
                medida: request.body.brazo_der
            })
            registro.save();
        }
        if (request.body.cintura){
            const registro = new Medida({
                id_cliente: rows[0].id_cliente,
                id_medicion: 5,
                medida: request.body.cintura
            })
            registro.save();
        }
        if (request.body.pierna_izq){
            const registro = new Medida({
                id_cliente: rows[0].id_cliente,
                id_medicion: 6,
                medida: request.body.pierna_izq
            })
            registro.save();
        }
        if (request.body.pierna_der){
            const registro = new Medida({
                id_cliente: rows[0].id_cliente,
                id_medicion: 7,
                medida: request.body.pierna_der
            })
            registro.save();
        }
        if (request.body.pantorrilla_izq){
            const registro = new Medida({
                id_cliente: rows[0].id_cliente,
                id_medicion: 8,
                medida: request.body.pantorrilla_izq
            })
            registro.save();
        }
        if (request.body.pantorrilla_der){
            const registro = new Medida({
                id_cliente: rows[0].id_cliente,
                id_medicion: 9,
                medida: request.body.brazo_der
            })
            registro.save();
        }
        if (request.body.peso){
            const registro = new Medida({
                id_cliente: rows[0].id_cliente,
                id_medicion: 10,
                medida: request.body.peso
            })
            registro.save();
        }
        if (request.body.cadera){
            const registro = new Medida({
                id_cliente: rows[0].id_cliente,
                id_medicion: 11,
                medida: request.body.cadera
            })
            registro.save();
        }
        response.redirect('/home');
    })
    .catch((error) => {console.log(error)});
}