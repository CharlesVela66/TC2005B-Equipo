const Rutina = require('../models/rutinas.model');
const Ejercicio= require('../models/ejercicios.model');
const Rutina_Ejercicio= require ('../models/rutina_ejercicio.model');
const RutinaFavorita = require('../models/rutinas_favoritas.model');
const Ejercicio = require('../models/ejercicios.model');
const RegistroRutina = require('../models/rutina_ejercicio.model');

exports.explorar_rutinas = (request, response, next) => {
    Rutina.fetchAll()
    .then(([rows, fieldData]) => {
        response.render('rutinas/rutinas', {
            rutinas: rows,
            isLoggedIn: request.session.isLoggedIn || false,
            nombre: request.session.nombre_usuario || '',
            rol: request.session.rol,
        });
    })
    .catch(error => console.log(error));
}

exports.visualizar_rutinas = (request,response,next) => {
    //console.log(request.params.id);
        //console.log(request.params.id);
        Rutina.fetchOne(request.params.id)
        .then(([rows, fieldData]) => {
            console.log(rows);
        Ejercicio.fetchOne(request.params.id)
        .then(([rows, fieldData]) => {
            console.log(rows);
        Rutina_Ejercicio.fetchOne(request.params.id)
        .then(([rows, fieldData]) => {
            console.log(rows);
                response.render('rutinas/contenido_r', {
                    dieta: rows,
                    dieta_alimento: rows,
                    macro: rows,
                    micro: rows,
                    isLoggedIn: request.session.isLoggedIn || false,
                    nombre: request.session.nombre_usuario || '',
                    rol: request.session.rol,
                })
            })
        })
    })

}

exports.nueva_rutina = (request, response, next) => {
    Ejercicio.fetchAll()
    .then(([rows, fieldData]) => {
        console.log(rows)
        response.render('rutinas/nueva_rutina',{
            ejercicios: rows,
            isLoggedIn: request.session.isLoggedIn || false,
            nombre: request.session.nombre_usuario || '',
            rol: request.session.rol,
            rutina:false,
        });
    }).catch(error=>console.log(error));
}

exports.post_nueva_rutina=(request,response,next)=>{
    console.log(request.file);

    const registro_rutina=new RegistroRutina({
        id_rutina: request.body.id_rutina,
        id_ejercicio: request.body.id_ejercicio,
        series: request.body.series,
        repeticiones: request.body.repeticiones,
        dia: request.body.dia,
    });
    registro_rutina.save()
    .then(([rows,fieldData])=>{ //.then(([result])=>{
        request.session.mensaje="El registro de la bitácora se añadió correctamente";
        response.redirect('/rutinas/');
    })
    .catch((error)=>{console.log(error)});
}

exports.listar=(request,response,next)=>{
    Rutina.fetch(request.params.id_rutina)
    .then(([rows,fieldData])=>{
        console.log(rows);

        response.render('lista',{
            ejercicios: rows,
            isLoggedIn: request.session.isLoggedIn || false,
            nombre: request.session.nombre_usuario || '',
            privilegios: request.session.privilegios || [],
        });
    })
    .catch(err =>{
        console.log(err);
    });
};

exports.explorar_rutinas_favoritas = (request, response, next) => {
    RutinaFavorita.fetchAll()
    .then((rows, fieldData) => {
        console.log(rows[0]); // Aquí le puse rows[0] (osea que solo estoy seleccionando el primer elemento del arreglo) porque se agregaba un elemento al arreglo todo raro. Hay que tener en cuenta eso para cuando tengamos mas de una rutina favorita, pero por el momento, dejaremos el rows[0]
        response.render('rutinas/rutinas_favoritas', {
            rutinas: rows[0],
            isLoggedIn: request.session.isLoggedIn || false,
            nombre: request.session.nombre_usuario || '',
            rol: request.session.rol,
        });
    })
    .catch(error => console.log(error));
}