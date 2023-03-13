const Bitacora = require("../models/bitacora.model");

exports.get_bitacora = (request, response, next) => {
    let cookies = request.get('Cookie') || '';
    console.log(cookies);

    let consultas = cookies.split(';')[0].split('=')[1] || 0;
    console.log(consultas);

    consultas++;

    response.setHeader('Set-Cookie', 'consultas=' + consultas + '; HttpOnly');

    response.render("bitacora/bitacora", {registros: Bitacora.fetchAll()});
}

exports.post_bitacora = (request,response,next) => {
    const registro = new Bitacora({
        fecha: request.body.fecha,
        descr_sesion: request.body.descr_sesion,
        nivel_satisf: request.body.nivel_satisf,
        comentarios: request.body.comentarios,
    })
    registro.save();
    response.redirect('/home');
}