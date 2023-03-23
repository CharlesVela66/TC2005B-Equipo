exports.registrar_medida = (request,response,next) =>{
    response.render('medidas/medidas',{
        isLoggedIn: request.session.isLoggedIn || false,
        nombre: request.session.nombre_usuario || '',
        rol: request.session.rol,
    });
}