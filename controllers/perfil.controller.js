const Dieta = require('../models/dietas.model');
const Rutina = require('../models/rutinas.model')
const Cliente = require('../models/clientes.model');
const Objetivo = require('../models/objetivos.model');
const NivelFisico = require('../models/niveles.model');
const Usuario = require('../models/usuario.model');
const Administrador = require('../models/administrador.model');

//Get
/*
exports.get_editarPerfil = async (request, response, next) => {
    try {
      const [clientes, fieldData] = await Cliente.fetchOne(request.session.nombre_usuario);
      if (clientes.length == 1) {
        const cliente = new Cliente({
          usuario: clientes[0].id_usuario,
          rutina: clientes[0].id_rutina,
          dieta: clientes[0].id_dieta,
          obj: clientes[0].id_obj,
          niv: clientes[0].id_niv,
          sexo: clientes[0].sexo,
          fecha_nacimiento: clientes[0].fecha_nacimiento,
          alturaInic: clientes[0].alturaInic,
          pesoInic: clientes[0].pesoInic,
        });
        const [usuario, _] = await Usuario.fetch(cliente.usuario);
        response.render('perfil/editar_info', {
          obj: objetivos,
          objP: objetivoP,
          nivP: nivelP,
          niv: niveles,
          isLoggedIn: request.session.isLoggedIn || false,
          cliente: cliente || false,
          rol: request.session.rol,
          usuario: usuario[0],
        });
      } else {
        return response.redirect('/perfil/editar_info');
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  exports.post_editarPerfil = async (request, response, next) => {
    try {
      const [clientes, fieldData] = await Cliente.fetchOne(request.session.nombre_usuario);
      if (clientes.length == 1) {
        const cliente = new Cliente({
          usuario: clientes[0].id_usuario,
          rutina: request.body.rutina,
          dieta: request.body.dieta,
          obj: request.body.obj,
          niv: request.body.niv,
          sexo: request.body.sexo,
          fecha_nacimiento: request.body.fecha_nacimiento,
          alturaInic: request.body.alturaInic,
          pesoInic: request.body.pesoInic,
        });
        const [usuario, _] = await Usuario.fetch(cliente.usuario);
        await Usuario.update({
          id_usuario: cliente.usuario,
          nombre: request.body.nombre,
          apellido: request.body.apellido,
          correo: request.body.correo,
          foto_perfil: request.file ? request.file.filename : usuario[0].foto_perfil,
        });
        await Cliente.update(cliente);
        return response.redirect('/perfil/editar_info');
      } else {
        return response.redirect('/perfil/editar_info');
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  Usuario.update = async (usuario) => {
    try {
      const [results, _] = await db.execute(`
        UPDATE usuario SET
        nombre = ?,
        apellido = ?,
        correo = ?,
        foto_perfil = ?
        WHERE id_usuario = ?
      `, [usuario.nombre, usuario.apellido, usuario.correo, usuario.foto_perfil, usuario.id_usuario]);
      return results.affectedRows;
    } catch (error) {
      console.log(error);
      return -1;
    }
  };*/
/*
exports.get_editarPerfil = (request, response, next) => {
    Cliente.fetchOne(request.session.nombre_usuario)
      .then(([clientes, fieldData]) => {
        if (clientes.length == 1) {
          const cliente = new Cliente({
            usuario: clientes[0].id_usuario,
            rutina: clientes[0].id_rutina,
            dieta: clientes[0].id_dieta,
            obj: clientes[0].id_obj,
            niv: clientes[0].id_niv,
            sexo: clientes[0].sexo,
            fecha_nacimiento: clientes[0].fecha_nacimiento,
            alturaInic: clientes[0].alturaInic,
            pesoInic: clientes[0].pesoInic,
          });
  
          Promise.all([
            Objetivo.fetchAll(),
            Objetivo.fetchById(cliente.obj),
            NivelFisico.fetchAll(),
            NivelFisico.fetchById(cliente.niv),
          ])
            .then(([objetivos, objetivoP, niveles, nivelP]) => {
              response.render('perfil/editar_info', {
                obj: objetivos,
                objP: objetivoP,
                nivP: nivelP,
                niv: niveles,
                isLoggedIn: request.session.isLoggedIn || false,
                cliente: cliente || false,
                rol: request.session.rol,
              });
            })
            .catch((error) => console.log(error));
        } else {
          return response.redirect('/perfil/editar_info');
        }
    })
    .catch((error) => console.log(error));
};*/
  
