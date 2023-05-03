const db = require('../util/database');

module.exports = class RutinaNivel {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nueva_rutinaNivel) {
        this.id_rutina=nueva_rutinaNivel.id_rutina;
        this.id_nivel=nueva_rutinaNivel.id_nivel;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute(`
            INSERT INTO  rutinaniveles(id_rutina,id_nivel) 
            values (?, ?)
        `, [this.id_rutina, this.id_nivel]);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        return db.execute(`
        SELECT *
        FROM rutina r, ejercicio e, rutinaejercicio re
        WHERE re.id_rutina=r.id_rutina AND e.id_ejercicio=re.id_ejercicio
        ORDER BY r.nombre ASC
        `);
    }

    static fetchAlll(id){
        return db.execute(`
            SELECT *
            FROM rutinaejercicio
            WHERE id_ejercicio = ?
        `, [id])
    }

    static fetchOne(id_rutina){
        return db.execute(`
        SELECT *
        FROM rutina r, ejercicio e, rutinaejercicio re
        WHERE re.id_rutina=r.id_rutina AND e.id_ejercicio=re.id_ejercicio AND r.id_rutina =?
        ORDER BY r.nombre ASC
        `, [id_rutina]
        );
    }
    
    static fetch(id_rutina){
        if (id_rutina){
            return RegistroRutina.fetchOne(id_rutina);
        } else {
            return RegistroRutina.fetchAll();
        }
    }

    //Stored procedures
    
}