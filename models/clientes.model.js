const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Cliente {

    constructor(nuevo_cliente) {
        this.id_usuario = nuevo_cliente.id_usuario;
        this.id_rutina =nuevo_cliente.id_rutina;
        this.id_dieta= nuevo_cliente.id_dieta;
        this.id_obj = nuevo_cliente.id_obj;
        this.id_niv= nuevo_cliente.id_niv;
        this.sexo= nuevo_cliente.sexo;
        this.fecha_nacimiento = nuevo_cliente.fecha_nacimiento;
        this.alturaInic = nuevo_cliente.alturaInic;
        this.pesoInic = nuevo_cliente.pesoInic;
    }

    save() {
        return db.execute(`       
        INSERT INTO cliente (id_usuario,id_rutina,id_dieta, id_obj, id_niv, sexo, fecha_nacimiento, alturaInic, pesoInic)
        VALUES (?,?,?,?,?,?,?,?,?)
    `, [this.id_usuario, this.id_rutina,this.id_dieta, this.id_obj, this.id_niv, this.sexo,this.fecha_nacimiento,this.alturaInic,this.pesoInic]);
    }


    static saveDieta(dieta, cliente) {
        return db.execute(
          `UPDATE cliente SET id_dieta = ? WHERE id_cliente = ?`,
          [dieta,cliente]
        );
    }

    static saveRutina(rutina, cliente){
        return db.execute(
            `UPDATE cliente SET id_rutina = ? WHERE id_cliente = ?`,
            [rutina,cliente]
        );
    }

    
    //Actualizar datos del cliente
    updateClienteData() {
        return db.execute(
            `UPDATE cliente 
             SET sexo = ?, fecha_nacimiento = ?, alturaInic = ?, id_obj = ?, id_niv = ?
             WHERE id_usuario = ?`,
            [this.sexo, this.fecha_nacimiento, this.alturaInic, this.id_obj, this.id_niv, this.id_usuario]
        );
    }
    
      

    // Consulta a la base de datos de la info de un cliente a partir de su username
    static fetchOne(username){
        return db.execute(`
            SELECT *
            FROM cliente c, usuario u, objetivo o, nivelfisico n
            WHERE u.nombre_usuario = ?
            AND c.id_usuario = u.id_usuario
            AND c.id_obj=o.id_obj
            AND c.id_niv=n.id_niv
        `, [username]);
    }

    static fetchIdCliente(id_usuario){
        return db.execute(`
            SELECT *
            FROM cliente c, usuario u, objetivo o, nivelfisico n
            WHERE c.id_usuario = ?
            AND c.id_usuario = u.id_usuario
            AND c.id_obj=o.id_obj
            AND c.id_niv=n.id_niv
        `, [id_usuario]);
    }

    static getCliente(nombre_usuario){
        return db.execute(`
            SELECT c.id_cliente
            FROM cliente c, usuario u
            WHERE u.nombre_usuario = ?
            AND c.id_usuario = u.id_usuario
        ` , [nombre_usuario]);
    }

    static getIdCliente(nombre_usuario){
        return db.execute(`
        SELECT u.id_usuario
        FROM cliente c, usuario u
        WHERE u.nombre_usuario = ?
        AND c.id_usuario = u.id_usuario
        `, [nombre_usuario]);
    }

    //función para obtener información de un cliente y su objetivo. Se pudiera incluir Nivel Físico, pero ese aún no se crea para llenar datos
    static getObjetivo(id_cliente) {
        return db.execute(
            `
            SELECT u.id_usuario, c.id_cliente, o.id_obj
            FROM usuario u, cliente c, objetivo o
            WHERE u.id_usuario=c.id_usuario AND c.id_obj=o.id_obj AND c.id_cliente = ?;
         `, [id_cliente]);
    }
    //cree esta consulta
    static saveObj(id_usuario, id_obj) {
        return db.execute(`
            INSERT INTO cliente (id_usuario, id_obj)
            values (?, ?)
        `, [id_usuario, id_obj]);
    }

}   /* saveRol(id_usuario, id_rol) {
    return db.execute(`
        INSERT INTO usuariorol (id_usuario, id_rol)
        values (?, ?)
    `, [id_usuario, id_rol]);
}*/