const db = require('../util/database');

module.exports = class Niveles {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_nivel) {
        this.id_niv = nuevo_nivel.id_niv;
        this.nombre_niv = nuevo_nivel.nombre_niv;
        this.descripcion_niv = nuevo_nivel.descripcion_niv;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute(`
        INSERT INTO  nivelfisico(nombre_niv, descripcion_niv) 
        values (?, ?)
    `, [this.nombre_niv, this.descripcion_niv]);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute(`
            SELECT *
            FROM nivelfisico
        `);
    }

    static fetchOne(id_niv){
        return db.execute(`
            SELECT *
            FROM nivelfisico
            WHERE id_niv =?
        `, [id_niv]);
    }
    

}