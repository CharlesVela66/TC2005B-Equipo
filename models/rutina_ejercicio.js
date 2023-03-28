const db = require('../util/database');

module.exports = class RutinaEjercicio {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nueva_rutinaEjercicio) {
        this.id_rutina=nueva_rutinaEjercicio.id_rutina;
        this.id_ejercicio=nueva_rutinaEjercicio.id_ejercicio;
        this.series = nueva_rutinaEjercicio.series || 0;
        this.repeticiones = nueva_rutinaEjercicio.repeticiones || 0;
        this.dia=nueva_rutinaEjercicio.dia || NULL;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute(`
            INSERT INTO  rutinaejercicio(id_rutina,id_ejercicio,series,repeticiones,dia) 
            values (?, ?, ?, ?, ?)
        `, [this.id_rutina, this.id_ejercicio, this.series, this.repeticiones, this.dia]);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute(`
        SELECT r.nombre, r.tiporutina, r.descripcion, re.series, re.repeticiones, re.dia, e.descripcion, e.video_ejercicio
        FROM rutina r, ejercicio e, rutinaejercicio re
        ORDER BY r.nombre ASC
    `);
    }

    

}