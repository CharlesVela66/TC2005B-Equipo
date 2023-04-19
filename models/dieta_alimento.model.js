const db= require('../util/database');

module.exports = class Dieta_Alimento{
    constructor(nuevo_dietaAlimento){
        this.id_dieta = nuevo_dietaAlimento.id_dieta || '';
        this.nombre = nuevo_dietaAlimento.nombre || '';
        this.medida = nuevo_dietaAlimento.medida || '';
        this.cantidad = nuevo_dietaAlimento.cantidad || 0;
    }
    save(){
        return db.execute(`
            INSERT INTO dietasalimentos(id_dieta, nombre, medida, cantidad)
            VALUES (?, ?, ?, ?)
        `, [this.id_dieta, this.nombre, this.medida, this.cantidad]);
    }
    static fetchOne(id){
        return db.execute(
            `
            SELECT *
            FROM dietasalimentos
            WHERE id_dieta = ?
        `
        ,[id])
    }

}