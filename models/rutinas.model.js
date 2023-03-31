const db = require('../util/database');

module.exports = class Rutina {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nueva_rutina) {
        this.nombre = nueva_rutina.nombre || "";
        this.tiporutina = nueva_rutina.tiporutina || "";
        this.descripcion = nueva_rutina.descripcion || "";
        this.URL_Image= nueva_rutina.URL_Image || "";
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute(`
            INSERT INTO  rutina(nombre,tiporutina,descripcion,URL_Image) 
            values ( ?, ?, ?, ?)
        `, [ this.nombre, this.tiporutina, this.descripcion, this.URL_Image]);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute(`
        SELECT *
        FROM rutina r
        ORDER BY r.id_rutina ASC
        `);
    }

    static fetchOne(id_rutina){
        return db.execute(`
            SELECT r.id_rutina,r.nombre,r.tiporutina,r.descripcion, r.URL_Image
            FROM rutina r
            WHERE r.id_rutina =?
        `, [id_rutina]
        );
    }

    static fetchOneByNombre(nombre){
        return db.execute(`
        SELECT r.id_rutina,r.nombre,r.tiporutina,r.descripcion, r.URL_Image
        FROM rutina r
        WHERE r.nombre =?
        `, [nombre]);
    }

    static fetch(id_rutina){
        if (id_rutina){
            return RutinaEjercicio(id_rutina);
        } else {
            return RutinaEjercicio.fetchAll();
        }
    }

}