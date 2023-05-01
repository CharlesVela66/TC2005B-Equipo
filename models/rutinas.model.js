const db = require('../util/database');

module.exports = class Rutina {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nueva_rutina) {
        this.nombre = nueva_rutina.nombre || "";
        this.tiporutina = nueva_rutina.tiporutina || "";
        this.descripcion = nueva_rutina.descripcion || "";
        this.frecuencia = nueva_rutina.frecuencia || "",
        this.URL_Image= nueva_rutina.URL_Image || "";
        this.URL_Image_Ejercicios = nueva_rutina.URL_Image_Ejercicios || "";
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        return db.execute(`
            INSERT INTO  rutina(nombre,tiporutina,descripcion, frecuencia, URL_Image, URL_Image_Ejercicios) 
            values ( ?, ?, ?, ?, ?, ?)
        `, [ this.nombre, this.tiporutina, this.descripcion, this.frecuencia, this.URL_Image, this.URL_Image_Ejercicios]);
    }

    static saveFavorita(id_cliente, id_rutina) {
        return db.execute(`
            INSERT INTO rutinasfavoritas (id_cliente, id_rutina)
            VALUES (?, ?)
        `, [id_cliente, id_rutina]);
    }

    static count(){
        return db.execute (`
        SELECT COUNT(id_rutina) as "Totalr"
        FROM rutina
        `);
    }

    static deleteFavorita(id_cliente, id_rutina) {
        return db.execute(`
            DELETE FROM rutinasfavoritas 
            WHERE rutinasfavoritas.id_cliente = ?
            AND rutinasfavoritas.id_rutina = ?
        `,[id_cliente, id_rutina])
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
            SELECT r.id_rutina, r.nombre as 'nombreRutina', r.tiporutina, r.frecuencia, r.descripcion, r.URL_Image, r.URL_Image_Ejercicios, rn.id_nivel, n.nombre as 'nombreNivel'
            FROM rutina r, rutinaniveles rn, nivel n
            WHERE r.id_rutina = ?
            AND rn.id_rutina = ?
            AND rn.id_nivel = n.id_nivel
        `, [id_rutina, id_rutina]
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
        SELECT r.nombre, r.id_rutina, r.URL_Image
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

    static delete(id_rutina) {
        return db.execute('CALL eliminar_rutina(?)', [id_rutina]);
    }    

    /*
    async agregarEjercicio(rutinaId, ejercicioId) {
        const connection = await db.getConnection();
        await connection.query('CALL agregarEjercicioARutina(?, ?)', [rutinaId, ejercicioId]);
        connection.release();
    },

    async agregarEjercicio(id_rutina, ejercicio_id)*/

}