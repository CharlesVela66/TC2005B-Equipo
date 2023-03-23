const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Cliente {

    constructor(nuevo_cliente) {

    }

    save() {

    }

    static fetchOne(username){
        return db.execute(`
            SELECT *
            FROM cliente c, usuario u
            WHERE u.nombre_usuario = ?
            AND c.id_usuario = u.id_usuario
        `, [username]);
    }

}