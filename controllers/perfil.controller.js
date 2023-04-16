const Dieta = require('../models/dietas.model');
const Rutina = require('../models/rutinas.model')
const Cliente = require('../models/clientes.model');
const Objetivo = require('../models/objetivos.model');
const NivelFisico = require('../models/niveles.model');
const Usuario = require('../models/usuario.model');

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

exports.get_editarP = (request, response, next) => {
    Usuario.fetchOne(request.session.nombre_usuario)
    .then(([usuarios, fieldData]) => {
        if (usuarios.length == 1){
            const usuario = new Usuario ({
                id_usuario: usuarios[0].id_usuario,
                nombre:  usuarios[0].nombre,
                apellido: usuarios[0].apellido,
                nombre_usuario: usuarios[0].nombre_usuario,
                correo: usuarios[0].correo,
                foto_perfil: usuarios[0].foto_perfil,
            });
            Cliente.fetchOne(request.session.nombre_usuario)
            .then(([clientes, fieldData]) => {
                f
            });
        }
    })
}

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

/*
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
*/ 
