const db = require('../util/database');

module.exports = class Alimento {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_alimento) {
        this.nombre = nuevo_alimento.nombre || "";
        this.medida = nuevo_alimento.medida || "";
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute(`
            INSERT INTO alimento (nombre, medida) 
            values (?, ?)
        `, [this.nombre, this.medida]);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute(`
        SELECT nombre, medida
        FROM alimento
        ORDER BY nombre ASC
    `);
    }
    static fetchOne(id){
        return db.execute(`
        SELECT nombre, medida
        FROM alimento
        ORDER BY nombre ASC
    `,[id])

    }

    static fetchOneByNombre(nombre) {
        return db.execute('SELECT * FROM alimento WHERE nombre = ?', [nombre]);
    }
}