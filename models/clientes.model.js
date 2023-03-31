const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Cliente {

    // Por el momento no tenemos nada en el constructor de cliente porque no tenemos una manera de automatizar la creacion de un cliente a partir de la creacion de un usuario
    constructor(nuevo_cliente) {
        this.id_usuario = nuevo_cliente.id_usuario;
        this.id_obj = nuevo_cliente.id_obj;
    }

    // Por el momento no tenemos nada en el save de cliente porque no tenemos una manera de automatizar que se guarde en la base de datos un cliente a partir de la creacion de un usuario
    save() {
        return db.execute(`
        INSERT INTO cliente (id_usuario, id_obj)
        VALUES (?, ?)
    `, [this.id_usuario, this.id_obj]);
    }

    static saveDieta(dieta, cliente) {
        return db.execute(
          `UPDATE cliente SET id_dieta = ? WHERE id_cliente = ?`,
          [dieta,cliente]
        );
    }

    static saveRutina(rutina, cliente){
        return db.execute(
            `UPDATE cliente SET id_rutina = ? WHERE id_cliente = ?`,
            [rutina,cliente]
        );
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