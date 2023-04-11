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

    static saveFavorita(id_cliente, id_rutina) {
        return db.execute(`
            INSERT INTO rutinasfavoritas (id_cliente, id_rutina)
            VALUES (?, ?)
        `, [id_cliente, id_rutina]);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll(usuario) {
        return db.execute(`
        SELECT *
        FROM rutina r
        WHERE r.id_rutina NOT IN (
            SELECT r.id_rutina
            FROM rutina r, rutinasfavoritas rf, cliente c, usuario u
            WHERE r.id_rutina = rf.id_rutina
            AND rf.id_cliente = c.id_cliente
            AND c.id_usuario = u.id_usuario
            AND u.nombre_usuario = ?
        )
        ORDER BY r.id_rutina ASC
        `, [usuario]);
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
        SELECT *
        FROM rutina r
        WHERE r.nombre =?
        `, [nombre]);
    }

    static fetchAllFavoritas(usuario) {
        return db.execute(`
        SELECT r.id_rutina, r.nombre, r.tiporutina, r.Url_image, r.descripcion
        FROM rutina r, rutinasfavoritas rf, cliente c, usuario u
        WHERE r.id_rutina = rf.id_rutina
        AND rf.id_cliente = c.id_cliente
        AND c.id_usuario = u.id_usuario
        AND u.nombre_usuario = ?
    `, [usuario]);
    }

    static fetch(id_rutina){
        if (id_rutina){
            return RutinaEjercicio(id_rutina);
        } else {
            return RutinaEjercicio.fetchAll();
        }
    }

}