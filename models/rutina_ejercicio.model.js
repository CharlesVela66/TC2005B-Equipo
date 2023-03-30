const db = require('../util/database');

module.exports = class Ejercicio {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nueva_rutina_ejercicio) {
        this.id_rutina = nueva_rutina_ejercicio.id_rutina|| "";
        this.id_ejercicio = nueva_rutina_ejercicio.id_ejercicio|| "";
        this.series = nueva_rutina_ejercicio.series || 0;
        this.repeticiones = nueva_rutina_ejercicio.repeticiones || 0;
        this.dia = nueva_rutina_ejercicio.dia || "";
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {

    }

    static fetchOne(id){
        return db.execute(
            `
            SELECT e.descripcion, e.video_ejercicio, re.series, re.repeticiones, re.dia
            FROM rutinaejercicio re, ejercicio e
            Where re.id_rutina= ? AND re.id_ejercicio=e.id_ejercicio 
        `
        ,[id] )
    }


}    