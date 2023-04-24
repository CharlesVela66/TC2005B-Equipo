const Dieta = require('../models/dietas.model');
const DietaAlimento = require('../models/dieta_alimento.model');
const Macro = require('../models/macro.model');
const Micro = require('../models/micronutrientes.model');
const Cliente = require('../models/clientes.model');

exports.get_buscar = (request, response, next) => {
    Dieta.find(request.params.valor)
    .then(([rows, fieldData]) => {
        response.status(200).json({dietas: rows});
    })
    .catch(error => {
        console.log(error);
        response.status(500).json({message: "Internal Server Enrror"});
    });
}

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
            DietaAlimento.fetchOne(request.params.id)
            .then(([dieta_alimento, fieldData]) => {
                //  console.log(dieta_alimento),
                Macro.fetchOne(request.params.id)
                .then(([macro, fieldData]) => {
                    //   console.log(macro),
                    Micro.fetchOne(request.params.id)
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

exports.eliminar_dieta_favorita = (request, response, next) => {
    Cliente.fetchOne(request.session.nombre_usuario)
    .then(([cliente, fieldData]) => {
        Dieta.deleteFavorita(cliente[0].id_cliente, request.body.id_dieta_fav)
        .then(([rows, fieldData]) =>{
            response.redirect('/dietas');
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
}

exports.get_nueva = (request, response, next) => {
    Dieta.fetchAll(request.session.nombre_usuario)
    .then(([dietas, fieldData]) => {
        Dieta.fetchAllFavoritas(request.session.nombre_usuario)
        .then(([dietasFavs, fieldData]) => {
            response.render('dietas/agregar_dietas',{
                dietas: dietas,
                dietasFavs: dietasFavs,
                isLoggedIn: request.session.isLoggedIn || false,
                nombre: request.session.nombre_usuario || '',
                rol: request.session.rol,
            });
        })
        .catch(error=>console.log(error));
    })
    .catch(error=>console.log(error));
}

exports.post_nueva = (request, response, next) => {
    const newMacro = new Macro({
      calorias: request.body.calorias,
      proteinas: request.body.proteinas,
      carbohidratos: request.body.carbohidratos,
      grasas: request.body.grasas
    });
    
    newMacro.save()
      .then(([macro, fieldData])=>{
        const id_macro = macro.insertId;
  
        const newMicro = new Micro({
          ceniza: request.body.ceniza,
          fibra_total: request.body.fibra_total,
          calcio: request.body.calcio,
          fosforo: request.body.fosforo,
          hierro: request.body.hierro,
          tiamina: request.body.tiamina,
          riboflavina: request.body.riboflavina,
          niacina: request.body.niacina,
          vit_c: request.body.vit_c,
          vit_a: request.body.vit_a,
          acgrasosmin: request.body.acgrasosmin,
          acgrasospoli: request.body.acgrasospoli,
          acgrasossat: request.body.acgrasossat,
          colesterol: request.body.colesterol,
          potasio: request.body.potasio,
          sodio: request.body.sodio,
          zinc: request.body.zinc,
          magnesio: request.body.magnesio,
          vit_b6: request.body.vit_b6,
          vit_b12: request.body.vit_b12,
          acfolico: request.body.acfolico,
          folatoeq: request.body.folatoeq
        });
        
        newMicro.save()
          .then(([micro, fieldData]) => {
            const id_micro = micro.insertId;
  
            const newDieta = new Dieta({
              nombre: request.body.nombre_dieta,
              id_macro: id_macro,
              id_micro: id_micro,
              Url_image: request.body.imagen
            });
            
            newDieta.save()
              .then(([dieta, fieldData]) => {
                const id_dieta = dieta.insertId;
                
                // Recorre los alimentos enviados en el formulario
                const alimentos = request.body.alimentos;
                const promises = alimentos.map(alimento => {
                  // Guarda cada alimento en la tabla 'dietasalimentos'
                  const newDietaAlimento = new DietaAlimento({
                    id_dieta: id_dieta,
                    nombre: alimento.nombre_alimento,
                    medida: alimento.medida_alimento,
                    cantidad: alimento.cantidad_alimento
                  });
                  return newDietaAlimento.save();
                });
          
                // Espera a que todos los ejercicios se guarden en la base de datos
                return Promise.all(promises);
            })
            .then(() => {
                // Redirige a la página de éxito o a donde desees después de guardar la rutina y los ejercicios
                response.redirect('/home');
              })
              .catch((error) => {
                console.log(error);
              });
        })
        .catch(error=>console.log(error));
    })
    .catch(error=>console.log(error));
};