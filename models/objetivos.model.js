const db = require('../util/database');

module.exports = class Objetivos {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_objetivo) {
        this.id_obj = nuevo_objetivo.id_obj;
        this.nombre_obj = nuevo_objetivo.nombre_obj;
        this.descripcion_obj = nuevo_objetivo.descripcion_obj;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute(`
            INSERT INTO  objetivo(nombre_obj, descripcion_obj) 
            values (?, ?)
    `, [this.nombre_obj, this.descripcion_obj]);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute(`
            SELECT *
            FROM objetivo
        `);
    }

    
    static fetchOne(id_obj){
        return db.execute(`
            SELECT *
            FROM objetivo 
            WHERE id_obj =?
        `, [id_obj]);
    }

}