const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Administrador {

    constructor(nuevo_admin) {
        this.id_usuario = nuevo_admin.id_usuario;
    }

    save() {
        return db.execute(`
        INSERT INTO cliente (id_usuario)
        VALUES (?)
    `, [this.id_usuario]);
    }

    static fetchOne(username){
        return db.execute(`
            SELECT *
            FROM usuario u, administrador a
            WHERE u.nombre_usuario = ?
            AND a.id_usuario = u.id_usuario
        `, [username]);
    }
    static getObj(id_admin) {
        return db.execute(
            `
            SELECT u.id_usuario, a.id_admin, o.id_obj
            FROM usuario u, administrador a, objetivo o
            WHERE u.id_usuario=a.id_usuario AND a.id_obj=o.id_obj AND a.id_admin = ?;
         `, [id_admin]);
    }

}