/*
exports.get_editarPerfil = (request, response, next) => {
    Cliente.fetchOne(request.session.nombre_usuario)
    .then(([clientes, fieldData]) => {
        if (clientes.length == 1) {
            const cliente = new Cliente ({
                usuario: clientes[0].id_usuario,
                rutina: clientes[0].id_rutina,
                dieta: clientes[0].id_dieta,
                obj: clientes[0].id_obj,//obj: clientes[0].obj,
                niv: clientes[0].id_niv,//niv: clientes[0].niv,
                sexo: clientes[0].sexo,
                fecha_nacimiento: clientes[0].fecha_nacimiento,
                alturaInic: clientes[0].alturaInic,
                pesoInic: clientes[0].pesoInic
            });
            Objetivo.fetchAll()
            .then(([objetivos, fieldData]) => {
                Objetivo.fetchById(cliente.obj)
                .then(([objetivoP, fieldData]) => {
                    NivelFisico.fetchAll()
                    .then(([niveles, fieldData]) => {
                        NivelFisico.fetchById(cliente.niv)
                        .then(([nivelP, fieldData]) => {
                            response.render('perfil/editar_info', {
                                obj: objetivos,
                                objP: objetivoP,
                                nivP: nivelP,
                                niv: niveles,
                                isLoggedIn: request.session.isLoggedIn || false,
                                cliente: cliente || false,
                                rol: request.session.rol
                            });
                        }).catch(error => console.log(error));
                    }).catch(error => console.log(error));
                }).catch(error => console.log(error));
            }).catch(error => console.log(error));
        } else {
            return response.redirect('/perfil/editar_info');
        }
    }).catch(error => console.log(error));
}*/
/*
exports.get_editarPerfil = (request, response, next) => {
    Cliente.fetchOne(request.session.nombre_usuario)
    .then(([clientes, fieldData]) => {
        if (clientes.length == 1) {
            const cliente = new Cliente ({
                usuario: clientes[0].id_usuario,
                rutina: clientes[0].id_rutina,
                dieta: clientes[0].id_dieta,
                obj: clientes[0].id_obj,
                niv: clientes[0].id_niv,
                sexo: clientes[0].sexo,
                fecha_nacimiento: clientes[0].fecha_nacimiento,
                alturaInic: clientes[0].alturaInic,
                pesoInic: clientes[0].pesoInic
            });
            Objetivo.fetchAll()
            .then(([objetivos, fieldData]) => {
                NivelFisico.fetchAll()
                .then(([niveles, fieldData]) => {
                    response.render('perfil/editar_info', {
                        obj: objetivos,
                        niv: niveles,
                        isLoggedIn: request.session.isLoggedIn || false,
                        cliente: cliente || false,
                        rol: request.session.rol
                    });
                }).catch(error => console.log(error));
            }).catch(error => console.log(error));
        } 
        else {
            return response.redirect('/perfil/editar_info');
        }
    })
}*/
//Post
/*
exports.post_editarPerfil = (request, response, next) => {
    //request.body para poder acceder a los datos del cliente  y almacenarlo en la DB
    const { nombre, apellido, nombre_usuario, correo, foto_perfil} = request.body;
    
    Usuario.fetchOne(req.session.nombre_usuario)
    .then(([usuarios, fieldData]) => {
        if (rows.length == 1) {
            const usuario = new Usuario({
                id_usuario: usuarios[0].id_usuario,
                nombre: nombre || usuarios[0].nombre,
                apellido: apellido || usuarios[0].apellido,
                nombre_usuario: nombre_usuario || usuarios[0].nombre_usuario,
                correo: correo || usuarios[0].correo,
                foto_perfil: foto_perfil || usuarios[0].foto_perfil,
            });
            usuario.save().then(() => {
                request.session.nombre_usuario = usuario.nombre_usuario;
                response.redirect('/ver_info');
            })
            .catch((error) => {
                console.log(error);
                response.redirect('/editar/perfil');
            });
        }
    })
    .catch((error) => console.log(error));
};

exports.editarObjetivo = (request, response, next) => {
    //request.body para poder acceder a los datos del cliente  y almacenarlo en la DB
    const { objetivo } = request.body;

    Usuario.fetchOne(request.session.nombre_usuario)
    .then(([usuarios, fieldData]) => {
        if (usuarios.length == 1) {
            const usuario = new Usuario({
                id_usuario: usuarios[0].id_usuario,
            });

            Objetivo.fetchOne(objetivo)
            .then(([objetivoRow]) => {
                const objetivo_id = objetivoRow[0].id_obj;
                db.execute(
                    `UPDATE cliente SET id_obj = ? WHERE id_usuario = ?`,
                    [objetivo_id, usuario.id_usuario]
                )
                .then(() => {
                    response.redirect('/perfil');
                })
                .catch((error) => {
                    console.log(error);
                    response.redirect('/editar');
                });
            });
        }
    })
    .catch((error) => console.log(error));
};

exports.editarNivelFisico = (request, response, next) => {
    //request.body para poder acceder a los datos del cliente  y almacenarlo en la DB
    const { nivel_fisico } = request.body;
  
    Usuario.fetchOne(request.session.nombre_usuario)
    .then(([rows, fieldData]) => {
        if (rows.length == 1) {
            const usuario = new Usuario({
                id_usuario: rows[0].id_usuario,
            });
  
            NivelFisico.fetchOne(nivel_fisico).then(([nivelRow]) => {
                const nivel_id = nivelRow[0].id_niv;
                db.execute(
                    `UPDATE cliente SET id_niv = ? WHERE id_usuario = ?`,
                    [nivel_id, usuario.id_usuario]
                )
                .then(() => {
                    response.redirect('/perfil');
                })
                .catch((error) => {
                    console.log(error);
                    response.redirect('/editar');
                });
            });
        }
    })
    .catch((error) => console.log(error));
};*/

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


