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
        // Si tiene una rutina, se puede guardar el registro
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