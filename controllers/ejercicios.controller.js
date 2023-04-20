const Ejercicio = require('../models/ejercicios.model');
const RutinaEjercicio = require('../models/rutina_ejercicio.model');

function validarDescripcion(descripcion) {
  const patron = /^[a-zA-Z\u00C0-\u00FF\s]*$/;
  return patron.test(descripcion);
}

//https://www.youtube.com/watch?v=PTO862T8U7Y&ab_channel=EntrenamientoDiferencial

function embedLink(link) {
  if (link) {
    var newLink = link.replace("watch?v=", "embed/");
    const idIndex = newLink.indexOf("embed/") + 6;
    if (newLink.length > idIndex + 11) {
      newLink = newLink.substring(0, idIndex + 11);
    }
    return newLink;
  }
  return '';
}

function addHttps(link) {
  if (link && !link.includes("https://www.") && !link.includes("http://www.")) {
    link = "https://www." + link;
  }
  return link;
}

function validarYoutubeUrl(url) {
  if (url === '') return true; // Si la URL está vacía, no es obligatoria
  const expectedPattern = /^https:\/\/www\.youtube\.com\/embed\/[\w-]+$/;

  if (expectedPattern.test(url)) {
    // La estructura de la URL es correcta
    return true;
  } else {
    // La estructura de la URL es incorrecta
    return false;
  }
}

 exports.get_editar = (request, response, next) => {

    Ejercicio.fetchOne(request.params.id)
    .then(([ejercicios_consulta, fieldData]) => {
      console.log(ejercicios_consulta);
        if (ejercicios_consulta.length == 1) {

            const ejercicio = new Ejercicio({
                id_ejercicio: ejercicios_consulta[0].id_ejercicio,
                descripcion_ejercicio: ejercicios_consulta[0].descripcion_ejercicio,
                descripcion: ejercicios_consulta[0].descripcion,
                video_ejercicio: ejercicios_consulta[0].video_ejercicio,
            });
            Ejercicio.fetchAll()
            .then(([rows, fieldData]) => {
              RutinaEjercicio.fetchAlll(ejercicios_consulta[0].id_ejercicio)
              .then(([rutinasEje, fieldData]) => {
                response.render('ejercicios/editar', {
                    ejercicios: rows,
                    isLoggedIn: request.session.isLoggedIn || false,
                    nombre: request.session.nombre_usuario || '',
                    rol: request.session.rol,
                    ejercicio: ejercicio || false,
                    rutinasEje: rutinasEje
                  });
                })
            }).catch(error => console.log(error));

        } else {
            return response.redirect('/ejercicios/editar');
        }
    })
    .catch(error => console.log(error));

};

exports.post_editar = (request, response, next) => {
    const id = request.body.id.trim();
    const descripcion = request.body.descripcion.trim();
    const descripcion_ejercicio = request.body.descripcion_ejercicio.trim();
    const video_ejercicio = request.body.video_ejercicio.trim();
  
    if (!descripcion || !descripcion_ejercicio) {
      request.session.mensaje = "Por favor complete los campos obligatorios.";
      response.redirect('/ejercicios');
      return;
    }
  
    if (!validarDescripcion(descripcion)) {
      request.session.mensaje = "El nombre solo puede contener letras y espacios.";
      response.redirect('/ejercicios');
      return;
    }
    
    const nuevoEnlace = embedLink(video_ejercicio);
  
    console.log(nuevoEnlace);
    const nuevoNuevoEnlace = addHttps(nuevoEnlace);

    if (!validarYoutubeUrl(nuevoNuevoEnlace)) {
        request.session.mensaje = "La URL de YouTube no es válida. Debe tener el formato https://www.youtube.com/watch?v=XxXxxXxxXxx o youtube.com/watch?v=XxXxxXxxXxx";
        response.redirect('/ejercicios');
        return;
      }
   console.log(id)
   Ejercicio.fetchOneByDescripcion(descripcion)
   .then(([rows, fieldData]) => {
     if (rows.length > 0 && rows[0].id_ejercicio != id) {
       request.session.mensaje = "Ya existe otro ejercicio con la misma descripción.";
       response.redirect('/ejercicios');
     } else {
          Ejercicio.fetchOne(id)
            .then(([ejercicios_consulta, fieldData]) => {
              if (ejercicios_consulta.length == 1) {
                const ejercicio = new Ejercicio({
                  id_ejercicio: id,
                  descripcion: descripcion,
                  descripcion_ejercicio: descripcion_ejercicio,
                  video_ejercicio: nuevoNuevoEnlace,
                });
                console.log(id)
                ejercicio.update()
                  .then(([rows, fieldData]) => {
                    request.session.mensaje = "El ejercicio fue actualizado exitosamente.";
                    response.redirect('/ejercicios');
                  })
                  .catch((error) => {
                    console.log(error);
                    request.session.mensaje = "Error al actualizar el ejercicio.";
                    response.redirect('/ejercicios');
                  });
              } else {
                return response.redirect('/ejercicios');
              }
            })
            .catch(error => console.log(error));
        }
      });
  };


