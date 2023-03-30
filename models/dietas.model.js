const db = require('../util/database');

module.exports = class Dieta {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nueva_dieta) {
        this.nombre = nueva_dieta.nombre || "";
        this.tipo_dieta = nueva_dieta.tipo_dieta || "";
        this.id_macro = nueva_dieta.id_macro || "";
        this.id_micro = nueva_dieta.id_micro || "";
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {

    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute(`
            SELECT nombre, tipo_dieta
            FROM dieta
        `);
    }
    

}