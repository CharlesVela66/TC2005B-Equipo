const Ejercicio = require('../models/ejercicios.model');

function validarDescripcion(descripcion) {
    const patron = /^[a-zA-Z\s]*$/;
    return patron.test(descripcion);
  }

function embedLink(link) {
    var newLink = link.replace("watch?v=", "embed/");
    return newLink;
  } 

function addHttps(link) {
    if (!link.includes("https://www.") && !link.includes("http://www.")) {
      link = "https://www." + link;
    }
    return link;
  }

 
  function validarYoutubeUrl(url) {
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
        if (ejercicios_consulta.length == 1) {

            const ejercicio = new Ejercicio({
                id_ejercicio: ejercicios_consulta[0].id_ejercicio,
                descripcion: ejercicios_consulta[0].descripcion,
                video_ejercicio: ejercicios_consulta[0].video_ejercicio,
            });
            Ejercicio.fetchAll()
            .then(([rows, fieldData]) => {
                response.render('ejercicios/editar', {
                    ejercicios: rows,
                    isLoggedIn: request.session.isLoggedIn || false,
                    nombre: request.session.nombre_usuario || '',
                    rol: request.session.rol,
                    ejercicio: ejercicio || false,
                });
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
    const video_ejercicio = request.body.video_ejercicio.trim();
  
    if (!descripcion || !video_ejercicio) {
      request.session.mensaje = "Por favor complete ambos campos.";
      response.redirect('/ejercicios');
      return;
    }
  
    if (!validarDescripcion(descripcion)) {
      request.session.mensaje = "La descripción solo puede contener letras y espacios.";
      response.redirect('/ejercicios');
      return;
    }
    
    const nuevoEnlace = embedLink(video_ejercicio);
  
    const nuevoNuevoEnlace = addHttps(nuevoEnlace);

    if (!validarYoutubeUrl(nuevoNuevoEnlace)) {
        request.session.mensaje = "La URL de YouTube no es válida. Debe tener el formato https://www.youtube.com/watch?v=XxXxxXxxXxx o youtube.com/watch?v=XxXxxXxxXxx";
        response.redirect('/ejercicios');
        return;
      }
   console.log(id)
    Ejercicio.fetchOneByDescripcion(descripcion)
      .then(([rows, fieldData]) => {
        if (rows.length > 0) {
          request.session.mensaje = "Ya existe un ejercicio con la misma descripción.";
          response.redirect('/ejercicios');
        } else {
          Ejercicio.fetchOne(id)
            .then(([ejercicios_consulta, fieldData]) => {
              if (ejercicios_consulta.length == 1) {
                const ejercicio = new Ejercicio({
                  id_ejercicio: id,
                  descripcion: descripcion,
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
    const video_ejercicio = request.body.video_ejercicio.trim();
    
    if (!descripcion || !video_ejercicio) {
      request.session.mensaje = "Por favor complete ambos campos.";
      response.redirect('/ejercicios');
      return;
    }
  
    if (!validarDescripcion(descripcion)) {
      request.session.mensaje = "La descripción solo puede contener letras y espacios.";
      response.redirect('/ejercicios');
      return;
    }

    const nuevoEnlace = embedLink(video_ejercicio);

    const nuevoNuevoEnlace = addHttps(nuevoEnlace);

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
