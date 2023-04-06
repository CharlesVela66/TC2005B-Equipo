const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Usuario {

    constructor(nuevo_usuario) {
        this.nombre = nuevo_usuario.nombre;
        this.apellido = nuevo_usuario.apellido;
        this.nombre_usuario = nuevo_usuario.nombre_usuario;
        this.correo = nuevo_usuario.correo;
        this.contrasena = nuevo_usuario.contrasena;
        this.foto_perfil = nuevo_usuario.foto_perfil || null;
        this.sexo = nuevo_usuario.sexo;
        this.fecha_nacimiento = nuevo_usuario.fecha_nacimiento;
    }

    save() {
        return bcrypt.hash(this.contrasena, 12)
        .then((password_cifrado) => {
            return db.execute(`
                INSERT INTO usuario (nombre, apellido, nombre_usuario, correo, contrasena, foto_perfil, sexo, fecha_nacimiento)
            values (?, ?, ?, ?, ?, ?, ?, ?)
            `, [this.nombre, this.apellido, this.nombre_usuario, this.correo, password_cifrado, this.foto_perfil, this.sexo, this.fecha_nacimiento]);
        })
        .catch((error) => {console.log(error)});
    }

    saveRol(id_usuario, id_rol) {
        return db.execute(`
            INSERT INTO usuariorol (id_usuario, id_rol)
            values (?, ?)
        `, [id_usuario, id_rol]);
    }

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

    // Método para obtener los datos del usuario por su id
    static fetchById(id_usuario){
        return db.execute(`
        SELECT *
        FROM usuario
        WHERE id_usuario=?
        `), [id_usuario];
    }

    // Método para actualizar los datos del usuario
    static actualizarDatos(id_usuario, nuevosDatos) {
        return db.execute(
        'UPDATE usuario SET nombre = ?, apellido = ?, nombre_usuario = ?, correo = ?, sexo = ?, fecha_nacimiento = ? WHERE id_usuario = ?',
        [nuevosDatos.nombre, nuevosDatos.apellido, nuevosDatos.nombre_usuario, nuevosDatos.correo, nuevosDatos.sexo, nuevosDatos.fecha_nacimiento, id_usuario]
        );
    }

    // Método para actualizar la foto de perfil del usuario
    static actualizarFotoPerfil(id, nuevaFoto) {
        return db.execute('UPDATE usuarios SET foto_perfil = ? WHERE id = ?', [nuevaFoto, id]);
    }

    //Esto va a servir al momento de la creación de un nuevo usuario, donde se busca por correo, y si hay un correo igual que el que se tiene en la app, no te va a dejar registrar un nuevo usuario con este correo.
    static buscarPorCorreo(correo) {
        const query = 'SELECT * FROM usuarios WHERE correo = ?';
        const [rows] = db.execute(query, [correo]);
        if (rows.length === 0) {
          return null;
        }
        const usuario = new Usuario(rows[0]);
        return usuario;
    }

}