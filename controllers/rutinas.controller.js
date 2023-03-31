const Rutina = require('../models/rutinas.model');
const Ejercicio= require('../models/ejercicios.model');
const Rutina_Ejercicio= require ('../models/rutina_ejercicio.model');
const RutinaFavorita = require('../models/rutinas_favoritas.model');
const RegistroRutina = require('../models/rutina_ejercicio.model');
const Cliente =require('../models/clientes.model');

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

exports.visualizar_rutinas= (request, response, next) => {
    request.session.id_rutina = request.params.id;
    Rutina.fetchOne(request.params.id)
        .then(([rutinas, fieldData]) => {
            //   console.log(dieta),
            Rutina_Ejercicio.fetchOne(request.params.id)
            .then(([rutinas_ejercicios, fieldData]) => {
                //  console.log(dieta_alimento),
                Ejercicio.fetchOne(request.params.id)
                .then(([ejercicios, fieldData]) => {
                    //   console.log(macro),
                        response.render('rutinas/contenido_r', {
                        rutina: rutinas,
                        rutina_ejercicio: rutinas_ejercicios,
                        ejercicio: ejercicios,
                        isLoggedIn: request.session.isLoggedIn || false,
                        nombre: request.session.nombre_usuario || '',
                        rol: request.session.rol,
                        })
                    })
                    .catch(error => console.log(error));
                })
                .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
}
exports.seleccionar_rutinas=(request,response, next) =>{
    Cliente.fetchOne(request.session.nombre_usuario)
    .then(([cliente,fieldData]) => {
        Rutina.fetchOne(request.session.id_rutina)
        .then(([rutina, fieldData]) => {
            if (cliente[0].id_rutina == rutina[0].id_rutina){
                request.session.mensaje = "Esta rutina ya la tienes seleccionada";
            }
            else {
                Cliente.saveRutina(rutina[0].id_rutina, cliente[0].id_cliente);
            }
            response.redirect('/rutinas');
        })
        .catch(error => console.log(error))
    .catch(error => console.log(error));

        

    })

}

exports.nueva_rutina = (request, response, next) => {
    Ejercicio.fetchAll()
    .then(([rows, fieldData]) => {
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
/*    console.log(request.file);

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
    .catch((error)=>{console.log(error)});*/
    const rutina = new Rutina ({
        nombre: request.body.nombre,
        tiporutina: request.body.tiporutina,
        descripcion:  request.body.descripcion,
    })
    console.log(rutina);
    rutina.save()
    .then(([rows, fieldData]) => {
        console.log(rows);
        Rutina.fetchOneByNombre(request.body.nombre)
        .then(([rutina, fieldData]) => {
            Ejercicio.fetchAll()
            .then(([ejerciciosTotal, fieldData]) => {
                const savePromises = ejerciciosTotal.map((ejercicio) => {
                    if (request.body[ejercicio.id_ejercicio]){
                        const ejercicio = new Rutina_Ejercicio({
                            id_rutina: rutina[0].id_rutina,
                            id_ejercicio: ejercicio.id_ejercicio,
                            series: request.body.series,
                            repeticiones: request.body.repeticiones,
                            dia: request.body.dia,
                        })
                        return ejercicio.save();
                    }
                    return Promise.resolve(null);
                });
                Promise.all(savePromises)
                .then(() => {
                    console.log('Todos los registros guardados');
                    response.redirect('/home');
                })
                .catch((error) => {console.log(error)});
            })
            .catch((error)=>{console.log(error)});
        })
        .catch((error)=>{console.log(error)});
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