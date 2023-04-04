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

    static saveFavorita(id_cliente, id_dieta) {
        return db.execute(`
            INSERT INTO dietasfavoritas (id_cliente, id_dieta)
            VALUES (?, ?)
        `, [id_cliente, id_dieta]);
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll(usuario) {
        return db.execute(`
            SELECT d.id_dieta, d.nombre, m.calorias, Url_image
            FROM dieta d, macronutrientes m
            WHERE m.id_macro = d.id_macro
            AND id_dieta NOT IN (
                SELECT d.id_dieta
                FROM dieta d, dietasfavoritas df, cliente c, usuario u
                WHERE d.id_dieta = df.id_dieta
                AND df.id_cliente = c.id_cliente
                AND c.id_usuario = u.id_usuario
                AND u.nombre_usuario = ?
            );
        ` , [usuario]);
    }

    static fetchOne(id){
        return db.execute(`
        SELECT id_dieta,nombre, tipo_dieta
        FROM dieta
        WHERE id_dieta =?
        `,[id]);
   } 

   static fetchAllFavoritas(usuario) {
    return db.execute(`
    SELECT d.nombre, d.tipo_dieta, d.id_dieta, d.Url_image, m.calorias
    FROM dieta d, dietasfavoritas df, cliente c, usuario u, macronutrientes m
    WHERE d.id_macro = m.id_macro
    AND d.id_dieta = df.id_dieta
    AND df.id_cliente = c.id_cliente
    AND c.id_usuario = u.id_usuario
    AND u.nombre_usuario = ?;
`, [usuario]);
}

}