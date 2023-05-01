const Rutina = require('../models/rutinas.model');
const Ejercicio= require('../models/ejercicios.model');
const RutinaEjercicio= require ('../models/rutina_ejercicio.model');
const RutinaNivel = require('../models/rutina_nivel.model');
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
            console.log(rutinasFavs);
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

exports.visualizar_rutinas = (request, response, next) => {
    request.session.id_rutina = request.params.id;
    Rutina.fetchOne(request.params.id)
        .then(([rutinas, fieldData]) => {
            const niveles = {
                Principiante: false,
                Intermedio: false,
                Avanzado: false
            };

            for (let rutina of rutinas) {
                niveles[rutina.nombreNivel] = true;
            }

            RutinaEjercicio.fetchOne(request.params.id)
                .then(([rutinas_ejercicios, fieldData]) => {
                    Ejercicio.fetchOne(request.params.id)
                        .then(([ejercicios, fieldData]) => {
                            response.render('rutinas/rutina_detalles', {
                                rutina: rutinas,
                                nombreRutina: rutinas[0].nombreRutina,
                                rutina_ejercicio: rutinas_ejercicios,
                                ejercicio: ejercicios,
                                niveles: niveles,
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
        console.log("Console de seleccionar");
        console.log(request.session.id_rutina);
        //console.log(cliente[0].id_rutina);
        Rutina.fetchOne(request.session.id_rutina)
        .then(([rutina, fieldData]) => {
            console.log(cliente[0].id_rutina);
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

exports.registrar_rutina_favorita = (request, response, next) => {
    Cliente.fetchOne(request.session.nombre_usuario)
    .then(([cliente, fieldData]) => {
        console.log(request.body.id_rutina)
        Rutina.saveFavorita(cliente[0].id_cliente, request.body.id_rutina)
        .then(([rows, fieldData]) =>{
            response.redirect('/rutinas');
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
}

exports.eliminar_rutina_favorita = (request, response, next) => {
    Cliente.fetchOne(request.session.nombre_usuario)
    .then(([cliente, fieldData]) => {
        console.log(request.body.id_rutina_fav)
        Rutina.deleteFavorita(cliente[0].id_cliente, request.body.id_rutina_fav)
        .then(([rows, fieldData]) =>{
            response.redirect('/rutinas');
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
}

exports.nueva_rutina = (request, response, next) => {
    Ejercicio.fetchAll()
    .then(([rows, fieldData]) => {
        Rutina.fetchAll(request.session.nombre_usuario)
        .then(([rutinas, fieldData]) => {
            Rutina.fetchAllFavoritas(request.session.nombre_usuario)
            .then(([rutinasFavs, fieldData]) => {
                response.render('rutinas/agregar_rutinas',{
                    ejercicios: rows,
                    rutinas: rutinas,
                    rutinasFavs: rutinasFavs,
                    isLoggedIn: request.session.isLoggedIn || false,
                    nombre: request.session.nombre_usuario || '',
                    rol: request.session.rol,
                });
            })
            .catch(error=>console.log(error));
        })
        .catch(error=>console.log(error));
    })
    .catch(error=>console.log(error));
}


exports.post_nueva_rutina = (request, response, next) => {
    
    const newRutina = new Rutina({
      nombre: request.body.nombre_rutina,
      descripcion: request.body.descripcion,
      frecuencia: request.body.frecuencia,
      tiporutina: request.body.tiporutina,
      UURL_Image: request.files['imagen'] && request.files['imagen'][0] ? request.files['imagen'][0].filename : '',
      URL_Image_Ejercicios: request.files['file'] && request.files['file'][0] ? request.files['file'][0].filename : ''
    });
  
    // Verificar si existe una rutina con el mismo nombre
    Rutina.fetchOneByNombre(request.body.nombre_rutina)
    .then(([rutinas, fieldData]) => {
        // Si no existe una rutina con el mismo nombre, guarda la nueva rutina
        return newRutina.save();
    })
    .then(([rows, fieldData]) => {
        // Obtén el ID de la nueva rutina insertada
        const id_rutina = rows.insertId;
        request.session.id_rutina = id_rutina;
        // Recorre los ejercicios enviados en el formulario
        const ejercicios = JSON.parse(request.body.ejercicios);
        let promises = ejercicios.map(ejercicio => {
            // Guarda cada ejercicio en la tabla 'rutinaejercicios'
            const newRutinaEjercicio = new RutinaEjercicio({
                id_rutina: id_rutina,
                id_ejercicio: ejercicio.id_ejercicio,
            });
            return newRutinaEjercicio.save();
        });
        // Espera a que todos los ejercicios se guarden en la base de datos
        return Promise.all(promises);
    })
    .then(() => {
        const niveles = request.body.niveles;
        const arr = niveles.split(",");
        console.log(arr);
        let counter = 0;
        let promises = arr.map(nivel => {
            counter = counter + 1;
            console.log(nivel);
            console.log(counter);
            if (nivel == "true"){
                console.log("Nivel is true");
                const newRutinaNivel = new RutinaNivel({
                    id_rutina: request.session.id_rutina,
                    id_nivel: counter
                })
                return newRutinaNivel.save();
            }
        });
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

exports.delete_rutina = (request, response, next) => {
    const id_rutina = request.session.id_rutina;
    console.log(id_rutina); 
    Rutina.delete(id_rutina)
    .then(() => {
        // Si la eliminación fue exitosa, redirige al usuario a la página de inicio o a otra página que desees.
        response.render('/');
    })
    .catch((error) => {
        // Si se produce algún error, maneja la excepción de alguna manera, como mostrando un mensaje de error en la página.
        console.log(error);
        response.status(500).send("Error al eliminar la rutina");
    });
};  

exports.delete_rutina = (request, response, next) => {
    console.log("Console de eliminar");
    console.log(request.session.id_rutina);
    const id_rutina = request.session.id_rutina;
    console.log(id_rutina)
    Rutina.delete(id_rutina)
    .then(([rutina, fieldData]) => {
        Rutina.fetchAll(request.session.nombre_usuario)
        .then(([rutinasAll, fieldData]) => {
            let mensaje = "Rutina eliminada exitosamente"
            response.render('rutinas/rutinas', {
                rutina: rutina,
                rutinas: rutinasAll,
                isLoggedIn: request.session.isLoggedIn || false,
                nombre: request.session.nombre_usuario || '',
                rol: request.session.rol,
                mensaje: mensaje
            });
        })
    })
    .catch(error => console.log(error));
};