const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Cliente {

    // Por el momento no tenemos nada en el constructor de cliente porque no tenemos una manera de automatizar la creacion de un cliente a partir de la creacion de un usuario
    constructor(nuevo_cliente) {

    }

    // Por el momento no tenemos nada en el save de cliente porque no tenemos una manera de automatizar que se guarde en la base de datos un cliente a partir de la creacion de un usuario
    save() {

    }

    // Consulta a la base de datos de la info de un cliente a partir de su username
    static fetchOne(username){
        return db.execute(`
            SELECT *
            FROM cliente c, usuario u
            WHERE u.nombre_usuario = ?
            AND c.id_usuario = u.id_usuario
        `, [username]);
    }

}