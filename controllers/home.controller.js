const Usuario = require('../models/usuario.model');
const Cliente = require('../models/clientes.model');
const Objetivos = require('../models/objetivos.model');
const bcrypt = require('bcryptjs');
const { request } = require('express');
 
// Cargamos la interfaz del inicio
exports.inicio = (request, response, next) => {
    response.clearCookie("consultas");
    response.render('home/home', {
        isLoggedIn: request.session.isLoggedIn,
        nombre: request.session.nombre_usuario || '',
        rol: request.session.rol || '',
    });
}

// Cargamos la interfaz de iniciar sesion
exports.iniciar_sesion = (request,response,next) => {
    const mensaje = request.session.mensaje || '';

    if (request.session.mensaje) {
        request.session.mensaje  = '';
    }

    response.render('home/iniciar_sesion', {
        mensaje: mensaje,
        isLoggedIn: request.session.isLoggedIn || false,
        nombre: request.session.nombre_usuario || '',
    });
}

// Esto es lo que sucede cuando el usuario le da click a 'Ingresar'
exports.post_iniciar_sesion = (request, response, next) => {
    // Obtenemos toda la informacion del usuario pasando como argumento lo que escribio en el input de "Username"
    // Por eso usamos request.body.nombre_usuario, porque el request.body tiene que ver con la vista (interfaz), y el .nombre_usuario es el ID del 
    // objeto en la vista (ejemplo: <input type ="text" id="nombre_usuario")
    Usuario.fetchOne(request.body.nombre_usuario)
    .then(([rows, fieldData]) => {
        // Si el tamaño de rows (el arreglo donde tenemos toda la info del usuario) es igual a 1 (significa que hay y solo hay un usuario con ese username) hacemos lo siguiente
        if (rows.length == 1) {
            // Encriptamos la contraseña (le cambie el tamaño al campo de contrasena en la tabla usuario debido a que una contrasena
            // encriptada toma muchismo mas caracteres)
            bcrypt.compare(request.body.contrasena, rows[0].contrasena)
            // Si la contrasena que ingreso al usuario es la misma que la de la base de datos
            .then((doMatch) => {
                if(doMatch) {
                    // Ponemos la sesion como activa
                    request.session.isLoggedIn = true;
                    // Guardamos el nombre del usuario en una variable de sesion (esto nos ayudara para todas las consultas que tengamos que
                    // hacer para obtener TODOS lo que necesitamos para ESE usuario en especifico)
                    request.session.nombre_usuario = rows[0].nombre_usuario;
                    // Obtenemos el rol del usuario para ver qué interfaz debe ver
                    Usuario.fetchRol(rows[0].nombre_usuario)
                    .then(([consultaRol, fieldData]) => 
                    {
                        // Guardamos el rol en una variable de sesion
                        request.session.rol = consultaRol[0].nombre;
                        // Redireccionamos al usuario a la bitacora (esto lo tendriamos que cambiar si el usuario es o no un cliente)
                        return request.session.save(err => {
                            response.redirect('/home');
                        });
                    });
                    // Si la contraseña no es la misma...
                } else {
                    request.session.mensaje = "Usuario y/o contraseña incorrectos";
                    console.log("Contraseña incorrecta");
                    response.redirect('/iniciar-sesion');
                }
            })
            .catch((error) => console.log(error));
        // Si no existe el usuario que ingresó el usuario en la base de datos...
        } else {
            request.session.mensaje = "Usuario y/o contraseña incorrectos";
            console.log("No hay usuario");
            response.redirect('/iniciar-sesion');
        }
    })
    .catch((error) => {
        console.log(error);
    });

};

exports.get_registrarse =(request,response, next) =>{
    response.render('home/registrarse',{
        isLoggedIn:request.session.isLoggedIn || false,
        nombre: request.session.nombre || '',
    });
};

exports.post_registrarse = (request, response, next)=>{
    const nuevo = new Usuario({        
        nombre: request.body.nombre ,
        apellido: request.body.apellido,
        nombre_usuario: request.body.nombre_usuario,
        correo: request.body.correo,
        contrasena: request.body.contrasena,
    });
    nuevo.save()
    .then(([rows, fieldData])=>{  
        request.session.mensaje ="Usuario Registrado.";
        //Loguear Usuario      
        Usuario.fetch(request.body.id_usuario)
        .then(([rows,fieldData])=>{
            nuevo.saveRol(infoUsuario[0].id_usuario,1);
        })
        response.redirect('/iniciar-sesion');
    })
};


/*
// Carga la interfaz de registrarse
exports.registrarse = (request, response, next) => {
        response.render('home/registrarse', {
            isLoggedIn: request.session.isLoggedIn || false,
            nombre: request.session.nombre_usuario || '',
        })
    .catch((error) => {console.log(error)});
};
exports.informacion = (request,response,next)=>{
    Objetivos.fetchAll()
    .then(([rows,fieldData])=> {
        response.render('home/informacion_personal',{
            objetivos : rows,
            isLoggedIn: request.session.isLoggedIn || false,
            nombre: request.session.nombre_usuario || '',
            rol: request.session.rol || '',
        })
    })
    .catch((error)=>{console.log(error)});
};
// Esto pasa cuando el usuario le da click a crear nuevo usuario
exports.post_registrarse = (request, response, next) => {   
    Usuario.fetchOne(request.body.nombre_usuario)
    .then(([rows, fieldData]) => {
        // Así aseguramos que no hay un usuario con ese username ya registrado
        if (rows.length == 0){
    // Un nuevo usuario se crea
    const usuario = new Usuario({
        nombre : request.body.nombre,
        apellido : request.body.apellido,
        nombre_usuario : request.body.nombre_usuario,
        correo : request.body.correo,
        contrasena : request.body.contrasena,
    }); 
    //Se guarda el Usuario en la Base de Datos
    usuario.save()
    .then(([rows, fieldData])=>{
        request.session.mensaje="Usuario Registrado";
        response.redirect('/informacion');
    }).catch((error)=>{console.log(error)});
            
            .then(([rows, fieldData]) => {
                request.session.mensaje = "Usuario Registrado";
                // Pedir informacion del Usuario recien registrado
                Usuario.fetchOne(request.body.nombre_usuario)
                .then(([infoUsuario, fieldData]) =>{
                    // Guardamos el rol del usuario 
                    usuario.saveRol(infoUsuario[0].id_usuario, 1);
                    // Creamos un cliente para guardarlo en la BD
                    const cliente = new Cliente({
                        id_usuario : infoUsuario[0].id_usuario,
                        id_obj : request.body.obj,
                    });
                    cliente.save()
                    .then(([rows, fieldData]) => {
                        response.redirect('/iniciar-sesion');
                    }) 
                    .catch((error) => {console.log(error)});
                })
                .catch((error) => {console.log(error)});
            })
            .catch((error) => {console.log(error)});
         
        }
        else {
            response.redirect('/registrarse');
        }
    })
    .catch((error) => {console.log(error)});
};*/

// En lugar de que la sesión se destruya en la página de inicio, implementé una mejor práctica que cuando el usuario ingrese a su sección de perfil
// y le de click a cerrar sesión, rápidamente lo redireccione a esta ruta y esta ruta lo unico que hace es destruir la sesion y luego lo 
// redirecciona al usuario a la pagina de inicio. Todo pasa de volada y ni siquiera se puede ver cuando la pagina pasa por esta ruta.
exports.cerrar_sesion = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/'); 
    });
}