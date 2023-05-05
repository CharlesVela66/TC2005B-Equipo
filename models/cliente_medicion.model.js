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

    update(fecha_ant) {
        return db.execute(`
            UPDATE clientemedicion SET fecha = ?, medida = ?
            WHERE id_cliente = ?
            AND fecha = ?
            AND id_medicion = ?
        `, [this.fecha, this.medida, this.id_cliente, fecha_ant,this.id_medicion]);
    }

    static delete(id_cliente, fecha, id_medicion){
        return db.execute(`
            DELETE FROM clientemedicion
            WHERE id_cliente = ?
            AND fecha = ?
            AND id_medicion = ?
        `, [id_cliente, fecha, id_medicion])
    }

    static fetchAll(username) {
        return db.execute(`
            SELECT fecha,m.tipo AS 'nombre', medida, m.id_medicion
            FROM clientemedicion cm, cliente c, usuario u, medicion m
            WHERE cm.id_cliente = c.id_cliente
            AND u.id_usuario = c.id_usuario
            AND cm.id_medicion = m.id_medicion
            AND u.nombre_usuario = ?
            ORDER BY fecha DESC;
        `, [username]);
    }

    static ultimaMedicionPeso(id_cliente) {
        return db.execute(`
            SELECT cm.medida
            FROM clientemedicion cm, cliente c, medicion m
            WHERE c.id_cliente=cm.id_cliente
            AND m.id_medicion = cm.id_medicion
            AND cm.id_cliente = ?
            AND cm.id_medicion = 10
            ORDER BY fecha DESC
            LIMIT 1;
        `, [id_cliente]);
    }

}