const Bitacora = require("../models/bitacora.model");
const Cliente = require("../models/clientes.model");

exports.get_bitacora = (request, response, next) => {
/*    let cookies = request.get('Cookie') || '';
    console.log(cookies);

    let consultas = cookies.split(';')[0].split('=')[1] || 0;
    console.log(consultas);

    consultas++;

    response.setHeader('Set-Cookie', 'consultas=' + consultas + '; HttpOnly');*/

    Bitacora.fetchAll(request.session.nombre_usuario)
    .then((rows, fieldData) => {
        response.render('bitacora/bitacora', {
            registros: rows[0],
            isLoggedIn: request.session.isLoggedIn || false,
            nombre: request.session.nombre_usuario || '',
            rol: request.session.rol,
        })
    }) 
    .catch((error) => {console.log(error)});
}

exports.post_bitacora = (request,response,next) => {
    Cliente.fetchOne(request.session.nombre_usuario)
    .then(([rows, fieldData]) => {
        const registro = new Bitacora({
            id_cliente: rows[0].id_cliente,
            descr_sesion: request.body.descr_sesion,
            nivel_satisf: request.body.nivel_satisf,
            comentarios: request.body.comentarios,
        });
        registro.save();
        response.redirect('/home');
        
    })
    .catch((error) => {console.log(error)});

}