exports.get_ejercicios = (request, response, next) => {
    
    Ejercicio.fetchAll()
    .then(([rows, fieldData]) => {
        response.render('ejercicios/agregar_ejercicios', {
            ejercicios: rows,
            isLoggedIn: request.session.isLoggedIn || false,
            nombre: request.session.nombre_usuario || '',
            rol: request.session.rol,
            ejercicio: false
        });
    })
    .catch(error => console.log(error));
}

exports.post_ejercicios = (request, response, next) => {
    const descripcion = request.body.descripcion.trim();
    const descripcion_ejercicio = request.body.descripcion_ejercicio.trim();
    const video_ejercicio = request.body.video_ejercicio.trim();
    
    if (!descripcion || !descripcion_ejercicio) {
      request.session.mensaje = "Por favor complete los campos obligatorios.";
      response.redirect('/ejercicios');
      return;
    }
  
    if (!validarDescripcion(descripcion)) {
      request.session.mensaje = "El nombre solo puede contener letras y espacios.";
      response.redirect('/ejercicios');
      return;
    }

    console.log(video_ejercicio)
    const nuevoEnlace = embedLink(video_ejercicio);
    
    const nuevoNuevoEnlace = addHttps(nuevoEnlace);

 console.log(nuevoNuevoEnlace);

    if (!validarYoutubeUrl(nuevoNuevoEnlace)) {
      request.session.mensaje = "La URL de YouTube no es válida. Debe tener el formato https://www.youtube.com/watch?v=XxXxxXxxXxx o youtube.com/watch?v=XxXxxXxxXxx";
      response.redirect('/ejercicios');
      return;
    }
    
    Ejercicio.fetchOneByDescripcion(descripcion)
      .then(([rows, fieldData]) => {
        if (rows.length > 0) {
          request.session.mensaje = "Ya existe un ejercicio con la misma descripción.";
          response.redirect('/ejercicios');
        } else {
          const ejercicio = new Ejercicio({
            descripcion: descripcion,
            descripcion_ejercicio: descripcion_ejercicio,
            video_ejercicio: nuevoNuevoEnlace, // Usamos el nuevo enlace de YouTube
          });
          
          ejercicio.save()
            .then(([rows, fieldData]) => {
              request.session.mensaje = "El ejercicio fue registrado exitosamente.";
              response.redirect('/ejercicios');
            })
            .catch((error) => {
              console.log(error);
              request.session.mensaje = "Error al registrar el ejercicio.";
              response.redirect('/ejercicios');
            });
        }
      })
      .catch(error => console.log(error));
  };


  exports.eliminar_ejercicios = (request, response, next) => {
    Ejercicio.delete(request.body.id)
    .then(([rows, fieldData]) => {
      Ejercicio.fetchAll()
      .then(([rows, fieldData]) => {
         let mensaje = "Ejercicio eliminado exitosamente"
          response.render('ejercicios/ejercicios', {
              ejercicios: rows,
              isLoggedIn: request.session.isLoggedIn || false,
              nombre: request.session.nombre_usuario || '',
              rol: request.session.rol,
              mensaje: mensaje
          });
  
      })
    })
    .catch(error => console.log(error));
  }

  exports.visualizar = (request, response, next) => {
    console.log(request.params.id);
    Ejercicio.fetchOne(request.params.id)
    .then(([ejercicio, fieldData]) => {
            response.render('ejercicios/contenido_e', {
                ejercicios: ejercicio,
                isLoggedIn: request.session.isLoggedIn || false,
                nombre: request.session.nombre_usuario || '',
                rol: request.session.rol,
            })
        })
    } 

exports.ver_ejercicios = (request, response, next) => {
   
    let mensaje = '';

    if (request.session.mensaje) {
        mensaje = request.session.mensaje;
        request.session.mensaje = '';
    }

    Ejercicio.fetchAll()
    .then(([rows, fieldData]) => {
        response.render('ejercicios/ejercicios', {
            ejercicios: rows,
            isLoggedIn: request.session.isLoggedIn || false,
            nombre: request.session.nombre_usuario || '',
            rol: request.session.rol,
            mensaje: mensaje
        });

    })
    .catch(error => console.log(error));

}
