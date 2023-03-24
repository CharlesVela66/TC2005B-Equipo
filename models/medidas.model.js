const db = require('../util/database');

module.exports = class Medida {
    constructor(nueva_medida){
        this.id_cliente = nueva_medida.id_cliente;
        this.id_medicion = nueva_medida.id_medicion;
        this.medida = nueva_medida.medida;
    }
    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute(`
            INSERT INTO clientemedicion (id_cliente, id_medicion, medida)
            VALUES (?, ?, ?)
        `, [this.id_cliente, this.id_medicion, this.medida]);
    }

    static fetchAll() {
        return db.execute(`
            SELECT *
            FROM medicion
        `);
    }
    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchOne(username) {
        return db.execute(`
            SELECT cm.fecha, m.tipo, cm.medida
            FROM clientemedicion cm, medicion m, cliente c
            WHERE cm.id_medicion = m.id_medicion
            AND m.id_cliente = c.id_cliente
            AND c.nombre_usuario = ?
        `, [username]);
    }

}