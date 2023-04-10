const Dieta = require('../models/dietas.model');
const Rutina = require('../models/rutinas.model')
const Cliente = require('../models/clientes.model');

exports.ver_perfil = (request, response, next) => {
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



exports.post_editar = (request, response, next) => {
    const nuevo_cliente = {
        nombre: request.body.nombre,
        apellido: request.body.apellido,
        nombre_usuario: request.body.nombre_usuario,
        correo: request.body.correo,
        fecha_nacimiento: request.body.fecha_nacimiento,
        sexo: request.body.sexo,
        foto_perfil: request.body.foto_perfil,
        nombre_obj: request.body.nombre_obj,
        nombre_niv: request.body.nombre_niv
    };
    Cliente.fetchOne(request.session.nombre_usuario)
    .then(([clientes, fieldData]) => {
        const id_cliente = clientes[0].id_cliente;
        const cliente = new Cliente({id_usuario: clientes[0].id_usuario, id_obj: clientes[0].id_obj});
        cliente.nombre = nuevo_cliente.nombre;
        cliente.apellido = nuevo_cliente.apellido;
        cliente.nombre_usuario = nuevo_cliente.nombre_usuario;
        cliente.correo = nuevo_cliente.correo;
        cliente.fecha_nacimiento = nuevo_cliente.fecha_nacimiento;
        cliente.sexo = nuevo_cliente.sexo;
        cliente.foto_perfil = nuevo_cliente.foto_perfil;
        cliente.nombre_obj = nuevo_cliente.nombre_obj;
        cliente.nombre_niv = nuevo_cliente.nombre_niv;
        return cliente.saveCliente(id_cliente);
    })
    .then(() => {
        response.redirect('/perfil/ver_info');
    })
    .catch(err => console.log(err));
};
