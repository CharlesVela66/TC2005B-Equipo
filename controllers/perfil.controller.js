const Dieta = require('../models/dietas.model');
const Rutina = require('../models/rutinas.model')
const Cliente = require('../models/clientes.model');
//const Perfil =require('../models/perfil.model');
//const Usuario= require('../models/usuario.model');

/*exports.get_editar=(request, response, next) =>{

    Usuario.fetchOne(request.params.id)
    .then(([rows, fieldData]))=>{
        if(rows.length ==1){
            const usuario = new Usuario({
                nombre: nuevo_usuario.nombre,
                apellido: nuevo_usuario.apellido,
                nombre_usuario = nuevo_usuario.nombre_usuario,
                this.correo = nuevo_usuario.correo,
                this.contrasena = nuevo_usuario.contrasena,
                this.foto_perfil = nuevo_usuario.foto_perfil || null;
                this.sexo = nuevo_usuario.sexo;
                this.fecha_nacimiento = nuevo_usuario.fecha_nacimiento;
            })
        }
    }
};

exports.post_editar = (request, response, next) => {
    console.log("Datos para editar");
    console.log(request.body);

};*/

exports.ver_perfil = (request, response, next) => {
    let dietasRows = new Array;
    let rutinasRows = new Array;
    Dieta.fetchAllFavoritas(request.session.nombre_usuario)
    .then(([rows, fieldData]) => {
        dietasRows.push(rows[0]);
        Rutina.fetchAllFavoritas(request.session.nombre_usuario)
        .then(([rows, fieldData]) => {
            rutinasRows.push(rows[0]);
            response.render('perfil/perfil', {
                dieta: dietasRows[0], rutina: rutinasRows[0],
                isLoggedIn: request.session.isLoggedIn || false,
                nombre: request.session.nombre_usuario || '',
                rol: request.session.rol,
            })
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error));
}
exports.verCliente = (request, response, next) => {
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