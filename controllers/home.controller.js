const Usuario = require('../models/usuario.model');
const Cliente = require('../models/clientes.model');
const Objetivos = require('../models/objetivos.model');
const Administrador= require('../models/administrador.model');
const Nivel= require('../models/niveles.model');

const bcrypt = require('bcryptjs');

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
    response.render('home/registrarse',{
        isLoggedIn:request.session.isLoggedIn || false,
        nombre: request.session.nombre || '',
    });
};
exports.post_registrarse = (request, response, next)=>{
    if (request.body.contrasena !== request.body.confirmar_contrasena) {
        request.session.mensaje = "Las contraseñas no coinciden.";
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
            }).catch(err=>console(err));
        }).catch(err=>console(err));
    }).catch((error)=>{    
        if(error.code === "ER_DUP_ENTRY"){
            response.redirect('/home')
        }else{
            request.session.mensaje= "Usuario o Correo ya existentes.";
            console.log(request.session.mensaje);
            response.redirect('/registrarse')
                
        }   
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
            isLoggedIn: request.session.isLoggedIn || true,
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

        });
        //Actualizar
        cliente.id_obj=request.body.obj;
        cliente.sexo=request.body.sexo;
        cliente.fecha_nacimiento=request.body.fecha_nacimiento;
        cliente.alturaInic=request.body.alturaInic;
        cliente.pesoInic=request.body.pesoInic;
        cliente.id_niv=request.body.niv;

        return cliente.update();

    })
    .then(([rows,fieldData])=>{
        response.redirect('/home')
    })        
    .catch((error) => {
        console.log(error);
    });
};

exports.cerrar_sesion = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/'); 
    });
}