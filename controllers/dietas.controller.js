const Dieta = require('../models/dietas.model');
const Dieta_Alimento = require('../models/dieta_alimento.model');
const macro = require('../models/macro.model');
const micro = require('../models/micronutrientes.model');
const alimento = require('../models/alimentos.model');
const Cliente = require('../models/clientes.model');

exports.explorar_dietas = (request, response, next) => {
    Dieta.fetchAll()
        .then(([rows, fieldData]) => {
            response.render('dietas/dietas', {
                dietas: rows,
                isLoggedIn: request.session.isLoggedIn || false,
                nombre: request.session.nombre_usuario || '',
                rol: request.session.rol,
            });
        })
        .catch(error => console.log(error));
}

exports.visualizar = (request, response, next) => {
    //console.log(request.params.id);
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
            response.render('dietas/contenido_d', {
                dietas: dieta,
                dieta_alimentos: dieta_alimento,
                macronutriente: macro,
                micronutriente: micro,
                isLoggedIn: request.session.isLoggedIn || false,
                nombre: request.session.nombre_usuario || '',
                rol: request.session.rol,
            })
        })
    })
})
    })
}
exports.seleccionar =(request,response, next) =>{
    Cliente.fetchOne(request.session.nombre_usuario)
    .then((cliente,fieldData)=> {
    Dieta.fetchOne(request.params.id)
    .then((dieta,fieldData)=>{



    })

        

    })

}


exports.explorar_dietas_favoritas = (request, response, next) => {
    DietaFavorita.fetchAll()
        .then((rows, fieldData) => {
            console.log(rows[0]);
            response.render('dietas/dietas_favoritas', {
                dietas: rows[0],
                isLoggedIn: request.session.isLoggedIn || false,
                nombre: request.session.nombre_usuario || '',
                rol: request.session.rol,
            });
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