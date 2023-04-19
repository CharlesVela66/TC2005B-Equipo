const db= require('../util/database');

module.exports = class Dieta_Alimento{
    constructor(nuevo_dietaAlimento){
        this.id_dieta = nuevo_dietaAlimento.id_dieta || '';
        this.id_alimento= nuevo_dietaAlimento.id_alimento || '';
        this.cantidad = nuevo_dietaAlimento.cantidad || '';
    }
    save(){
        return db.execute(`
            INSERT INTO dietasalimentos(id_dieta, id_alimento, cantidad)
            VALUES (?, ?, ?)
        `, [this.id_dieta, this.id_alimento, this.cantidad]);
    }
    static fetchOne(id){
        return db.execute(
            `
            SELECT a.nombre, a.medida, da.cantidad
            FROM dietasalimentos da, alimento a
            Where da.id_dieta= ? AND da.id_alimento=a.id_alimento 
        `
        ,[id])
    }
    static fetchAll(id){
        return db.execute(`
            SELECT *
            FROM dietasalimentos
            WHERE id_alimento = ?
        `, [id])
    }

}