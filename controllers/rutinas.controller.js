const Rutina = require('../models/rutinas.model');
const Ejercicio= require('../models/ejercicios.model');
const RutinaEjercicio= require ('../models/rutina_ejercicio.model');
//const RutinaFavorita = require('../models/rutinas_favoritas.model');
const Cliente =require('../models/clientes.model');

exports.explorar_rutinas = (request, response, next) => {
    const mensaje = request.session.mensaje || '';
    if (request.session.mensaje) {
        request.session.mensaje  = '';
    }
    Rutina.fetchAll(request.session.nombre_usuario)
    .then(([rows, fieldData]) => {
        Rutina.fetchAllFavoritas(request.session.nombre_usuario)
        .then(([rutinasFavs, fieldData]) => {
            response.render('rutinas/rutinas', {
                mensaje: mensaje,
                rutinas: rows,
                rutinasFavs: rutinasFavs,
                isLoggedIn: request.session.isLoggedIn || false,
                nombre: request.session.nombre_usuario || '',
                rol: request.session.rol,
            });
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
}

exports.visualizar_rutinas= (request, response, next) => {
    request.session.id_rutina = request.params.id;
    Rutina.fetchOne(request.params.id)
        .then(([rutinas, fieldData]) => {
            //   console.log(dieta),
            RutinaEjercicio.fetchOne(request.params.id)
            .then(([rutinas_ejercicios, fieldData]) => {
                //  console.log(dieta_alimento),
                Ejercicio.fetchOne(request.params.id)
                .then(([ejercicios, fieldData]) => {
                    //   console.log(macro),
                        response.render('rutinas/contenido_r', {
                        rutina: rutinas[0],
                        rutina_ejercicio: rutinas_ejercicios,
                        ejercicio: ejercicios,
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
}
exports.seleccionar_rutinas=(request,response, next) =>{
    Cliente.fetchOne(request.session.nombre_usuario)
    .then(([cliente,fieldData]) => {
        Rutina.fetchOne(request.session.id_rutina)
        .then(([rutina, fieldData]) => {
            if (cliente[0].id_rutina == rutina[0].id_rutina){
                request.session.mensaje = "Esta rutina ya la tienes seleccionada";
            }
            else {
                Cliente.saveRutina(rutina[0].id_rutina, cliente[0].id_cliente);
            }
            response.redirect('/rutinas');
        })
        .catch(error => console.log(error))
    .catch(error => console.log(error));
    })

}

exports.nueva_rutina = (request, response, next) => {
    Ejercicio.fetchAll()
    .then(([rows, fieldData]) => {
        response.render('rutinas/nueva_rutina',{
            ejercicios: rows,
            isLoggedIn: request.session.isLoggedIn || false,
            nombre: request.session.nombre_usuario || '',
            rol: request.session.rol,
        });
    }).catch(error=>console.log(error));
}

exports.registrar_rutina_favorita = (request, response, next) => {
    Cliente.fetchOne(request.session.nombre_usuario)
    .then(([cliente, fieldData]) => {
        Rutina.saveFavorita(cliente[0].id_cliente, request.body.id_rutina)
        .then(([rows, fieldData]) =>{
            response.redirect('/rutinas');
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
}

exports.post_nueva_rutina = (request, response, next) => {

    console.log(request.file);
    console.log(request.file.filename);
    
    const newRutina = new Rutina({
      nombre: request.body.nombre_rutina,
      descripcion: request.body.descripcion,
      tiporutina: request.body.tiporutina,
      URL_Image: request.file.filename
    });
  
    // Verificar si existe una rutina con el mismo nombre
    Rutina.fetchOneByNombre(request.body.nombre_rutina)
      .then(([rutinas, fieldData]) => {
        if (rutinas.length > 0) {
          // Si existe una rutina con el mismo nombre, muestra un mensaje de error
          return response.status(400).send("Ya existe una rutina con este nombre.");
        }
  
        // Si no existe una rutina con el mismo nombre, guarda la nueva rutina
        return newRutina.save();
      })
      .then(([rows, fieldData]) => {
        // Obtén el ID de la nueva rutina insertada
        const id_rutina = rows.insertId;
  
        // Recorre los ejercicios enviados en el formulario
        const ejercicios = JSON.parse(request.body.ejercicios);
        const promises = ejercicios.map(ejercicio => {
          // Guarda cada ejercicio en la tabla 'rutinaejercicios'
          const newRutinaEjercicio = new RutinaEjercicio({
            id_rutina: id_rutina,
            id_ejercicio: ejercicio.id_ejercicio,
            series: ejercicio.series,
            repeticiones: ejercicio.repeticiones,
            dia: ejercicio.dia
          });
  
          return newRutinaEjercicio.save();
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
  };
  