const db = require('../util/database');

module.exports = class Rutina {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nueva_rutina) {
        this.nombre = nueva_rutina.nombre || "";
        this.tiporutina = nueva_rutina.tiporutina || "";
        this.descripcion = nueva_rutina.descripcion || "";
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {

    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute(`
        SELECT nombre, tiporutina
        FROM rutina
    `);
    }
    

}