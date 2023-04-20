const Dieta = require('../models/dietas.model');
const Rutina = require('../models/rutinas.model')
const Cliente = require('../models/clientes.model');
const Objetivo = require('../models/objetivos.model');
const NivelFisico = require('../models/niveles.model');
const Usuario = require('../models/usuario.model');
const Administrador = require('../models/administrador.model');

//Get
exports.get_editarPerfil = (request, response, next) => {
    Usuario.fetchOne(request.session.nombre_usuario)
    .then(([usuarios, fieldData]) => {
        const usuario = usuarios[0];
        response.render('perfil/editar_info', {
            usuario: usuario,
            isLoggedIn: request.session.isLoggedIn || false,
            nombre: request.session.nombre_usuario || '',
            rol: request.session.rol,
        });
    })
    .catch((error) => {
        console.log(error);
        response.redirect('/ver_info');
    });
};
//Post
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
};

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
/*
function verInfo(request, response, next) {
    if (request.session.id_rol === 1) {
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
    } else if (request.session.id_rol === 2) {
      Usuario.fetchOne(request.session.nombre_usuario)
        .then(([usuarios, fieldData]) => {
          response.render('perfil/ver_info', {
            infoUsuario: usuarios[0],
            isLoggedIn: request.session.isLoggedIn || false,
            nombre: request.session.nombre_usuario || '',
            rol: request.session.rol,
          });
        })
        .catch(err => console.log(err));
    } else {
      // si el rol no es cliente ni usuario, redirige a una página de acceso no autorizado
      response.redirect('/acceso-no-autorizado');
    }
  }
  */
