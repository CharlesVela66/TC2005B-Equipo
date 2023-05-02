const Dieta = require('../models/dietas.model');
const Rutina = require('../models/rutinas.model')
const Cliente = require('../models/clientes.model');
const Objetivo = require('../models/objetivos.model');
const NivelFisico = require('../models/niveles.model');
const Usuario = require('../models/usuario.model');
const Administrador = require('../models/administrador.model');
const ClienteMedicion = require('../models/cliente_medicion.model');

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
      const id_cliente = clientes[0].id_cliente;
      ClienteMedicion.ultimaMedicionPeso(id_cliente)
        .then(([medPeso, fieldData]) => {
          console.log("Log de peso");
          const peso = medPeso.length > 0 ? medPeso[0].medida : clientes[0].pesoInic;
          console.log(peso);

          // Cálculo del GMB según el sexo del cliente
          const sexo = clientes[0].sexo;
          let gmb;
          if (sexo === 'M') {
            gmb = 9.99 * peso + 6.25 * clientes[0].alturaInic - 4.92 * getAge(clientes[0].fecha_nacimiento) + 5;
          } else if (sexo === 'F') {
            gmb = 9.99 * peso + 6.25 * clientes[0].alturaInic - 4.92 * getAge(clientes[0].fecha_nacimiento) - 161;
          }

          // Obtener nivel físico del cliente
          const id_niv = clientes[0].id_niv;
          NivelFisico.fetchOne(id_niv)
            .then(([nivelfisico, fieldData]) => {
              console.log(nivelfisico);
              const porcentaje = nivelfisico[0].porcentaje;
              console.log(porcentaje);

              // Cálculo de las calorías consumidas por actividad física (AF)
              const af = gmb * (porcentaje / 100);
              console.log(af);

              // Cálculo de las calorías gastadas por termogénesis de los alimentos (TA)
              const ta = gmb * 0.1;
              console.log(ta);

              // Cálculo de las calorías recomendadas según el objetivo del cliente
              let caloriasRecomendadas = gmb;
              const id_obj = clientes[0].id_obj;
              if (id_obj === 1) {
                caloriasRecomendadas -= 500;
              } else if (id_obj === 3) {
                caloriasRecomendadas += 500;
              }
              console.log(caloriasRecomendadas);

              response.render("perfil/ver_info", {
                infoCliente: clientes[0],
                isLoggedIn: request.session.isLoggedIn || false,
                nombre: request.session.nombre_usuario || "",
                rol: request.session.rol,
                pesoUltimo: peso,
                gmb: gmb,
                af: af,
                ta: ta,
                caloriasRecomendadas: caloriasRecomendadas,
              });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

function getAge(dateString) {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

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

exports.get_editarPerfil = async (request, response, next) => {
  try {
    const [clientes, clientesFieldData] = await Cliente.fetchOne(request.session.nombre_usuario);
    const [usuarios, usuariosFieldData] = await Usuario.fetchOne(request.session.nombre_usuario);
    const [objetivos] = await Objetivo.fetchAll();
    const [nivelesFisicos] = await NivelFisico.fetchAll();

    console.log(clientes);
    console.log(objetivos);
    console.log(nivelesFisicos);

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
  } catch (error) {
    console.log(error);
  }
};

exports.post_editarPerfil = async (request, response, next) => {
  try {
    const nombre_usuario = request.session.nombre_usuario;
    console.log(nombre_usuario);
    const nombre = request.body.nombre;
    const apellido = request.body.apellido;
    const sexo = request.body.sexo;
    const fecha_nacimiento = request.body.fecha_nacimiento;
    const alturaInic = parseFloat(request.body.alturaInic);
    const id_obj = parseInt(request.body.objetivo);
    const id_niv = parseInt(request.body.nivelFisico);
    const foto_perfil = request.files['imagen'] && request.files['imagen'][0] ? request.files['imagen'][0].filename : '';

    const [usuarios, fieldData] = await Usuario.fetchOne(nombre_usuario);
    if (usuarios.length > 0) {
      const usuario = usuarios[0];

      // Comparamos los valores antiguos y nuevos de los campos del formulario para determinar si se hicieron cambios
      const cambiosRealizados =
        usuario.nombre !== nombre ||
        usuario.apellido !== apellido ||
        usuario.sexo !== sexo ||
        usuario.fecha_nacimiento !== fecha_nacimiento ||
        usuario.alturaInic !== alturaInic ||
        usuario.id_obj !== id_obj ||
        usuario.id_niv !== id_niv ||
        foto_perfil !== '';

      const updatedUsuario = new Usuario({
        id_usuario: usuario.id_usuario,
        nombre_usuario: usuario.nombre_usuario,
        nombre: nombre,
        apellido: apellido,
        foto_perfil: foto_perfil || usuario.foto_perfil,
      });
      
      await updatedUsuario.updateUsuarioData();
      const [clientes, fieldData] = await Cliente.fetchOne(nombre_usuario);

      if (clientes.length > 0) {
        const cliente = clientes[0];
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
        
        await updatedCliente.updateClienteData();
        if (cambiosRealizados) {
          request.session.mensaje = 'Los cambios se han añadido correctamente';
        }
        response.redirect('/perfil/ver_info');
      } else {
        throw new Error('Cliente no encontrado');
      }
    } else {
      response.redirect('/perfil/editar_info');
    }
  } catch (error) {
    console.log(error);
    response.redirect('/perfil/editar_info');
  }
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