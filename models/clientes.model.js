const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Cliente {

    // Por el momento no tenemos nada en el constructor de cliente porque no tenemos una manera de automatizar la creacion de un cliente a partir de la creacion de un usuario
    constructor(nuevo_cliente) {
        this.id_cliente = nuevo_cliente.id_cliente;
        this.id_usuario = nuevo_cliente.id_usuario;
        this.id_rutina = nuevo_cliente.id_rutina;
        this.id_dieta = nuevo_cliente.id_dieta;
        this.id_obj = nuevo_cliente.id_obj;
        this.id_niv = nuevo_cliente.id_niv;
        this.imc = nuevo_cliente.imc || null;
    }

    // Por el momento no tenemos nada en el save de cliente porque no tenemos una manera de automatizar que se guarde en la base de datos un cliente a partir de la creacion de un usuario
    save() {
        return db.execute(`
        INSERT INTO cliente (id_usuario, id_rutina, id_dieta, id_obj, id_niv, imc)
        VALUES (?, ?, ?, ?, ?, ?)
    `, [this.id_usuario, this.id_dieta, this.id_rutina, this.id_obj, this.id_niv, this.imc]);
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
    saveCliente(id_cliente) {
        return db.execute(`
            UPDATE cliente SET nombre=?, apellido=?, nombre_usuario=?, correo=?, fecha_nacimiento=?, sexo=?, foto_perfil=?, id_obj=(SELECT id_obj FROM objetivo WHERE nombre=?), id_niv=(SELECT id_niv FROM nivelfisico WHERE nombre=?)
            WHERE id_cliente=?
        `, [this.nombre, this.apellido, this.nombre_usuario, this.correo, this.fecha_nacimiento, this.sexo, this.foto_perfil, this.nombre_obj, this.nombre_niv, id_cliente]);
    }
    

    //función para obtener información de un cliente y su objetivo. Se pudiera incluir Nivel Físico, pero ese aún no se crea para llenar datos
    static getObjetivo(id_cliente) {
        return db.execute(
            `
            SELECT u.id_usuario, c.id_cliente, o.od_obj, o.nombre, o.descripcion
            FROM usuario u, cliente c, objetivo o
            WHERE u.id_usuario=c.id_usuario AND c.id_obj=o.id_obj AND c.id_cliente = ?;
         `, [id_cliente]);
    }

}