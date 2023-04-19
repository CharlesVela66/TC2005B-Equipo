const db = require('../util/database');

module.exports = class Bitacora {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_registro) {
        this.id_cliente = nuevo_registro.id_cliente;
        this.id_rutina = nuevo_registro.id_rutina || 1;
        this.created_at = nuevo_registro.created_at;
        this.fecha = nuevo_registro.fecha;
        this.descr_sesion = nuevo_registro.descr_sesion;
        this.nivel_satisf = nuevo_registro.nivel_satisf || null;
        this.comentarios = nuevo_registro.comentarios || "No agregó comentarios";
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute(`
            INSERT INTO bitacora (id_cliente, id_rutina, fecha, nivel_satisf, descripcion_sesion, comentarios)
            VALUES (?, ?, ?, ?, ?, ?)
        `, [this.id_cliente, this.id_rutina, this.fecha, this.nivel_satisf, this.descr_sesion, this.comentarios]);
    }

    update(){
        return db.execute(`
            UPDATE bitacora SET fecha = ?, nivel_satisf = ?, descripcion_sesion = ?, comentarios = ?
            WHERE id_cliente = ?
            AND created_at = ?
        `, [this.fecha, this.nivel_satisf, this.descr_sesion, this.comentarios, this.id_cliente, this.created_at]);
    }

    static delete(id_cliente, created_at){
        return db.execute(`
            DELETE FROM bitacora
            WHERE id_cliente = ?
            AND created_at = ?
        `, [id_cliente, created_at])
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll(username) {
        return db.execute(`
            SELECT *
            FROM bitacora b, cliente c, usuario u
            WHERE b.id_cliente = c.id_cliente
            AND u.id_usuario = c.id_usuario
            AND u.nombre_usuario = ?
            ORDER BY fecha DESC;
        `, [username]);
    }

}