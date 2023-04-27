const Dieta = require('../models/dietas.model');
const Rutina = require('../models/rutinas.model')
const Cliente = require('../models/clientes.model');
const Objetivo = require('../models/objetivos.model');
const NivelFisico = require('../models/niveles.model');
const Usuario = require('../models/usuario.model');
const Administrador = require('../models/administrador.model');
const db = require('../util/database');

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

exports.verCliente = (request, response, next) => {
  Cliente.fetchOne(request.session.nombre_usuario)
    .then(([clientes, fieldData]) => {
      console.log(clientes);
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
                  response.render('perfil/editar_info', {
                    cliente: clientes[0],
                    usuario: usuarios[0],
                    objetivos: objetivos,
                    nivelesFisicos: nivelesFisicos,
                    isLoggedIn: request.session.isLoggedIn || false,
                    nombre: request.session.nombre_usuario || '',
                    id: request.session.id_usuario,
                    rol: request.session.rol,
                  });
                }).catch((error) => console.log(error));
            }).catch((error) => console.log(error));
        }).catch((error) => console.log(error));
    }).catch((error) => console.log(error));
};


exports.post_editarPerfil = async (request, response, next) => {
  const nombre_usuario = request.session.nombre_usuario;
  const idCliente = await Cliente.getIdCliente(nombre_usuario);
  //console.log(' console log')
  console.log(nombre_usuario);
  const nombre = request.body.nombre;
  // console.log(nombre);
  const apellido = request.body.apellido;
  //console.log(apellido);
  const sexo = request.body.sexo;
  //console.log(sexo);
  const fecha_nacimiento = request.body.fecha_nacimiento;
  //console.log(fecha_nacimiento);
  const alturaInic = parseFloat(request.body.alturaInic);
  //console.log(alturaInic);
  const id_obj = parseInt(request.body.objetivo);
  //console.log(id_obj);
  const id_niv = parseInt(request.body.nivelFisico);
  //console.log(id_niv);
  const foto_perfil = request.file ? request.file.filename : '';
  //console.log(foto_perfil);
  
  Usuario.fetchOne(nombre_usuario)
    .then(([usuarios, fieldData]) => {
      if (usuarios.length > 0) {
        const usuario = usuarios[0];

   //Instanciamos un nuevo usuario, donde ponemos por default aquellos datos que no queremos que se modifiquen
   const updatedUsuario = new Usuario({
     id_usuario: usuario.id_usuario,
     nombre_usuario: usuario.nombre_usuario,
     nombre: nombre,
     apellido: apellido,
     //Si el cliente no ingresa foto de perfil, se toma por default la foto que ya estaba en su base de datos.
     foto_perfil: foto_perfil || usuario.foto_perfil,
   });
   console.log(idCliente);
  
   //Guardamos primero al usuario, pasándole el usuario instanciado que creamos anteriormente
  updatedUsuario.updateUsuarioData()
    .then(() => {
      console.log('console log');
      //Retornamos al cliente para poder editarlo
      return Cliente.fetchOne(nombre_usuario);
    })
    .then(([clientes, fieldData]) => {
      if (clientes.length > 0) {
        const cliente = clientes[0];
        console.log(cliente);
        //Instanciamos un nuevo cliente, donde ponemos por default aquellos datos que no queremos que se modifiquen
        const updatedCliente = new Cliente({
          id_usuario: cliente.id_usuario,
          id_rutina: cliente.id_rutina,
          id_dieta: cliente.id_dieta,
          id_obj: id_obj,
          id_niv: id_niv,
          sexo: sexo,
          fecha_nacimiento: fecha_nacimiento,
          alturaInic: alturaInic,
          pesoInic: cliente.pesoInic,
        });
        //Le pasamos el cliente instanciado a nuestro modelo que actualiza al cliente
        return updatedCliente.updateClienteData();
      } else {
        throw new Error('Cliente no encontrado');
      }
    })
    .then(() => {
      response.redirect('/perfil/ver_info');
    })
    .catch((error) => {
      console.log(error);
      response.redirect('/perfil/editar_info');
    });
} else {
  response.redirect('/perfil/editar_info');
}
    })
    .catch ((error) => {
  console.log(error);
  response.redirect('/perfil/editar_info');
});
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