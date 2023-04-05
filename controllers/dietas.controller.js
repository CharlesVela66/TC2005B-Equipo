const Dieta = require('../models/dietas.model');
const Dieta_Alimento = require('../models/dieta_alimento.model');
const macro = require('../models/macro.model');
const micro = require('../models/micronutrientes.model');
const Cliente = require('../models/clientes.model');

exports.explorar_dietas = (request, response, next) => {
    const mensaje = request.session.mensaje || '';
    if (request.session.mensaje) {
        request.session.mensaje  = '';
    }
    Dieta.fetchAll(request.session.nombre_usuario)
        .then(([dietas, fieldData]) => {
            Dieta.fetchAllFavoritas(request.session.nombre_usuario)
            .then(([dietasFav, fieldData]) => {
                response.render('dietas/dietas', {
                    dietasFav: dietasFav,
                    mensaje: mensaje,
                    dietas: dietas,
                    isLoggedIn: request.session.isLoggedIn || false,
                    nombre: request.session.nombre_usuario || '',
                    rol: request.session.rol,
                });
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
}

exports.dieta_detalles = (request, response, next) => {
    request.session.id_dieta = request.params.id;
    Dieta.fetchOne(request.params.id)
        .then(([dieta, fieldData]) => {
            //   console.log(dieta),
            Dieta_Alimento.fetchOne(request.params.id)
            .then(([dieta_alimento, fieldData]) => {
                //  console.log(dieta_alimento),
                macro.fetchOne(request.params.id)
                .then(([macro, fieldData]) => {
                    //   console.log(macro),
                    micro.fetchOne(request.params.id)
                    .then(([micro, fieldData]) => {
                        //  console.log(micro),
                        response.render('dietas/dieta_detalles', {
                        dietas: dieta,
                        dieta_alimentos: dieta_alimento,
                        macronutriente: macro,
                        micronutriente: micro,
                        isLoggedIn: request.session.isLoggedIn || false,
                        nombre: request.session.nombre_usuario || '',
                        rol: request.session.rol,
                        })
                    })
                    .catch(error => console.log(error));
                })
                .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
}
exports.seleccionar_dieta =(request,response, next) =>{
    Cliente.fetchOne(request.session.nombre_usuario)
    .then(([cliente,fieldData]) => {
        Dieta.fetchOne(request.session.id_dieta)
        .then(([dieta, fieldData]) => {
            if (cliente[0].id_dieta == dieta[0].id_dieta){
                request.session.mensaje = "Esta dieta ya la tienes seleccionada";
            }
            else {
                Cliente.saveDieta(dieta[0].id_dieta, cliente[0].id_cliente);
            }
            response.redirect('/dietas');
        })
        .catch(error => console.log(error))
    .catch(error => console.log(error));
    })

}

exports.registrar_dieta_favorita = (request, response, next) => {
    Cliente.fetchOne(request.session.nombre_usuario)
    .then(([cliente, fieldData]) => {
        Dieta.saveFavorita(cliente[0].id_cliente, request.body.id_dieta)
        .then(([rows, fieldData]) =>{
            response.redirect('/dietas');
        })
        .catch(error => console.log(error));
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