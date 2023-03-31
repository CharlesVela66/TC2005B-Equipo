const Alimento = require('../models/alimentos.model');

function validarNombre(nombre) {
    const patron = /^[a-zA-Z\s]*$/;
    return patron.test(nombre);
  }

exports.get_alimentos = (request, response, next) => {
    Alimento.fetchAll()
    .then(([rows, fieldData]) => {
        response.render('alimentos/agregar_alimentos', {
            alimentos: rows,
            isLoggedIn: request.session.isLoggedIn || false,
            nombre: request.session.nombre_usuario || '',
            rol: request.session.rol,
        });
    })
    .catch(error => console.log(error));
}

exports.post_alimentos = (request, response, next) => {
    const nombre = request.body.nombre.trim();
    const medida = request.body.medida.trim();
  
    if (!validarNombre(nombre)) {
      request.session.mensaje = "El nombre solo puede contener letras y espacios.";
      response.redirect('/alimentos');
      return;
    }
  
    Alimento.fetchOneByNombre(nombre)
      .then(([rows, fieldData]) => {
        if (rows.length > 0) {
          request.session.mensaje = "Ya existe un alimento con el misma nombre.";
          response.redirect('/alimentos');
        } else {
          const alimento = new Alimento({
            nombre: nombre,
            medida: medida,
          });
  
          alimento.save()
            .then(([rows, fieldData]) => {
              request.session.mensaje = "El alimento fue registrado exitosamente.";
              response.redirect('/alimentos');
            })
            .catch((error) => {
              console.log(error);
              request.session.mensaje = "Error al registrar el alimento.";
              response.redirect('/alimentos');
            });
        }
      })
      .catch(error => console.log(error));
  };


exports.ver_alimentos = (request, response, next) => {
    
    let mensaje = '';

    if (request.session.mensaje) {
        mensaje = request.session.mensaje;
        request.session.mensaje = '';
    }

    Alimento.fetchAll()
    .then(([rows, fieldData]) => {
        response.render('alimentos/alimentos', {
            alimentos: rows,
            isLoggedIn: request.session.isLoggedIn || false,
            nombre: request.session.nombre_usuario || '',
            rol: request.session.rol,
            mensaje: mensaje
        });
        
    })
    .catch(error => console.log(error));
}
