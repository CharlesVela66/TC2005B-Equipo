const Dieta = require('../models/dietas.model');
const Rutina = require('../models/rutinas.model')
const Cliente = require('../models/clientes.model');
const Objetivo = require('../models/objetivos.model');
const NivelFisico = require('../models/niveles.model');
const Usuario = require('../models/usuario.model');
const Administrador = require('../models/administrador.model');

exports.ver_perfil = (request, response, next) => {
    Cliente.fetchOne(request.session.nombre_usuario)
    .then(([clientes, fieldData]) => {
        let dietasRows = new Array;
        let rutinasRows = new Array;
        Dieta.fetchAllFavoritas(request.session.nombre_usuario)
        .then(([rows, fieldData]) => {
            dietasRows.push(rows);
            Rutina.fetchAllFavoritas(request.session.nombre_usuario)
            .then(([rows, fieldData]) => {
                rutinasRows.push(rows);
                console.log(rutinasRows[0]);
                console.log(dietasRows[0]);
                response.render('perfil/perfil', {
                    infoCliente: clientes[0],
                    dieta: dietasRows[0], 
                    rutina: rutinasRows[0],
                    isLoggedIn: request.session.isLoggedIn || false,
                    nombre: request.session.nombre_usuario || '',
                    rol: request.session.rol,
                })
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    })
}

exports.verCliente = (request, response, next) =>{
    Cliente.fetchOne(request.session.nombre_usuario)
    .then(([clientes, fieldData]) => {
        response.render('perfil/ver_info', {
            infoCliente: clientes[0],
            isLoggedIn: request.session.isLoggedIn || false,
            nombre: request.session.nombre_usuario || '',
            rol: request.session.rol,
        });
    })
    .catch(err => console.log(err));
};

exports.verAdministrador = (request, response, next) => {
    Administrador.fetchOne(request.session.nombre_usuario)
    .then(([admins, fieldData]) => {
        response.render('admin/ver-info', {
            infoAdmins: admins[0],
            isLoggedIn: request.session.isLoggedIn || false,
            nombre: request.session.nombre_usuario || '',
            rol: request.session.rol,
        });
    })
    .catch(err => console.log(err));
};

exports.get_editarPerfil = (request, response, next) => {
  Cliente.fetchOne(request.session.nombre_usuario)
  .then(([clientes, fieldData]) => {
    Usuario.fetchOne(request.session.nombre_usuario)
    .then(([usuarios, fieldData]) => {
      console.log(clientes)
      Objetivo.fetchAll()
      .then(([objetivos]) => {
        console.log(objetivos)
        NivelFisico.fetchAll()
        .then(([nivelesFisicos]) => {
          console.log(nivelesFisicos)
          response.render("perfil/editar_info", {
            cliente: clientes[0],
            usuario: usuarios[0],
            objetivos: objetivos,
            nivelesFisicos: nivelesFisicos,
            isLoggedIn: request.session.isLoggedIn || false,
            nombre: request.session.nombre_usuario || "",
            rol: request.session.rol,
          });  
        }).catch((error) => console.log(error));
      }).catch((error) => console.log(error));
    }).catch((error) => console.log(error));
  }).catch((error) => console.log(error));
};

exports.post_editarPerfil = (request, response, next) => {
  //const { nombre, apellido, sexo, alturaInic, fecha_nacimiento, objetivo, nivelFisico } = request.body;
  const nombre = request.body.nombre;
  const apellido = request.body.apellido;
  const sexo = request.body.sexo;
  const alturaInic = request.body.alturaInic;
  const fecha_nacimiento = request.body.fecha_nacimiento;
  const objetivo = request.body.id_obj;
  const nivelFisico = request.body.id_niv;

  const id_usuario = request.session.id_usuario;
  const foto_perfil = request.file ? request.file.filename : '';

  // Actualizar los datos del cliente
  Cliente.updateClienteData({
      id_usuario: id_usuario,
      nombre: nombre,
      apellido: apellido,
      sexo: sexo,
      fecha_nacimiento: fecha_nacimiento,
      alturaInic: alturaInic,
      foto_perfil: foto_perfil || null,
      id_obj: objetivo, // Agregar la actualización del objetivo
      id_niv: nivelFisico, // Agregar la actualización del nivel físico
  })
  .then(() => {
      // Redireccionar a la página de edición del perfil 
      response.redirect('/perfil');
  }).catch((error) => console.log(error));
};

// Ruta para mostrar la vista de edición del perfil de administrador
exports.get_editarPerfilAdmin = (request, response, next) => {
    // Obtener los datos del usuario administrador desde la base de datos
    Usuario.fetchOne(request.session.nombre_usuario)
      .then(([rows]) => {
        // Renderizar la vista con los datos del usuario administrador
        response.render('admin/editar-info', {
            pageTitle: 'Editar perfil administrador',
            usuario: rows[0],
            isLoggedIn: request.session.isLoggedIn || false,
            nombre: request.session.nombre_usuario || '',
            rol: request.session.rol,
        });
      })
      .catch((err) => console.log(err));
  };
  
  // Ruta para procesar los datos editados del perfil de administrador
  exports.post_editarPerfilAdmin = (request, response, next) => {
    // Obtener los datos del usuario administrador desde la base de datos
    Usuario.fetchOne(request.session.nombre_usuario)
      .then(([rows]) => {
        // Actualizar los datos del usuario administrador
        rows[0].nombre = request.body.nombre;
        rows[0].apellido = request.body.apellido;
        rows[0].foto_perfil = request.body.foto_perfil;
  
        // Guardar los cambios en la base de datos
        return rows[0].save();
      })
      .then(() => {
        // Redireccionar a la página de perfil del administrador
        response.redirect('/ver-info');
      })
      .catch((err) => console.log(err));
  };