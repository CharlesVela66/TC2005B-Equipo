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

exports.visualizar = (request, response, next) => {
    //console.log(request.params.id);
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

exports.get_ejercicios = (request, response, next) => {
    Ejercicio.fetchAll()
    .then(([rows, fieldData]) => {
        response.render('ejercicios/agregar_ejercicios', {
            ejercicios: rows,
            isLoggedIn: request.session.isLoggedIn || false,
            nombre: request.session.nombre_usuario || '',
            rol: request.session.rol,
        });
    })
    .catch(error => console.log(error));
}

exports.post_ejercicios = (request, response, next) => {
    const descripcion = request.body.descripcion.trim();
    const video_ejercicio = request.body.video_ejercicio.trim();
  
    if (!validarDescripcion(descripcion)) {
      request.session.mensaje = "La descripción solo puede contener letras y espacios.";
      response.redirect('/ejercicios');
      return;
    }
  
    const nuevoEnlace = embedLink(video_ejercicio);

    const nuevoNuevoEnlace = addHttps(nuevoEnlace);
  
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
