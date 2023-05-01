const Usuario = require('../models/usuario.model');
const Cliente = require('../models/clientes.model');
const Objetivos = require('../models/objetivos.model');
const Administrador = require('../models/administrador.model');
const Nivel= require('../models/niveles.model');
const clientemedicion=require('../models/cliente_medicion.model');
const Dieta = require('../models/dietas.model');
const Rutina = require('../models/rutinas.model');

const bcrypt = require('bcryptjs');
const { request, response } = require('express');



// Cargamos la interfaz del inicio
exports.inicio = async (request, response, next) => {
    // Llama a la función count() del modelo y espera el resultado
    const resultadoD = await Dieta.count();
    const resultadoR = await Rutina.count();

  // Extrae el conteo de dietas del resultado
    const totalDietas = resultadoD[0][0].Totald;
    const totalRutinas = resultadoR[0][0].Totalr;

    response.clearCookie("consultas");
    response.render('home/home', {
        isLoggedIn: request.session.isLoggedIn,
        nombre: request.session.nombre_usuario || '',
        rol: request.session.rol || '',
        totalDietas: totalDietas,
        totalRutinas: totalRutinas,
    });
};


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
                    .then(([consultaRol, fieldData]) => {
                        request.session.rol=consultaRol[0].nombre;
                        //borrar si no jala
                        request.session.id_usuario = rows[0].id_usuario;
                        //borrar si no jala
                        console.log(request.session.rol)
                        console.log(rows[0].id_usuario)
                        Cliente.getObjetivo(rows[0].id_usuario)
                            .then(([objetivo,fieldData])=>{
                                console.log("objetivo.length:", objetivo.length);
                                console.log("consultaRol[0].nombre:", consultaRol[0].nombre);
                                    if (objetivo.length > 0 && consultaRol[0].nombre == "Cliente") {
                                        console.log("buu")
                                        console.log(objetivo)
                                        request.session.objetivo=objetivo[0].id_obj
                                        response.redirect("/home")
                                    }else if(consultaRol[0].nombre=="Administrador") {
                                        response.redirect("/home")
                                    }else if(consultaRol[0].nombre== "Cliente"){
                                        response.redirect("/informacion")
                                        console.log("Entre en el redirect aunque tenga objetivo XD")
                                    }
                        // Guardamos el rol en una variable de sesion
                        // Redireccionamos al usuario a la bitacora (esto lo tendriamos que cambiar si el usuario es o no un cliente)
                        })  

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
exports.registrarse =(request,response, next) =>{

    const mensaje =request.session.mensaje;
    let usuarioData=request.session.usuarioData;
    request.session.mensaje=null;
    request.session.usuarioData=null;

    response.render('home/registrarse',{
        isLoggedIn:request.session.isLoggedIn || false,
        nombre: request.session.nombre || '',
        mensaje:mensaje,
        usuarioData:usuarioData
    });
};
exports.post_registrarse = (request, response, next)=>{
    request.session.flagOne = true;
    request.session.flagTwo = true;
     
    if (request.body.contrasena !== request.body.confirmar_contrasena) {
        request.session.mensaje = "Las contraseñas no coinciden.";
        //Borrar
        request.session.usuarioData={
            nombre: request.body.nombre,
            apellido: request.body.apellido,
            nombre_usuario:request.body.nombre_usuario,
            correo: request.body.correo
        };
        //Borrar
        console.log(request.session.mensaje)
        response.redirect('/registrarse');
        return;
    }
    const nuevo = new Usuario({        
        nombre: request.body.nombre ,
        apellido: request.body.apellido,
        nombre_usuario: request.body.nombre_usuario,
        correo: request.body.correo,
        contrasena: request.body.contrasena,
    });
    Usuario.fetchOne(request.body.nombre_usuario)
    .then(([row,fieldData])=>{
        if (row.length > 0) {request.session.flagOne = false};
        
        
        Usuario.fetchCorreo(request.body.correo)
        .then(([rows,fieldData])=>{
            if (rows.length > 0) {request.session.flagTwo = false;}
            console.log("1", request.session.flagOne);
            console.log("2", request.session.flagTwo);
            if (!request.session.flagOne && request.session.flagTwo){
                request.session.mensaje="Usuario ya existente.";
                request.session.usuarioData={
                    nombre: request.body.nombre,
                    apellido: request.body.apellido,
                    correo: request.body.correo
                };
                //Borrar
                console.log(request.session.mensaje)
                response.redirect('/registrarse');
                return;

            }else if(!request.session.flagTwo && request.session.flagOne){
                request.session.mensaje="Correo ya existente.";
                request.session.usuarioData={
                    nombre: request.body.nombre,
                    apellido: request.body.apellido,
                    nombre_usuario:request.body.nombre_usuario,
                };
                //Borrar
                console.log(request.session.mensaje)
                response.redirect('/registrarse');
                return;
            }else if(!request.session.flagOne && !request.session.flagTwo){
                request.session.mensaje="Usuario y correo ya existente.";
                request.session.usuarioData={
                    nombre: request.body.nombre,
                    apellido: request.body.apellido,
                };
                //Borrar
                console.log(request.session.mensaje)
                response.redirect('/registrarse');
                return;
            }

            nuevo.save()
                .then(([rows, fieldData])=>{
                    console.log("save");
                    Usuario.fetchOne(request.body.nombre_usuario)
                    .then(([infoUsuario,fieldData])=>{
                        console.log(infoUsuario);
                        nuevo.saveRol(infoUsuario[0].id_usuario,1)
                        const cliente= new Cliente({
                            id_usuario: infoUsuario[0].id_usuario
                        });
                        cliente.save()
                        .then(([row,fieldData])=>{
                            request.session.mensaje = "Usuario Registrado";   
                            response.redirect('/iniciar-sesion');
                        }).catch(err=>console.error(err));
                    }).catch(err=>console.error(err));
                }).catch((error)=>{
                    console.log(error);
                })

        }).catch(error=>{
            console.log(error);
        })
    }).catch(error=>{
        console.log(error);
    })
    
};

exports.get_informacion = (request, response, next)=>{
    Nivel.fetchAll()
    .then(([row,fieldData])=>{
    Objetivos.fetchAll()
        .then(([rows,fieldData])=>{    
            response.render('home/informacion_personal',{
            objetivos:rows,
            niveles:row,
            isLoggedIn: request.session.isLoggedIn || false,
            rol: request.session.rol || '',
            nombre:request.session.nombre_usuario || '',       
            })
        })
    })
};
exports.post_informacion =(request,response,next)=>{
    if (!request.session.id_usuario) {
        console.log("id_usuario no está disponible en la sesión");
        // Redirigir al usuario a una página de error o de inicio de sesión
        return;
    }
    //Buscar el cliente 
    Cliente.findById(request.session.id_usuario)
    .then(([rows])=>{
        if(rows.length === 0){
            throw new Error("Cliente no encontrado");   
        }
        const cliente= new Cliente({
            id_usuario: rows[0].id_usuario,
            id_obj: rows[0].id_obj,
            id_niv: rows[0].id_niv,
            sexo: rows[0].sexo,
            fecha_nacimiento:rows[0].fecha_nacimiento,
            alturaInic: rows[0].alturaInic,
            pesoInic: rows[0].pesoInic,
            pressBanca: rows[0].pressBanca,
            sentadilla: rows[0].sentadilla,
            pesoMuerto: rows[0].pesoMuerto,

        });
        //Actualizar
        cliente.id_obj=request.body.obj;
        cliente.sexo=request.body.sexo;
        cliente.fecha_nacimiento=request.body.fecha_nacimiento;
        cliente.alturaInic=request.body.alturaInic;
        cliente.pesoInic=request.body.pesoInic;
        cliente.pressBanca=request.body.pressBanca;
        cliente.sentadilla=request.body.sentadilla;
        cliente.pesoMuerto=request.body.pesoMuerto;
        cliente.id_niv=request.body.niv;

        return cliente.update();

    })
    .then(([rows,fieldData])=>{
        response.redirect('/home')
    })
    //borrar        
    .catch((error) => {
        console.log(error);
    });
};


exports.cerrar_sesion = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/'); 
    });
}