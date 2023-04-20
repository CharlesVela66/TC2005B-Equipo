const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Usuario {

    constructor(nuevo_usuario) {
        this.id_usuario = nuevo_usuario.id_usuario;
        this.nombre = nuevo_usuario.nombre ;
        this.apellido = nuevo_usuario.apellido;
        this.nombre_usuario = nuevo_usuario.nombre_usuario;
        this.correo = nuevo_usuario.correo;
        this.contrasena = nuevo_usuario.contrasena;
        this.foto_perfil = nuevo_usuario.foto_perfil || null;
    }

    save() {
        return bcrypt.hash(this.contrasena, 12)
        .then((password_cifrado) => {
            return db.execute(`
                INSERT INTO usuario (nombre, apellido, nombre_usuario, correo, contrasena, foto_perfil)
            values (?, ?, ?, ?, ?, ?)
            `, [this.nombre, this.apellido, this.nombre_usuario, this.correo, password_cifrado, this.foto_perfil]);
        })
        .catch((error) => {console.log(error)});
    }

    saveRol(id_usuario, id_rol) {
        return db.execute(`
            INSERT INTO usuariorol (id_usuario, id_rol)
            values (?, ?)
        `, [id_usuario, id_rol]);
    }
/*
cambie la consulta de fetchOne
Ver si esta jala
        SELECT COUNT(*) as conteo
        FROM usuario
        WHERE nombre_usuario = ?;
*/
    static fetchOne(username){
        return db.execute(`
        SELECT * 
        FROM usuario
        WHERE nombre_usuario = ?

        `, [username]);
    }

    static fetchRol(username){
        return db.execute(`
            SELECT r.nombre
            FROM usuario u, rol r, usuariorol ur
            WHERE u.id_usuario = ur.id_usuario
            AND ur.id_rol = r.id_rol
            AND u.nombre_usuario = ?
        `, [username]);
    }    
    static fetch(id_usuario){
        return db.execute('SELECT * FROM usuario WHERE id_usuario = ?', [id_usuario]);
    }

}