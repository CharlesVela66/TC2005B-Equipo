const db = require('../util/database');

module.exports = class Ejercicio {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_ejercicio) {
        this.descripcion = nuevo_ejercicio.descripcion || "";
        this.video_ejercicio = nuevo_ejercicio.video_ejercicio || "";
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute(`
            INSERT INTO ejercicio (descripcion, video_ejercicio) 
            values (?, ?)
        `, [this.descripcion, this.video_ejercicio]);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute(`
        SELECT id_ejercicio, descripcion, video_ejercicio
        FROM ejercicio
        ORDER BY descripcion ASC
    `);
    }
    static fetchOne(id){
    return db.execute(
        `
        SELECT id_ejercicio,descripcion, video_ejercicio
        FROM ejercicio
        Where id_ejercicio=? 
        `
        ,[id])

    }


    static fetchOneByDescripcion(descripcion) {
        return db.execute('SELECT * FROM ejercicio WHERE descripcion = ?', [descripcion]);
      }

}