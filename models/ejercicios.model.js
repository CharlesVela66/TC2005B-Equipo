const db = require('../util/database');

module.exports = class Ejercicio {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_ejercicio) {
        this.id_ejercicio = nuevo_ejercicio.id_ejercicio || 0;
        this.descripcion = nuevo_ejercicio.descripcion || "";
        this.descripcion_ejercicio = nuevo_ejercicio.descripcion_ejercicio || "";
        this.video_ejercicio = nuevo_ejercicio.video_ejercicio || "";
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute(`
            INSERT INTO ejercicio (descripcion, descripcion_ejercicio, video_ejercicio) 
            values (?, ?, ?)
        `, [this.descripcion, this.descripcion_ejercicio, this.video_ejercicio]);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute(`
        SELECT id_ejercicio, descripcion, descripcion_ejercicio, video_ejercicio
        FROM ejercicio
        ORDER BY descripcion ASC
    `);
    }
    
    static fetchOne(id){
    return db.execute(
        `
        SELECT *
        FROM ejercicio
        Where id_ejercicio=? 
        `
        ,[id])

    }


    static fetchOneByDescripcion(descripcion) {
        return db.execute('SELECT * FROM ejercicio WHERE descripcion = ?', [descripcion]);
      }


      static delete(id) {
        return db.execute(`
            DELETE FROM ejercicio
            WHERE id_ejercicio = ?
        `, [id])
    }

      update() {
        return db.execute(`
        UPDATE ejercicio SET descripcion=?, descripcion_ejercicio=?, video_ejercicio=? WHERE id_ejercicio=?
        `, [this.descripcion, this.descripcion_ejercicio, this.video_ejercicio, this.id_ejercicio]);
    }


}