const { response } = require("express");
const Bitacora = require("../models/bitacora.model");
const Cliente = require("../models/clientes.model");

exports.get_bitacora = (request, response, next) => {
/*    let cookies = request.get('Cookie') || '';
    console.log(cookies);

    let consultas = cookies.split(';')[0].split('=')[1] || 0;
    console.log(consultas);

    consultas++;

    response.setHeader('Set-Cookie', 'consultas=' + consultas + '; HttpOnly');*/
    const mensaje = request.session.mensaje || '';
    if (request.session.mensaje) {
        request.session.mensaje  = '';
    }

    // Obtenemos todos los registros de bitacora de un usuario
    Bitacora.fetchAll(request.session.nombre_usuario)
    .then((rows, fieldData) => {
        // Renderizamos (cargamos la vista) de la pagina bitacora y le pasamos como argumentos los registros de la bitacora, el estado de su sesion, el nombre de usuario del cliente y su rol (el rol se lo pasamos en todos los renders para que la navbar muestre los apartados correctos)
        response.render('bitacora/bitacora', {
            registros: rows[0],
            isLoggedIn: request.session.isLoggedIn || false,
            nombre: request.session.nombre_usuario || '',
            rol: request.session.rol,
            mensaje: mensaje
        })
    }) 
    .catch((error) => {console.log(error)});
}

exports.post_bitacora = (request,response,next) => {
    // Obtenemos todos los datos del cliente pasandole como argumento su nombre de usuario
    Cliente.fetchOne(request.session.nombre_usuario)
    .then(([rows, fieldData]) => {
            // Se crea un nuevo registro de bitacora
            const registro = new Bitacora({
                id_cliente: rows[0].id_cliente,
                id_rutina: rows[0].id_rutina,
                fecha: request.body.fecha,
                descr_sesion: request.body.descr_sesion,
                nivel_satisf: request.body.nivel_satisf,
                comentarios: request.body.comentarios,
            });
            // Se guarda en la base de datos
            registro.save()
            .then(([rows, fieldData]) => {
                //Redericciona al usuario a la bitacora
                response.redirect('/home');
            })
            .catch((error) => {console.log(error)});
        
    })
    .catch((error) => {console.log(error)});

}

exports.editar = (request,response,next) => {
    Cliente.fetchOne(request.session.nombre_usuario)
    .then(([rows, fieldData]) => {

            const originalCreatedAt = request.body.edit_created_at;
            const date = new Date(originalCreatedAt);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hour = String(date.getHours()).padStart(2, '0');
            const minute = String(date.getMinutes()).padStart(2, '0');
            const second = String(date.getSeconds()).padStart(2, '0');

            const created_at = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

            // Se crea un nuevo registro de bitacora
            const registro = new Bitacora({
                id_cliente: rows[0].id_cliente,
                id_rutina: rows[0].id_rutina,
                created_at: created_at,
                fecha: request.body.edit_fecha,
                descr_sesion: request.body.edit_descr_sesion,
                nivel_satisf: request.body.edit_nivel_satisf,
                comentarios: request.body.edit_comentarios,
            });
            // Se actualiza en la base de datos
            registro.update()
            .then(([rows, fieldData]) => {
                //Redericciona al usuario a la bitacora
                response.redirect('/home');
            })
            .catch((error) => {console.log(error)});
        
    })
    .catch((error) => {console.log(error)});
}

exports.eliminar = (request, response, next) => {
    Cliente.fetchOne(request.session.nombre_usuario)
    .then(([rows, fieldData]) => {
            const originalCreatedAt = request.body.delete_created_at;
            const date = new Date(originalCreatedAt);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hour = String(date.getHours()).padStart(2, '0');
            const minute = String(date.getMinutes()).padStart(2, '0');
            const second = String(date.getSeconds()).padStart(2, '0');

            const created_at = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
            // Se elimina de la base de datos
            Bitacora.delete(rows[0].id_cliente, created_at)
            .then(([rows, fieldData]) => {
                //Redericciona al usuario a la bitacora
                response.redirect('/home');
            })
            .catch((error) => {console.log(error)});
        
    })
    .catch((error) => {console.log(error)});
}