const db = require('../util/database');

module.exports = class Alimento {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nuevo_alimento) {
        this.id_alimento = nuevo_alimento.id_alimento || 0;
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
        SELECT id_alimento, nombre, medida
        FROM alimento
        ORDER BY nombre ASC
    `);
    }
    static fetchOne(id){
        return db.execute(
        `
        SELECT id_alimento,nombre, medida
        FROM alimento
        Where id_alimento=? 
        `
    ,[id])
    

    }

    static fetchOneByNombre(nombre) {
        return db.execute('SELECT * FROM alimento WHERE nombre = ?', [nombre]);
    }

    update() {
        return db.execute(`
        UPDATE alimento SET nombre=?, medida=? WHERE id_alimento=?
        `, [this.nombre, this.medida, this.id_alimento]);
    }
}