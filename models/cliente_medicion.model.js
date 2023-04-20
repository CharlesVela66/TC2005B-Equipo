const db = require('../util/database');

module.exports = class RegistroMedida {
    constructor(nueva_medida){
        this.id_cliente = nueva_medida.id_cliente;
        this.id_medicion = nueva_medida.id_medicion;
        this.fecha = nueva_medida.fecha;
        this.medida = nueva_medida.medida;
    }
    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute(`
            INSERT INTO clientemedicion (id_cliente, fecha, id_medicion, medida)
            VALUES (?, ?, ?, ?)
        `, [this.id_cliente, this.fecha, this.id_medicion, this.medida]);
    }

    static fetchAll(username) {
        return db.execute(`
            SELECT fecha,m.tipo AS 'nombre', medida, m.id_medicion
            FROM clientemedicion cm, cliente c, usuario u, medicion m
            WHERE cm.id_cliente = c.id_cliente
            AND u.id_usuario = c.id_usuario
            AND cm.id_medicion = m.id_medicion
            AND u.nombre_usuario = ?
            ORDER BY m.tipo ASC,fecha DESC;
        `, [username]);
    }

}