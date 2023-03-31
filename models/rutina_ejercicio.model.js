const db = require('../util/database');

module.exports = class RegistroRutina {

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
        SELECT r.nombre, r.tiporutina, r.descripcion, r.URL_Image, re.series, re.repeticiones, re.dia, e.descripcion AS Ejercicio, e.video_ejercicio
        FROM rutina r, ejercicio e, rutinaejercicio re
        WHERE re.id_rutina=r.id_rutina AND e.id_ejercicio=re.id_ejercicio
        ORDER BY r.nombre ASC
        `);
    }

    static fetchOne(id_rutina){
        return db.execute(`
        SELECT r.nombre, r.tiporutina, r.descripcion, r.URL_Image, re.series, re.repeticiones, re.dia, e.descripcion AS Ejercicio, e.video_ejercicio
        FROM rutina r, ejercicio e, rutinaejercicio re
        WHERE re.id_rutina=r.id_rutina AND e.id_ejercicio=re.id_ejercicio AND r.id_rutina =?
        ORDER BY r.nombre ASC
        `, [id_rutina]
        );
    }
    static fetchOne(id){
        return db.execute(`
        SELECT e.descripcion, e.video_ejercicio, re.series, re.repeticiones, re.dia
        FROM rutinaejercicio re, ejercicio e
        Where re.id_rutina=? AND re.id_ejercicio=e.id_ejercicio
        `, [id]
        );

}

    static fetch(id_rutina){
        if (id_rutina){
            return RegistroRutina.fetchOne(id_rutina);
        } else {
            return RegistroRutina.fetchAll();
        }
    }
}