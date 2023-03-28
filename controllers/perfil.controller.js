const Dieta = require('../models/dietas_favoritas.model');
const Rutina = require('../models/rutinas_favoritas.model')
const Perfil =require('../models/perfil.model');

/*exports.get_editar=(request, response, next) =>{

    Perfil.fetchOne(request.params.id)
    .then(([rows, fieldData]))=>{
        if(rows.length ==1){

            cons
        }
    }
}*/

exports.ver_perfil = (request, response, next) => {
    let dietasRows = new Array;
    let rutinasRows = new Array;
    Dieta.fetchAll()
    .then(([rows, fieldData]) => {
        dietasRows.push(rows[0]);
        Rutina.fetchAll()
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
